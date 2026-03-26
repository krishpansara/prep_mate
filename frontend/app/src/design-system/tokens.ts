// Design tokens mirroring Tailwind config for use in TypeScript logic
export const colors = {
  primary: '#0053db',
  primaryDim: '#0048c1',
  primaryContainer: '#dbe1ff',
  onPrimary: '#f8f7ff',
  onPrimaryContainer: '#0048bf',
  inversePrimary: '#618bff',

  secondary: '#006d4a',
  secondaryContainer: '#6ffbbe',
  secondaryFixedDim: '#5fedb0',
  onSecondary: '#e6ffee',
  onSecondaryContainer: '#005e3f',

  tertiary: '#5c5f61',
  tertiaryContainer: '#f2f4f6',
  onTertiary: '#f7f9fb',

  error: '#9f403d',
  errorContainer: '#fe8983',
  onError: '#fff7f6',
  onErrorContainer: '#752121',

  background: '#f6fafe',
  surface: '#f6fafe',
  surfaceDim: '#cadde9',
  surfaceContainerLowest: '#ffffff',
  surfaceContainerLow: '#eef4fa',
  surfaceContainer: '#e5eff7',
  surfaceContainerHigh: '#ddeaf3',
  surfaceContainerHighest: '#d5e5ef',
  onSurface: '#26343d',
  onSurfaceVariant: '#52616a',
  inverseSurface: '#0a0f12',
  inverseOnSurface: '#999da1',

  outline: '#6e7d86',
  outlineVariant: '#a4b4be',
} as const

export const fonts = {
  headline: 'Manrope, sans-serif',
  body: 'Inter, sans-serif',
} as const

export type ColorToken = keyof typeof colors
