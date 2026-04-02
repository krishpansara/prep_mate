import { useState, useEffect, useRef } from 'react'
import Card from '@components/ui/Card'
import Button from '@components/ui/Button'
import Icon from '@components/ui/Icon'
import Badge from '@components/ui/Badge'
import { useAuth } from '@contexts/AuthContext'

export default function ProfilePage() {
  const { user, logout, updateProfile } = useAuth()
  const [name, setName]         = useState(user?.name ?? '')
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl ?? '')
  const [saved, setSaved]       = useState(false)
  const [editing, setEditing]   = useState(false)
  const savedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (savedTimerRef.current) clearTimeout(savedTimerRef.current)
    }
  }, [])

  if (!user) return null

  const handleSave = () => {
    updateProfile({ name, avatarUrl })
    setEditing(false)
    setSaved(true)
    if (savedTimerRef.current) clearTimeout(savedTimerRef.current)
    savedTimerRef.current = setTimeout(() => setSaved(false), 3000)
  }

  const stats = [
    { label: 'Day Streak',       value: '14',  icon: 'local_fire_department', color: 'text-accent-500 dark:text-accent-400' },
    { label: 'Problems Solved',  value: '142', icon: 'check_circle',           color: 'text-primary-600 dark:text-primary-400' },
    { label: 'Concepts Learned', value: '38',  icon: 'school',                 color: 'text-green-600 dark:text-green-400' },
    { label: 'Hours Practiced',  value: '56',  icon: 'schedule',               color: 'text-orange-600 dark:text-orange-400' },
  ]

  return (
    <>
      <header className="mb-10">
        <h1 className="text-3xl font-black font-headline text-on-surface dark:text-white tracking-tight">
          My Profile
        </h1>
        <p className="text-on-surface-variant dark:text-white/60 mt-1">
          Manage your personal information and progress.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Avatar + Identity */}
        <div className="lg:col-span-1">
          <Card variant="elevated" className="text-center">
            <div className="relative w-28 h-28 mx-auto mb-5">
              <img
                src={editing ? avatarUrl : user.avatarUrl}
                alt={user.name}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.name)}`
                }}
                className="w-full h-full rounded-full object-cover border-4 border-primary-200 dark:border-primary-400/40 shadow-lg"
              />
              <span className="absolute bottom-0 right-0 w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center shadow-md">
                <Icon name="verified" size="sm" className="text-white dark:text-on-surface" />
              </span>
            </div>

            <h2 className="text-xl font-black font-headline text-on-surface dark:text-white">{user.name}</h2>
            <p className="text-sm text-on-surface-variant dark:text-white/60 mt-1 mb-3">{user.email}</p>

            <Badge
              label={user.role === 'admin' ? 'Admin' : 'Learner'}
              variant={user.role === 'admin' ? 'secondary' : 'primary'}
              className="mb-5"
            />

            <div className="text-xs text-on-surface-variant dark:text-white/40 border-t border-slate-200 dark:border-white/[0.06] pt-4">
              Member since <strong className="text-on-surface dark:text-white">{user.joinedAt}</strong>
            </div>

            <button
              onClick={() => logout()}
              className="mt-5 w-full py-2.5 rounded-xl text-sm font-semibold transition-all
                border border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300
                dark:border-error/30 dark:text-red-400 dark:hover:bg-error/10"
            >
              Sign Out
            </button>
          </Card>
        </div>

        {/* Right: Info + Stats */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Edit form */}
          <Card>
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-lg text-on-surface dark:text-white">Personal Information</h3>
              {!editing && (
                <Button variant="secondary" size="sm" icon="edit" onClick={() => setEditing(true)}>
                  Edit
                </Button>
              )}
            </div>

            {saved && (
              <div className="flex items-center gap-2 p-3 rounded-xl mb-4 text-sm font-medium
                bg-green-50 border border-green-200 text-green-700
                dark:bg-green-500/10 dark:border-green-500/30 dark:text-green-400">
                <Icon name="check_circle" size="sm" />
                Profile saved!
              </div>
            )}

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-on-surface dark:text-white mb-1.5">
                  Display Name
                </label>
                {editing ? (
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl text-sm border outline-none transition-all
                      bg-slate-50 border-slate-200 text-on-surface
                      focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20 focus:bg-white
                      dark:bg-white/5 dark:border-white/[0.08] dark:text-white
                      dark:focus:border-primary-400/70 dark:focus:bg-white/10"
                  />
                ) : (
                  <p className="text-on-surface dark:text-white/90 font-medium">{user.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-on-surface dark:text-white mb-1.5">
                  Email
                </label>
                <p className="text-on-surface-variant dark:text-white/60 font-medium">{user.email}</p>
              </div>

              {editing && (
                <div>
                  <label className="block text-sm font-semibold text-on-surface dark:text-white mb-1.5">
                    Avatar URL
                  </label>
                  <input
                    value={avatarUrl}
                    onChange={(e) => setAvatarUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-4 py-3 rounded-xl text-sm border outline-none transition-all
                      bg-slate-50 border-slate-200 text-on-surface placeholder:text-on-surface-variant
                      focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20 focus:bg-white
                      dark:bg-white/5 dark:border-white/[0.08] dark:text-white dark:placeholder:text-white/40
                      dark:focus:border-primary-400/70 dark:focus:bg-white/10"
                  />
                </div>
              )}

              {editing && (
                <div className="flex gap-3 pt-2">
                  <Button variant="primary" size="sm" onClick={handleSave} disabled={!name.trim()}>
                    Save Changes
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => { setEditing(false); setName(user.name); setAvatarUrl(user.avatarUrl) }}>
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </Card>

          {/* Stats */}
          <Card variant="surface-low">
            <h3 className="font-bold text-lg text-on-surface dark:text-white mb-6">Learning Stats</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="flex flex-col items-center gap-2 p-4 rounded-2xl
                    bg-slate-50 border border-slate-200
                    dark:bg-white/5 dark:border-white/[0.06]"
                >
                  <Icon name={s.icon} className={`${s.color} !text-2xl`} />
                  <span className="text-2xl font-black text-on-surface dark:text-white">{s.value}</span>
                  <span className="text-xs font-semibold text-on-surface-variant dark:text-white/50 text-center leading-tight">{s.label}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </>
  )
}
