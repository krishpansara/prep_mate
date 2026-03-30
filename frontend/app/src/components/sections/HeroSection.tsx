import Button from '@components/ui/Button'

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
  imageSrc = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80&fm=webp', // Updated to a sleeker coding image
  imageAlt = 'Minimalist developer workspace',
}: HeroSectionProps) {
  return (
    <section className="relative pt-32 pb-40 px-6 lg:px-8 overflow-hidden min-h-[90vh] flex items-center">
      <div className="relative z-10 max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Text content */}
        <div className="lg:col-span-7 space-y-8 animate-slide-up">
          <div className="inline-block rounded-full px-4 py-1 border border-primary-500/30 bg-primary-500/10 text-primary-600 dark:text-primary-300 text-sm font-semibold tracking-wide backdrop-blur-md">
            ✨ {badge}
          </div>

          <h1 className="text-6xl md:text-8xl font-black leading-[1.05] tracking-tighter text-on-surface dark:text-white font-headline">
            {heading}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-400 dark:to-accent-400">
              {headingAccent}
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-on-surface-variant max-w-2xl leading-relaxed font-body">
            {subheading}
          </p>

          <div className="flex flex-wrap gap-6 pt-6">
            <Button variant="primary" size="lg" onClick={onPrimaryClick} className="shadow-[0_0_20px_rgba(59,130,246,0.3)] dark:shadow-[0_0_20px_rgba(59,130,246,0.4)]">
              {primaryCTA}
            </Button>
            <Button variant="ghost" size="lg" onClick={onSecondaryClick} icon="arrow_forward">
              {secondaryCTA}
            </Button>
          </div>
        </div>

        {/* Image column */}
        <div className="lg:col-span-5 relative animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="aspect-[4/5] md:aspect-square bg-surface border border-outline-variant/50 dark:border-white/10 rounded-3xl overflow-hidden shadow-2xl relative z-10 group">
            <img
              src={imageSrc}
              alt={imageAlt}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 dark:opacity-80 group-hover:opacity-100"
            />
            {/* Elegant overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-surface dark:from-[#030712] via-transparent to-transparent opacity-80"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
