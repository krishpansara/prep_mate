import type { ReactNode } from 'react'
import Icon from './Icon'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'teal'
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'icon'

interface ButtonProps {
  children?: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  icon?: string
  iconPosition?: 'left' | 'right'
  loading?: boolean
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
  className?: string
}

const base = [
  'inline-flex items-center justify-center gap-2',
  'rounded-xl font-semibold tracking-wide',
  'transition-all duration-200',
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1',
  'active:scale-[0.97] select-none',
  'disabled:opacity-50 disabled:pointer-events-none',
].join(' ')

const variants: Record<ButtonVariant, string> = {
  primary: [
    'bg-primary-600 hover:bg-primary-500 text-white',
    'shadow-md shadow-primary-500/25 hover:shadow-lg hover:shadow-primary-500/40',
    'focus-visible:ring-primary-500',
    // Dark: purple
    'dark:bg-primary-500 dark:hover:bg-primary-400 dark:text-on-surface',
    'dark:shadow-[0_4px_20px_rgba(187,134,252,0.4)] dark:hover:shadow-[0_6px_28px_rgba(187,134,252,0.6)]',
    'dark:focus-visible:ring-primary-400',
  ].join(' '),
  secondary: [
    'bg-white hover:bg-slate-50 text-primary-700',
    'border border-slate-200 hover:border-primary-300',
    'shadow-sm hover:shadow-md hover:shadow-primary-100',
    // Dark: charcoal with purple border
    'dark:bg-[#2C2C2C] dark:text-primary-300',
    'dark:border dark:border-white/[0.08] dark:hover:border-primary-400/50',
    'dark:hover:bg-[#383838]',
    'dark:focus-visible:ring-primary-400',
  ].join(' '),
  ghost: [
    'text-on-surface-variant hover:text-primary-700 hover:bg-primary-50',
    'dark:text-on-surface-variant dark:hover:text-primary-300 dark:hover:bg-surface-hover',
    'focus-visible:ring-primary-500',
  ].join(' '),
  danger: [
    'bg-error hover:bg-red-600 text-white',
    'shadow-md shadow-error/25 hover:shadow-lg hover:shadow-error/40',
    'dark:bg-error dark:hover:bg-red-500',
    'dark:shadow-[0_4px_20px_rgba(207,98,98,0.35)]',
    'focus-visible:ring-red-500',
  ].join(' '),
  teal: [
    'bg-accent-500 hover:bg-accent-400 text-on-surface',
    'shadow-md shadow-accent-500/25 hover:shadow-lg hover:shadow-accent-500/45',
    'dark:shadow-[0_4px_20px_rgba(3,218,197,0.4)] dark:hover:shadow-[0_6px_28px_rgba(3,218,197,0.6)]',
    'focus-visible:ring-accent-500',
  ].join(' '),
}

const sizes: Record<ButtonSize, string> = {
  xs:   'text-xs px-3 py-1.5',
  sm:   'text-sm px-4 py-2',
  md:   'text-sm px-5 py-2.5',
  lg:   'text-base px-7 py-3.5',
  xl:   'text-lg px-10 py-4',
  icon: 'p-2.5',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  loading,
  disabled,
  type = 'button',
  onClick,
  className = '',
}: ButtonProps) {
  const classes = [base, variants[variant], sizes[size], className].filter(Boolean).join(' ')

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={classes}
      aria-busy={loading}
    >
      {loading && <Icon name="progress_activity" size="sm" className="animate-spin" />}
      {!loading && icon && iconPosition === 'left' && <Icon name={icon} size="sm" />}
      {children && <span>{children}</span>}
      {!loading && icon && iconPosition === 'right' && <Icon name={icon} size="sm" />}
    </button>
  )
}
