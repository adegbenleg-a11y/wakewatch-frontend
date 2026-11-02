import React, { forwardRef } from 'react';

/**
 * Reusable Bitnox Input Component
 *
 * @param {string} label - optional input label
 * @param {string} error - validation error message
 * @param {string} hint - supporting hint text
 * @param {React.ReactNode} icon - prefix icon
 * @param {React.ReactNode} iconRight - suffix icon
 */
const Input = forwardRef(function Input(
  {
    label,
    error,
    hint,
    icon,
    iconRight,
    id,
    disabled = false,
    className = '',
    ...props
  },
  ref
) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs font-mono font-medium text-slate-300 tracking-wide uppercase"
        >
          {label}
        </label>
      )}

      <div className="relative rounded-lg">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            {icon}
          </div>
        )}

        <input
          id={inputId}
          ref={ref}
          disabled={disabled}
          className={`
            w-full bg-bitnox-surface border rounded-lg px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500
            transition-all duration-200 outline-none
            ${icon ? 'pl-10' : ''}
            ${iconRight ? 'pr-10' : ''}
            ${
              error
                ? 'border-status-sleeping focus:border-status-sleeping focus:ring-1 focus:ring-status-sleeping'
                : 'border-bitnox-border hover:border-bitnox-border-hover focus:border-bitnox-primary focus:ring-1 focus:ring-bitnox-primary'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed bg-slate-900' : ''}
            ${className}
          `}
          {...props}
        />

        {iconRight && (
          <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
            {iconRight}
          </div>
        )}
      </div>

      {error ? (
        <p className="text-xs text-status-sleeping-light font-mono flex items-center gap-1">
          {error}
        </p>
      ) : hint ? (
        <p className="text-xs text-slate-400">{hint}</p>
      ) : null}
    </div>
  );
});

export default Input;
