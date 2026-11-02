import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import apiClient from '../../api/client';
import Badge from '../common/Badge';
import {
  Bell,
  LogOut,
  Settings,
  Shield,
  Palette,
  CheckCircle2,
  AlertTriangle,
  Info,
  ChevronDown,
  User,
  Radio,
} from 'lucide-react';

export default function TopBar() {
  const { user, logout, switchRole, isAdmin } = useAuth();
  const location = useLocation();
  const isMock = apiClient.isMockMode();

  const [notifOpen, setNotifOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(1);

  const notifRef = useRef(null);
  const userMenuRef = useRef(null);

  // Fetch mock notifications
  useEffect(() => {
    async function loadNotifications() {
      try {
        const list = await apiClient.getNotifications();
        setNotifications(list);
        setUnreadCount(list.filter((n) => n.unread).length);
      } catch (err) {
        console.error('Failed to load notifications:', err);
      }
    }
    loadNotifications();
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
    setUnreadCount(0);
  };

  // Map route to clean title
  const getPageTitle = (path) => {
    if (path.startsWith('/people/')) return 'Person Profile & History';
    switch (path) {
      case '/':
      case '/dashboard':
        return 'Dashboard Overview';
      case '/monitor':
        return 'Live Camera Monitor';
      case '/alerts':
        return 'Alerts & Incidents';
      case '/people':
        return 'People & Cohorts';
      case '/reports':
        return 'Reports & Analytics';
      case '/settings':
        return 'System Settings';
      case '/design':
        return 'Design System Style Guide';
      default:
        return 'Console';
    }
  };

  return (
    <header className="h-16 border-b border-bitnox-border bg-bitnox-surface/90 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 lg:px-8">
      {/* Left: Brand & Page Context */}
      <div className="flex items-center space-x-4">
        {/* Mobile Brand Mark */}
        <Link to="/dashboard" className="flex items-center space-x-3 md:hidden">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-bitnox-primary to-cyan-800 flex items-center justify-center font-heading font-extrabold text-bitnox-foreground shadow-glow-primary text-base">
            B
          </div>
          <span className="font-heading font-bold text-base text-white tracking-tight">
            WakeWatch
          </span>
        </Link>

        {/* Desktop Page Title & Breadcrumb */}
        <div className="hidden md:flex items-center space-x-3">
          <span className="font-heading font-bold text-lg text-white tracking-tight">
            {getPageTitle(location.pathname)}
          </span>
          <span className="text-slate-600">/</span>
          <span className="text-xs font-mono text-slate-400">
            Bitnox Hub Abeokuta
          </span>
        </div>
      </div>

      {/* Right Action Icons: Live Feed Badge, Notifications, User Menu */}
      <div className="flex items-center space-x-3 sm:space-x-4">
        {/* Mock Data Indicator */}
        {isMock && (
          <span className="hidden sm:inline-flex text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-bitnox-primary/30 text-bitnox-primary items-center gap-1.5">
            <Radio className="w-3 h-3 text-bitnox-primary animate-pulse" />
            Mock API
          </span>
        )}

        {/* Style Guide Shortcut Link */}
        <Link
          to="/design"
          className="hidden sm:inline-flex items-center gap-1 text-xs font-mono text-slate-400 hover:text-bitnox-primary transition-colors px-2 py-1 rounded-md hover:bg-bitnox-surface-elevated"
          title="Component Style Guide"
        >
          <Palette className="w-3.5 h-3.5 text-bitnox-primary" />
          <span>/design</span>
        </Link>

        {/* Notification Bell */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            aria-label="View notifications"
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-bitnox-surface-elevated transition-colors relative focus:outline-none focus:ring-1 focus:ring-bitnox-primary"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-status-sleeping animate-pulse ring-2 ring-bitnox-surface" />
            )}
          </button>

          {/* Notifications Dropdown */}
          {notifOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-bitnox-surface border border-bitnox-border shadow-glass-card z-50 p-4 animate-fadeIn">
              <div className="flex items-center justify-between pb-3 border-b border-bitnox-border/60">
                <div className="flex items-center gap-2">
                  <span className="font-heading font-bold text-sm text-white">
                    Notifications
                  </span>
                  {unreadCount > 0 && (
                    <Badge variant="sleeping" size="sm">
                      {unreadCount} new
                    </Badge>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    className="text-[11px] font-mono text-bitnox-primary hover:underline"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="divide-y divide-bitnox-border/40 max-h-72 overflow-y-auto my-2">
                {notifications.length === 0 ? (
                  <p className="text-xs text-slate-500 py-6 text-center font-mono">
                    No recent notifications
                  </p>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`py-3 px-2 rounded-lg transition-colors ${
                        n.unread ? 'bg-bitnox-accent/30' : 'hover:bg-bitnox-surface-elevated/40'
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        {n.type === 'critical' ? (
                          <AlertTriangle className="w-4 h-4 text-status-sleeping shrink-0 mt-0.5" />
                        ) : n.type === 'warning' ? (
                          <AlertTriangle className="w-4 h-4 text-status-drowsy shrink-0 mt-0.5" />
                        ) : (
                          <Info className="w-4 h-4 text-bitnox-primary shrink-0 mt-0.5" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-white truncate">
                            {n.title}
                          </p>
                          <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                            {n.description}
                          </p>
                          <span className="text-[10px] text-slate-500 font-mono mt-1 block">
                            {n.time}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="pt-2 border-t border-bitnox-border/60 text-center">
                <Link
                  to="/alerts"
                  onClick={() => setNotifOpen(false)}
                  className="text-xs font-mono text-bitnox-primary hover:underline"
                >
                  View all alerts & incidents &rarr;
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* User Menu */}
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex items-center gap-2 p-1.5 rounded-xl border border-bitnox-border hover:border-bitnox-border-hover bg-bitnox-surface-elevated/60 transition-all focus:outline-none focus:ring-1 focus:ring-bitnox-primary"
            aria-label="User profile menu"
          >
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user?.name || 'User'}
                className="w-7 h-7 rounded-lg object-cover ring-1 ring-bitnox-primary/40"
              />
            ) : (
              <div className="w-7 h-7 rounded-lg bg-bitnox-accent flex items-center justify-center text-xs font-bold text-bitnox-primary">
                {user?.name?.charAt(0) || 'U'}
              </div>
            )}
            <div className="hidden lg:flex flex-col text-left">
              <span className="text-xs font-semibold text-white leading-tight max-w-[120px] truncate">
                {user?.name || 'Member'}
              </span>
              <span className="text-[10px] font-mono text-bitnox-primary leading-tight">
                {user?.role || 'Staff'}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden lg:inline" />
          </button>

          {/* User Dropdown Menu */}
          {userMenuOpen && (
            <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-bitnox-surface border border-bitnox-border shadow-glass-card z-50 p-3 animate-fadeIn">
              {/* User Identity Info */}
              <div className="p-2.5 pb-3 border-b border-bitnox-border/60">
                <div className="font-heading font-bold text-sm text-white truncate">
                  {user?.name}
                </div>
                <div className="text-xs text-slate-400 font-mono truncate">
                  {user?.email}
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <Badge variant={isAdmin ? 'primary' : 'awake'} size="sm">
                    {user?.role} Role
                  </Badge>
                  <span className="text-[10px] text-slate-500 font-mono">
                    Abeokuta Hub
                  </span>
                </div>
              </div>

              {/* Role Switcher (For Pair-Programming & Teammates) */}
              <div className="py-2 border-b border-bitnox-border/60">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block px-2 mb-1.5">
                  Switch Demo Role:
                </span>
                <div className="grid grid-cols-2 gap-1.5 px-1">
                  <button
                    type="button"
                    onClick={() => {
                      switchRole('Admin');
                      setUserMenuOpen(false);
                    }}
                    className={`px-2 py-1.5 rounded-lg text-xs font-mono text-left transition-colors ${
                      user?.role === 'Admin'
                        ? 'bg-bitnox-primary/20 text-bitnox-primary font-bold border border-bitnox-primary/40'
                        : 'text-slate-300 hover:bg-bitnox-surface-elevated'
                    }`}
                  >
                    Admin
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      switchRole('Instructor');
                      setUserMenuOpen(false);
                    }}
                    className={`px-2 py-1.5 rounded-lg text-xs font-mono text-left transition-colors ${
                      user?.role === 'Instructor'
                        ? 'bg-status-awake-bg text-status-awake-light font-bold border border-status-awake-border'
                        : 'text-slate-300 hover:bg-bitnox-surface-elevated'
                    }`}
                  >
                    Instructor
                  </button>
                </div>
              </div>

              {/* Links */}
              <div className="py-2 space-y-0.5">
                <Link
                  to="/settings"
                  onClick={() => setUserMenuOpen(false)}
                  className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs text-slate-300 hover:text-white hover:bg-bitnox-surface-elevated transition-colors"
                >
                  <Settings className="w-3.5 h-3.5 text-slate-400" />
                  <span>System Settings</span>
                </Link>
                <Link
                  to="/design"
                  onClick={() => setUserMenuOpen(false)}
                  className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs text-slate-300 hover:text-white hover:bg-bitnox-surface-elevated transition-colors"
                >
                  <Palette className="w-3.5 h-3.5 text-bitnox-primary" />
                  <span>Style Guide (/design)</span>
                </Link>
              </div>

              {/* Logout Button */}
              <div className="pt-2 border-t border-bitnox-border/60">
                <button
                  type="button"
                  onClick={() => {
                    setUserMenuOpen(false);
                    logout();
                  }}
                  className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs text-status-sleeping-light hover:bg-status-sleeping-bg transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
