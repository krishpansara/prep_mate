import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import Icon from '@components/ui/Icon'
import { authApi } from '@lib/api'

export default function ForgotPasswordPage() {
  const [email, setEmail]           = useState('')
  const [submitted, setSubmitted]   = useState(false)
  const [isLoading, setIsLoading]   = useState(false)
  const [error, setError]           = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)
    try {
      await authApi.forgotPassword(email.trim())
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary-500/10 dark:bg-primary-500/15 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10 animate-fade-in">
        <Link to="/" className="flex justify-center mb-10">
          <span className="text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-400 dark:to-accent-500">
            PrepMate
          </span>
        </Link>

        <div className="rounded-3xl p-8 border shadow-xl bg-white border-slate-200 shadow-slate-200/60 dark:bg-[#1E1E1E] dark:border-white/[0.08] dark:shadow-black/40">
          {submitted ? (
            <div className="text-center py-4">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent-500/10 dark:bg-accent-500/20 flex items-center justify-center">
                <Icon name="mark_email_read" className="text-accent-500 !text-3xl" />
              </div>
              <h1 className="text-2xl font-black font-headline text-on-surface dark:text-white mb-3">
                Check your inbox
              </h1>
              <p className="text-on-surface-variant dark:text-white/60 text-sm mb-8 leading-relaxed">
                If <strong className="text-on-surface dark:text-white">{email}</strong> is registered,
                you'll receive a password reset link shortly.
              </p>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 font-bold text-primary-600 dark:text-primary-400 hover:text-primary-500 dark:hover:text-primary-300 transition-colors text-sm"
              >
                <Icon name="arrow_back" size="sm" />
                Back to Sign In
              </Link>
            </div>
          ) : (
            <>
              <div className="w-14 h-14 mb-6 rounded-2xl bg-primary-500/10 dark:bg-primary-500/20 flex items-center justify-center">
                <Icon name="lock_reset" className="text-primary-600 dark:text-primary-400 !text-2xl" />
              </div>
              <h1 className="text-2xl font-black font-headline text-on-surface dark:text-white mb-1">
                Reset your password
              </h1>
              <p className="text-on-surface-variant dark:text-white/60 mb-8 text-sm">
                Enter your email and we'll send you a reset link.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div>
                  <label htmlFor="reset-email" className="block text-sm font-semibold text-on-surface dark:text-white mb-1.5">
                    Email address
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
                      mail
                    </span>
                    <input
                      id="reset-email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="you@example.com"
                      className="w-full pl-10 pr-4 py-3 rounded-xl text-sm border outline-none transition-all
                        bg-slate-50 border-slate-200 text-on-surface placeholder:text-on-surface-variant
                        focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20 focus:bg-white
                        dark:bg-white/5 dark:border-white/[0.08] dark:text-white dark:placeholder:text-white/40
                        dark:focus:border-primary-400/70 dark:focus:ring-primary-500/20 dark:focus:bg-white/10"
                    />
                  </div>
                </div>

                {error && (
                  <div role="alert" className="flex items-center gap-2 p-3 rounded-xl text-sm font-medium bg-red-50 border border-red-200 text-red-700 dark:bg-red-500/10 dark:border-red-500/30 dark:text-red-400">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading || !email.includes('@')}
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
                      Sending…
                    </span>
                  ) : (
                    'Send Reset Link'
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
            </>
          )}
        </div>
      </div>
    </div>
  )
}
