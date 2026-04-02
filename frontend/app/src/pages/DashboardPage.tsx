import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '@components/ui/Card'
import Badge from '@components/ui/Badge'
import Button from '@components/ui/Button'
import Icon from '@components/ui/Icon'
import { useAuth } from '@contexts/AuthContext'
import { streakApi, milestonesApi, progressApi, type ApiStreak, type ApiMilestone, type ApiProgress, type ApiTopic } from '@lib/api'

// ── Time helper ──────────────────────────────────────────────────────────────
function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const d = Math.floor(diff / 86400000)
  if (d === 0) return 'TODAY'
  if (d === 1) return '1D AGO'
  if (d < 7) return `${d}D AGO`
  return `${Math.floor(d / 7)}W AGO`
}

// ── Activity data shape ───────────────────────────────────────────────────────
const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

export default function DashboardPage() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [streak, setStreak] = useState<ApiStreak | null>(null)
  const [milestones, setMilestones] = useState<ApiMilestone[]>([])
  const [progress, setProgress] = useState<ApiProgress[]>([])

  useEffect(() => {
    async function load() {
      const [s, m, p] = await Promise.allSettled([
        streakApi.get(),
        milestonesApi.list(),
        progressApi.list(),
      ])
      if (s.status === 'fulfilled') setStreak(s.value)
      if (m.status === 'fulfilled') setMilestones(m.value)
      if (p.status === 'fulfilled') setProgress(p.value)
    }
    load()
  }, [])

  // Most recent topic with progress
  const activeTopic = progress
    .filter((p) => p.progressPercent > 0)
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())[0]

  const topic = activeTopic ? (activeTopic.topicId as ApiTopic) : null
  const streakDays = streak?.currentDays ?? 0
  const streakMax = Math.max(streak?.longestDays ?? 1, 1)

  return (
    <>
      {/* Page header */}
      <header className="mb-12 relative">
        <h1 className="text-[2rem] md:text-[3.5rem] leading-tight font-black text-on-surface dark:text-white font-headline tracking-tighter mb-4 animate-slide-up">
          Welcome back, {user?.name?.split(' ')[0] ?? 'there'}.
        </h1>
        <p className="text-xl text-on-surface-variant dark:text-white/70 max-w-2xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
          {streakDays > 0
            ? `You're on a ${streakDays}-day streak. Keep it going!`
            : `Start your first session today to build your streak.`}
        </p>
      </header>

      {/* Bento grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 animate-slide-up" style={{ animationDelay: '0.3s' }}>
        {/* Continue Learning — 8 cols */}
        <section className="md:col-span-8">
          <Card hover variant="elevated" className="h-full">
            {topic ? (
              <>
                <div className="flex justify-between items-start mb-16 relative z-10">
                  <div>
                    <Badge label="ACTIVE PATH" variant="primary" uppercase className="mb-6 shadow-[0_0_15px_rgba(59,130,246,0.3)]" />
                    <h3 className="text-4xl font-black font-headline mb-3 text-on-surface dark:text-white tracking-tight">
                      {topic.name ?? 'Your Topic'}
                    </h3>
                    <p className="text-on-surface-variant dark:text-white/60 text-lg">Continue where you left off</p>
                  </div>
                  <div className="h-24 w-24 flex items-center justify-center bg-surface-hover dark:bg-white/5 border border-outline-variant/50 dark:border-white/10 rounded-2xl flex-shrink-0">
                    <Icon name={topic.icon ?? 'code'} className="text-primary-600 dark:text-primary-400" size="xl" />
                  </div>
                </div>
                <div className="flex items-end justify-between gap-8 relative z-10">
                  <div className="flex-1 max-w-md">
                    <div className="mb-2 flex justify-between text-sm font-bold text-on-surface-variant dark:text-white/80">
                      <span>Progress</span>
                      <span className="text-primary-600 dark:text-primary-400">{activeTopic?.progressPercent ?? 0}%</span>
                    </div>
                    <div className="h-3 w-full bg-outline-variant/50 dark:bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary-600 to-accent-600 rounded-full" style={{ width: `${activeTopic?.progressPercent ?? 0}%` }} />
                    </div>
                  </div>
                  <Button variant="primary" size="lg" icon="arrow_forward" onClick={() => navigate(`/app/learn/topics/${topic.slug}`)} className="px-8">Resume</Button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center py-10">
                <Icon name="auto_stories" className="text-primary-400 !text-5xl mb-4" />
                <h3 className="text-2xl font-bold text-on-surface dark:text-white mb-2">No active path yet</h3>
                <p className="text-on-surface-variant dark:text-white/60 mb-6">Browse topics and start learning</p>
                <Button variant="primary" onClick={() => navigate('/library')}>Explore Topics</Button>
              </div>
            )}
          </Card>
        </section>

        {/* Streak tracker — 4 cols */}
        <section className="md:col-span-4">
          <Card hover variant="surface-low" className="h-full flex flex-col items-center justify-center text-center">
            <div className="relative w-40 h-40 mb-6 flex items-center justify-center">
              <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                <circle cx="80" cy="80" r="70" fill="transparent" stroke="currentColor" className="text-outline-variant dark:text-white/10" strokeWidth="12" />
                <circle cx="80" cy="80" r="70" fill="transparent" stroke="url(#streakGradient)" strokeWidth="12"
                  strokeDasharray={`${2 * Math.PI * 70}`}
                  strokeDashoffset={`${2 * Math.PI * 70 * (1 - streakDays / streakMax)}`}
                  className="transition-all duration-1000 ease-out" strokeLinecap="round" />
                <defs>
                  <linearGradient id="streakGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#9333ea" />
                    <stop offset="100%" stopColor="#c084fc" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="text-center absolute">
                <span className="block text-4xl font-black text-on-surface dark:text-white">{streakDays}</span>
                <span className="text-sm font-bold text-accent-600 dark:text-accent-400 uppercase tracking-widest">Days</span>
              </div>
            </div>
            <h4 className="text-2xl font-bold font-headline mb-3 text-on-surface dark:text-white">Consistency is Key</h4>
            <p className="text-on-surface-variant dark:text-white/60 leading-relaxed px-4">
              {streakDays > 0 ? `Longest streak: ${streakMax} days` : 'Start your streak today!'}
            </p>
          </Card>
        </section>

        {/* Activity chart — last 7 days placeholder */}
        <section className="md:col-span-7">
          <Card hover className="h-full">
            <h3 className="text-xl font-bold font-headline text-on-surface dark:text-white mb-8">Activity</h3>
            <div className="flex items-end justify-between h-[200px] gap-2">
              {DAYS.map((day, i) => (
                <div key={i} className="flex flex-col items-center gap-4 flex-1 group cursor-pointer">
                  <div className="w-full rounded-t-md bg-outline-variant/50 dark:bg-white/10 h-8 transition-all duration-300 group-hover:bg-primary-500/50" />
                  <span className="text-sm font-bold text-on-surface-variant dark:text-white/50">{day}</span>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* Recent milestones */}
        <section className="md:col-span-5">
          <Card hover variant="surface-low" className="h-full">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold font-headline text-on-surface dark:text-white">Recent Milestones</h3>
            </div>
            {milestones.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Icon name="emoji_events" className="text-outline-variant !text-4xl mb-3" />
                <p className="text-on-surface-variant dark:text-white/50 text-sm">Complete topics to earn milestones</p>
              </div>
            ) : (
              <div className="space-y-4">
                {milestones.slice(0, 3).map((item) => (
                  <div key={item._id} className="flex items-start gap-4 p-4 rounded-2xl bg-surface-hover dark:bg-white/5 border border-outline-variant/50 dark:border-white/5">
                    <div className="w-12 h-12 rounded-xl bg-accent-500/10 dark:bg-accent-500/20 text-accent-600 dark:text-accent-400 flex items-center justify-center flex-shrink-0">
                      <Icon name="emoji_events" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-on-surface dark:text-white font-bold truncate">{item.title}</h4>
                      <p className="text-on-surface-variant dark:text-white/60 text-sm truncate">{item.subtitle}</p>
                    </div>
                    <span className="text-xs font-bold text-on-surface-variant/70 dark:text-white/40 tracking-wider whitespace-nowrap">{timeAgo(item.createdAt)}</span>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </section>

        {/* Recommendation banner */}
        <section className="md:col-span-12">
          <Card hover variant="elevated" className="group !p-12 overflow-hidden border border-accent-500/30">
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
              <div className="md:col-span-8">
                <span className="inline-block px-3 py-1 rounded-full bg-accent-500/10 dark:bg-accent-500/20 text-accent-600 dark:text-accent-300 border border-accent-500/20 font-bold text-xs tracking-widest uppercase mb-6">
                  ⚡ Next Step
                </span>
                <h2 className="text-4xl md:text-5xl font-black font-headline text-on-surface dark:text-white mb-6 leading-tight tracking-tight">
                  Ready to Practice?<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-300 dark:to-accent-300">Interview Questions</span>
                </h2>
                <p className="text-on-surface-variant dark:text-white/80 text-lg mb-8 max-w-2xl leading-relaxed">
                  Test your knowledge with curated interview questions across all topics.
                </p>
                <Button variant="primary" size="lg" onClick={() => navigate('/app/practice')} className="px-10">Start Practice</Button>
              </div>
              <div className="hidden md:flex md:col-span-4 justify-center">
                <div className="w-48 h-48 bg-surface-hover dark:bg-white/5 border border-outline-variant dark:border-white/20 rounded-full flex items-center justify-center relative group-hover:scale-105 transition-transform duration-700">
                  <div className="absolute inset-2 border border-dashed border-outline-variant dark:border-white/30 rounded-full animate-[spin_20s_linear_infinite]" />
                  <Icon name="quiz" size="xl" className="text-primary-600 dark:text-white !text-6xl" />
                </div>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </>
  )
}