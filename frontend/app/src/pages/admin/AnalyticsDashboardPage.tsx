import { useState, useEffect } from 'react'
import AdminShell from '@components/layout/AdminShell'
import { adminApi } from '@lib/api'
import Icon from '@components/ui/Icon'
import ProgressBar from '@components/ui/ProgressBar'

const topMetricsMock = [
  { label: 'Total Users', value: '0', change: 'Live', icon: 'people', positive: true },
  { label: 'Total Topics', value: '0', change: 'Live', icon: 'category', positive: true },
  { label: 'Total Questions', value: '0', change: 'Live', icon: 'quiz', positive: true },
  { label: 'Platform Health', value: '100%', change: 'Optimal', icon: 'task_alt', positive: true },
]

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export default function AnalyticsDashboardPage() {
  const [data, setData] = useState<{
    metrics: typeof topMetricsMock,
    userGrowth: number[],
    topTopics: { name: string; sessions: number; percent: number }[],
    funnel: { registered: number; completedOnboarding: number; solved5Questions: number; hitStreak: number; referredFriend: number } | null
  }>({
    metrics: topMetricsMock,
    userGrowth: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    topTopics: [],
    funnel: null
  })

  useEffect(() => {
    adminApi.getAnalytics().then((res) => {
      setData({
        metrics: [
          { ...topMetricsMock[0], value: res.totalUsers.toString() },
          { ...topMetricsMock[1], value: res.totalTopics.toString() },
          { ...topMetricsMock[2], value: res.totalQuestions.toString() },
          topMetricsMock[3],
        ],
        userGrowth: res.userGrowth || [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        topTopics: res.topTopics || [],
        funnel: res.funnel
      })
    }).catch(console.error)
  }, [])

  const maxGrowth = Math.max(...data.userGrowth, 1) // avoid div by 0
  
  const currentYear = new Date().getFullYear()

  const renderedFunnel = data.funnel ? [
    { label: 'Registered', value: data.funnel.registered, percent: 100 },
    { label: 'Completed Onboarding', value: data.funnel.completedOnboarding, percent: data.funnel.registered ? Math.round((data.funnel.completedOnboarding / data.funnel.registered) * 100) : 0 },
    { label: 'Started Learning', value: data.funnel.solved5Questions, percent: data.funnel.registered ? Math.round((data.funnel.solved5Questions / data.funnel.registered) * 100) : 0 },
    { label: 'Hit 14-Day Streak', value: data.funnel.hitStreak, percent: data.funnel.registered ? Math.round((data.funnel.hitStreak / data.funnel.registered) * 100) : 0 },
    { label: 'Referred a Friend', value: data.funnel.referredFriend, percent: data.funnel.registered ? Math.round((data.funnel.referredFriend / data.funnel.registered) * 100) : 0 },
  ] : []


  return (
    <AdminShell>
      <section className="mb-10">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight font-headline mb-2">Platform Analytics</h2>
        <p className="text-on-surface-variant">
          Real-time insights into user behavior, content performance, and growth metrics.
        </p>
      </section>

      {/* Top metrics */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {data.metrics.map((m) => (
          <div key={m.label} className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/10 shadow-sm hover-card-premium">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-primary/10 rounded-xl text-primary">
                <Icon name={m.icon} size="sm" />
              </div>
              <span className={`text-xs font-bold ${m.positive ? 'text-secondary' : 'text-error'}`}>
                {m.change}
              </span>
            </div>
            <p className="text-2xl font-extrabold font-headline">{m.value}</p>
            <p className="text-xs text-on-surface-variant mt-1">{m.label}</p>
          </div>
        ))}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* User growth chart */}
        <div className="lg:col-span-2 bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/10 shadow-sm hover-card-premium">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold font-headline">User Growth</h3>
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">{currentYear}</span>
          </div>
          <div className="flex items-end gap-3 h-40">
            {data.userGrowth.map((val, i) => (
              <div key={i} className="flex flex-col items-center gap-2 flex-1">
                <div
                  className="w-full rounded-t-lg bg-gradient-to-t from-primary to-primary/60 hover:from-secondary hover:to-secondary/60 transition-colors"
                  style={{ height: `${(val / maxGrowth) * 100}%` }}
                  title={`${months[i]}: ${val}k`}
                />
                <span className="text-[9px] font-bold text-on-surface-variant">{months[i].slice(0, 1)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top topics */}
        <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/10 shadow-sm hover-card-premium">
          <h3 className="text-xl font-bold font-headline mb-6">Top Topics</h3>
          <div className="space-y-5">
            {data.topTopics.length === 0 ? (
              <p className="text-sm text-on-surface-variant text-center py-10">No progress data yet.</p>
            ) : data.topTopics.map((topic) => (
              <div key={topic.name}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="font-semibold truncate max-w-[60%]">{topic.name}</span>
                  <span className="text-on-surface-variant">{topic.sessions.toLocaleString()} sessions</span>
                </div>
                <ProgressBar value={topic.percent || 0} showLabel={false} size="sm" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Funnel */}
      <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/10 shadow-sm hover-card-premium">
        <h3 className="text-xl font-bold font-headline mb-8">User Engagement Funnel</h3>
        <div className="space-y-4">
          {renderedFunnel.map((step, index) => (
            <div key={step.label} className="flex items-center gap-6">
              <span className="text-xs font-bold text-on-surface-variant w-5 text-right">{index + 1}</span>
              <div className="flex-1">
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="font-semibold">{step.label}</span>
                  <span className="text-on-surface-variant">{step.value.toLocaleString()} users</span>
                </div>
                <div className="h-3 bg-surface-container-high rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500"
                    style={{ width: `${step.percent}%`, opacity: 1 - index * 0.12 }}
                  />
                </div>
              </div>
              <span className="text-sm font-bold text-primary w-10 text-right">{step.percent}%</span>
            </div>
          ))}
        </div>
      </div>
    </AdminShell>
  )
}
