import Button from '@components/ui/Button'
import Badge from '@components/ui/Badge'
import GlassCard from '@components/ui/GlassCard'

interface HeroSectionProps {
  badge?: string
  heading?: string
  headingAccent?: string
  subheading?: string
  primaryCTA?: string
  secondaryCTA?: string
  onPrimaryClick?: () => void
  onSecondaryClick?: () => void
  imageSrc?: string
  imageAlt?: string
  statusText?: string
}

export default function HeroSection({
  badge = 'PrepMate v2.0',
  heading = 'Master Interviews',
  headingAccent = 'Without Distractions',
  subheading = 'A focused, content-first learning experience for developers who value clarity over clutter. Prepare with precision, not noise.',
  primaryCTA = 'Start Learning',
  secondaryCTA = 'View Syllabus',
  onPrimaryClick,
  onSecondaryClick,
  imageSrc = 'https://images.unsplash.com/photo-1537432376769-00f5c2f4c8d2?w=400&q=60',
  imageAlt = 'Minimalist developer workspace',
  statusText = 'Deep Work Session: Active',
}: HeroSectionProps) {
  return (
    <section className="relative pt-24 pb-32 px-6 lg:px-8 overflow-hidden">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Text content */}
        <div className="lg:col-span-7 space-y-8">
          <Badge label={badge} variant="secondary" uppercase />

          <h1 className="text-6xl md:text-8xl font-extrabold leading-[1.05] tracking-tighter text-on-surface font-headline">
            {heading}
            <br />
            <span className="text-primary italic">{headingAccent}</span>
          </h1>

          <p className="text-xl md:text-2xl text-on-surface-variant max-w-xl leading-relaxed font-body">
            {subheading}
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Button variant="primary" size="lg" onClick={onPrimaryClick}>
              {primaryCTA}
            </Button>
            <Button variant="secondary" size="lg" onClick={onSecondaryClick}>
              {secondaryCTA}
            </Button>
          </div>
        </div>

        {/* Image column */}
        <div className="lg:col-span-5 relative">
          {/* Decorative blur blob */}
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />

          <div className="aspect-square bg-surface-container-high rounded-[2rem] overflow-hidden rotate-3 shadow-2xl relative z-10">
            <img
              src={imageSrc}
              alt={imageAlt}
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />

            {/* Glassmorphic status overlay */}
            <GlassCard className="absolute bottom-6 left-6 right-6 p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                <span className="text-xs font-bold tracking-widest text-on-surface-variant uppercase">
                  Current Status
                </span>
              </div>
              <p className="text-on-surface font-headline font-bold">{statusText}</p>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  )
}
