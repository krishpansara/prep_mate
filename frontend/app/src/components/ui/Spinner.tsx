type SpinnerSize = 'sm' | 'md' | 'lg' | 'page'

interface SpinnerProps {
  size?: SpinnerSize
  label?: string
}

const sizeStyles: Record<SpinnerSize, string> = {
  sm: 'w-4 h-4 border-2',
  md: 'w-8 h-8 border-2',
  lg: 'w-12 h-12 border-[3px]',
  page: 'w-16 h-16 border-4',
}

export default function Spinner({ size = 'md', label = 'Loading...' }: SpinnerProps) {
  const isPage = size === 'page'

  const spinner = (
    <div
      role="status"
      aria-label={label}
      className={`
        inline-block rounded-full
        border-surface-container-high border-t-primary
        animate-spin
        ${sizeStyles[size]}
      `}
    />
  )

  if (isPage) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm z-50 gap-4">
        {spinner}
        <p className="text-sm text-on-surface-variant font-medium animate-pulse">{label}</p>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center p-4">
      {spinner}
      <span className="sr-only">{label}</span>
    </div>
  )
}
