import React from 'react';

/**
 * Reusable Bitnox Card Component
 *
 * @param {'glass' | 'solid' | 'elevated' | 'outlined'} variant
 * @param {'none' | 'sm' | 'md' | 'lg'} padding
 * @param {boolean} interactive - whether to enable hover scale & border glow
 */
export default function Card({
  children,
  variant = 'glass',
  padding = 'md',
  interactive = false,
  className = '',
  ...props
}) {
  const baseStyles = 'rounded-xl transition-all duration-200 overflow-hidden relative';

  const variantStyles = {
    glass:
      'bg-[rgba(7,20,27,0.7)] backdrop-blur-md border border-bitnox-border shadow-glass-card',
    solid:
      'bg-bitnox-surface border border-bitnox-border shadow-glass-card',
    elevated:
      'bg-bitnox-surface-elevated border border-bitnox-border-hover shadow-glass-card',
    outlined:
      'bg-transparent border border-bitnox-border',
  };

  const interactiveStyles = interactive
    ? 'hover:border-bitnox-border-hover hover:bg-[rgba(11,29,39,0.85)] hover:-translate-y-0.5 cursor-pointer'
    : '';

  const paddingStyles = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      className={`${baseStyles} ${variantStyles[variant] || variantStyles.glass} ${interactiveStyles} ${paddingStyles[padding]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

Card.Header = function CardHeader({ children, className = '', ...props }) {
  return (
    <div className={`mb-4 flex flex-col space-y-1.5 ${className}`} {...props}>
      {children}
    </div>
  );
};

Card.Title = function CardTitle({ children, className = '', ...props }) {
  return (
    <h3
      className={`font-heading font-bold text-lg text-white tracking-tight flex items-center gap-2 ${className}`}
      {...props}
    >
      {children}
    </h3>
  );
};

Card.Description = function CardDescription({ children, className = '', ...props }) {
  return (
    <p className={`text-xs sm:text-sm text-slate-400 leading-relaxed ${className}`} {...props}>
      {children}
    </p>
  );
};

Card.Content = function CardContent({ children, className = '', ...props }) {
  return <div className={`space-y-4 ${className}`} {...props}>{children}</div>;
};

Card.Footer = function CardFooter({ children, className = '', ...props }) {
  return (
    <div
      className={`mt-6 pt-4 border-t border-bitnox-border/60 flex items-center justify-between text-xs text-slate-400 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
