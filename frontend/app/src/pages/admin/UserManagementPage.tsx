import { useState, useEffect } from 'react'
import AdminShell from '@components/layout/AdminShell'
import Button from '@components/ui/Button'
import Icon from '@components/ui/Icon'
import Badge from '@components/ui/Badge'
import { adminApi, type ApiUser } from '@lib/api'

type UserStatus = 'ACTIVE' | 'BLOCKED'

const statusBadgeMap: Record<UserStatus, { label: string; variant: 'primary' | 'secondary' | 'tertiary' | 'error' | 'success' | 'neutral' }> = {
  ACTIVE:  { label: 'Active',  variant: 'success' },
  BLOCKED: { label: 'Blocked', variant: 'error' },
}

export default function UserManagementPage() {
  const [users, setUsers] = useState<ApiUser[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalUsers, setTotalUsers] = useState(0)

  const fetchUsers = async (p = 1) => {
    setLoading(true)
    try {
      const res = await adminApi.listUsers({ page: p })
      setUsers(res.data)
      setTotalPages(res.pagination.totalPages)
      setTotalUsers(res.pagination.total)
      setPage(res.pagination.page)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers(1)
  }, [])

  const handleStatusToggle = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'ACTIVE' ? 'BLOCKED' : 'ACTIVE'
    try {
      await adminApi.setStatus(id, newStatus)
      setUsers((prev) => prev.map((u) => (u._id === id ? { ...u, status: newStatus } : u)))
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to change status')
    }
  }

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
        <div className="bg-white dark:bg-surface-container-lowest p-6 rounded-2xl border border-slate-200 dark:border-white/[0.08] shadow-card-light dark:shadow-card-dark hover-card-premium">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-xl bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300">
              <Icon name="group" size="sm" />
            </div>
          </div>
          <h4 className="text-3xl font-extrabold font-headline text-on-surface">{totalUsers}</h4>
          <p className="text-on-surface-variant text-sm font-medium mt-1">Total Registered Users</p>
        </div>
      </section>

      {/* Filter bar */}
      <section className="mb-5 flex flex-wrap items-center gap-3">
        <div className="ml-auto flex items-center gap-4">
          <p className="text-xs text-on-surface-variant">Page {page} of {totalPages}</p>
          <div className="flex gap-1">
            <button
              onClick={() => fetchUsers(page - 1)}
              disabled={page <= 1}
              className="p-2 rounded-xl transition-colors text-on-surface-variant hover:bg-slate-100 hover:text-on-surface dark:hover:bg-white/8 dark:hover:text-on-surface disabled:opacity-50"
            >
              <Icon name="chevron_left" size="sm" />
            </button>
            <button
               onClick={() => fetchUsers(page + 1)}
               disabled={page >= totalPages}
               className="p-2 rounded-xl transition-colors text-on-surface-variant hover:bg-slate-100 hover:text-on-surface dark:hover:bg-white/8 dark:hover:text-on-surface disabled:opacity-50"
            >
              <Icon name="chevron_right" size="sm" />
            </button>
          </div>
        </div>
      </section>

      {/* User table */}
      <div className="bg-white dark:bg-surface-container-lowest rounded-3xl overflow-hidden mb-10 border border-slate-200 dark:border-white/[0.08] shadow-card-light dark:shadow-card-dark">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-50 dark:bg-surface-container-low/60">
                {['User Profile', 'Joined Date', 'Role', 'Status', 'Actions'].map((col) => (
                  <th key={col} className="px-8 py-5 text-[11px] font-bold uppercase tracking-[0.1em] text-on-surface-variant last:text-right">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/[0.04]">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-8 py-6"><div className="h-10 w-48 bg-slate-200 dark:bg-white/10 rounded-md" /></td>
                    <td className="px-6 py-6"><div className="h-4 w-24 bg-slate-200 dark:bg-white/10 rounded-md" /></td>
                    <td className="px-6 py-6"><div className="h-4 w-16 bg-slate-200 dark:bg-white/10 rounded-md" /></td>
                    <td className="px-6 py-6"><div className="h-6 w-20 bg-slate-200 dark:bg-white/10 rounded-full" /></td>
                    <td className="px-8 py-6"><div className="h-8 w-16 bg-slate-200 dark:bg-white/10 rounded-md ml-auto" /></td>
                  </tr>
                ))
              ) : users.map((user) => {
                const statusConfig = statusBadgeMap[user.status as UserStatus] || statusBadgeMap['ACTIVE']
                const initials = user.name.split(' ').map((n) => n[0]).join('').substring(0, 2).toUpperCase()

                return (
                  <tr key={user._id} className="hover:bg-slate-50 dark:hover:bg-white/3 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-11 h-11 rounded-full flex-shrink-0 flex items-center justify-center text-sm font-bold bg-primary-100 dark:bg-primary-container text-primary-800 dark:text-on-primary-container border-2 border-primary-200 dark:border-primary-700/50">
                          {initials}
                        </div>
                        <div>
                          <p className="font-bold text-on-surface">{user.name}</p>
                          <p className="text-xs text-on-surface-variant mt-0.5">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6 text-sm text-on-surface-variant">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-6 text-sm text-on-surface-variant">
                      {user.role}
                    </td>
                    <td className="px-6 py-6">
                      <Badge label={statusConfig.label} variant={statusConfig.variant} uppercase />
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 rounded-xl transition-colors hover:bg-primary-50 text-primary-600 dark:hover:bg-primary-900/40 dark:text-primary-400" aria-label="Edit user">
                          <Icon name="edit" size="sm" />
                        </button>
                        {user.status === 'ACTIVE' ? (
                          <button onClick={() => handleStatusToggle(user._id, user.status)} className="p-2 rounded-xl transition-colors hover:bg-error-container/40 text-error dark:hover:bg-error-container/50" aria-label="Block user">
                            <Icon name="block" size="sm" />
                          </button>
                        ) : (
                          <button onClick={() => handleStatusToggle(user._id, user.status)} className="p-2 rounded-xl transition-colors hover:bg-success-container/50 text-on-success-container dark:text-success dark:hover:bg-success-container/30" aria-label="Unblock user">
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
    </AdminShell>
  )
}
