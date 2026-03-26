import Icon from '@components/ui/Icon'
import type { TopicCard } from '@types-app/index'

interface TopicsGridProps {
  title?: string
  subtitle?: string
  browseHref?: string
  cards?: TopicCard[]
}

const defaultCards: TopicCard[] = [
  {
    id: 'dsa',
    title: 'Data Structures & Algorithms',
    description: 'Master the core foundations from Big O to Dynamic Programming with our visual-first curriculum.',
    icon: 'account_tree',
    lessonCount: 142,
    variant: 'large',
    accentColor: 'primary',
  },
  {
    id: 'python',
    title: 'Python Mastery',
    description: 'Advanced patterns for interview coding and automation scripts.',
    icon: 'terminal',
    variant: 'small',
    accentColor: 'secondary',
  },
  {
    id: 'java',
    title: 'Java Backend',
    description: 'Concurrency, JVM internals, and robust system architecture.',
    icon: 'coffee',
    variant: 'small',
    accentColor: 'primary',
  },
  {
    id: 'dbms',
    title: 'DBMS & SQL',
    description: 'Indexing, normalization, and scaling data for millions of users.',
    icon: 'database',
    lessonCount: 64,
    variant: 'wide',
    accentColor: 'tertiary',
  },
]

const accentMap: Record<NonNullable<TopicCard['accentColor']>, { icon: string; bg: string }> = {
  primary: { icon: 'text-primary', bg: 'bg-primary/10' },
  secondary: { icon: 'text-secondary', bg: 'bg-secondary/10' },
  tertiary: { icon: 'text-tertiary', bg: 'bg-tertiary/10' },
}

export default function TopicsGrid({
  title = 'Curated Learning Paths',
  subtitle = "We've stripped away the fluff. Every lesson is engineered for maximum retention and technical depth.",
  browseHref = '#',
  cards = defaultCards,
}: TopicsGridProps) {
  const largeCard = cards.find((c) => c.variant === 'large')
  const smallCards = cards.filter((c) => c.variant === 'small')
  const wideCard = cards.find((c) => c.variant === 'wide')

  return (
    <section className="py-16 md:py-24 px-6 lg:px-8 bg-surface-container-low">
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4 font-headline">
              {title}
            </h2>
            <p className="text-lg text-on-surface-variant">{subtitle}</p>
          </div>
          <a
            href={browseHref}
            className="text-primary font-bold flex items-center gap-2 group"
          >
            Browse all paths
            <Icon
              name="arrow_forward"
              className="group-hover:translate-x-1 transition-transform duration-200"
              size="sm"
            />
          </a>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Large card — spans 2 cols and 2 rows */}
          {largeCard && (
            <div className="md:col-span-2 md:row-span-2 bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/10 flex flex-col justify-between group hover:shadow-xl transition-all duration-500 cursor-pointer">
              <div>
                <div className={`w-12 h-12 rounded-xl ${accentMap[largeCard.accentColor ?? 'primary'].bg} flex items-center justify-center mb-6`}>
                  <Icon name={largeCard.icon} size="lg" className={accentMap[largeCard.accentColor ?? 'primary'].icon} />
                </div>
                <h3 className="text-3xl font-bold mb-3 font-headline">{largeCard.title}</h3>
                <p className="text-on-surface-variant leading-relaxed">{largeCard.description}</p>
              </div>
              <div className="mt-12 flex items-center justify-between">
                {largeCard.lessonCount && (
                  <span className="text-sm font-bold text-on-surface-variant">
                    {largeCard.lessonCount} Lessons
                  </span>
                )}
                <div className="h-px flex-1 bg-surface-variant mx-4" />
                <button aria-label="View topic details" className="w-10 h-10 rounded-full bg-on-surface text-surface flex items-center justify-center group-hover:bg-primary transition-colors">
                  <Icon name="north_east" size="xs" />
                </button>
              </div>
            </div>
          )}

          {/* Small cards */}
          {smallCards.map((card) => (
            <div
              key={card.id}
              className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/10 group hover:bg-on-surface hover:text-surface transition-all duration-500 cursor-pointer"
            >
              <div className={`w-10 h-10 rounded-lg ${accentMap[card.accentColor ?? 'primary'].bg} flex items-center justify-center mb-6 group-hover:opacity-80`}>
                <Icon name={card.icon} className={accentMap[card.accentColor ?? 'primary'].icon} size="sm" />
              </div>
              <h3 className="text-xl font-bold mb-2 font-headline">{card.title}</h3>
              <p className="text-on-surface-variant group-hover:text-surface-variant text-sm">{card.description}</p>
            </div>
          ))}

          {/* Wide card — spans 2 cols */}
          {wideCard && (
            <div className="md:col-span-2 bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/10 flex items-center gap-8 group hover:shadow-lg transition-all cursor-pointer">
              <div className="flex-1">
                <div className={`w-10 h-10 rounded-lg ${accentMap[wideCard.accentColor ?? 'tertiary'].bg} flex items-center justify-center mb-4`}>
                  <Icon name={wideCard.icon} className={accentMap[wideCard.accentColor ?? 'tertiary'].icon} size="sm" />
                </div>
                <h3 className="text-xl font-bold mb-2 font-headline">{wideCard.title}</h3>
                <p className="text-on-surface-variant text-sm">{wideCard.description}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
