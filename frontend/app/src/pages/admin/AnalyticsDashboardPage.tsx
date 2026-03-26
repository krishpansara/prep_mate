import AdminShell from '@components/layout/AdminShell'
import Icon from '@components/ui/Icon'
import ProgressBar from '@components/ui/ProgressBar'

const topMetrics = [
  { label: 'Monthly Active Users', value: '8,432', change: '+18%', icon: 'people', positive: true },
  { label: 'Questions Solved / Day', value: '14,210', change: '+22%', icon: 'check_circle', positive: true },
  { label: 'Avg. Session Duration', value: '38m', change: '-4%', icon: 'timer', positive: false },
  { label: 'Completion Rate', value: '61%', change: '+3%', icon: 'task_alt', positive: true },
]

const topTopics = [
  { name: 'Data Structures & Algorithms', sessions: 4820, percent: 92 },
  { name: 'System Design', sessions: 2941, percent: 65 },
  { name: 'Python Mastery', sessions: 1830, percent: 48 },
  { name: 'Behavioral Interviews', sessions: 920, percent: 28 },
  { name: 'Database & SQL', sessions: 710, percent: 22 },
]

const userGrowth = [32, 48, 55, 62, 44, 78, 91, 85, 96, 88, 102, 115]
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const maxGrowth = Math.max(...userGrowth)

const funnelSteps = [
  { label: 'Registered', value: 12402, percent: 100 },
  { label: 'Completed Onboarding', value: 9840, percent: 79 },
  { label: 'Solved 5+ Questions', value: 6210, percent: 50 },
  { label: 'Hit 14-Day Streak', value: 3120, percent: 25 },
  { label: 'Referred a Friend', value: 980, percent: 8 },
]

export default function AnalyticsDashboardPage() {
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
        {topMetrics.map((m) => (
          <div key={m.label} className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/10 shadow-sm">
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
        <div className="lg:col-span-2 bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/10 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold font-headline">User Growth</h3>
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">2024</span>
          </div>
          <div className="flex items-end gap-3 h-40">
            {userGrowth.map((val, i) => (
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
        <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/10 shadow-sm">
          <h3 className="text-xl font-bold font-headline mb-6">Top Topics</h3>
          <div className="space-y-5">
            {topTopics.map((topic) => (
              <div key={topic.name}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="font-semibold truncate max-w-[60%]">{topic.name}</span>
                  <span className="text-on-surface-variant">{topic.sessions.toLocaleString()}</span>
                </div>
                <ProgressBar value={topic.percent} showLabel={false} size="sm" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Funnel */}
      <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/10 shadow-sm">
        <h3 className="text-xl font-bold font-headline mb-8">User Engagement Funnel</h3>
        <div className="space-y-4">
          {funnelSteps.map((step, index) => (
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
