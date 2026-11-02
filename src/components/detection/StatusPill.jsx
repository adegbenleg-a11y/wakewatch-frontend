import React from 'react';
import { CheckCircle2, AlertTriangle, AlertOctagon, Eye, Moon, Zap } from 'lucide-react';
import { DETECTION_STATES } from '../../api/client';

/**
 * Reusable StatusPill Component
 * Represents the ML model's classified alertness status:
 * - AWAKE (Emerald Green)
 * - DROWSY (Amber)
 * - SLEEPING (Crimson Red)
 *
 * @param {'AWAKE' | 'DROWSY' | 'SLEEPING'} status
 * @param {'sm' | 'md' | 'lg'} size
 * @param {number} confidence - optional 0..1 confidence float or percentage
 * @param {boolean} showGlow - optional radial glow shadow
 */
export default function StatusPill({
  status = DETECTION_STATES.AWAKE,
  size = 'md',
  confidence,
  showGlow = true,
  className = '',
}) {
  const normalizedStatus = (status || '').toUpperCase();

  const configs = {
    [DETECTION_STATES.AWAKE]: {
      label: 'AWAKE',
      sublabel: 'Alert & Focused',
      bg: 'bg-status-awake-bg',
      border: 'border-status-awake-border',
      text: 'text-status-awake-light',
      dotBg: 'bg-status-awake',
      glowShadow: 'shadow-glow-awake',
      icon: <Zap className="w-3.5 h-3.5" />,
      ringColor: 'ring-status-awake/20',
    },
    [DETECTION_STATES.DROWSY]: {
      label: 'DROWSY',
      sublabel: 'Microsleep Risk',
      bg: 'bg-status-drowsy-bg',
      border: 'border-status-drowsy-border',
      text: 'text-status-drowsy-light',
      dotBg: 'bg-status-drowsy',
      glowShadow: 'shadow-glow-drowsy',
      icon: <AlertTriangle className="w-3.5 h-3.5" />,
      ringColor: 'ring-status-drowsy/20',
    },
    [DETECTION_STATES.SLEEPING]: {
      label: 'SLEEPING',
      sublabel: 'Immediate Alert',
      bg: 'bg-status-sleeping-bg',
      border: 'border-status-sleeping-border',
      text: 'text-status-sleeping-light',
      dotBg: 'bg-status-sleeping',
      glowShadow: 'shadow-glow-sleeping',
      icon: <AlertOctagon className="w-3.5 h-3.5 animate-bounce" />,
      ringColor: 'ring-status-sleeping/30',
    },
  };

  const currentConfig = configs[normalizedStatus] || configs[DETECTION_STATES.AWAKE];

  const sizeStyles = {
    sm: 'text-xs px-2.5 py-1 gap-1.5',
    md: 'text-sm px-3.5 py-1.5 gap-2',
    lg: 'text-base px-5 py-2.5 gap-2.5',
  };

  const formattedConfidence =
    confidence !== undefined
      ? typeof confidence === 'number' && confidence <= 1
        ? `${Math.round(confidence * 100)}%`
        : `${confidence}%`
      : null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`
        inline-flex items-center rounded-full font-mono font-semibold border backdrop-blur-sm select-none
        transition-all duration-300
        ${currentConfig.bg}
        ${currentConfig.border}
        ${currentConfig.text}
        ${sizeStyles[size] || sizeStyles.md}
        ${showGlow ? currentConfig.glowShadow : ''}
        ${className}
      `}
    >
      {/* Animated Ping Indicator */}
      <span className="relative flex h-2.5 w-2.5 shrink-0">
        <span
          className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${currentConfig.dotBg}`}
        ></span>
        <span
          className={`relative inline-flex rounded-full h-2.5 w-2.5 ${currentConfig.dotBg}`}
        ></span>
      </span>

      {/* State Icon */}
      <span className="shrink-0">{currentConfig.icon}</span>

      {/* Label */}
      <span className="tracking-wider uppercase font-bold">
        {currentConfig.label}
      </span>

      {/* Optional Confidence Score */}
      {formattedConfidence && (
        <span className="ml-1 pl-1.5 border-l border-current/30 text-[10px] font-normal opacity-85">
          {formattedConfidence}
        </span>
      )}
    </div>
  );
}
