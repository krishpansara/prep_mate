import { useState, useEffect, useCallback, useRef } from 'react'
import type { ReactNode } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import Icon from '@components/ui/Icon'
import { authApi } from '@lib/api'

type VerifyState = 'verifying' | 'success' | 'error'

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token') ?? undefined
  const navigate   = useNavigate()
  const redirectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const [state, setState]             = useState<VerifyState>('verifying')
  const [resending, setResending]     = useState(false)
  const [resendSent, setResendSent]   = useState(false)

  const attemptVerification = useCallback(async () => {
    if (!token) {
      setState('error')
      return
    }
    setState('verifying')
    try {
      await authApi.verifyEmail(token)
      setState('success')
      // Auto-redirect to login after 3 s
      redirectTimerRef.current = setTimeout(() => navigate('/login', { replace: true }), 3000)
    } catch {
      setState('error')
    }
  }, [token, navigate])

  useEffect(() => {
    attemptVerification()
    return () => {
      if (redirectTimerRef.current) clearTimeout(redirectTimerRef.current)
    }
  }, [attemptVerification])

  const handleResend = async () => {
    setResending(true)
    await new Promise((r) => setTimeout(r, 900))
    setResending(false)
    setResendSent(true)
  }

  // ── Shared chrome ────────────────────────────────────────────────────────
  const PageShell = ({ children }: { children: ReactNode }) => (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary-500/10 dark:bg-primary-500/15 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10 animate-fade-in text-center">
        <Link to="/" className="flex justify-center mb-10">
          <span className="text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-400 dark:to-accent-500">
            PrepMate
          </span>
        </Link>
        <div className="rounded-3xl p-8 border shadow-xl bg-white border-slate-200 shadow-slate-200/60 dark:bg-[#1E1E1E] dark:border-white/[0.08] dark:shadow-black/40">
          {children}
        </div>
      </div>
    </div>
  )

  // ── Verifying ─────────────────────────────────────────────────────────────
  if (state === 'verifying') {
    return (
      <PageShell>
        <div className="py-8 flex flex-col items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-primary-500/10 dark:bg-primary-500/20 flex items-center justify-center">
            <Icon name="progress_activity" className="text-primary-600 dark:text-primary-400 !text-3xl animate-spin" />
          </div>
          <div>
            <h1 className="text-2xl font-black font-headline text-on-surface dark:text-white mb-2">
              Verifying your email…
            </h1>
            <p className="text-on-surface-variant dark:text-white/60 text-sm">
              This will only take a moment.
            </p>
          </div>
        </div>
      </PageShell>
    )
  }

  // ── Success ───────────────────────────────────────────────────────────────
  if (state === 'success') {
    return (
      <PageShell>
        <div className="py-4 flex flex-col items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-500/15 flex items-center justify-center">
            <Icon name="verified" className="text-emerald-600 dark:text-emerald-400 !text-3xl" />
          </div>
          <div>
            <h1 className="text-2xl font-black font-headline text-on-surface dark:text-white mb-2">
              Email verified!
            </h1>
            <p className="text-on-surface-variant dark:text-white/60 text-sm leading-relaxed">
              Your account is now active. Redirecting you to onboarding…
            </p>
          </div>
          <button
            onClick={() => navigate('/app/onboarding', { replace: true })}
            className="w-full py-3.5 rounded-xl font-bold text-sm text-white transition-all
              bg-primary-600 hover:bg-primary-500
              shadow-md shadow-primary-500/25 hover:shadow-lg hover:shadow-primary-500/40
              dark:bg-primary-500 dark:hover:bg-primary-400 dark:text-on-surface
              dark:shadow-[0_4px_20px_rgba(187,134,252,0.4)]
              active:scale-[0.98]"
          >
            Continue to Onboarding
          </button>
        </div>
      </PageShell>
    )
  }

  // ── Error ─────────────────────────────────────────────────────────────────
  return (
    <PageShell>
      <div className="py-4 flex flex-col items-center gap-6">
        <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-500/15 flex items-center justify-center">
          <Icon name="mark_email_unread" className="text-red-600 dark:text-red-400 !text-3xl" />
        </div>
        <div>
          <h1 className="text-2xl font-black font-headline text-on-surface dark:text-white mb-2">
            Verification failed
          </h1>
          <p className="text-on-surface-variant dark:text-white/60 text-sm leading-relaxed">
            This link has expired or is invalid. Request a new verification email below.
          </p>
        </div>

        {resendSent ? (
          <div
            role="status"
            className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium w-full justify-center
              bg-emerald-50 border border-emerald-200 text-emerald-700
              dark:bg-emerald-500/10 dark:border-emerald-500/30 dark:text-emerald-400"
          >
            <Icon name="check_circle" size="sm" />
            Verification email sent — check your inbox.
          </div>
        ) : (
          <button
            onClick={handleResend}
            disabled={resending}
            className="w-full py-3.5 rounded-xl font-bold text-sm text-white transition-all
              bg-primary-600 hover:bg-primary-500
              shadow-md shadow-primary-500/25 hover:shadow-lg hover:shadow-primary-500/40
              disabled:opacity-50 disabled:pointer-events-none
              dark:bg-primary-500 dark:hover:bg-primary-400 dark:text-on-surface
              dark:shadow-[0_4px_20px_rgba(187,134,252,0.4)]
              active:scale-[0.98]"
          >
            {resending ? (
              <span className="flex items-center justify-center gap-2">
                <Icon name="progress_activity" size="sm" className="animate-spin" />
                Sending…
              </span>
            ) : (
              'Resend Verification Email'
            )}
          </button>
        )}

        <Link
          to="/login"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-primary-600 dark:text-primary-400 hover:text-primary-500 dark:hover:text-primary-300 transition-colors"
        >
          <Icon name="arrow_back" size="sm" />
          Back to Sign In
        </Link>
      </div>
    </PageShell>
  )
}
