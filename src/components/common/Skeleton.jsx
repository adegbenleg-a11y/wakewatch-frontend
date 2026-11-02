import React from 'react';

/**
 * Reusable Bitnox Skeleton Loader Component
 *
 * @param {'text' | 'circular' | 'rectangular' | 'card' | 'tableRow'} variant
 * @param {string} className
 * @param {number} count - number of repeated skeleton lines
 */
export default function Skeleton({
  variant = 'rectangular',
  className = '',
  count = 1,
  width,
  height,
}) {
  const baseStyles = 'bg-slate-800/70 animate-pulse border border-slate-700/30';

  const variantStyles = {
    text: 'h-4 rounded-md w-full',
    circular: 'rounded-full shrink-0',
    rectangular: 'rounded-xl',
    card: 'rounded-2xl p-6 min-h-[140px]',
    tableRow: 'h-12 rounded-lg w-full',
  };

  const inlineStyles = {
    ...(width ? { width } : {}),
    ...(height ? { height } : {}),
  };

  if (count > 1) {
    return (
      <div className="space-y-2.5 w-full">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            style={inlineStyles}
            className={`${baseStyles} ${variantStyles[variant] || ''} ${className}`}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      style={inlineStyles}
      className={`${baseStyles} ${variantStyles[variant] || ''} ${className}`}
    />
  );
}
