import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * Reusable Bitnox Button Component
 *
 * @param {'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'} variant
 * @param {'sm' | 'md' | 'lg'} size
 * @param {boolean} loading
 * @param {boolean} fullWidth
 * @param {React.ReactNode} icon - optional prefix icon
 * @param {React.ReactNode} iconRight - optional suffix icon
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  icon,
  iconRight,
  className = '',
  type = 'button',
  ...props
}) {
  const baseStyles =
    'inline-flex items-center justify-center font-heading font-semibold transition-all duration-200 select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-bitnox-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bitnox-bg disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none active:scale-[0.98]';

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 rounded-md gap-1.5',
    md: 'text-sm px-4 py-2 rounded-lg gap-2',
    lg: 'text-base px-6 py-3 rounded-xl gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-bitnox-primary text-bitnox-foreground hover:bg-bitnox-primary-hover shadow-glow-primary active:bg-bitnox-primary-active',
    secondary:
      'bg-bitnox-accent text-bitnox-primary border border-bitnox-border hover:bg-bitnox-accent/90 hover:border-bitnox-border-hover',
    outline:
      'bg-transparent text-bitnox-primary border border-bitnox-border hover:bg-bitnox-primary/10 hover:border-bitnox-primary',
    ghost:
      'bg-transparent text-slate-300 hover:text-white hover:bg-bitnox-surface-elevated/70',
    danger:
      'bg-status-sleeping text-white hover:bg-red-600 shadow-glow-sleeping',
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${variantStyles[variant] || variantStyles.primary} ${widthStyle} ${className}`}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : (
        icon && <span className="inline-flex shrink-0">{icon}</span>
      )}
      <span>{children}</span>
      {!loading && iconRight && (
        <span className="inline-flex shrink-0">{iconRight}</span>
      )}
    </button>
  );
}
