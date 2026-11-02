import React, { useEffect, useState } from 'react';
import {
  X,
  ShieldCheck,
  AlertTriangle,
  Clock,
  MapPin,
  Camera,
  CheckCircle2,
  XCircle,
  Volume2,
  Calendar,
  Eye,
  Activity,
} from 'lucide-react';
import Button from '../common/Button';
import Badge from '../common/Badge';
import StatusPill from '../detection/StatusPill';
import audioAlert from '../../utils/audioAlert';

export default function IncidentSideDrawer({
  incident,
  isOpen,
  onClose,
  onAcknowledge,
  onDismiss,
}) {
  const [dismissReason, setDismissReason] = useState('Looking down at notebook / False positive');
  const [showDismissInput, setShowDismissInput] = useState(false);

  // Close on Escape key press
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !incident) return null;

  const isSleeping = incident.status === 'SLEEPING';

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity duration-300 animate-fadeIn"
      />

      {/* Slide-over Container */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-bitnox-surface border-l border-bitnox-border shadow-glass-card flex flex-col justify-between overflow-y-auto animate-slideLeft">
          {/* Drawer Header */}
          <div className="p-5 border-b border-bitnox-border/70 flex items-center justify-between bg-bitnox-surface-elevated/40">
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-xs text-bitnox-primary uppercase font-bold">
                Incident #{incident.id}
              </span>
              <Badge variant={isSleeping ? 'sleeping' : 'drowsy'} size="sm">
                {incident.status}
              </Badge>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-bitnox-surface transition-colors"
              aria-label="Close details"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body Content */}
          <div className="p-6 space-y-6 flex-1">
            {/* Snapshot Image with Bounding Box Preview */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase text-slate-400 tracking-wider block">
                Camera Snapshot (Moment of Incident)
              </span>
              <div className="relative rounded-2xl overflow-hidden border border-bitnox-border aspect-video bg-black shadow-inner">
                <img
                  src={incident.snapshot}
                  alt={incident.person.name}
                  className="w-full h-full object-cover"
                />

                {/* Bounding Box HUD Graphic */}
                <div
                  className={`absolute inset-4 rounded-xl border-2 pointer-events-none ${
                    isSleeping ? 'border-status-sleeping' : 'border-status-drowsy'
                  } bg-black/10`}
                >
                  <span className="absolute top-1 left-2 font-mono text-[9px] uppercase px-1 rounded bg-black/80 text-white">
                    {incident.status} ({incident.duration}s)
                  </span>
                </div>

                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[10px] font-mono text-white bg-black/70 px-2.5 py-1 rounded-md backdrop-blur-sm">
                  <span>{incident.cameraName}</span>
                  <span>{new Date(incident.timestamp).toLocaleTimeString()} WAT</span>
                </div>
              </div>
            </div>

            {/* Person & Workstation Card */}
            <div className="p-4 rounded-2xl bg-bitnox-surface-elevated border border-bitnox-border space-y-3">
              <div className="flex items-center space-x-3.5">
                <img
                  src={incident.person.avatar}
                  alt={incident.person.name}
                  className="w-12 h-12 rounded-xl object-cover ring-1 ring-bitnox-border"
                />
                <div>
                  <h4 className="font-heading font-bold text-white text-base">
                    {incident.person.name}
                  </h4>
                  <p className="text-xs text-slate-400">
                    {incident.person.cohort}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-bitnox-border/50 text-xs font-mono space-y-1.5 text-slate-300">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" /> Station:
                  </span>
                  <span className="text-bitnox-primary font-bold">
                    {incident.location}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> Duration:
                  </span>
                  <span className="text-white font-bold">
                    {incident.duration} seconds
                  </span>
                </div>
              </div>
            </div>

            {/* Inference Telemetry Metrics */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase text-slate-400 tracking-wider block">
                Model Feature Measurements
              </span>

              <div className="grid grid-cols-3 gap-2.5 font-mono">
                <div className="p-3 rounded-xl bg-bitnox-surface-elevated border border-bitnox-border">
                  <span className="text-[10px] text-slate-400 block">EAR</span>
                  <span className="text-lg font-bold text-white">{incident.ear}</span>
                  <span className="text-[9px] text-slate-500 block">Eye Aspect</span>
                </div>

                <div className="p-3 rounded-xl bg-bitnox-surface-elevated border border-bitnox-border">
                  <span className="text-[10px] text-slate-400 block">MAR</span>
                  <span className="text-lg font-bold text-white">{incident.mar}</span>
                  <span className="text-[9px] text-slate-500 block">Mouth Yawn</span>
                </div>

                <div className="p-3 rounded-xl bg-bitnox-surface-elevated border border-bitnox-border">
                  <span className="text-[10px] text-slate-400 block">PERCLOS</span>
                  <span className="text-lg font-bold text-emerald-400">{incident.perclos}%</span>
                  <span className="text-[9px] text-slate-500 block">Eye Closure</span>
                </div>
              </div>
            </div>

            {/* Notes & Audit History */}
            <div className="p-3.5 rounded-xl bg-bitnox-surface-elevated/40 border border-bitnox-border text-xs text-slate-300 space-y-1">
              <span className="font-heading font-semibold text-white block">
                Supervisor Audit Note:
              </span>
              <p className="text-slate-400 leading-relaxed font-mono text-[11px]">
                {incident.notes || 'No supervisor notes recorded.'}
              </p>
            </div>

            {/* Sound alert test button */}
            <Button
              variant="outline"
              size="sm"
              fullWidth
              icon={<Volume2 className="w-4 h-4 text-bitnox-primary" />}
              onClick={() => audioAlert.playAlarmChime()}
            >
              Test Station Audio Chime
            </Button>
          </div>

          {/* Drawer Actions Footer (Acknowledge / Dismiss) */}
          <div className="p-5 border-t border-bitnox-border/70 bg-bitnox-surface-elevated/50 space-y-3">
            {incident.acknowledged ? (
              <div className="p-3 rounded-xl bg-status-awake-bg border border-status-awake-border flex items-center justify-center gap-2 text-xs font-mono text-status-awake-light">
                <CheckCircle2 className="w-4 h-4" />
                <span>Incident Acknowledged by Supervisor</span>
              </div>
            ) : incident.dismissed ? (
              <div className="p-3 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center gap-2 text-xs font-mono text-slate-400">
                <XCircle className="w-4 h-4" />
                <span>Incident Marked as Dismissed</span>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-2.5">
                <Button
                  variant="primary"
                  size="md"
                  fullWidth
                  icon={<CheckCircle2 className="w-4 h-4" />}
                  onClick={() => onAcknowledge(incident.id)}
                >
                  Acknowledge Incident
                </Button>

                <Button
                  variant="secondary"
                  size="md"
                  fullWidth
                  icon={<XCircle className="w-4 h-4" />}
                  onClick={() => onDismiss(incident.id)}
                >
                  Dismiss / False Flag
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
