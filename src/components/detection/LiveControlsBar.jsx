import React from 'react';
import Button from '../common/Button';
import Card from '../common/Card';
import {
  Play,
  Square,
  Camera,
  Sliders,
  Volume2,
  VolumeX,
  Radio,
  Settings2,
} from 'lucide-react';

/**
 * LiveControlsBar
 * Houses:
 * - Start/Stop monitoring button
 * - Camera device dropdown selector
 * - Sensitivity slider (scale 1 - 5)
 * - Audio alarm mute toggle
 */
export default function LiveControlsBar({
  isMonitoring,
  onToggleMonitoring,
  devices = [],
  activeDeviceId,
  onSelectDevice,
  sensitivity,
  onChangeSensitivity,
  audioAlertEnabled,
  onToggleAudioAlert,
  isSimulated,
  onToggleSimulated,
}) {
  const sensitivityLabels = {
    1: '1 (Relaxed - 0.22 EAR)',
    2: '2 (Low - 0.24 EAR)',
    3: '3 (Standard - 0.26 EAR)',
    4: '4 (Strict - 0.28 EAR)',
    5: '5 (High-Alert - 0.30 EAR)',
  };

  return (
    <Card variant="solid" padding="md" className="border-bitnox-border">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* 1. Start / Stop Control */}
        <div className="md:col-span-3 flex items-center">
          {isMonitoring ? (
            <Button
              variant="danger"
              size="md"
              fullWidth
              icon={<Square className="w-4 h-4 fill-current" />}
              onClick={onToggleMonitoring}
            >
              Stop Monitoring
            </Button>
          ) : (
            <Button
              variant="primary"
              size="md"
              fullWidth
              icon={<Play className="w-4 h-4 fill-current" />}
              onClick={onToggleMonitoring}
            >
              Start Monitoring
            </Button>
          )}
        </div>

        {/* 2. Camera Selector */}
        <div className="md:col-span-4 space-y-1.5">
          <label className="block text-xs font-mono font-medium text-slate-300 uppercase tracking-wide flex items-center gap-1.5">
            <Camera className="w-3.5 h-3.5 text-bitnox-primary" />
            Camera Input Source:
          </label>

          <div className="relative">
            <select
              value={isSimulated ? 'simulated' : activeDeviceId}
              onChange={(e) => {
                const val = e.target.value;
                if (val === 'simulated') {
                  onToggleSimulated(true);
                } else {
                  onToggleSimulated(false);
                  onSelectDevice(val);
                }
              }}
              className="w-full bg-bitnox-surface border border-bitnox-border rounded-lg px-3 py-2 text-xs font-mono text-slate-200 outline-none focus:border-bitnox-primary focus:ring-1 focus:ring-bitnox-primary transition-colors appearance-none cursor-pointer"
            >
              {/* Real connected webcams */}
              {devices.map((device) => (
                <option key={device.deviceId} value={device.deviceId}>
                  {device.label || `Camera (${device.deviceId.slice(0, 8)})`}
                </option>
              ))}

              {/* Simulated fallback feed */}
              <option value="simulated">
                ✨ Simulated Bitnox Workstation Feed (Hub Room B)
              </option>
            </select>
          </div>
        </div>

        {/* 3. Sensitivity Slider */}
        <div className="md:col-span-3 space-y-1.5">
          <div className="flex items-center justify-between text-xs font-mono">
            <label className="text-slate-300 uppercase tracking-wide flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-bitnox-primary" />
              Sensitivity:
            </label>
            <span className="text-bitnox-primary font-bold">
              {sensitivityLabels[sensitivity] || `${sensitivity} / 5`}
            </span>
          </div>

          <input
            type="range"
            min="1"
            max="5"
            step="1"
            value={sensitivity}
            onChange={(e) => onChangeSensitivity(Number(e.target.value))}
            className="w-full accent-bitnox-primary bg-slate-800 h-1.5 rounded-lg cursor-pointer"
          />
        </div>

        {/* 4. Audio Alert Chime Toggle */}
        <div className="md:col-span-2 flex items-center justify-end">
          <button
            type="button"
            onClick={onToggleAudioAlert}
            className={`
              flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-mono border transition-all duration-200
              ${
                audioAlertEnabled
                  ? 'bg-bitnox-accent text-bitnox-primary border-bitnox-border'
                  : 'bg-bitnox-surface text-slate-500 border-bitnox-border/50 hover:text-slate-300'
              }
            `}
            title={audioAlertEnabled ? 'Audio Chime Enabled' : 'Audio Chime Muted'}
          >
            {audioAlertEnabled ? (
              <Volume2 className="w-4 h-4 text-bitnox-primary" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-500" />
            )}
            <span className="hidden sm:inline">
              {audioAlertEnabled ? 'Chime ON' : 'Muted'}
            </span>
          </button>
        </div>
      </div>
    </Card>
  );
}
