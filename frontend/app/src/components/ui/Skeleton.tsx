type SkeletonVariant = 'text' | 'card' | 'avatar' | 'title' | 'stat-card'

interface SkeletonProps {
  variant?: SkeletonVariant
  lines?: number
  className?: string
}

function SkeletonBase({ className = '' }: { className?: string }) {
  return (
    <div
      className={`bg-surface-container-high rounded-lg animate-pulse ${className}`}
      aria-hidden="true"
    />
  )
}

export default function Skeleton({ variant = 'text', lines = 3, className = '' }: SkeletonProps) {
  if (variant === 'avatar') {
    return <SkeletonBase className={`w-10 h-10 rounded-full ${className}`} />
  }

  if (variant === 'title') {
    return <SkeletonBase className={`h-8 w-3/4 ${className}`} />
  }

  if (variant === 'card') {
    return (
      <div className={`bg-surface-container-lowest rounded-2xl p-8 ${className}`} aria-hidden="true">
        <SkeletonBase className="w-12 h-12 rounded-xl mb-6" />
        <SkeletonBase className="h-6 w-2/3 mb-3" />
        <SkeletonBase className="h-4 w-full mb-2" />
        <SkeletonBase className="h-4 w-5/6 mb-2" />
        <SkeletonBase className="h-4 w-3/4" />
      </div>
    )
  }

  if (variant === 'stat-card') {
    return (
      <div className={`bg-surface-container-lowest rounded-2xl p-6 ${className}`} aria-hidden="true">
        <div className="flex justify-between items-start mb-6">
          <div>
            <SkeletonBase className="h-4 w-24 mb-2" />
            <SkeletonBase className="h-8 w-16" />
          </div>
          <SkeletonBase className="w-12 h-12 rounded-full" />
        </div>
        <SkeletonBase className="h-2 w-full rounded-full" />
      </div>
    )
  }

  // text (default)
  return (
    <div className={`space-y-3 ${className}`} aria-hidden="true">
      {Array.from({ length: lines }).map((_, i) => (
        <SkeletonBase
          key={i}
          className={`h-4 ${i === lines - 1 ? 'w-3/4' : 'w-full'}`}
        />
      ))}
    </div>
  )
}
