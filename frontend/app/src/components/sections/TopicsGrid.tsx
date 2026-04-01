import { useNavigate, Link } from 'react-router-dom'
import Icon from '@components/ui/Icon'
import type { TopicCard } from '@types-app/index'
import Card from '@components/ui/Card'

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
  primary: { icon: 'text-primary-600 dark:text-primary-400', bg: 'bg-primary-500/10 border-primary-500/20' },
  secondary: { icon: 'text-accent-600 dark:text-accent-400', bg: 'bg-accent-500/10 border-accent-500/20' },
  tertiary: { icon: 'text-on-surface-variant dark:text-white', bg: 'bg-surface-hover dark:bg-white/10 border-outline-variant/50 dark:border-white/20' },
}

export default function TopicsGrid({
  title = 'Curated Learning Paths',
  subtitle = "We've stripped away the fluff. Every lesson is engineered for maximum retention and technical depth.",
  browseHref = '/library',
  cards = defaultCards,
}: TopicsGridProps) {
  const navigate = useNavigate()
  const largeCard = cards.find((c) => c.variant === 'large')
  const smallCards = cards.filter((c) => c.variant === 'small')
  const wideCard = cards.find((c) => c.variant === 'wide')

  return (
    <section className="py-24 md:py-32 px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-6 text-on-surface dark:text-white font-headline">
              {title}
            </h2>
            <p className="text-lg text-on-surface-variant leading-relaxed">{subtitle}</p>
          </div>
          <Link
            to={browseHref}
            className="text-primary-600 dark:text-primary-400 font-bold flex items-center gap-2 group border border-primary-500/30 px-6 py-3 rounded-full hover:bg-primary-500/10 transition-colors"
          >
            Browse all paths
            <Icon
              name="arrow_forward"
              className="group-hover:translate-x-1 transition-transform duration-200"
              size="sm"
            />
          </Link>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Large card — spans 2 cols and 2 rows */}
          {largeCard && (
            <Card variant="default" hover className="md:col-span-2 md:row-span-2 flex flex-col justify-between !p-10 group" onClick={() => navigate(`/library/${largeCard.id}`)}>
              <div>
                <div className={`w-16 h-16 rounded-2xl border ${accentMap[largeCard.accentColor ?? 'primary'].bg} flex items-center justify-center mb-8 shadow-inner`}>
                  <Icon name={largeCard.icon} size="lg" className={accentMap[largeCard.accentColor ?? 'primary'].icon} />
                </div>
                <h3 className="text-4xl font-black mb-4 text-on-surface dark:text-white tracking-tight font-headline">{largeCard.title}</h3>
                <p className="text-on-surface-variant text-lg leading-relaxed">{largeCard.description}</p>
              </div>
              <div className="mt-16 flex items-center justify-between">
                {largeCard.lessonCount && (
                  <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-400 dark:to-accent-400 uppercase tracking-widest">
                    {largeCard.lessonCount} Lessons
                  </span>
                )}
                <div className="h-px flex-1 bg-outline-variant/50 dark:bg-white/10 mx-6" />
                <button aria-label="View topic details" className="w-12 h-12 rounded-full bg-surface-hover dark:bg-white/5 border border-outline-variant/80 dark:border-white/10 text-on-surface dark:text-white flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white group-hover:border-primary-600 transition-colors shadow-lg">
                  <Icon name="north_east" size="sm" />
                </button>
              </div>
            </Card>
          )}

          {/* Small cards */}
          {smallCards.map((card) => (
            <Card
              key={card.id}
              variant="default"
              hover
              className="!p-8 flex flex-col justify-between"
              onClick={() => navigate(`/library/${card.id}`)}
            >
              <div className="mb-8">
                <div className={`w-12 h-12 rounded-xl border ${accentMap[card.accentColor ?? 'primary'].bg} flex items-center justify-center mb-6`}>
                  <Icon name={card.icon} className={accentMap[card.accentColor ?? 'primary'].icon} size="sm" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-on-surface dark:text-white font-headline tracking-tight">{card.title}</h3>
                <p className="text-on-surface-variant leading-relaxed text-sm">{card.description}</p>
              </div>
            </Card>
          ))}

          {/* Wide card — spans 2 cols */}
          {wideCard && (
            <Card variant="elevated" hover className="md:col-span-2 flex items-center gap-8 !p-8 group" onClick={() => navigate(`/library/${wideCard.id}`)}>
              <div className="flex-1">
                <div className="flex items-center gap-6 mb-4">
                  <div className={`w-12 h-12 rounded-xl border ${accentMap[wideCard.accentColor ?? 'tertiary'].bg} flex flex-shrink-0 items-center justify-center`}>
                    <Icon name={wideCard.icon} className={accentMap[wideCard.accentColor ?? 'tertiary'].icon} size="sm" />
                  </div>
                  <h3 className="text-2xl font-bold text-on-surface dark:text-white font-headline tracking-tight">{wideCard.title}</h3>
                </div>
                <p className="text-on-surface-variant leading-relaxed">{wideCard.description}</p>
              </div>
              <Icon name="chevron_right" className="text-outline-variant dark:text-white/20 group-hover:text-primary-600 dark:group-hover:text-primary-400 group-hover:translate-x-2 transition-all duration-300" size="lg" />
            </Card>
          )}
        </div>
      </div>
    </section>
  )
}
