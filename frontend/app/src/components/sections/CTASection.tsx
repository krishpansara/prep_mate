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
    <section className="py-32 px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-inverse-surface rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden">
        {/* Gradient overlay */}
        <div className="absolute inset-0 opacity-20 bg-gradient-to-tr from-primary to-secondary mix-blend-overlay pointer-events-none" />

        <div className="relative z-10 space-y-8">
          <h2 className="text-4xl md:text-6xl font-black text-surface tracking-tighter font-headline">
            {heading}
          </h2>
          <p className="text-surface-variant text-xl max-w-xl mx-auto">{subtext}</p>
          <div className="pt-8">
            <Button
              variant="secondary"
              size="lg"
              onClick={onAction}
              className="!rounded-full !px-12 !py-5 !bg-surface !text-on-surface hover:!bg-primary-container hover:!text-on-primary-container !border-none shadow-xl"
            >
              {buttonLabel}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
