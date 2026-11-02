import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { Compass, ArrowLeft, Video, ShieldAlert } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bitnox-bg text-slate-100 flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-bitnox-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full bitnox-glass rounded-3xl p-8 sm:p-10 border border-bitnox-border text-center relative z-10 shadow-glass-card">
        <Badge variant="sleeping" dot pulse className="mb-4">
          Telemetry Signal Lost
        </Badge>

        <div className="font-heading font-black text-6xl sm:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-bitnox-primary via-cyan-400 to-cyan-700 tracking-tighter mb-2">
          404
        </div>

        <h1 className="font-heading font-bold text-xl sm:text-2xl text-white mb-3">
          Page Not Found
        </h1>

        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-8">
          The requested route is outside the active WakeWatch monitoring perimeter.
          Please check the URL or return to the main telemetry dashboard.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/">
            <Button
              variant="primary"
              size="md"
              icon={<ArrowLeft className="w-4 h-4" />}
              fullWidth
            >
              Back to Dashboard
            </Button>
          </Link>

          <Link to="/monitor">
            <Button
              variant="secondary"
              size="md"
              icon={<Video className="w-4 h-4" />}
              fullWidth
            >
              Live Monitor
            </Button>
          </Link>
        </div>

        <div className="mt-8 pt-6 border-t border-bitnox-border/60 text-[11px] font-mono text-slate-500">
          WakeWatch AI Vision System • Bitnox Technology Abeokuta
        </div>
      </div>
    </div>
  );
}
