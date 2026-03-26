import AppShell from '@components/layout/AppShell'
import Card from '@components/ui/Card'
import Badge from '@components/ui/Badge'
import Button from '@components/ui/Button'
import Icon from '@components/ui/Icon'
import ProgressBar from '@components/ui/ProgressBar'
import CircularProgress from '@components/ui/CircularProgress'
import ActivityChart from '@components/ui/ActivityChart'
import MilestoneItem from '@components/ui/MilestoneItem'
import type { MilestoneItem as MilestoneItemType, ActivityDay } from '@types-app/index'

const currentPath = {
  title: 'Distributed Systems',
  tag: 'ACTIVE PATH',
  lastSession: 'Last session: Consensus Algorithms',
  progressPercent: 64,
  icon: 'dynamic_feed',
}

const milestones: MilestoneItemType[] = [
  { id: '1', title: 'Dynamic Programming', subtitle: "Mastered 'Knapsack Problem'", timeAgo: '2D AGO' },
  { id: '2', title: 'Tree Traversals', subtitle: 'Finished DFS & BFS Deep-dive', timeAgo: '4D AGO' },
  { id: '3', title: 'Big O Notation', subtitle: 'Complexity Analysis Intro', timeAgo: '1W AGO' },
]

const activityData: ActivityDay[] = [
  { label: 'M', heightClass: 'h-24', intensity: 'low' },
  { label: 'T', heightClass: 'h-32', intensity: 'medium' },
  { label: 'W', heightClass: 'h-44', intensity: 'high' },
  { label: 'T', heightClass: 'h-16', intensity: 'low' },
  { label: 'F', heightClass: 'h-28', intensity: 'medium' },
  { label: 'S', heightClass: 'h-12', intensity: 'low' },
  { label: 'S', heightClass: 'h-8', intensity: 'low' },
]

const streakDays = 14
const streakMax = 21

export default function DashboardPage() {
  return (
    <AppShell>
      {/* Page header */}
      <header className="mb-12">
        <h1 className="text-[2rem] md:text-[3rem] leading-tight font-extrabold text-on-surface font-headline tracking-tighter mb-2">
          Welcome back, Zen.
        </h1>
        <p className="text-lg text-on-surface-variant max-w-2xl">
          You've solved 12 problems this week. Your performance in{' '}
          <span className="text-primary font-semibold">Graph Theory</span> has improved by 24%.
        </p>
      </header>

      {/* Bento grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">

        {/* Continue Learning — 8 cols */}
        <section className="md:col-span-8">
          <Card hover className="relative overflow-hidden">
            {/* Decorative blob */}
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

            <div className="flex justify-between items-start mb-12">
              <div>
                <Badge label={currentPath.tag} variant="primary" uppercase className="mb-4" />
                <h3 className="text-3xl font-bold font-headline mb-2">{currentPath.title}</h3>
                <p className="text-on-surface-variant">{currentPath.lastSession}</p>
              </div>
              <div className="h-20 w-20 flex items-center justify-center bg-surface-container-low rounded-full flex-shrink-0">
                <Icon name={currentPath.icon} className="text-primary" size="xl" />
              </div>
            </div>

            <div className="flex items-end justify-between gap-6">
              <div className="flex-1 max-w-xs">
                <ProgressBar value={currentPath.progressPercent} />
              </div>
              <Button variant="primary" size="md" icon="arrow_forward">
                Resume
              </Button>
            </div>
          </Card>
        </section>

        {/* Streak tracker — 4 cols */}
        <section className="md:col-span-4">
          <Card variant="surface-low" className="h-full flex flex-col items-center justify-center text-center">
            <CircularProgress
              value={streakDays}
              max={streakMax}
              centerLabel={String(streakDays)}
              centerSubLabel="Days"
            />
            <h4 className="text-xl font-bold font-headline mt-6 mb-2">Consistency is Key</h4>
            <p className="text-sm text-on-surface-variant">
              You're in the top 5% of daily active learners this month.
            </p>
            <div className="mt-8 flex gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    i < 3
                      ? 'bg-secondary-fixed text-on-secondary-container'
                      : 'bg-surface-container-highest text-outline'
                  }`}
                >
                  <Icon
                    name="local_fire_department"
                    size="xs"
                    filled={i < 3}
                  />
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* Activity chart — 7 cols */}
        <section className="md:col-span-7">
          <Card>
            <ActivityChart data={activityData} />
          </Card>
        </section>

        {/* Recent milestones — 5 cols */}
        <section className="md:col-span-5">
          <Card variant="surface-low" className="h-full">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold font-headline">Recent Milestones</h3>
              <a href="#" className="text-xs font-bold text-primary hover:underline">
                View All
              </a>
            </div>
            <div className="space-y-3">
              {milestones.map((item) => (
                <MilestoneItem
                  key={item.id}
                  title={item.title}
                  subtitle={item.subtitle}
                  timeAgo={item.timeAgo}
                />
              ))}
            </div>
          </Card>
        </section>

        {/* Recommendation banner — 12 cols */}
        <section className="md:col-span-12">
          <Card variant="dark">
            {/* Gradient overlay */}
            <div className="absolute inset-0 opacity-20 bg-gradient-to-r from-primary to-secondary mix-blend-overlay pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="text-secondary-fixed-dim font-bold text-xs tracking-widest uppercase mb-4 block">
                  Recommended for you
                </span>
                <h2 className="text-4xl font-bold font-headline text-surface mb-6">
                  Mastering System Design: Scalability and High Availability
                </h2>
                <p className="text-surface-variant mb-8 max-w-md">
                  Our AI analyzed your recent activity. You're ready to tackle large-scale architecture
                  challenges. Start your 3-hour deep dive now.
                </p>
                <Button variant="secondary" size="md" className="!bg-surface-container-lowest !text-on-surface !border-none">
                  Start Module
                </Button>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </AppShell>
  )
}
