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
  { id: '1', name: 'Sarah Connor', email: 's.connor@sky-net.io', joinedDate: 'Oct 24, 2023', progress: 75, level: 12, status: 'active', initials: 'SC' },
  { id: '2', name: 'Marcus Wright', email: 'm.wright@resistance.org', joinedDate: 'Nov 02, 2023', progress: 35, level: 4, status: 'blocked', initials: 'MW' },
  { id: '3', name: 'Kyle Reese', email: 'k.reese@tech-com.net', joinedDate: 'Dec 15, 2023', progress: 90, level: 28, status: 'active', initials: 'KR' },
  { id: '4', name: 'Dani Ramos', email: 'd.ramos@mex-city.dev', joinedDate: 'Jan 05, 2024', progress: 55, level: 8, status: 'active', initials: 'DR' },
]

const statsCards = [
  {
    icon: 'group',
    iconBg: 'bg-primary/10 text-primary',
    value: '2,548',
    label: 'Total Registered Users',
    badge: '+12% vs last month',
    badgeColor: 'text-secondary bg-secondary/10',
  },
  {
    icon: 'task_alt',
    iconBg: 'bg-secondary/10 text-secondary',
    value: '84.2%',
    label: 'Average Platform Engagement',
    badge: 'System Health: Optimal',
    badgeColor: 'text-on-surface-variant',
  },
  {
    icon: 'block',
    iconBg: 'bg-error/10 text-error',
    value: '14',
    label: 'Blocked Accounts (Manual Review)',
    badge: null,
    badgeColor: '',
  },
]

const statusBadgeMap: Record<UserStatus, { label: string; variant: 'primary' | 'secondary' | 'tertiary' | 'error' | 'neutral' }> = {
  active: { label: 'Active', variant: 'secondary' },
  blocked: { label: 'Blocked', variant: 'error' },
  pending: { label: 'Pending', variant: 'neutral' },
}

const accessLogs = [
  { color: 'bg-primary', msg: 'Security Update: Two-Factor enforced for Admins', time: '2 hours ago' },
  { color: 'bg-secondary', msg: "Bulk Upload: 120 users added from 'Stanford Eng' pool", time: '5 hours ago' },
  { color: 'bg-error', msg: 'Alert: Failed login attempts from unknown IP', time: 'Yesterday, 11:45 PM' },
]

export default function UserManagementPage() {
  return (
    <AdminShell>
      {/* Header */}
      <section className="mb-12 flex flex-wrap gap-6 justify-between items-end">
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2 font-headline">User Ecosystem</h2>
          <p className="text-on-surface-variant max-w-lg leading-relaxed">
            Manage your community of high-potential engineers. Monitor progress, handle access control, and review performance metrics.
          </p>
        </div>
        <div className="flex gap-4 flex-wrap">
          <Button variant="secondary" size="sm" icon="download" iconPosition="left">
            Export CSV
          </Button>
          <Button variant="primary" size="sm" icon="person_add" iconPosition="left">
            Add New User
          </Button>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {statsCards.map((s) => (
          <div key={s.label} className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/10 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${s.iconBg}`}>
                <Icon name={s.icon} size="sm" />
              </div>
              {s.badge && (
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${s.badgeColor}`}>{s.badge}</span>
              )}
            </div>
            <h4 className="text-3xl font-extrabold font-headline">{s.value}</h4>
            <p className="text-on-surface-variant text-sm font-medium mt-1">{s.label}</p>
          </div>
        ))}
      </section>

      {/* Filter bar */}
      <section className="mb-6 flex flex-wrap items-center gap-4">
        {['Status: All', 'Topic: Data Structures', 'Join Date: Last 30 Days'].map((filter) => (
          <div key={filter} className="flex items-center gap-2 bg-surface-container-low px-4 py-2 rounded-xl text-sm font-medium border border-transparent hover:border-outline-variant/20 transition-all cursor-pointer">
            <Icon name="filter_list" size="xs" />
            <span>{filter}</span>
          </div>
        ))}
        <div className="ml-auto flex items-center gap-4">
          <p className="text-xs text-on-surface-variant">Showing 1-10 of 2,548 users</p>
          <div className="flex gap-1">
            <button className="p-2 hover:bg-surface-container rounded-xl transition-colors">
              <Icon name="chevron_left" size="sm" />
            </button>
            <button className="p-2 hover:bg-surface-container rounded-xl transition-colors">
              <Icon name="chevron_right" size="sm" />
            </button>
          </div>
        </div>
      </section>

      {/* User table */}
      <div className="bg-surface-container-lowest rounded-3xl overflow-hidden shadow-sm border border-outline-variant/10 mb-12">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low/50">
                {['User Profile', 'Joined Date', 'Progress', 'Status', 'Actions'].map((col) => (
                  <th
                    key={col}
                    className="px-8 py-5 text-[11px] font-bold uppercase tracking-[0.1em] text-on-surface-variant/70 last:text-right"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container">
              {users.map((user) => {
                const statusConfig = statusBadgeMap[user.status]
                const circumference = 2 * Math.PI * 16
                const dashOffset = circumference * (1 - user.progress / 100)

                return (
                  <tr key={user.id} className="hover:bg-surface-container-low/30 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container font-bold text-sm flex-shrink-0">
                          {user.initials}
                        </div>
                        <div>
                          <p className="font-bold text-on-surface">{user.name}</p>
                          <p className="text-xs text-on-surface-variant">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6 text-sm text-on-surface-variant">{user.joinedDate}</td>
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 flex-shrink-0">
                          <svg className="w-full h-full transform -rotate-90" role="img" aria-label={`${user.progress}% progress`}>
                            <circle className="text-surface-variant" cx="20" cy="20" fill="transparent" r="16" stroke="currentColor" strokeWidth="3" />
                            <circle
                              className="text-secondary"
                              cx="20" cy="20"
                              fill="transparent"
                              r="16"
                              stroke="currentColor"
                              strokeDasharray={circumference}
                              strokeDashoffset={dashOffset}
                              strokeWidth="3"
                            />
                          </svg>
                          <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold">
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
                        <button className="p-2 hover:bg-primary-container text-primary rounded-xl transition-colors" aria-label="Edit user">
                          <Icon name="edit" size="sm" />
                        </button>
                        {user.status === 'active' ? (
                          <button className="p-2 hover:bg-error-container/20 text-error rounded-xl transition-colors" aria-label="Block user">
                            <Icon name="block" size="sm" />
                          </button>
                        ) : (
                          <button className="p-2 hover:bg-secondary-container/20 text-secondary rounded-xl transition-colors" aria-label="Unblock user">
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
        <div className="bg-surface-container-high/40 p-8 rounded-3xl border border-outline-variant/5">
          <h3 className="text-lg font-bold mb-4 font-headline">Access Logs</h3>
          <div className="space-y-4">
            {accessLogs.map((log) => (
              <div key={log.msg} className="flex items-start gap-4">
                <div className={`mt-1 w-2 h-2 rounded-full ${log.color} shrink-0`} />
                <div>
                  <p className="text-sm font-semibold">{log.msg}</p>
                  <p className="text-xs text-on-surface-variant">{log.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-8 text-primary text-xs font-bold flex items-center gap-1 hover:gap-2 transition-all">
            VIEW AUDIT TRAIL <Icon name="arrow_forward" size="xs" />
          </button>
        </div>

        {/* Retention mini-chart */}
        <div className="bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant/10 shadow-sm overflow-hidden relative group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
          <h3 className="text-lg font-bold mb-4 font-headline">Retention Analysis</h3>
          <div className="flex items-end gap-2 h-32 mb-4">
            {[40, 55, 75, 60, 90, 82, 45].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-lg"
                style={{
                  height: `${h}%`,
                  background: h >= 80 ? 'var(--tw-color-primary, #0053db)' : h >= 60 ? 'rgba(0,83,219,0.4)' : 'rgba(0,83,219,0.2)',
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
