import Icon from '@components/ui/Icon'
import type { FeatureItem, Testimonial, StatItem } from '@types-app/index'

interface WhySectionProps {
  heading?: string
  features?: FeatureItem[]
  testimonial?: Testimonial
  stats?: StatItem[]
}

const defaultFeatures: FeatureItem[] = [
  {
    title: 'Radical Focus',
    description: 'No ads, no gamification streaks, no social pressure. Just you and the code, in a distraction-free environment.',
    color: 'primary',
  },
  {
    title: 'Editorial Structure',
    description: 'Every module is curated by senior engineers at top firms. We value quality of content over quantity of problems.',
    color: 'secondary',
  },
  {
    title: 'Crystal Clarity',
    description: 'Explanations written in plain English, paired with high-fidelity diagrams that make complex concepts click.',
    color: 'neutral',
  },
]

const defaultTestimonial: Testimonial = {
  quote: '"Zenith Prep feels like studying in a high-end library. The interface is so quiet that I can actually think. I cleared my L5 interview at Google thanks to this focused approach."',
  author: 'Alex Rivera',
  role: 'Senior Staff Engineer',
  avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
}

const defaultStats: StatItem[] = [
  { icon: 'verified', label: '10,000+ Success Stories', iconColor: 'text-secondary' },
  { icon: 'auto_awesome', label: 'Curated by FAANG Mentors', iconColor: 'text-primary' },
]

const colorDotMap: Record<FeatureItem['color'], string> = {
  primary: 'bg-primary ring-4 ring-primary-container',
  secondary: 'bg-secondary ring-4 ring-secondary-container',
  neutral: 'bg-on-surface ring-4 bg-surface-container',
}

export default function WhySection({
  heading = 'Why Zenith\nIs Different.',
  features = defaultFeatures,
  testimonial = defaultTestimonial,
  stats = defaultStats,
}: WhySectionProps) {
  return (
    <section className="py-32 px-6 lg:px-8 overflow-hidden">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
        {/* Left: sticky feature rail */}
        <div className="relative">
          <div className="sticky top-32">
            <h2 className="text-5xl md:text-6xl font-black tracking-tight leading-tight mb-8 font-headline whitespace-pre-line">
              {heading}
            </h2>
            <div className="space-y-12">
              {features.map((feature, index) => (
                <div key={feature.title} className="flex gap-8 group">
                  <div className="flex flex-col items-center">
                    <div className={`w-4 h-4 rounded-full ${colorDotMap[feature.color]}`} />
                    {index < features.length - 1 && (
                      <div className="w-1 flex-1 bg-surface-container-highest mt-2 mb-2 group-hover:bg-primary/30 transition-colors" />
                    )}
                  </div>
                  <div className="pb-8">
                    <h4 className="text-xl font-bold mb-2">{feature.title}</h4>
                    <p className="text-on-surface-variant leading-relaxed max-w-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: testimonial + stats */}
        <div className="grid grid-cols-1 gap-8">
          <div className="bg-surface-container p-1 rounded-3xl overflow-hidden shadow-2xl">
            <div className="bg-surface-container-lowest p-10 rounded-[1.4rem]">
              {/* Testimonial */}
              <div className="mb-10 p-6 bg-surface-container-low rounded-xl border-l-4 border-primary">
                <p className="text-on-surface italic text-lg leading-relaxed font-body">
                  {testimonial.quote}
                </p>
                <div className="mt-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-dim flex-shrink-0">
                    <img
                      src={testimonial.avatarUrl}
                      alt={testimonial.author}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-on-surface">{testimonial.author}</p>
                    <p className="text-sm text-on-surface-variant">{testimonial.role}</p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="space-y-2">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="flex items-center justify-between p-4 rounded-xl hover:bg-surface-container-low transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <Icon name={stat.icon} className={stat.iconColor ?? 'text-primary'} size="sm" />
                      <span className="font-medium">{stat.label}</span>
                    </div>
                    <Icon name="chevron_right" className="text-on-surface-variant" size="sm" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
