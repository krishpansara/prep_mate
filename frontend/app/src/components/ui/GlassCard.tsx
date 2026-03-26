import type { ReactNode } from 'react'

interface GlassCardProps {
  children: ReactNode
  className?: string
}

export default function GlassCard({ children, className = '' }: GlassCardProps) {
  return (
    <div
      className={`
        bg-surface-container-lowest/80 backdrop-blur-xl
        rounded-xl shadow-sm border border-white/20
        ${className}
      `}
    >
      {children}
    </div>
  )
}
