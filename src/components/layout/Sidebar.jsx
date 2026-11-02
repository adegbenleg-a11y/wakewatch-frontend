import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Video,
  AlertTriangle,
  Users,
  BarChart3,
  Settings,
  Radio,
  Palette,
  Home,
} from 'lucide-react';
import Badge from '../common/Badge';

export default function Sidebar() {
  const { user, isAdmin } = useAuth();

  const navItems = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: <LayoutDashboard className="w-4 h-4" />,
    },
    {
      name: 'Live Monitor',
      path: '/monitor',
      icon: <Video className="w-4 h-4" />,
      badge: 'LIVE',
      badgeVariant: 'awake',
    },
    {
      name: 'Alerts',
      path: '/alerts',
      icon: <AlertTriangle className="w-4 h-4" />,
      badge: '3',
      badgeVariant: 'drowsy',
    },
    {
      name: 'People',
      path: '/people',
      icon: <Users className="w-4 h-4" />,
    },
    {
      name: 'Reports',
      path: '/reports',
      icon: <BarChart3 className="w-4 h-4" />,
    },
    {
      name: 'Settings',
      path: '/settings',
      icon: <Settings className="w-4 h-4" />,
    },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 bg-bitnox-surface border-r border-bitnox-border shrink-0 min-h-screen sticky top-0 select-none">
      {/* Brand Top Header */}
      <div className="h-16 flex items-center px-6 border-b border-bitnox-border/80">
        <NavLink to="/dashboard" className="flex items-center space-x-3 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-bitnox-primary via-cyan-500 to-cyan-800 flex items-center justify-center font-heading font-extrabold text-bitnox-foreground shadow-glow-primary text-lg transition-transform group-hover:scale-105">
            B
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-bold text-base tracking-tight text-white flex items-center gap-1.5">
              WakeWatch
              <span className="text-[9px] uppercase font-mono tracking-wider px-1 py-0.5 rounded bg-bitnox-primary/10 border border-bitnox-primary/30 text-bitnox-primary">
                AI
              </span>
            </span>
            <span className="text-[10px] text-slate-400 font-medium">
              Bitnox Technology
            </span>
          </div>
        </NavLink>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
        <div className="px-3 mb-2 text-[10px] font-mono uppercase text-slate-500 tracking-wider">
          Main Console
        </div>

        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              relative flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-heading font-semibold transition-all duration-200 group
              ${
                isActive
                  ? 'bg-bitnox-accent text-bitnox-primary border border-bitnox-border shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-bitnox-surface-elevated/80'
              }
            `}
          >
            {({ isActive }) => (
              <>
                <div className="flex items-center gap-3">
                  <span
                    className={`transition-colors ${
                      isActive ? 'text-bitnox-primary' : 'text-slate-400 group-hover:text-white'
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span>{item.name}</span>
                </div>

                {item.badge && (
                  <Badge variant={item.badgeVariant || 'primary'} size="sm" dot={item.name === 'Live Monitor'}>
                    {item.badge}
                  </Badge>
                )}

                {/* Left Active Glow Indicator */}
                {isActive && (
                  <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-bitnox-primary shadow-glow-primary" />
                )}
              </>
            )}
          </NavLink>
        ))}

        {/* Public & Developer Links */}
        <div className="pt-6 px-3 mb-2 text-[10px] font-mono uppercase text-slate-500 tracking-wider">
          Public & Style Guide
        </div>

        <NavLink
          to="/"
          className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-heading font-medium text-slate-400 hover:text-white hover:bg-bitnox-surface-elevated/80 transition-all"
        >
          <Home className="w-4 h-4 text-slate-400" />
          <span>Landing Page</span>
        </NavLink>

        <NavLink
          to="/design"
          className={({ isActive }) => `
            flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-mono font-medium transition-all duration-200
            ${
              isActive
                ? 'bg-bitnox-accent text-bitnox-primary border border-bitnox-border'
                : 'text-slate-400 hover:text-white hover:bg-bitnox-surface-elevated/80'
            }
          `}
        >
          <div className="flex items-center gap-3">
            <Palette className="w-4 h-4 text-bitnox-primary" />
            <span>Style Guide (/design)</span>
          </div>
        </NavLink>
      </div>

      {/* Hub Status Card & User Badge at Bottom */}
      <div className="p-4 border-t border-bitnox-border/70 space-y-3 bg-bitnox-surface/40">
        <div className="p-3 rounded-xl bg-bitnox-surface-elevated/80 border border-bitnox-border">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-slate-300 font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-status-awake animate-pulse" />
              Vision Stream Active
            </span>
            <span className="text-[10px] font-mono text-bitnox-primary">30 FPS</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-1 truncate">
            Bitnox Hub • Oke-Ilewo, Abeokuta
          </div>
        </div>

        <div className="flex items-center justify-between px-1">
          <div className="flex flex-col">
            <span className="text-xs font-bold text-white truncate max-w-[130px]">
              {user?.name || 'Bitnox Operator'}
            </span>
            <span className="text-[10px] font-mono text-slate-400">
              Role: <span className="text-bitnox-primary">{user?.role || 'Staff'}</span>
            </span>
          </div>
          <Badge variant={isAdmin ? 'primary' : 'awake'} size="sm">
            {isAdmin ? 'Admin' : 'Instructor'}
          </Badge>
        </div>
      </div>
    </aside>
  );
}
