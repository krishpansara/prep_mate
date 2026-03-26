import type { ReactNode } from 'react'

type CardVariant = 'default' | 'elevated' | 'dark' | 'surface-low'

interface CardProps {
  children: ReactNode
  variant?: CardVariant
  className?: string
  hover?: boolean
  onClick?: () => void
}

const variantStyles: Record<CardVariant, string> = {
  default: 'bg-surface-container-lowest border border-outline-variant/10',
  elevated: 'bg-surface-container-lowest shadow-sm',
  dark: 'bg-inverse-surface text-on-primary relative overflow-hidden',
  'surface-low': 'bg-surface-container-low',
}

export default function Card({
  children,
  variant = 'default',
  className = '',
  hover = false,
  onClick,
}: CardProps) {
  const hoverStyles = hover
    ? 'transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer'
    : ''

  return (
    <div
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
      className={`rounded-2xl p-8 ${variantStyles[variant]} ${hoverStyles} ${className}`}
    >
      {children}
    </div>
  )
}
