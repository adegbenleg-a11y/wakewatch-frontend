import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Eye, Activity, Palette, Video } from 'lucide-react';
import apiClient from '../../api/client';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isMock = apiClient.isMockMode();

  const navLinks = [
    { name: 'Live Monitor', path: '/', icon: <Video className="w-4 h-4" /> },
    { name: 'Style Guide (/design)', path: '/design', icon: <Palette className="w-4 h-4" /> },
  ];

  return (
    <nav className="border-b border-bitnox-border bg-bitnox-surface/90 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Title */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-bitnox-primary via-cyan-500 to-cyan-800 flex items-center justify-center font-heading font-extrabold text-bitnox-foreground shadow-glow-primary text-lg transition-transform group-hover:scale-105">
              B
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-lg tracking-tight text-white flex items-center gap-2">
                WakeWatch
                <span className="text-[10px] uppercase font-mono tracking-wider px-1.5 py-0.5 rounded bg-bitnox-primary/10 border border-bitnox-primary/30 text-bitnox-primary">
                  Bitnox AI
                </span>
              </span>
              <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
                Bitnox Technology • Abeokuta
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`
                    flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    ${
                      isActive
                        ? 'bg-bitnox-accent text-bitnox-primary border border-bitnox-border'
                        : 'text-slate-300 hover:text-white hover:bg-bitnox-surface-elevated'
                    }
                  `}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Right Action Area */}
          <div className="flex items-center space-x-3">
            {isMock && (
              <span className="hidden sm:inline-flex text-[11px] font-mono px-2.5 py-1 rounded-full bg-cyan-950/80 border border-bitnox-primary/30 text-bitnox-primary items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-bitnox-primary animate-pulse"></span>
                Mock Active
              </span>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-bitnox-surface-elevated focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-bitnox-border bg-bitnox-surface px-4 pt-3 pb-4 space-y-2">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`
                  flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium
                  ${
                    isActive
                      ? 'bg-bitnox-accent text-bitnox-primary border border-bitnox-border'
                      : 'text-slate-300 hover:text-white hover:bg-bitnox-surface-elevated'
                  }
                `}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
