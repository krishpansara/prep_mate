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
    trendColor: 'text-success',
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
    bg: 'bg-primary-100 dark:bg-primary-container',
    iconColor: 'text-primary-700 dark:text-on-primary-container',
    title: 'New Concept Added: Python Lists',
    desc: 'Admin added 12 new core concepts to the "Data Structures" topic.',
    time: '14 MINUTES AGO',
  },
  {
    icon: 'military_tech',
    bg: 'bg-success-container',
    iconColor: 'text-on-success-container',
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
  { label: 'Algorithms', percent: 75, color: 'bg-primary-500' },
  { label: 'Sys Design', percent: 45, color: 'bg-accent-500' },
  { label: 'DevOps', percent: 20, color: 'bg-surface-container-highest dark:bg-outline' },
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
          Welcome back. PrepMate's user engagement is up by 12% this week. Here is your current platform snapshot.
        </p>
      </section>

      {/* Metrics bento */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {metrics.map((m) => (
          <div
            key={m.label}
            className="bg-white dark:bg-surface-container-lowest p-6 rounded-2xl relative overflow-hidden group
              border border-slate-200 dark:border-white/[0.08]
              shadow-card-light dark:shadow-card-dark
              hover-card-premium"
          >
            <div className="absolute top-0 right-0 p-4 opacity-[0.06] dark:opacity-10 group-hover:opacity-[0.12] dark:group-hover:opacity-15 transition-opacity">
              <Icon name={m.icon} size="xl" />
            </div>
            <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2">{m.label}</p>
            <p className="text-3xl font-extrabold font-headline text-on-surface">{m.value}</p>
            {m.trend && (
              <div className={`mt-4 flex items-center gap-1.5 text-xs font-semibold ${m.trendColor}`}>
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
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold font-headline text-on-surface">Recent Activity</h3>
            <button className="text-sm text-primary font-semibold hover:text-primary-700 dark:hover:text-primary-300 hover:underline transition-colors">
              View all activity
            </button>
          </div>
          <div
            className="bg-white dark:bg-surface-container-lowest rounded-2xl overflow-hidden
              border border-slate-200 dark:border-white/[0.08]
              shadow-card-light dark:shadow-card-dark
              divide-y divide-slate-100 dark:divide-white/[0.06]"
          >
            {activityFeed.map((item) => (
              <div
                key={item.title}
                className="p-5 flex gap-4 items-start transition-colors
                  hover:bg-slate-50 dark:hover:bg-white/4"
              >
                <div className={`${item.bg} p-2.5 rounded-xl flex-shrink-0`}>
                  <Icon name={item.icon} className={item.iconColor} size="sm" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-on-surface font-semibold">{item.title}</p>
                  <p className="text-sm text-on-surface-variant mt-0.5">{item.desc}</p>
                  <p className="text-[10px] text-on-surface-variant/70 mt-2 font-semibold tracking-wider">{item.time}</p>
                </div>
                <button aria-label="More" className="p-2 text-on-surface-variant hover:text-on-surface flex-shrink-0 rounded-xl hover:bg-slate-100 dark:hover:bg-white/8 transition-colors">
                  <Icon name="more_vert" size="sm" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold font-headline text-on-surface">Quick Actions</h3>
          <div className="grid grid-cols-1 gap-3">
            {quickActions.map((a) => (
              <Link
                key={a.label}
                to={a.href}
                className="group flex items-center justify-between p-4
                  bg-white dark:bg-surface-container-lowest
                  border border-slate-200 dark:border-white/[0.08]
                  hover:border-primary-300 dark:hover:border-primary-500/50
                  rounded-2xl transition-all duration-200
                  shadow-card-light dark:shadow-card-dark
                  hover:shadow-md hover:shadow-primary-100 dark:hover:shadow-[0_4px_20px_rgba(59,130,246,0.15)]"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-primary-50 dark:bg-primary-900/40 p-2.5 rounded-xl text-primary-700 dark:text-primary-300">
                    <Icon name={a.icon} size="sm" />
                  </div>
                  <div>
                    <p className="font-bold text-on-surface text-sm leading-tight">{a.label}</p>
                    <p className="text-xs text-on-surface-variant mt-0.5">{a.sub}</p>
                  </div>
                </div>
                <Icon name="chevron_right" className="text-on-surface-variant group-hover:translate-x-1 transition-transform" size="sm" />
              </Link>
            ))}
          </div>

          {/* Platform health */}
          <div
            className="bg-success-container/30 dark:bg-success-container/20 rounded-2xl p-5 mt-4
              border border-success/20 dark:border-success/15"
          >
            <div className="flex items-center gap-2 mb-3">
              <Icon name="verified_user" className="text-on-success-container dark:text-success" size="sm" />
              <span className="text-sm font-bold text-on-surface">Platform Health</span>
            </div>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              System performance is optimal. All 14 microservices are operational.
            </p>
            <div className="mt-4 flex gap-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex-1 h-1.5 bg-success rounded-full" />
              ))}
              <div className="flex-1 h-1.5 bg-success/20 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Topic distribution */}
      <section
        className="bg-white dark:bg-surface-container-low p-8 rounded-2xl
          flex flex-col md:flex-row items-center gap-8
          border border-slate-200 dark:border-white/[0.08]
          shadow-card-light dark:shadow-card-dark"
      >
        <div className="flex-1">
          <h4 className="text-2xl font-bold font-headline mb-3 text-on-surface">Topic Distribution</h4>
          <p className="text-on-surface-variant mb-6">
            Algorithm fundamentals remain the most populated category, followed by System Design.
          </p>
          <div className="space-y-4">
            {topicDistribution.map((t) => (
              <div key={t.label} className="flex items-center gap-4">
                <span className="text-xs font-bold w-24 text-on-surface-variant uppercase tracking-wider">{t.label}</span>
                <div className="flex-1 h-2 bg-slate-200 dark:bg-surface-container-high rounded-full overflow-hidden">
                  <div className={`${t.color} h-full rounded-full transition-all`} style={{ width: `${t.percent}%` }} />
                </div>
                <span className="text-xs font-bold text-on-surface-variant w-8 text-right">{t.percent}%</span>
              </div>
            ))}
          </div>
        </div>

        <div
          className="w-full md:w-64 aspect-square bg-primary-50 dark:bg-surface-container-lowest
            rounded-2xl flex items-center justify-center
            border border-primary-100 dark:border-white/10
            shadow-sm"
        >
          <div className="text-center">
            <p className="text-5xl font-extrabold text-primary-600 dark:text-primary font-headline">24</p>
            <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mt-2">Active Topics</p>
          </div>
        </div>
      </section>
    </AdminShell>
  )
}
