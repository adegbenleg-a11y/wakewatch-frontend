import React from 'react';
import { ShieldCheck, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-bitnox-border/50 bg-bitnox-surface/40 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center space-x-2 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-bitnox-primary"></span>
            <span className="font-heading font-semibold text-white">WakeWatch</span>
            <span>—</span>
            <span>Bitnox Technology Solutions Ltd.</span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-400">
            <MapPin className="w-3.5 h-3.5 text-bitnox-primary" />
            <span>Majek Kembo Plaza, Oke-Ilewo, Abeokuta, Ogun State, Nigeria</span>
          </div>

          <div className="flex items-center gap-2 font-mono text-[11px] text-slate-500">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>ML Vision Core • High Alertness System</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
