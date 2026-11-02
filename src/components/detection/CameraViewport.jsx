import React from 'react';
import {
  Camera,
  CameraOff,
  AlertTriangle,
  RotateCcw,
  Zap,
  Activity,
  Shield,
  Eye,
  Radio,
} from 'lucide-react';
import Button from '../common/Button';
import Badge from '../common/Badge';
import StatusPill from './StatusPill';
import { DETECTION_STATES } from '../../api/client';

export default function CameraViewport({
  videoRef,
  isMonitoring,
  isLoading,
  error,
  hasStream,
  isSimulated = false,
  prediction,
  onRetryCamera,
  onToggleSimulated,
}) {
  const currentStatus = prediction?.status || DETECTION_STATES.AWAKE;
  const confidencePercent = prediction?.confidence
    ? Math.round(prediction.confidence * 100)
    : 95;

  // Bounding box position percentage
  const bbox = prediction?.bbox || { x: 28, y: 18, width: 44, height: 58 };

  // Status-driven bounding box colors
  const statusColors = {
    [DETECTION_STATES.AWAKE]: {
      border: 'border-status-awake',
      text: 'text-status-awake-light',
      bg: 'bg-status-awake/10',
      glow: 'shadow-glow-awake',
      badgeBg: 'bg-emerald-950/90 border-status-awake-border',
    },
    [DETECTION_STATES.DROWSY]: {
      border: 'border-status-drowsy',
      text: 'text-status-drowsy-light',
      bg: 'bg-status-drowsy/15',
      glow: 'shadow-glow-drowsy',
      badgeBg: 'bg-amber-950/90 border-status-drowsy-border',
    },
    [DETECTION_STATES.SLEEPING]: {
      border: 'border-status-sleeping animate-pulse',
      text: 'text-status-sleeping-light',
      bg: 'bg-status-sleeping/20',
      glow: 'shadow-glow-sleeping',
      badgeBg: 'bg-red-950/90 border-status-sleeping-border',
    },
  };

  const currentTheme = statusColors[currentStatus] || statusColors[DETECTION_STATES.AWAKE];

  return (
    <div className="relative w-full aspect-video bg-black rounded-2xl border border-bitnox-border overflow-hidden shadow-glass-card select-none">
      {/* 1. Real Video Feed or Placeholder */}
      {hasStream && !isSimulated ? (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover transform -scale-x-100" // Mirror webcam for intuitive user viewing
        />
      ) : isSimulated ? (
        /* Fallback Simulation Feed: High-tech hub photo */
        <div className="relative w-full h-full overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1280&auto=format&fit=crop&q=80"
            alt="Simulated Bitnox Workstation"
            className="w-full h-full object-cover opacity-85 filter contrast-105"
          />
          {/* Simulated scanlines */}
          <div className="absolute inset-0 bg-[radial-gradient(#05e4fc_1px,transparent_1px)] [background-size:20px_20px] opacity-20 pointer-events-none" />
        </div>
      ) : null}

      {/* 2. Loading State Overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-30 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center">
          <div className="w-12 h-12 rounded-xl bg-bitnox-accent border border-bitnox-primary/40 flex items-center justify-center mb-3 text-bitnox-primary animate-pulse">
            <Camera className="w-6 h-6" />
          </div>
          <p className="font-heading font-semibold text-white text-sm">
            Initializing Workstation Camera...
          </p>
          <span className="text-xs font-mono text-bitnox-primary mt-1">
            Requesting getUserMedia stream
          </span>
        </div>
      )}

      {/* 3. Error / No-Camera State Overlay */}
      {error && !hasStream && !isSimulated && !isLoading && (
        <div className="absolute inset-0 z-30 bg-bitnox-surface/95 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center">
          <div className="w-14 h-14 rounded-2xl bg-status-sleeping-bg border border-status-sleeping-border flex items-center justify-center mb-4 text-status-sleeping-light">
            <CameraOff className="w-7 h-7" />
          </div>

          <h3 className="font-heading font-bold text-lg text-white mb-1">
            Camera Feed Offline
          </h3>
          <p className="text-xs text-slate-300 max-w-md mb-6 leading-relaxed">
            {error}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button
              variant="primary"
              size="sm"
              icon={<RotateCcw className="w-4 h-4" />}
              onClick={onRetryCamera}
            >
              Retry Camera Access
            </Button>

            <Button
              variant="secondary"
              size="sm"
              icon={<Radio className="w-4 h-4" />}
              onClick={onToggleSimulated}
            >
              Use Simulated Workstation Feed
            </Button>
          </div>
        </div>
      )}

      {/* 4. Stopped State Overlay (When Monitoring Paused) */}
      {!isMonitoring && !isLoading && (
        <div className="absolute inset-0 z-20 bg-black/60 backdrop-blur-[2px] flex flex-col items-center justify-center p-6 text-center">
          <div className="p-3 rounded-full bg-bitnox-surface border border-bitnox-border text-slate-400 mb-2">
            <Radio className="w-6 h-6" />
          </div>
          <span className="font-heading font-bold text-white text-base">
            Detection Stream Paused
          </span>
          <span className="text-xs font-mono text-slate-400 mt-1">
            Click "Start Monitoring" below to resume live classification
          </span>
        </div>
      )}

      {/* 5. HUD Telemetry Overlay (Active when monitoring) */}
      {isMonitoring && (
        <>
          {/* Top Bar Overlay */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-20 pointer-events-none">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg bg-black/75 border border-white/15 text-[11px] font-mono text-white flex items-center gap-1.5 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-status-awake animate-pulse" />
                {isSimulated ? 'SIMULATED FEED' : 'WEBCAM 01'} • 30 FPS
              </span>
            </div>

            <StatusPill status={currentStatus} confidence={prediction?.confidence} size="sm" />
          </div>

          {/* DYNAMIC BOUNDING BOX OVERLAY ON SUBJECT */}
          <div
            className={`absolute z-20 transition-all duration-300 border-2 rounded-xl pointer-events-none ${currentTheme.border} ${currentTheme.bg} ${currentTheme.glow}`}
            style={{
              left: `${bbox.x}%`,
              top: `${bbox.y}%`,
              width: `${bbox.width}%`,
              height: `${bbox.height}%`,
            }}
          >
            {/* HUD Corner Accents */}
            <span className="absolute -top-1.5 -left-1.5 w-3.5 h-3.5 border-t-2 border-l-2 border-current" />
            <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 border-t-2 border-r-2 border-current" />
            <span className="absolute -bottom-1.5 -left-1.5 w-3.5 h-3.5 border-b-2 border-l-2 border-current" />
            <span className="absolute -bottom-1.5 -right-1.5 w-3.5 h-3.5 border-b-2 border-r-2 border-current" />

            {/* Bounding Box Label Tag */}
            <div
              className={`absolute -top-7 left-0 px-2.5 py-0.5 rounded-t-md font-mono text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 border ${currentTheme.badgeBg} ${currentTheme.text}`}
            >
              <span>{currentStatus}</span>
              <span className="opacity-80 font-normal">({confidencePercent}%)</span>
            </div>

            {/* Simulated Eye / Facial Landmarks Crosshairs */}
            <div className="absolute top-[32%] left-[26%] w-2 h-2 rounded-full bg-bitnox-primary/80 animate-ping" />
            <div className="absolute top-[32%] right-[26%] w-2 h-2 rounded-full bg-bitnox-primary/80 animate-ping" />
            <div className="absolute bottom-[24%] left-[46%] w-2 h-1 rounded-full bg-bitnox-primary/60" />
          </div>

          {/* Bottom Telemetry Strip */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-20 pointer-events-none text-xs font-mono">
            <div className="flex items-center gap-3 bg-black/75 px-3 py-1.5 rounded-lg border border-white/15 backdrop-blur-sm">
              <span>
                EAR:{' '}
                <strong className={currentStatus === 'AWAKE' ? 'text-bitnox-primary' : currentTheme.text}>
                  {prediction?.metrics?.ear || '0.32'}
                </strong>
              </span>
              <span className="text-slate-600">|</span>
              <span>
                MAR:{' '}
                <strong className="text-white">
                  {prediction?.metrics?.mar || '0.12'}
                </strong>
              </span>
              <span className="text-slate-600">|</span>
              <span>
                PERCLOS:{' '}
                <strong className="text-emerald-400">
                  {prediction?.metrics?.perclos || '4.2'}%
                </strong>
              </span>
            </div>

            <div className="hidden sm:inline-flex bg-black/75 px-2.5 py-1.5 rounded-lg border border-white/15 text-[10px] text-slate-400 backdrop-blur-sm">
              Bitnox AI Core • 1.5s Inference Polling
            </div>
          </div>
        </>
      )}
    </div>
  );
}
