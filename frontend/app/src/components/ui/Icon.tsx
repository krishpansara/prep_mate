interface IconProps {
  name: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  filled?: boolean
  className?: string
  'aria-hidden'?: boolean
}

const sizeMap: Record<NonNullable<IconProps['size']>, string> = {
  xs: 'text-base',
  sm: 'text-xl',
  md: 'text-2xl',
  lg: 'text-3xl',
  xl: 'text-4xl',
}

export default function Icon({
  name,
  size = 'md',
  filled = false,
  className = '',
  'aria-hidden': ariaHidden = true,
}: IconProps) {
  return (
    <span
      className={`material-symbols-outlined select-none ${sizeMap[size]} ${className}`}
      aria-hidden={ariaHidden}
      style={{
        fontVariationSettings: `'FILL' ${filled ? 1 : 0}, 'wght' 400, 'GRAD' 0, 'opsz' 24`,
      }}
    >
      {name}
    </span>
  )
}
