import Button from '@components/ui/Button'

interface CTASectionProps {
  heading?: string
  subtext?: string
  buttonLabel?: string
  onAction?: () => void
}

export default function CTASection({
  heading = 'Ready to start with PrepMate?',
  subtext = 'Join a community of thousands of developers who are choosing clarity over chaos.',
  buttonLabel = 'Create Free Account',
  onAction,
}: CTASectionProps) {
  return (
    <section className="py-32 px-6 lg:px-8 relative">
      <div className="max-w-5xl mx-auto glass-panel-heavy border-primary-500/30 rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden group">
        {/* Animated Gradient Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 via-transparent to-accent-600/20 opacity-50 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        <div className="relative z-10 space-y-8 animate-slide-up">
          <h2 className="text-4xl md:text-6xl font-black text-on-surface dark:text-white tracking-tighter font-headline">
            {heading}
          </h2>
          <p className="text-primary-800 dark:text-primary-200 text-xl max-w-xl mx-auto opacity-90">{subtext}</p>
          <div className="pt-8">
            <Button
              variant="primary"
              size="lg"
              onClick={onAction}
              className="!rounded-full shadow-[0_0_30px_rgba(59,130,246,0.6)] hover:shadow-[0_0_50px_rgba(59,130,246,0.8)] scale-105 hover:scale-110 transition-all duration-300"
            >
              {buttonLabel}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
