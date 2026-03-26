import type { ReactNode, ButtonHTMLAttributes } from 'react'
import Icon from './Icon'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  icon?: string
  iconPosition?: 'left' | 'right'
  children: ReactNode
  fullWidth?: boolean
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-br from-primary to-primary-dim text-white shadow-md hover:shadow-primary/25 hover:shadow-lg active:scale-95',
  secondary:
    'bg-surface-container-lowest text-primary border border-outline-variant/20 hover:bg-surface-container-low active:scale-95',
  ghost:
    'text-on-surface-variant hover:bg-surface-container hover:text-on-surface active:scale-95',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm rounded-md',
  md: 'px-6 py-3 text-base rounded-md',
  lg: 'px-8 py-4 text-lg rounded-md',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'right',
  fullWidth = false,
  children,
  className = '',
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2 font-semibold
        transition-all duration-200 focus-visible:outline-none
        focus-visible:ring-2 focus-visible:ring-primary/50
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...rest}
    >
      {icon && iconPosition === 'left' && <Icon name={icon} size="sm" />}
      {children}
      {icon && iconPosition === 'right' && <Icon name={icon} size="sm" />}
    </button>
  )
}
