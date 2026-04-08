import { useState, useEffect } from 'react'
import Icon from '@components/ui/Icon'
import Badge from '@components/ui/Badge'
import Button from '@components/ui/Button'
import { conceptsApi, type ApiConcept } from '@lib/api'

const diffMap: Record<ApiConcept['difficulty'], 'secondary' | 'neutral' | 'error'> = {
  EASY: 'secondary',
  MEDIUM: 'neutral',
  HARD: 'error',
}

export default function DeepDiveQuestionPage() {
  const [concepts, setConcepts] = useState<ApiConcept[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    conceptsApi.list({ page: 1 })
      .then(res => setConcepts(res.data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="max-w-4xl mx-auto py-12 relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="mb-16 relative z-10 animate-slide-up flex flex-col items-center text-center">
        <Badge
          label="Deep Dive"
          variant="primary"
          uppercase
          className="mb-6 shadow-[0_0_15px_rgba(59,130,246,0.3)]"
        />
        <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-black
          text-transparent bg-clip-text bg-gradient-to-r
          from-on-surface to-on-surface-variant
          dark:from-white dark:to-white/70
          tracking-tight mb-6 max-w-3xl">
          Behavioral Deep Dive
        </h1>
        <p className="text-lg md:text-xl text-on-surface-variant
          dark:text-white/70 leading-relaxed
          max-w-2xl font-body">
          Master the "why" and "when", not just the "what". These questions test your ability to reason aloud under pressure — like a real senior engineer interview.
        </p>
      </header>

      {/* Questions */}
      <div className="space-y-16 relative z-10">
        {loading ? (
          <div className="flex flex-col items-center gap-4 py-24 text-on-surface-variant">
            <Icon name="hourglass_empty" size="lg" />
            <p className="text-lg font-medium">Loading Deep Dives…</p>
          </div>
        ) : concepts.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-24 text-on-surface-variant">
            <Icon name="psychology_alt" size="lg" />
            <p className="text-lg font-medium">No deep dive concepts yet.</p>
            <p className="text-sm">Check back soon — the admin team is adding content!</p>
          </div>
        ) : (
          concepts.map((c, i) => (
            <article key={c._id} className="group animate-fade-in" style={{ animationDelay: `${0.2 + i * 0.1}s` }}>
              {/* Number + difficulty */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center font-mono font-bold text-primary-600 dark:text-primary-400 text-lg flex-shrink-0 shadow-inner group-hover:bg-primary-50 dark:group-hover:bg-primary-500/10 transition-colors">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <Badge label={c.difficulty} variant={diffMap[c.difficulty]} uppercase />
              </div>

              {/* Title */}
              <h2 className="text-3xl font-black font-headline text-on-surface dark:text-white mb-8 leading-snug tracking-tight">
                {c.title}
              </h2>

              {/* Summary / Answer Box */}
              {c.summary && (
                <div className="bg-white dark:bg-surface/40 backdrop-blur-md rounded-3xl p-8 md:p-10 border border-slate-200 dark:border-white/5 shadow-md dark:shadow-xl relative overflow-hidden mb-6">
                  <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-primary-500 to-accent-500" />
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-full bg-primary-500/10 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 flex items-center justify-center">
                      <Icon name="psychology" size="sm" />
                    </div>
                    <span className="text-sm font-bold uppercase tracking-widest text-primary-600 dark:text-primary-200">Overview</span>
                  </div>
                  <p className="text-on-surface-variant dark:text-white/90 text-lg leading-relaxed font-body">{c.summary}</p>
                </div>
              )}

              {/* Full body content */}
              {c.body && (
                <div className="mt-4 p-6 bg-accent-500/5 dark:bg-accent-500/5 rounded-2xl border border-accent-200 dark:border-accent-500/20 flex gap-4 backdrop-blur-sm group-hover:border-accent-300 dark:group-hover:border-accent-500/40 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-accent-500/10 dark:bg-accent-500/20 text-accent-600 dark:text-accent-400 flex items-center justify-center flex-shrink-0">
                    <Icon name="lightbulb" size="sm" filled />
                  </div>
                  <p className="text-on-surface-variant dark:text-white/80 leading-relaxed pt-1">
                    <span className="font-bold text-accent-600 dark:text-accent-300 mr-2">Deep Dive:</span>
                    {c.body}
                  </p>
                </div>
              )}

              {i !== concepts.length - 1 && (
                <div className="mt-16 h-px w-full bg-gradient-to-r from-transparent via-outline-variant/50 dark:via-white/10 to-transparent" />
              )}
            </article>
          ))
        )}
      </div>

      {/* Progress CTA */}
      {!loading && concepts.length > 0 && (
        <div className="mt-24 glass-panel-heavy rounded-3xl p-12 text-center border-primary-500/20 dark:border-primary-500/30 shadow-lg dark:shadow-[0_0_40px_rgba(59,130,246,0.1)] relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-t from-primary-600/5 dark:from-primary-600/10 to-transparent pointer-events-none" />
          <p className="text-xs uppercase tracking-widest text-primary-600 dark:text-primary-300 font-bold mb-4">Session Complete</p>
          <h3 className="text-4xl font-black font-headline text-on-surface dark:text-white mb-6">Great depth!</h3>
          <p className="text-on-surface-variant dark:text-white/70 mb-10 max-w-md mx-auto text-lg">
            You reasoned through {concepts.length} Deep Dive concept{concepts.length !== 1 ? 's' : ''}. Ready for the next challenge?
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 relative z-10">
            <Button variant="primary" size="lg" className="px-10 shadow-[0_0_15px_rgba(59,130,246,0.3)] dark:shadow-[0_0_20px_rgba(59,130,246,0.4)]">
              Next Module
            </Button>
            <Button variant="secondary" size="lg" className="px-10">
              Review Again
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
