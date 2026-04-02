import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import Icon from '@components/ui/Icon'
import { authApi } from '@lib/api'

// ─── Password-strength helper ─────────────────────────────────────────────────

function getStrength(pw: string): { score: number; label: string; color: string } {
  let score = 0
  if (pw.length >= 8) score++
  if (/[A-Z]/.test(pw)) score++
  if (/[0-9]/.test(pw)) score++
  if (/[^A-Za-z0-9]/.test(pw)) score++

  if (score <= 1) return { score, label: 'Weak',   color: 'bg-red-500' }
  if (score === 2) return { score, label: 'Fair',   color: 'bg-orange-400' }
  if (score === 3) return { score, label: 'Good',   color: 'bg-yellow-400' }
  return             { score, label: 'Strong', color: 'bg-emerald-500' }
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token') ?? undefined
  const navigate  = useNavigate()

  const [password, setPassword]   = useState('')
  const [confirm, setConfirm]     = useState('')
  const [showPw, setShowPw]       = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [done, setDone]           = useState(false)
  const [error, setError]         = useState<string | null>(null)

  const strength  = getStrength(password)
  const mismatch  = confirm.length > 0 && password !== confirm
  const canSubmit = password.length >= 8 && password === confirm && !isLoading

  // Guard: no token in URL → invalid link state
  if (!token) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-red-500/10 dark:bg-red-500/15 rounded-full blur-3xl" />
        </div>

        <div className="w-full max-w-md relative z-10 animate-fade-in text-center">
          <Link to="/" className="flex justify-center mb-10">
            <span className="text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-400 dark:to-accent-500">
              PrepMate
            </span>
          </Link>

          <div className="rounded-3xl p-8 border shadow-xl bg-white border-slate-200 shadow-slate-200/60 dark:bg-[#1E1E1E] dark:border-white/[0.08] dark:shadow-black/40">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-100 dark:bg-red-500/15 flex items-center justify-center">
              <Icon name="link_off" className="text-red-600 dark:text-red-400 !text-3xl" />
            </div>
            <h1 className="text-2xl font-black font-headline text-on-surface dark:text-white mb-3">
              Invalid reset link
            </h1>
            <p className="text-on-surface-variant dark:text-white/60 text-sm mb-8 leading-relaxed">
              This password reset link is invalid or has expired. Please request a new one.
            </p>
            <Link
              to="/forgot-password"
              className="inline-flex items-center gap-2 w-full justify-center py-3.5 rounded-xl font-bold text-sm text-white transition-all
                bg-primary-600 hover:bg-primary-500
                shadow-md shadow-primary-500/25 hover:shadow-lg hover:shadow-primary-500/40
                dark:bg-primary-500 dark:hover:bg-primary-400 dark:text-on-surface
                dark:shadow-[0_4px_20px_rgba(187,134,252,0.4)]"
            >
              <Icon name="lock_reset" size="sm" />
              Request New Link
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Success state
  if (done) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-emerald-500/10 dark:bg-emerald-500/15 rounded-full blur-3xl" />
        </div>

        <div className="w-full max-w-md relative z-10 animate-fade-in text-center">
          <Link to="/" className="flex justify-center mb-10">
            <span className="text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-400 dark:to-accent-500">
              PrepMate
            </span>
          </Link>

          <div className="rounded-3xl p-8 border shadow-xl bg-white border-slate-200 shadow-slate-200/60 dark:bg-[#1E1E1E] dark:border-white/[0.08] dark:shadow-black/40">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-emerald-100 dark:bg-emerald-500/15 flex items-center justify-center">
              <Icon name="check_circle" className="text-emerald-600 dark:text-emerald-400 !text-3xl" />
            </div>
            <h1 className="text-2xl font-black font-headline text-on-surface dark:text-white mb-3">
              Password updated!
            </h1>
            <p className="text-on-surface-variant dark:text-white/60 text-sm mb-8 leading-relaxed">
              Your password has been reset successfully. You can now sign in with your new password.
            </p>
            <button
              onClick={() => navigate('/login', { replace: true })}
              className="w-full py-3.5 rounded-xl font-bold text-sm text-white transition-all
                bg-primary-600 hover:bg-primary-500
                shadow-md shadow-primary-500/25 hover:shadow-lg hover:shadow-primary-500/40
                dark:bg-primary-500 dark:hover:bg-primary-400 dark:text-on-surface
                dark:shadow-[0_4px_20px_rgba(187,134,252,0.4)]
                active:scale-[0.98]"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Main form
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!canSubmit || !token) return
    setError(null)
    setIsLoading(true)
    try {
      await authApi.resetPassword(token, password)
      setDone(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Reset failed. The link may have expired.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary-500/10 dark:bg-primary-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-accent-500/10 dark:bg-accent-500/15 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10 animate-fade-in">
        <Link to="/" className="flex justify-center mb-10">
          <span className="text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-400 dark:to-accent-500">
            PrepMate
          </span>
        </Link>

        <div className="rounded-3xl p-8 border shadow-xl bg-white border-slate-200 shadow-slate-200/60 dark:bg-[#1E1E1E] dark:border-white/[0.08] dark:shadow-black/40">
          <div className="w-14 h-14 mb-6 rounded-2xl bg-primary-500/10 dark:bg-primary-500/20 flex items-center justify-center">
            <Icon name="lock" className="text-primary-600 dark:text-primary-400 !text-2xl" />
          </div>
          <h1 className="text-2xl font-black font-headline text-on-surface dark:text-white mb-1">
            Set new password
          </h1>
          <p className="text-on-surface-variant dark:text-white/60 mb-8 text-sm">
            Choose a strong password — at least 8 characters.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* New Password */}
            <div>
              <label
                htmlFor="reset-new-pw"
                className="block text-sm font-semibold text-on-surface dark:text-white mb-1.5"
              >
                New Password
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
                  lock
                </span>
                <input
                  id="reset-new-pw"
                  type={showPw ? 'text' : 'password'}
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Min. 8 characters"
                  className="w-full pl-10 pr-11 py-3 rounded-xl text-sm border outline-none transition-all
                    bg-slate-50 border-slate-200 text-on-surface placeholder:text-on-surface-variant
                    focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20 focus:bg-white
                    dark:bg-white/5 dark:border-white/[0.08] dark:text-white dark:placeholder:text-white/40
                    dark:focus:border-primary-400/70 dark:focus:ring-primary-500/20 dark:focus:bg-white/10"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  aria-label={showPw ? 'Hide password' : 'Show password'}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface dark:hover:text-white transition-colors"
                >
                  <Icon name={showPw ? 'visibility_off' : 'visibility'} size="sm" />
                </button>
              </div>

              {/* Strength meter */}
              {password.length > 0 && (
                <div className="mt-2 space-y-1.5">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((level) => (
                      <div
                        key={level}
                        className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                          strength.score >= level
                            ? strength.color
                            : 'bg-slate-200 dark:bg-white/10'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-on-surface-variant dark:text-white/50">
                    Strength:{' '}
                    <span className="font-semibold text-on-surface dark:text-white">
                      {strength.label}
                    </span>
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="reset-confirm-pw"
                className="block text-sm font-semibold text-on-surface dark:text-white mb-1.5"
              >
                Confirm Password
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
                  lock_reset
                </span>
                <input
                  id="reset-confirm-pw"
                  type={showPw ? 'text' : 'password'}
                  autoComplete="new-password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  required
                  placeholder="Repeat your password"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl text-sm border outline-none transition-all
                    bg-slate-50 text-on-surface placeholder:text-on-surface-variant
                    focus:ring-2 focus:bg-white
                    dark:bg-white/5 dark:text-white dark:placeholder:text-white/40 dark:focus:bg-white/10
                    ${
                      mismatch
                        ? 'border-red-400 focus:border-red-400 focus:ring-red-500/20 dark:border-red-500/60 dark:focus:ring-red-500/20'
                        : 'border-slate-200 focus:border-primary-400 focus:ring-primary-500/20 dark:border-white/[0.08] dark:focus:border-primary-400/70 dark:focus:ring-primary-500/20'
                    }`}
                />
              </div>
              {mismatch && (
                <p className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400">
                  Passwords do not match.
                </p>
              )}
            </div>

            {/* Server error */}
            {error && (
              <div
                role="alert"
                className="flex items-center gap-2 p-3 rounded-xl text-sm font-medium
                  bg-red-50 border border-red-200 text-red-700
                  dark:bg-error/10 dark:border-error/30 dark:text-red-400"
              >
                <Icon name="error" size="sm" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={!canSubmit}
              className="w-full py-3.5 rounded-xl font-bold text-sm text-white transition-all
                bg-primary-600 hover:bg-primary-500
                shadow-md shadow-primary-500/25 hover:shadow-lg hover:shadow-primary-500/40
                disabled:opacity-50 disabled:pointer-events-none
                dark:bg-primary-500 dark:hover:bg-primary-400 dark:text-on-surface
                dark:shadow-[0_4px_20px_rgba(187,134,252,0.4)]
                active:scale-[0.98]"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <Icon name="progress_activity" size="sm" className="animate-spin" />
                  Updating…
                </span>
              ) : (
                'Update Password'
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-on-surface-variant dark:text-white/50">
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 font-bold text-primary-600 dark:text-primary-400 hover:text-primary-500 dark:hover:text-primary-300 transition-colors"
            >
              <Icon name="arrow_back" size="sm" />
              Back to Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
