/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bitnox: {
          primary: '#05e4fc',
          'primary-hover': '#38edfd',
          'primary-active': '#02b5ca',
          foreground: '#03181d', // Contrast dark text on primary button
          bg: '#0a0a0a',        // Main deep dark page background
          surface: '#07141b',   // Brand surface container
          'surface-elevated': '#0b1d27',
          text: '#d4e4f0',      // High-readability foreground text
          accent: '#0d2b33',    // Dark cyan accent container
          'accent-foreground': '#05e4fc',
          muted: '#101a1e',
          'muted-foreground': '#94a3b8',
          border: 'rgba(5, 228, 252, 0.15)',
          'border-hover': 'rgba(5, 228, 252, 0.35)',
          'border-focus': 'rgba(5, 228, 252, 0.6)',
          input: 'rgba(5, 228, 252, 0.45)',
          ring: '#05e4fc',
          glass: 'rgba(0, 45, 67, 0.3)',
        },
        status: {
          awake: {
            DEFAULT: '#10b981',
            light: '#34d399',
            bg: 'rgba(16, 185, 129, 0.12)',
            border: 'rgba(16, 185, 129, 0.35)',
            glow: 'rgba(16, 185, 129, 0.25)',
          },
          drowsy: {
            DEFAULT: '#f59e0b',
            light: '#fbbf24',
            bg: 'rgba(245, 158, 11, 0.12)',
            border: 'rgba(245, 158, 11, 0.35)',
            glow: 'rgba(245, 158, 11, 0.25)',
          },
          sleeping: {
            DEFAULT: '#ef4444',
            light: '#f87171',
            bg: 'rgba(239, 68, 68, 0.15)',
            border: 'rgba(239, 68, 68, 0.45)',
            glow: 'rgba(239, 68, 68, 0.35)',
          },
        },
      },
      fontFamily: {
        heading: ['Sora', 'system-ui', '-apple-system', 'sans-serif'],
        sans: ['Geist', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        mono: ['"Geist Mono"', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        sm: '0.375rem',  /* 6px */
        DEFAULT: '0.5rem', /* 8px */
        md: '0.5rem',    /* 8px */
        lg: '0.625rem',  /* 10px - Bitnox standard */
        xl: '0.875rem',  /* 14px */
        '2xl': '1.125rem',/* 18px */
      },
      boxShadow: {
        'glow-primary': '0 0 25px -4px rgba(5, 228, 252, 0.35)',
        'glow-primary-lg': '0 0 35px -2px rgba(5, 228, 252, 0.5)',
        'glass-card': '0 12px 40px -12px rgba(0, 0, 0, 0.75)',
        'glow-awake': '0 0 25px -4px rgba(16, 185, 129, 0.35)',
        'glow-drowsy': '0 0 25px -4px rgba(245, 158, 11, 0.35)',
        'glow-sleeping': '0 0 25px -4px rgba(239, 68, 68, 0.4)',
      },
      backdropBlur: {
        glass: '12px',
      },
    },
  },
  plugins: [],
}
