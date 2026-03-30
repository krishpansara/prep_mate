import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        /* ── Core surfaces ──────────────────────────────────── */
        background:    'rgb(var(--color-background) / <alpha-value>)',
        surface:       'rgb(var(--color-surface) / <alpha-value>)',
        'surface-hover': 'rgb(var(--color-surface-hover) / <alpha-value>)',
        'surface-dim': 'rgb(var(--color-surface-dim) / <alpha-value>)',

        /* ── Surface container depth scale ─────────────────── */
        'surface-container-lowest':  'rgb(var(--color-surface-container-lowest) / <alpha-value>)',
        'surface-container-low':     'rgb(var(--color-surface-container-low) / <alpha-value>)',
        'surface-container':         'rgb(var(--color-surface-container) / <alpha-value>)',
        'surface-container-high':    'rgb(var(--color-surface-container-high) / <alpha-value>)',
        'surface-container-highest': 'rgb(var(--color-surface-container-highest) / <alpha-value>)',
        'surface-variant':           'rgb(var(--color-surface-container-high) / <alpha-value>)',

        /* ── Text ───────────────────────────────────────────── */
        'on-surface':         'rgb(var(--color-on-surface) / <alpha-value>)',
        'on-surface-variant': 'rgb(var(--color-on-surface-variant) / <alpha-value>)',

        /* ── Borders ────────────────────────────────────────── */
        outline:         'rgb(var(--color-outline) / <alpha-value>)',
        'outline-variant': 'rgb(var(--color-outline-variant) / <alpha-value>)',

        /* ── Primary — Blue ─────────────────────────────────── */
        primary: {
          DEFAULT: 'rgb(var(--color-primary-500) / <alpha-value>)',
          50:  'rgb(var(--color-primary-50) / <alpha-value>)',
          100: 'rgb(var(--color-primary-100) / <alpha-value>)',
          200: 'rgb(var(--color-primary-200) / <alpha-value>)',
          300: 'rgb(var(--color-primary-300) / <alpha-value>)',
          400: 'rgb(var(--color-primary-400) / <alpha-value>)',
          500: 'rgb(var(--color-primary-500) / <alpha-value>)',
          600: 'rgb(var(--color-primary-600) / <alpha-value>)',
          700: 'rgb(var(--color-primary-700) / <alpha-value>)',
          800: 'rgb(var(--color-primary-800) / <alpha-value>)',
          900: 'rgb(var(--color-primary-900) / <alpha-value>)',
          950: 'rgb(var(--color-primary-950) / <alpha-value>)',
        },
        'primary-dim':      'rgb(var(--color-primary-700) / <alpha-value>)',
        'primary-container': 'rgb(var(--color-primary-container) / <alpha-value>)',
        'on-primary':        '#ffffff',
        'on-primary-container': 'rgb(var(--color-on-primary-container) / <alpha-value>)',

        /* ── Accent — Violet ─────────────────────────────────── */
        accent: {
          DEFAULT: 'rgb(var(--color-accent-500) / <alpha-value>)',
          50:  'rgb(var(--color-accent-50) / <alpha-value>)',
          100: 'rgb(var(--color-accent-100) / <alpha-value>)',
          200: 'rgb(var(--color-accent-200) / <alpha-value>)',
          300: 'rgb(var(--color-accent-300) / <alpha-value>)',
          400: 'rgb(var(--color-accent-400) / <alpha-value>)',
          500: 'rgb(var(--color-accent-500) / <alpha-value>)',
          600: 'rgb(var(--color-accent-600) / <alpha-value>)',
          700: 'rgb(var(--color-accent-700) / <alpha-value>)',
          800: 'rgb(var(--color-accent-800) / <alpha-value>)',
          900: 'rgb(var(--color-accent-900) / <alpha-value>)',
          950: 'rgb(var(--color-accent-950) / <alpha-value>)',
        },

        /* ── Secondary — Indigo (now fully defined) ──────────── */
        secondary: {
          DEFAULT: 'rgb(var(--color-secondary) / <alpha-value>)',
        },
        'secondary-container':    'rgb(var(--color-secondary-container) / <alpha-value>)',
        'on-secondary':           'rgb(var(--color-on-secondary) / <alpha-value>)',
        'on-secondary-container': 'rgb(var(--color-on-secondary-container) / <alpha-value>)',

        /* ── Tertiary — Fuchsia (now fully defined) ──────────── */
        tertiary: {
          DEFAULT: 'rgb(var(--color-tertiary) / <alpha-value>)',
        },
        'tertiary-container':    'rgb(var(--color-tertiary-container) / <alpha-value>)',
        'on-tertiary':           'rgb(var(--color-on-tertiary) / <alpha-value>)',
        'on-tertiary-container': 'rgb(var(--color-on-tertiary-container) / <alpha-value>)',

        /* ── Semantic status ─────────────────────────────────── */
        success: {
          DEFAULT: 'rgb(var(--color-success) / <alpha-value>)',
        },
        'success-container':    'rgb(var(--color-success-container) / <alpha-value>)',
        'on-success-container': 'rgb(var(--color-on-success-container) / <alpha-value>)',
        warning: 'rgb(var(--color-warning) / <alpha-value>)',
        error: {
          DEFAULT: 'rgb(var(--color-error) / <alpha-value>)',
        },
        'error-container':    'rgb(var(--color-error-container) / <alpha-value>)',
        'on-error-container': 'rgb(var(--color-on-error-container) / <alpha-value>)',
      },

      fontFamily: {
        headline: ['Manrope', 'sans-serif'],
        body:     ['Inter', 'sans-serif'],
        label:    ['Inter', 'sans-serif'],
      },

      borderRadius: {
        xl:  '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },

      boxShadow: {
        'glow-primary': '0 0 20px rgba(59, 130, 246, 0.35)',
        'glow-primary-dark': '0 0 20px rgba(187, 134, 252, 0.45)',
        'glow-accent':  '0 0 20px rgba(168, 85, 247, 0.35)',
        'glow-teal':    '0 0 20px rgba(3, 218, 197, 0.45)',
        'glow-success': '0 0 20px rgba(16, 185, 129, 0.35)',
        'card-light': '0 1px 3px rgba(15,23,42,0.06), 0 1px 2px rgba(15,23,42,0.04)',
        'card-dark':  '0 4px 24px -4px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.03)',
      },

      animation: {
        'fade-in':    'fadeIn 0.5s ease-out forwards',
        'slide-up':   'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'float':      'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'blob':       'blob 7s infinite',
        'spin-slow':  'spin 20s linear infinite',
      },

      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
        blob: {
          '0%':   { transform: 'translate(0px, 0px) scale(1)' },
          '33%':  { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%':  { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
      },

      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow': 'conic-gradient(from 180deg at 50% 50%, #3b82f6 0deg, #a855f7 180deg, #e92a67 360deg)',
      },
    },
  },
  plugins: [],
}

export default config
