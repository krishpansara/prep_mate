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
  quote: '"PrepMate feels like studying in a high-end library. The interface is so quiet that I can actually think. I cleared my L5 interview at Google thanks to this focused approach."',
  author: 'Alex Rivera',
  role: 'Senior Staff Engineer',
  avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
}

const defaultStats: StatItem[] = [
  { icon: 'verified', label: '10,000+ Success Stories', iconColor: 'text-accent-400' },
  { icon: 'auto_awesome', label: 'Curated by FAANG Mentors', iconColor: 'text-primary-400' },
]

const colorDotMap: Record<FeatureItem['color'], string> = {
  primary: 'bg-primary-500 shadow-[0_0_15px_rgba(59,130,246,0.6)]',
  secondary: 'bg-accent-500 shadow-[0_0_15px_rgba(168,85,247,0.6)]',
  neutral: 'bg-[rgb(234,123,168)] shadow-[0_0_15px_rgba(234,123,168,0.4)]',
}

export default function WhySection({
  heading = 'Why PrepMate\nIs Different.',
  features = defaultFeatures,
  testimonial = defaultTestimonial,
  stats = defaultStats,
}: WhySectionProps) {
  return (
    <section className="py-32 px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 relative z-10">
        {/* Left: sticky feature rail */}
        <div className="relative">
          <div className="sticky top-32">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight mb-12 font-headline whitespace-pre-line text-transparent bg-clip-text bg-gradient-to-br from-primary-950 to-primary-800/80 dark:from-white dark:to-white/60">
              {heading}
            </h2>
            <div className="space-y-12">
              {features.map((feature, index) => (
                <div key={feature.title} className="flex gap-8 group">
                  <div className="flex flex-col items-center mt-2">
                    <div className={`w-4 h-4 rounded-full ${colorDotMap[feature.color]}`} />
                    {index < features.length && (
                      <div className="w-0.5 flex-1 bg-gradient-to-b from-slate-300 dark:from-white/20 to-transparent my-4 group-hover:from-primary-400/60 dark:group-hover:from-primary-500/50 transition-all duration-500" />
                    )}
                  </div>
                  <div className="pb-8">
                    <h3 className="text-2xl font-bold mb-3 text-on-surface dark:text-white tracking-tight">{feature.title}</h3>
                    <p className="text-on-surface-variant leading-relaxed text-lg max-w-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: testimonial + stats */}
        <div className="grid grid-cols-1 gap-8 items-center">
          <div className="glass-panel-heavy rounded-[2rem] p-1 border border-outline-variant/30 dark:border-white/10 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-accent-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            <div className="bg-surface/60 backdrop-blur-xl p-10 md:p-14 rounded-[1.8rem] relative z-10">
              {/* Testimonial */}
              <div className="mb-12 relative">
                <Icon name="format_quote" className="text-primary-500/20 absolute -top-10 -left-6 !text-8xl" />
                <p className="text-on-surface dark:text-white italic text-xl md:text-2xl leading-relaxed font-body relative z-10 font-medium">
                  {testimonial.quote}
                </p>
                <div className="mt-10 flex items-center gap-5">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary-500/30 flex-shrink-0">
                    <img
                      src={testimonial.avatarUrl}
                      alt={testimonial.author}
                      loading="lazy"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-on-surface dark:text-white text-lg">{testimonial.author}</p>
                    <p className="text-primary-400 font-medium">{testimonial.role}</p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="space-y-4 pt-8 border-t border-slate-200/70 dark:border-white/10">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="flex items-center justify-between p-5 rounded-2xl bg-surface-container border border-slate-200 dark:bg-white/5 dark:border-white/5 hover:border-primary-300 dark:hover:border-primary-500/30 dark:hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center">
                         <Icon name={stat.icon} className={stat.iconColor} size="sm" />
                      </div>
                      <span className="font-semibold text-on-surface dark:text-white tracking-wide">{stat.label}</span>
                    </div>
                    <Icon name="chevron_right" className="text-on-surface-variant dark:text-white/30" size="sm" />
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
