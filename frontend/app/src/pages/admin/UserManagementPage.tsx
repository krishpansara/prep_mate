import AdminShell from '@components/layout/AdminShell'
import Button from '@components/ui/Button'
import Icon from '@components/ui/Icon'
import Badge from '@components/ui/Badge'

type UserStatus = 'active' | 'blocked' | 'pending'

interface UserRow {
  id: string
  name: string
  email: string
  joinedDate: string
  progress: number
  level: number
  status: UserStatus
  initials: string
}

const users: UserRow[] = [
  { id: '1', name: 'Sarah Connor',  email: 's.connor@sky-net.io',      joinedDate: 'Oct 24, 2023', progress: 75, level: 12, status: 'active',  initials: 'SC' },
  { id: '2', name: 'Marcus Wright', email: 'm.wright@resistance.org',   joinedDate: 'Nov 02, 2023', progress: 35, level:  4, status: 'blocked', initials: 'MW' },
  { id: '3', name: 'Kyle Reese',    email: 'k.reese@tech-com.net',      joinedDate: 'Dec 15, 2023', progress: 90, level: 28, status: 'active',  initials: 'KR' },
  { id: '4', name: 'Dani Ramos',    email: 'd.ramos@mex-city.dev',      joinedDate: 'Jan 05, 2024', progress: 55, level:  8, status: 'active',  initials: 'DR' },
]

const statsCards = [
  {
    icon: 'group',
    iconBg: 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300',
    value: '2,548',
    label: 'Total Registered Users',
    badge: '+12% vs last month',
    badgeColor: 'text-on-success-container bg-success-container/60 dark:bg-success-container/30',
  },
  {
    icon: 'task_alt',
    iconBg: 'bg-success-container/50 dark:bg-success-container/20 text-on-success-container dark:text-success',
    value: '84.2%',
    label: 'Average Platform Engagement',
    badge: 'System Health: Optimal',
    badgeColor: 'text-on-surface-variant bg-slate-100 dark:bg-surface-container',
  },
  {
    icon: 'block',
    iconBg: 'bg-error-container/50 dark:bg-error-container/30 text-on-error-container dark:text-error',
    value: '14',
    label: 'Blocked Accounts (Manual Review)',
    badge: null,
    badgeColor: '',
  },
]

const statusBadgeMap: Record<UserStatus, { label: string; variant: 'primary' | 'secondary' | 'tertiary' | 'error' | 'success' | 'neutral' }> = {
  active:  { label: 'Active',  variant: 'success' },
  blocked: { label: 'Blocked', variant: 'error' },
  pending: { label: 'Pending', variant: 'neutral' },
}

const accessLogs = [
  { color: 'bg-primary-500',  msg: 'Security Update: Two-Factor enforced for Admins',             time: '2 hours ago' },
  { color: 'bg-success',      msg: "Bulk Upload: 120 users added from 'Stanford Eng' pool",       time: '5 hours ago' },
  { color: 'bg-error',        msg: 'Alert: Failed login attempts from unknown IP',                 time: 'Yesterday, 11:45 PM' },
]

export default function UserManagementPage() {
  return (
    <AdminShell>
      {/* Header */}
      <section className="mb-10 flex flex-wrap gap-6 justify-between items-end">
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2 font-headline text-on-surface">
            User Ecosystem
          </h2>
          <p className="text-on-surface-variant max-w-lg leading-relaxed">
            Manage your community of high-potential engineers. Monitor progress, handle access control, and review performance metrics.
          </p>
        </div>
        <div className="flex gap-3 flex-wrap">
          <Button variant="secondary" size="sm" icon="download" iconPosition="left">Export CSV</Button>
          <Button variant="primary"   size="sm" icon="person_add" iconPosition="left">Add New User</Button>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
        {statsCards.map((s) => (
          <div
            key={s.label}
            className="bg-white dark:bg-surface-container-lowest p-6 rounded-2xl
              border border-slate-200 dark:border-white/[0.08]
              shadow-card-light dark:shadow-card-dark
              hover-card-premium"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${s.iconBg}`}>
                <Icon name={s.icon} size="sm" />
              </div>
              {s.badge && (
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${s.badgeColor}`}>{s.badge}</span>
              )}
            </div>
            <h4 className="text-3xl font-extrabold font-headline text-on-surface">{s.value}</h4>
            <p className="text-on-surface-variant text-sm font-medium mt-1">{s.label}</p>
          </div>
        ))}
      </section>

      {/* Filter bar */}
      <section className="mb-5 flex flex-wrap items-center gap-3">
        {['Status: All', 'Topic: Data Structures', 'Join Date: Last 30 Days'].map((filter) => (
          <div
            key={filter}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium cursor-pointer transition-all
              bg-white dark:bg-surface-container-low
              border border-slate-200 dark:border-white/[0.08]
              text-on-surface-variant hover:text-on-surface
              hover:border-slate-300 dark:hover:border-white/15
              hover:bg-slate-50 dark:hover:bg-white/6"
          >
            <Icon name="filter_list" size="xs" />
            <span>{filter}</span>
          </div>
        ))}
        <div className="ml-auto flex items-center gap-4">
          <p className="text-xs text-on-surface-variant">Showing 1-10 of 2,548 users</p>
          <div className="flex gap-1">
            <button className="p-2 rounded-xl transition-colors text-on-surface-variant hover:bg-slate-100 hover:text-on-surface dark:hover:bg-white/8 dark:hover:text-on-surface">
              <Icon name="chevron_left" size="sm" />
            </button>
            <button className="p-2 rounded-xl transition-colors text-on-surface-variant hover:bg-slate-100 hover:text-on-surface dark:hover:bg-white/8 dark:hover:text-on-surface">
              <Icon name="chevron_right" size="sm" />
            </button>
          </div>
        </div>
      </section>

      {/* User table */}
      <div
        className="bg-white dark:bg-surface-container-lowest rounded-3xl overflow-hidden mb-10
          border border-slate-200 dark:border-white/[0.08]
          shadow-card-light dark:shadow-card-dark"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-surface-container-low/60">
                {['User Profile', 'Joined Date', 'Progress', 'Status', 'Actions'].map((col) => (
                  <th
                    key={col}
                    className="px-8 py-5 text-[11px] font-bold uppercase tracking-[0.1em] text-on-surface-variant last:text-right"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/[0.04]">
              {users.map((user) => {
                const statusConfig = statusBadgeMap[user.status]
                const circumference = 2 * Math.PI * 16
                const dashOffset = circumference * (1 - user.progress / 100)

                return (
                  <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-white/3 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-11 h-11 rounded-full flex-shrink-0 flex items-center justify-center text-sm font-bold
                          bg-primary-100 dark:bg-primary-container
                          text-primary-800 dark:text-on-primary-container
                          border-2 border-primary-200 dark:border-primary-700/50">
                          {user.initials}
                        </div>
                        <div>
                          <p className="font-bold text-on-surface">{user.name}</p>
                          <p className="text-xs text-on-surface-variant mt-0.5">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6 text-sm text-on-surface-variant">{user.joinedDate}</td>
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 flex-shrink-0">
                          <svg className="w-full h-full transform -rotate-90" role="img" aria-label={`${user.progress}% progress`}>
                            <circle
                              className="text-slate-200 dark:text-surface-container-high"
                              cx="20" cy="20" fill="transparent" r="16"
                              stroke="currentColor" strokeWidth="3"
                            />
                            <circle
                              className="text-success"
                              cx="20" cy="20" fill="transparent" r="16"
                              stroke="currentColor"
                              strokeDasharray={circumference}
                              strokeDashoffset={dashOffset}
                              strokeWidth="3"
                              strokeLinecap="round"
                            />
                          </svg>
                          <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-on-surface">
                            {user.progress}%
                          </span>
                        </div>
                        <span className="text-xs font-medium text-on-surface-variant">Level {user.level}</span>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <Badge label={statusConfig.label} variant={statusConfig.variant} uppercase />
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          className="p-2 rounded-xl transition-colors
                            hover:bg-primary-50 text-primary-600
                            dark:hover:bg-primary-900/40 dark:text-primary-400"
                          aria-label="Edit user"
                        >
                          <Icon name="edit" size="sm" />
                        </button>
                        {user.status === 'active' ? (
                          <button
                            className="p-2 rounded-xl transition-colors
                              hover:bg-error-container/40 text-error
                              dark:hover:bg-error-container/50"
                            aria-label="Block user"
                          >
                            <Icon name="block" size="sm" />
                          </button>
                        ) : (
                          <button
                            className="p-2 rounded-xl transition-colors
                              hover:bg-success-container/50 text-on-success-container dark:text-success
                              dark:hover:bg-success-container/30"
                            aria-label="Unblock user"
                          >
                            <Icon name="verified_user" size="sm" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Access logs */}
        <div
          className="bg-white dark:bg-surface-container-low p-8 rounded-3xl
            border border-slate-200 dark:border-white/[0.08]
            shadow-card-light dark:shadow-card-dark
            hover-card-premium"
        >
          <h3 className="text-lg font-bold mb-5 font-headline text-on-surface">Access Logs</h3>
          <div className="space-y-4">
            {accessLogs.map((log) => (
              <div key={log.msg} className="flex items-start gap-4">
                <div className={`mt-1.5 w-2 h-2 rounded-full ${log.color} shrink-0`} />
                <div>
                  <p className="text-sm font-semibold text-on-surface">{log.msg}</p>
                  <p className="text-xs text-on-surface-variant mt-0.5">{log.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-8 text-primary text-xs font-bold flex items-center gap-1.5 hover:gap-3 transition-all hover:text-primary-700 dark:hover:text-primary-300">
            VIEW AUDIT TRAIL <Icon name="arrow_forward" size="xs" />
          </button>
        </div>

        {/* Retention mini-chart */}
        <div
          className="bg-white dark:bg-surface-container-lowest p-8 rounded-3xl overflow-hidden relative group
            border border-slate-200 dark:border-white/[0.08]
            shadow-card-light dark:shadow-card-dark
            hover-card-premium"
        >
          {/* Decorative blob */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/5 dark:bg-primary-500/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
          <h3 className="text-lg font-bold mb-5 font-headline text-on-surface">Retention Analysis</h3>
          <div className="flex items-end gap-2 h-28 mb-4">
            {[40, 55, 75, 60, 90, 82, 45].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-lg transition-all"
                style={{
                  height: `${h}%`,
                  background: h >= 80
                    ? 'rgb(var(--color-primary-500))'
                    : h >= 60
                    ? 'rgb(var(--color-primary-500) / 0.4)'
                    : 'rgb(var(--color-primary-500) / 0.15)',
                }}
              />
            ))}
          </div>
          <div className="flex justify-between text-[10px] font-bold text-on-surface-variant uppercase">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>
        </div>
      </section>
    </AdminShell>
  )
}
