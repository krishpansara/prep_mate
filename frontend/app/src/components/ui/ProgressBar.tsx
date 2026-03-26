interface ProgressBarProps {
  value: number
  max?: number
  showLabel?: boolean
  label?: string
  size?: 'sm' | 'md'
  className?: string
}

export default function ProgressBar({
  value,
  max = 100,
  showLabel = true,
  label = 'Progress',
  size = 'md',
  className = '',
}: ProgressBarProps) {
  const percent = Math.min(100, Math.max(0, (value / max) * 100))
  const heightClass = size === 'sm' ? 'h-1.5' : 'h-2'

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between text-sm mb-2 font-medium text-on-surface">
          <span>{label}</span>
          <span>{Math.round(percent)}%</span>
        </div>
      )}
      <div
        className={`w-full ${heightClass} bg-surface-container-high rounded-full overflow-hidden`}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label}
      >
        <div
          className="h-full bg-gradient-to-r from-primary to-primary-dim rounded-full transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}
