import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '@components/ui/Icon'

const ONBOARDING_KEY = 'prepmate_onboarded'

type Step = 0 | 1 | 2

interface Selections {
  goal: string
  topics: string[]
  level: string
}

const GOALS = [
  { id: 'faang', label: 'Land a FAANG job', icon: 'rocket_launch' },
  { id: 'startup', label: 'Join a startup', icon: 'bolt' },
  { id: 'switch', label: 'Switch careers into tech', icon: 'swap_horiz' },
  { id: 'upskill', label: 'Level up current skills', icon: 'trending_up' },
]

const TOPICS = [
  { id: 'dsa', label: 'Data Structures & Algorithms', icon: 'account_tree' },
  { id: 'system-design', label: 'System Design', icon: 'architecture' },
  { id: 'python', label: 'Python', icon: 'code' },
  { id: 'behavioral', label: 'Behavioral / HR', icon: 'psychology' },
  { id: 'databases', label: 'Databases & SQL', icon: 'storage' },
  { id: 'networking', label: 'Networking', icon: 'hub' },
]

const LEVELS = [
  { id: 'beginner', label: 'Beginner', subtitle: 'Just getting started', icon: 'school' },
  { id: 'intermediate', label: 'Intermediate', subtitle: '1–3 years experience', icon: 'workspace_premium' },
  { id: 'advanced', label: 'Advanced', subtitle: '3+ years, want edge sharpened', icon: 'military_tech' },
]

export default function OnboardingPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState<Step>(0)
  const [selections, setSelections] = useState<Selections>({ goal: '', topics: [], level: '' })

  const toggleTopic = (id: string) => {
    setSelections((prev) => ({
      ...prev,
      topics: prev.topics.includes(id)
        ? prev.topics.filter((t) => t !== id)
        : [...prev.topics, id],
    }))
  }

  const canProceed = () => {
    if (step === 0) return selections.goal !== ''
    if (step === 1) return selections.topics.length > 0
    return selections.level !== ''
  }

  const handleNext = () => {
    if (step < 2) {
      setStep((s) => (s + 1) as Step)
    } else {
      localStorage.setItem(ONBOARDING_KEY, 'true')
      localStorage.setItem('prepmate_onboarding_data', JSON.stringify(selections))
      navigate('/app/dashboard', { replace: true })
    }
  }

  const stepTitles = [
    "What's your main goal?",
    "Pick your focus areas",
    "What's your experience level?",
  ]
  const stepSubtitles = [
    "We'll personalise your learning path.",
    "Select all that apply.",
    "We'll adjust difficulty and pacing.",
  ]

  const progressPct = ((step + 1) / 3) * 100

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary-500/10 dark:bg-primary-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-accent-500/10 dark:bg-accent-500/15 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-lg relative z-10 animate-fade-in">
        {/* Logo */}
        <div className="text-center mb-10">
          <span className="text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-400 dark:to-accent-500">
            PrepMate
          </span>
          <p className="text-xs font-bold text-on-surface-variant dark:text-white/40 mt-1 tracking-widest uppercase">
            Let's personalise your experience
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between text-xs font-bold text-on-surface-variant dark:text-white/40 mb-2">
            <span>Step {step + 1} of 3</span>
            <span>{Math.round(progressPct)}%</span>
          </div>
          <div className="h-1.5 w-full bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary-600 to-accent-500 rounded-full transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        <div className="rounded-3xl p-8 border shadow-xl bg-white border-slate-200 dark:bg-[#1E1E1E] dark:border-white/[0.08] dark:shadow-black/40">
          <h2 className="text-2xl font-black font-headline text-on-surface dark:text-white mb-1">
            {stepTitles[step]}
          </h2>
          <p className="text-sm text-on-surface-variant dark:text-white/60 mb-8">{stepSubtitles[step]}</p>

          {/* Step 0 — Goal */}
          {step === 0 && (
            <div className="grid grid-cols-2 gap-3">
              {GOALS.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setSelections((s) => ({ ...s, goal: g.id }))}
                  className={[
                    'flex flex-col items-start gap-3 p-4 rounded-2xl border text-left transition-all duration-200',
                    selections.goal === g.id
                      ? 'bg-primary-50 border-primary-400 text-primary-700 shadow-md shadow-primary-100 dark:bg-primary-500/15 dark:border-primary-400/60 dark:text-primary-300 dark:shadow-[0_0_20px_rgba(187,134,252,0.2)]'
                      : 'bg-slate-50 border-slate-200 text-on-surface hover:border-slate-300 hover:bg-slate-100 dark:bg-white/5 dark:border-white/[0.08] dark:text-white/80 dark:hover:bg-white/10 dark:hover:border-white/15',
                  ].join(' ')}
                >
                  <Icon name={g.icon} size="sm" />
                  <span className="text-sm font-semibold leading-snug">{g.label}</span>
                </button>
              ))}
            </div>
          )}

          {/* Step 1 — Topics */}
          {step === 1 && (
            <div className="grid grid-cols-2 gap-3">
              {TOPICS.map((t) => {
                const selected = selections.topics.includes(t.id)
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => toggleTopic(t.id)}
                    className={[
                      'flex items-center gap-3 p-4 rounded-2xl border text-left transition-all duration-200',
                      selected
                        ? 'bg-accent-50 border-accent-400 text-accent-700 shadow-md dark:bg-accent-500/15 dark:border-accent-400/60 dark:text-accent-300 dark:shadow-[0_0_20px_rgba(3,218,197,0.2)]'
                        : 'bg-slate-50 border-slate-200 text-on-surface hover:border-slate-300 hover:bg-slate-100 dark:bg-white/5 dark:border-white/[0.08] dark:text-white/80 dark:hover:bg-white/10 dark:hover:border-white/15',
                    ].join(' ')}
                  >
                    <Icon name={t.icon} size="sm" />
                    <span className="text-sm font-semibold leading-snug">{t.label}</span>
                    {selected && (
                      <Icon name="check_circle" size="sm" className="ml-auto text-accent-500" />
                    )}
                  </button>
                )
              })}
            </div>
          )}

          {/* Step 2 — Level */}
          {step === 2 && (
            <div className="flex flex-col gap-3">
              {LEVELS.map((l) => (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => setSelections((s) => ({ ...s, level: l.id }))}
                  className={[
                    'flex items-center gap-4 p-5 rounded-2xl border text-left transition-all duration-200',
                    selections.level === l.id
                      ? 'bg-primary-50 border-primary-400 text-primary-700 shadow-md shadow-primary-100 dark:bg-primary-500/15 dark:border-primary-400/60 dark:text-primary-300 dark:shadow-[0_0_20px_rgba(187,134,252,0.2)]'
                      : 'bg-slate-50 border-slate-200 text-on-surface hover:border-slate-300 hover:bg-slate-100 dark:bg-white/5 dark:border-white/[0.08] dark:text-white/80 dark:hover:bg-white/10 dark:hover:border-white/15',
                  ].join(' ')}
                >
                  <div className="w-12 h-12 rounded-xl bg-current/10 flex items-center justify-center flex-shrink-0">
                    <Icon name={l.icon} />
                  </div>
                  <div>
                    <div className="font-bold">{l.label}</div>
                    <div className="text-xs opacity-70">{l.subtitle}</div>
                  </div>
                  {selections.level === l.id && (
                    <Icon name="check_circle" size="sm" className="ml-auto" />
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 mt-8">
            {step > 0 && (
              <button
                type="button"
                onClick={() => setStep((s) => (s - 1) as Step)}
                className="px-6 py-3 rounded-xl font-semibold text-sm border transition-all
                  border-slate-200 text-on-surface-variant hover:border-slate-300 hover:text-on-surface hover:bg-slate-50
                  dark:border-white/[0.08] dark:text-white/50 dark:hover:border-white/20 dark:hover:text-white dark:hover:bg-white/5"
              >
                Back
              </button>
            )}
            <button
              type="button"
              onClick={handleNext}
              disabled={!canProceed()}
              className="flex-1 py-3.5 rounded-xl font-bold text-sm text-white transition-all
                bg-primary-600 hover:bg-primary-500
                shadow-md shadow-primary-500/25 hover:shadow-lg hover:shadow-primary-500/40
                disabled:opacity-40 disabled:pointer-events-none
                dark:bg-primary-500 dark:hover:bg-primary-400 dark:text-on-surface
                dark:shadow-[0_4px_20px_rgba(187,134,252,0.4)]
                active:scale-[0.98]"
            >
              {step === 2 ? "Let's go! 🚀" : 'Continue'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
