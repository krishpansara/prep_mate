import { Link } from 'react-router-dom'
import AdminShell from '@components/layout/AdminShell'
import Icon from '@components/ui/Icon'
import ProgressBar from '@components/ui/ProgressBar'

const metrics = [
  {
    label: 'Total Users',
    value: '12,402',
    icon: 'group',
    trend: '+4.2% from last month',
    trendColor: 'text-secondary',
    trendIcon: 'trending_up',
  },
  {
    label: 'Total Topics',
    value: '24',
    icon: 'category',
    trend: '6 topics added this quarter',
    trendColor: 'text-on-surface-variant',
    trendIcon: 'inventory_2',
  },
  {
    label: 'Total Questions',
    value: '1,250',
    icon: 'quiz',
    trend: '98% verified accuracy',
    trendColor: 'text-primary',
    trendIcon: 'verified',
  },
  {
    label: 'Avg. Engagement',
    value: '88%',
    icon: 'bolt',
    trend: null,
    trendColor: '',
    trendIcon: '',
  },
]

const activityFeed = [
  {
    icon: 'post_add',
    bg: 'bg-primary-container',
    iconColor: 'text-on-primary-container',
    title: 'New Concept Added: Python Lists',
    desc: 'Admin added 12 new core concepts to the "Data Structures" topic.',
    time: '14 MINUTES AGO',
  },
  {
    icon: 'military_tech',
    bg: 'bg-secondary-container',
    iconColor: 'text-on-secondary-container',
    title: 'User Milestone: 50 Questions',
    desc: 'User @jdoe_dev reached the "Silver Scholar" rank.',
    time: '1 HOUR AGO',
  },
  {
    icon: 'edit',
    bg: 'bg-surface-container-high',
    iconColor: 'text-on-surface',
    title: 'Question Revised: Binary Search',
    desc: 'Constraint updated from O(N) to O(log N) for consistency check.',
    time: '3 HOURS AGO',
  },
]

const quickActions = [
  { icon: 'library_add', label: '+ Add Topic', sub: 'Expand curriculum', href: '/admin/topics/new' },
  { icon: 'help_center', label: '+ Add Question', sub: 'Grow question bank', href: '/admin/questions/new' },
  { icon: 'auto_stories', label: '+ Add Concept', sub: 'Define core terms', href: '/admin/concepts/new' },
]

const topicDistribution = [
  { label: 'Algorithms', percent: 75, color: 'bg-primary' },
  { label: 'Sys Design', percent: 45, color: 'bg-primary-dim' },
  { label: 'DevOps', percent: 20, color: 'bg-outline-variant' },
]

export default function AdminDashboardPage() {
  return (
    <AdminShell>
      {/* Hero heading */}
      <section className="space-y-1 mb-8">
        <h2 className="text-3xl md:text-4xl font-extrabold font-headline tracking-tighter text-on-surface">
          Dashboard Overview
        </h2>
        <p className="text-on-surface-variant max-w-2xl leading-relaxed">
          Welcome back. Zenith Prep's user engagement is up by 12% this week. Here is your current platform snapshot.
        </p>
      </section>

      {/* Metrics bento */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((m) => (
          <div key={m.label} className="bg-surface-container-lowest p-6 rounded-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Icon name={m.icon} size="xl" />
            </div>
            <p className="text-sm font-medium text-on-surface-variant mb-1">{m.label}</p>
            <p className="text-3xl font-extrabold font-headline text-on-surface">{m.value}</p>
            {m.trend && (
              <div className={`mt-4 flex items-center gap-1 text-xs font-semibold ${m.trendColor}`}>
                {m.trendIcon && <Icon name={m.trendIcon} size="xs" />}
                <span>{m.trend}</span>
              </div>
            )}
            {m.label === 'Avg. Engagement' && (
              <div className="mt-4">
                <ProgressBar value={88} showLabel={false} size="sm" />
              </div>
            )}
          </div>
        ))}
      </section>

      {/* Main section: activity feed + quick actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Activity feed */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold font-headline text-on-surface">Recent Activity</h3>
            <button className="text-sm text-primary font-semibold hover:underline">View all activity</button>
          </div>
          <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm divide-y divide-surface-container-low">
            {activityFeed.map((item) => (
              <div key={item.title} className="p-6 hover:bg-surface-container-low transition-colors flex gap-4 items-start">
                <div className={`${item.bg} p-2 rounded-xl flex-shrink-0`}>
                  <Icon name={item.icon} className={item.iconColor} size="sm" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-on-surface font-semibold">{item.title}</p>
                  <p className="text-sm text-on-surface-variant mt-0.5">{item.desc}</p>
                  <p className="text-[10px] text-on-surface-variant mt-2 font-medium">{item.time}</p>
                </div>
                <button aria-label="More" className="p-2 text-on-surface-variant hover:text-on-surface flex-shrink-0">
                  <Icon name="more_vert" size="sm" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold font-headline text-on-surface">Quick Actions</h3>
          <div className="grid grid-cols-1 gap-4">
            {quickActions.map((a) => (
              <Link
                key={a.label}
                to={a.href}
                className="group flex items-center justify-between p-4 bg-surface-container-lowest border-b-2 border-transparent hover:border-primary rounded-2xl transition-all text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-2 rounded-xl text-primary">
                    <Icon name={a.icon} size="sm" />
                  </div>
                  <div>
                    <p className="font-bold text-on-surface leading-tight">{a.label}</p>
                    <p className="text-xs text-on-surface-variant">{a.sub}</p>
                  </div>
                </div>
                <Icon name="chevron_right" className="text-on-surface-variant group-hover:translate-x-1 transition-transform" size="sm" />
              </Link>
            ))}
          </div>

          {/* Platform health */}
          <div className="bg-surface-dim/40 rounded-2xl p-6 mt-8">
            <div className="flex items-center gap-2 mb-4">
              <Icon name="verified_user" className="text-secondary" size="sm" />
              <span className="text-sm font-bold text-on-surface">Platform Health</span>
            </div>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              System performance is optimal. All 14 microservices are operational.
            </p>
            <div className="mt-4 flex gap-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex-1 h-1 bg-secondary rounded-full" />
              ))}
              <div className="flex-1 h-1 bg-secondary rounded-full opacity-30" />
            </div>
          </div>
        </div>
      </div>

      {/* Topic distribution */}
      <section className="bg-surface-container-low p-8 rounded-2xl flex flex-col md:flex-row items-center gap-8 border border-outline-variant/10">
        <div className="flex-1">
          <h4 className="text-2xl font-bold font-headline mb-3">Topic Distribution</h4>
          <p className="text-on-surface-variant mb-6">
            Algorithm fundamentals remain the most populated category, followed by System Design.
          </p>
          <div className="space-y-4">
            {topicDistribution.map((t) => (
              <div key={t.label} className="flex items-center gap-4">
                <span className="text-xs font-bold w-24 uppercase">{t.label}</span>
                <div className="flex-1 h-2 bg-surface-container-high rounded-full overflow-hidden">
                  <div className={`${t.color} h-full rounded-full`} style={{ width: `${t.percent}%` }} />
                </div>
                <span className="text-xs font-bold">{t.percent}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full md:w-72 aspect-square bg-surface-container-lowest/80 backdrop-blur-xl rounded-2xl flex items-center justify-center shadow-xl border border-white/20">
          <div className="text-center">
            <p className="text-5xl font-extrabold text-primary font-headline">24</p>
            <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mt-2">Active Topics</p>
          </div>
        </div>
      </section>
    </AdminShell>
  )
}
