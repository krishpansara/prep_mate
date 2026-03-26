import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Primary
        primary: '#0053db',
        'primary-dim': '#0048c1',
        'primary-container': '#dbe1ff',
        'primary-fixed': '#dbe1ff',
        'primary-fixed-dim': '#c7d3ff',
        'on-primary': '#f8f7ff',
        'on-primary-container': '#0048bf',
        'on-primary-fixed': '#003798',
        'on-primary-fixed-variant': '#0050d4',
        'inverse-primary': '#618bff',
        'surface-tint': '#0053db',

        // Secondary
        secondary: '#006d4a',
        'secondary-dim': '#005f40',
        'secondary-container': '#6ffbbe',
        'secondary-fixed': '#6ffbbe',
        'secondary-fixed-dim': '#5fedb0',
        'on-secondary': '#e6ffee',
        'on-secondary-container': '#005e3f',
        'on-secondary-fixed': '#004930',
        'on-secondary-fixed-variant': '#006947',

        // Tertiary
        tertiary: '#5c5f61',
        'tertiary-dim': '#505455',
        'tertiary-container': '#f2f4f6',
        'tertiary-fixed': '#f2f4f6',
        'tertiary-fixed-dim': '#e3e5e7',
        'on-tertiary': '#f7f9fb',
        'on-tertiary-container': '#595c5e',
        'on-tertiary-fixed': '#474a4c',
        'on-tertiary-fixed-variant': '#636768',

        // Error
        error: '#9f403d',
        'error-dim': '#4e0309',
        'error-container': '#fe8983',
        'on-error': '#fff7f6',
        'on-error-container': '#752121',

        // Surface hierarchy
        background: '#f6fafe',
        'on-background': '#26343d',
        surface: '#f6fafe',
        'surface-dim': '#cadde9',
        'surface-bright': '#f6fafe',
        'surface-variant': '#d5e5ef',
        'surface-tint-color': '#0053db',
        'surface-container-lowest': '#ffffff',
        'surface-container-low': '#eef4fa',
        'surface-container': '#e5eff7',
        'surface-container-high': '#ddeaf3',
        'surface-container-highest': '#d5e5ef',
        'on-surface': '#26343d',
        'on-surface-variant': '#52616a',
        'inverse-surface': '#0a0f12',
        'inverse-on-surface': '#999da1',

        // Outline
        outline: '#6e7d86',
        'outline-variant': '#a4b4be',
      },
      fontFamily: {
        headline: ['Manrope', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        label: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.125rem',
        sm: '0.125rem',
        md: '0.375rem',
        lg: '0.25rem',
        xl: '0.5rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        full: '9999px',
      },
    },
  },
  plugins: [],
}

export default config
