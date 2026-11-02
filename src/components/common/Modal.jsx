import React, { useEffect } from 'react';
import { X } from 'lucide-react';

/**
 * Reusable Bitnox Modal Component
 *
 * @param {boolean} isOpen
 * @param {() => void} onClose
 * @param {string} title
 * @param {string} description
 * @param {React.ReactNode} footer
 * @param {'sm' | 'md' | 'lg' | 'xl'} size
 */
export default function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  size = 'md',
}) {
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

  if (!isOpen) return null;

  const sizeStyles = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-200 animate-fadeIn"
      />

      {/* Dialog Window */}
      <div
        className={`
          relative w-full ${sizeStyles[size] || sizeStyles.md}
          bg-bitnox-surface border border-bitnox-border rounded-2xl shadow-glass-card
          p-6 sm:p-7 text-left z-10 transition-all transform duration-200
        `}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-bitnox-border/60">
          <div>
            {title && (
              <h3 className="font-heading font-bold text-lg sm:text-xl text-white tracking-tight">
                {title}
              </h3>
            )}
            {description && (
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                {description}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-bitnox-surface-elevated transition-colors ml-4"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="py-4 text-sm text-slate-300 leading-relaxed max-h-[70vh] overflow-y-auto">
          {children}
        </div>

        {/* Footer Actions */}
        {footer && (
          <div className="pt-4 border-t border-bitnox-border/60 flex items-center justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
