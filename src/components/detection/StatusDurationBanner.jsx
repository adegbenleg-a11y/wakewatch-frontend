import React from 'react';
import StatusPill from './StatusPill';
import { Clock, AlertTriangle, ShieldCheck, Zap } from 'lucide-react';
import { DETECTION_STATES } from '../../api/client';

/**
 * StatusDurationBanner
 * Renders a large StatusPill and a live timer tracking how long the current state has persisted.
 *
 * @param {'AWAKE' | 'DROWSY' | 'SLEEPING'} status
 * @param {number} durationSeconds
 * @param {number} confidence
 */
export default function StatusDurationBanner({
  status = DETECTION_STATES.AWAKE,
  durationSeconds = 0,
  confidence,
}) {
  // Format seconds into MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const isDrowsy = status === DETECTION_STATES.DROWSY;
  const isSleeping = status === DETECTION_STATES.SLEEPING;

  return (
    <div
      className={`
        bitnox-glass rounded-2xl p-4 sm:p-6 border transition-all duration-300 relative overflow-hidden flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4
        ${
          isSleeping
            ? 'border-status-sleeping-border shadow-glow-sleeping bg-status-sleeping-bg/50'
            : isDrowsy
            ? 'border-status-drowsy-border shadow-glow-drowsy bg-status-drowsy-bg/40'
            : 'border-bitnox-border shadow-glass-card'
        }
      `}
    >
      {/* Ambient status glow */}
      {isSleeping && (
        <div className="absolute -top-12 -left-12 w-48 h-48 bg-status-sleeping/25 rounded-full blur-3xl pointer-events-none animate-pulse" />
      )}
      {isDrowsy && (
        <div className="absolute -top-12 -left-12 w-48 h-48 bg-status-drowsy/20 rounded-full blur-3xl pointer-events-none" />
      )}

      {/* Left: Current State with Large StatusPill */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 relative z-10">
        <div>
          <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider block mb-1">
            Real-Time State Classification:
          </span>
          <StatusPill status={status} size="lg" confidence={confidence} />
        </div>

        <div className="hidden sm:block h-10 w-[1px] bg-bitnox-border mx-2" />

        <div className="text-xs text-slate-300">
          {status === DETECTION_STATES.AWAKE && (
            <p className="flex items-center gap-1.5 text-status-awake-light font-medium">
              <ShieldCheck className="w-4 h-4 text-status-awake" />
              Full alertness & upright head posture confirmed.
            </p>
          )}
          {status === DETECTION_STATES.DROWSY && (
            <p className="flex items-center gap-1.5 text-status-drowsy-light font-medium">
              <AlertTriangle className="w-4 h-4 text-status-drowsy animate-pulse" />
              Fatigue risk: slow blinks / yawning detected.
            </p>
          )}
          {status === DETECTION_STATES.SLEEPING && (
            <p className="flex items-center gap-1.5 text-status-sleeping-light font-bold">
              <Zap className="w-4 h-4 text-status-sleeping animate-bounce" />
              CRITICAL: Prolonged eye closure exceeding safety limits!
            </p>
          )}
        </div>
      </div>

      {/* Right: Timer Showing How Long the State Has Lasted */}
      <div className="flex items-center gap-3 relative z-10 self-start sm:self-auto bg-bitnox-surface/80 px-4 py-2.5 rounded-xl border border-bitnox-border">
        <Clock
          className={`w-5 h-5 ${
            isSleeping
              ? 'text-status-sleeping animate-spin'
              : isDrowsy
              ? 'text-status-drowsy animate-pulse'
              : 'text-bitnox-primary'
          }`}
        />
        <div className="flex flex-col">
          <span className="text-[10px] font-mono uppercase text-slate-400">
            State Duration
          </span>
          <span
            className={`font-mono font-black text-xl sm:text-2xl tracking-wider ${
              isSleeping
                ? 'text-status-sleeping-light'
                : isDrowsy
                ? 'text-status-drowsy-light'
                : 'text-white'
            }`}
          >
            {formatTime(durationSeconds)}
          </span>
        </div>
      </div>
    </div>
  );
}
