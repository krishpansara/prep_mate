interface CircularProgressProps {
  value: number
  max?: number
  size?: number
  strokeWidth?: number
  centerLabel?: string
  centerSubLabel?: string
}

export default function CircularProgress({
  value,
  max = 100,
  size = 128,
  strokeWidth = 8,
  centerLabel,
  centerSubLabel,
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const percent = Math.min(1, Math.max(0, value / max))
  const offset = circumference * (1 - percent)

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
        aria-label={`Progress: ${Math.round(percent * 100)}%`}
        role="img"
      >
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-surface-variant"
        />
        {/* Progress */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="text-secondary transition-all duration-700"
        />
      </svg>

      {/* Center content */}
      {(centerLabel ?? centerSubLabel) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {centerLabel && (
            <span className="text-4xl font-black font-headline text-on-surface leading-none">
              {centerLabel}
            </span>
          )}
          {centerSubLabel && (
            <span className="text-[10px] uppercase tracking-widest font-bold text-secondary mt-0.5">
              {centerSubLabel}
            </span>
          )}
        </div>
      )}
    </div>
  )
}
