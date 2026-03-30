import type { ReactNode } from 'react'

type CardVariant = 'default' | 'elevated' | 'glass' | 'ghost' | 'surface-low' | 'dark'
type CardPadding = 'none' | 'sm' | 'md' | 'lg' | 'xl'

interface CardProps {
  children: ReactNode
  variant?: CardVariant
  hover?: boolean
  padding?: CardPadding
  className?: string
  onClick?: () => void
  as?: React.ElementType
}

const variantClasses: Record<CardVariant, string> = {
  default: [
    'bg-white border border-slate-200 shadow-card-light',
    'dark:bg-[#252525] dark:border dark:border-white/[0.06] dark:shadow-card-dark',
  ].join(' '),
  elevated: [
    'bg-white border border-slate-200 shadow-[0_4px_16px_rgba(15,23,42,0.1)]',
    'dark:bg-[#2D2D2D] dark:border dark:border-white/[0.06] dark:shadow-card-dark',
  ].join(' '),
  glass: [
    'bg-white/80 backdrop-blur-xl border border-slate-200/80 shadow-sm',
    'dark:bg-[#1E1E1E]/80 dark:border-white/[0.06] dark:shadow-card-dark',
  ].join(' '),
  ghost: 'bg-transparent border border-slate-200 dark:border-white/[0.06]',
  'surface-low': [
    'bg-slate-50 border border-slate-200 shadow-sm',
    'dark:bg-[#1E1E1E] dark:border dark:border-white/[0.06] dark:shadow-card-dark',
  ].join(' '),
  dark: [
    'bg-slate-900 border border-slate-700 text-white shadow-card-light',
    'dark:bg-[#1A1A2E] dark:border dark:border-white/[0.08] dark:shadow-card-dark',
  ].join(' '),
}

const paddingClasses: Record<CardPadding, string> = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
  xl: 'p-10',
}

const hoverClasses = [
  'hover:border-primary-200 hover:-translate-y-0.5',
  'hover:shadow-[0_6px_24px_-4px_rgba(37,99,235,0.12)]',
  'dark:hover:border-primary-400/40',
  'dark:hover:shadow-[0_8px_30px_-4px_rgba(187,134,252,0.25)]',
  'dark:hover:-translate-y-1',
  'cursor-pointer',
].join(' ')

export default function Card({
  children,
  variant = 'default',
  hover = false,
  padding = 'md',
  className = '',
  onClick,
  as: Tag = 'div',
}: CardProps) {
  const classes = [
    'rounded-2xl overflow-hidden transition-all duration-300',
    variantClasses[variant],
    paddingClasses[padding],
    hover ? hoverClasses : '',
    className,
  ].filter(Boolean).join(' ')

  return (
    <Tag onClick={onClick} className={classes}>
      {children}
    </Tag>
  )
}
