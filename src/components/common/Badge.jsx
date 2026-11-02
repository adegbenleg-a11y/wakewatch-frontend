import React from 'react';

/**
 * Reusable Bitnox Badge Component
 *
 * @param {'primary' | 'awake' | 'drowsy' | 'sleeping' | 'neutral' | 'accent'} variant
 * @param {'sm' | 'md'} size
 * @param {boolean} dot - whether to show a pulse/indicator dot
 * @param {boolean} pulse - animate the dot
 */
export default function Badge({
  children,
  variant = 'primary',
  size = 'md',
  dot = false,
  pulse = false,
  className = '',
  ...props
}) {
  const baseStyles =
    'inline-flex items-center font-mono font-medium rounded-full border tracking-wide uppercase select-none';

  const sizeStyles = {
    sm: 'text-[10px] px-2 py-0.5 gap-1.5',
    md: 'text-xs px-2.5 py-1 gap-2',
  };

  const variantStyles = {
    primary:
      'bg-bitnox-primary/10 border-bitnox-primary/30 text-bitnox-primary',
    awake:
      'bg-status-awake-bg border-status-awake-border text-status-awake-light',
    drowsy:
      'bg-status-drowsy-bg border-status-drowsy-border text-status-drowsy-light',
    sleeping:
      'bg-status-sleeping-bg border-status-sleeping-border text-status-sleeping-light',
    neutral:
      'bg-slate-800/60 border-slate-700/60 text-slate-300',
    accent:
      'bg-bitnox-accent/80 border-bitnox-border text-bitnox-primary',
  };

  const dotColor = {
    primary: 'bg-bitnox-primary',
    awake: 'bg-status-awake',
    drowsy: 'bg-status-drowsy',
    sleeping: 'bg-status-sleeping',
    neutral: 'bg-slate-400',
    accent: 'bg-bitnox-primary',
  };

  return (
    <span
      className={`${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${variantStyles[variant] || variantStyles.primary} ${className}`}
      {...props}
    >
      {dot && (
        <span className="relative flex h-2 w-2">
          {pulse && (
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${dotColor[variant]}`}
            ></span>
          )}
          <span
            className={`relative inline-flex rounded-full h-2 w-2 ${dotColor[variant]}`}
          ></span>
        </span>
      )}
      <span>{children}</span>
    </span>
  );
}
