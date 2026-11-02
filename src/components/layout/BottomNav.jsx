import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Video,
  AlertTriangle,
  Users,
  BarChart3,
  Settings,
} from 'lucide-react';

export default function BottomNav() {
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: 'Monitor', path: '/monitor', icon: <Video className="w-5 h-5" /> },
    { name: 'Alerts', path: '/alerts', icon: <AlertTriangle className="w-5 h-5" />, badge: 3 },
    { name: 'People', path: '/people', icon: <Users className="w-5 h-5" /> },
    { name: 'Reports', path: '/reports', icon: <BarChart3 className="w-5 h-5" /> },
    { name: 'Settings', path: '/settings', icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-bitnox-surface/95 backdrop-blur-lg border-t border-bitnox-border px-2 py-1.5 shadow-glass-card">
      <div className="flex items-center justify-around">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              relative flex flex-col items-center justify-center py-1 px-2 rounded-xl text-[10px] font-heading font-medium transition-all duration-200 select-none min-w-[50px]
              ${
                isActive
                  ? 'text-bitnox-primary font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }
            `}
          >
            {({ isActive }) => (
              <>
                <div className="relative">
                  <span className={isActive ? 'text-bitnox-primary' : 'text-slate-400'}>
                    {item.icon}
                  </span>

                  {item.badge && (
                    <span className="absolute -top-1 -right-2 px-1 py-0.2 rounded-full text-[9px] font-mono bg-status-drowsy text-black font-extrabold leading-none">
                      {item.badge}
                    </span>
                  )}
                </div>

                <span className="mt-1 truncate">{item.name}</span>

                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-bitnox-primary shadow-glow-primary mt-0.5" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
