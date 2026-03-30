type BadgeVariant = 'primary' | 'secondary' | 'tertiary' | 'error' | 'success' | 'neutral'

interface BadgeProps {
  label: string
  variant?: BadgeVariant
  uppercase?: boolean
  className?: string
}

const variantStyles: Record<BadgeVariant, string> = {
  primary:
    'bg-primary-100 text-primary-800 border border-primary-200 dark:bg-primary-900/60 dark:text-primary-200 dark:border-primary-700/50',
  secondary:
    'bg-secondary-container text-on-secondary-container border border-secondary/20 dark:bg-secondary-container dark:text-on-secondary-container dark:border-secondary/30',
  tertiary:
    'bg-tertiary-container text-on-tertiary-container border border-tertiary/20 dark:bg-tertiary-container dark:text-on-tertiary-container dark:border-tertiary/30',
  error:
    'bg-error-container text-on-error-container border border-error/20 dark:bg-error-container dark:text-on-error-container dark:border-error/30',
  success:
    'bg-success-container text-on-success-container border border-success/20 dark:bg-success-container dark:text-on-success-container dark:border-success/30',
  neutral:
    'bg-surface-container-high text-on-surface-variant border border-outline-variant dark:bg-surface-container-high dark:text-on-surface-variant dark:border-outline-variant',
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
        inline-flex items-center py-1 px-3 rounded-full text-xs font-bold tracking-widest
        ${uppercase ? 'uppercase' : ''}
        ${variantStyles[variant]}
        ${className}
      `}
    >
      {label}
    </span>
  )
}
