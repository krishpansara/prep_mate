type BadgeVariant = 'primary' | 'secondary' | 'tertiary' | 'error' | 'neutral'

interface BadgeProps {
  label: string
  variant?: BadgeVariant
  uppercase?: boolean
  className?: string
}

const variantStyles: Record<BadgeVariant, string> = {
  primary: 'bg-primary-container text-on-primary-container',
  secondary: 'bg-secondary-container text-on-secondary-container',
  tertiary: 'bg-tertiary-container text-on-tertiary-container',
  error: 'bg-error-container text-on-error-container',
  neutral: 'bg-surface-container-high text-on-surface-variant',
}

export default function Badge({
  label,
  variant = 'neutral',
  uppercase = false,
  className = '',
}: BadgeProps) {
  return (
    <span
      className={`
        inline-block py-1 px-3 rounded-full text-xs font-bold tracking-widest
        ${uppercase ? 'uppercase' : ''}
        ${variantStyles[variant]}
        ${className}
      `}
    >
      {label}
    </span>
  )
}
