import { useState, useEffect } from 'react'
import Icon from '@components/ui/Icon'
import { questionsApi, type ApiQuestion } from '@lib/api'

type FilterTab = 'all' | 'EASY' | 'MEDIUM' | 'HARD'

const difficultyColor: Record<string, string> = {
  EASY:   'bg-primary-500/10 text-primary-400 border border-primary-500/20 shadow-[0_0_10px_rgba(59,130,246,0.3)]',
  MEDIUM: 'bg-accent-500/10 text-accent-400 border border-accent-500/20 shadow-[0_0_10px_rgba(168,85,247,0.3)]',
  HARD:   'bg-red-500/10 text-red-400 border border-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.3)]',
}

const tabs: { key: FilterTab; label: string; dot?: string }[] = [
  { key: 'all',    label: 'All Challenges' },
  { key: 'EASY',   label: 'Easy',   dot: 'bg-primary-500 shadow-[0_0_5px_rgba(59,130,246,0.8)]' },
  { key: 'MEDIUM', label: 'Medium', dot: 'bg-accent-500 shadow-[0_0_5px_rgba(168,85,247,0.8)]' },
  { key: 'HARD',   label: 'Hard',   dot: 'bg-red-500 shadow-[0_0_5px_rgba(239,68,68,0.8)]' },
]

export default function InterviewQuestionsPage() {
  const [activeTab, setActiveTab]   = useState<FilterTab>('all')
  const [openId, setOpenId]         = useState<string | null>(null)
  const [questions, setQuestions]   = useState<ApiQuestion[]>([])
  const [loading, setLoading]       = useState(true)

  useEffect(() => {
    setLoading(true)
    const params = activeTab !== 'all' ? { difficulty: activeTab } : {}
    questionsApi.list(params)
      .then((res) => setQuestions(res.data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [activeTab])

  return (
    <>
      {/* Header */}
      <div className="max-w-5xl mx-auto mb-16 relative">
        <div className="absolute top-0 right-0 w-80 h-80 bg-accent-600/10 rounded-full blur-[100px] pointer-events-none" />
        <h1 className="font-headline text-5xl md:text-7xl font-black text-on-surface dark:text-white tracking-tighter mb-6">
          Algorithm Mastery
        </h1>
        <p className="text-on-surface-variant dark:text-white/70 text-xl max-w-2xl leading-relaxed">
          A curated collection of industry-standard coding challenges. Focused, distraction-free, and architected for deep learning.
        </p>

        {/* Filter tabs */}
        <div className="mt-12 flex flex-wrap items-center gap-6 md:gap-10 border-b border-outline-variant/60 dark:border-white/10 pb-0">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`pb-4 text-base flex items-center gap-3 border-b-2 transition-all -mb-px ${
                activeTab === t.key
                  ? 'border-primary-400 text-primary-400 font-bold'
                  : 'border-transparent text-on-surface-variant dark:text-white/50 hover:text-on-surface dark:hover:text-white hover:border-outline-variant dark:hover:border-white/20 font-medium'
              }`}
            >
              {t.dot && <span className={`w-2 h-2 rounded-full ${t.dot}`} />}
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Question cards */}
      <div className="max-w-5xl mx-auto flex flex-col gap-8">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-[2rem] bg-surface-container p-10 animate-pulse h-48" />
          ))
        ) : questions.length === 0 ? (
          <div className="text-center py-24">
            <Icon name="search_off" className="!text-6xl text-outline-variant mb-4" />
            <p className="text-on-surface-variant dark:text-white/50 text-xl">No questions found.</p>
          </div>
        ) : questions.map((q) => {
          const isOpen = openId === q._id
          return (
            <article key={q._id} className="glass-panel hover:bg-slate-50 dark:hover:bg-white/[0.07] border-outline-variant/60 dark:border-white/10 rounded-[2rem] p-8 md:p-10 transition-all duration-300 group">
              {/* Card header */}
              <div className="flex justify-between items-start mb-10">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <span className={`px-3 py-1 text-xs font-bold uppercase tracking-widest rounded-xl ${difficultyColor[q.difficulty] ?? ''}`}>
                      {q.difficulty}
                    </span>
                  </div>
                  <h2 className="font-headline text-3xl md:text-4xl font-extrabold text-on-surface dark:text-white tracking-tight group-hover:text-primary-600 dark:group-hover:text-primary-300 transition-colors">
                    {q.title}
                  </h2>
                </div>
                <button className="p-4 bg-slate-100 dark:bg-white/5 hover:bg-primary-50 dark:hover:bg-primary-500/20 text-on-surface-variant dark:text-white/50 hover:text-primary-600 dark:hover:text-primary-400 rounded-full transition-all border border-transparent hover:border-primary-200 dark:hover:border-primary-500/30" aria-label="Bookmark">
                  <Icon name="bookmark" size="sm" />
                </button>
              </div>

              {/* Problem statement */}
              <div className="space-y-8">
                {q.problemStatement && (
                  <p className="text-on-surface-variant dark:text-white/70 leading-relaxed">{q.problemStatement}</p>
                )}

                {q.example && (
                  <div className="p-6 bg-slate-50 dark:bg-white/5 rounded-2xl border-l-4 border-primary-500 shadow-inner">
                    <p className="text-sm font-mono text-on-surface-variant dark:text-white/60 italic">{q.example}</p>
                  </div>
                )}

                {/* Concepts */}
                {q.concepts.length > 0 && (
                  <div>
                    <h3 className="text-xs font-bold text-on-surface-variant/70 dark:text-white/40 uppercase tracking-widest mb-4">Key Concepts Used</h3>
                    <div className="flex flex-wrap gap-3">
                      {q.concepts.map((c) => (
                        <span key={c} className="px-5 py-2 bg-white dark:bg-white/5 border border-outline-variant dark:border-white/10 text-on-surface-variant dark:text-white/70 text-sm font-medium rounded-full shadow-sm cursor-default">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Expandable solution */}
                {q.solution && (
                  <div className="border-t border-outline-variant/60 dark:border-white/10 mt-8">
                    <button
                      onClick={() => setOpenId(isOpen ? null : q._id)}
                      className="flex items-center justify-between w-full py-6 text-left group/btn"
                      aria-expanded={isOpen}
                    >
                      <span className="font-bold text-primary-400 flex items-center gap-3 text-lg group-hover/btn:text-primary-600 dark:group-hover/btn:text-primary-300 transition-colors">
                        <Icon name="auto_awesome" size="sm" />
                        View Editorial Solution
                      </span>
                      <div className={`w-8 h-8 rounded-full border border-outline-variant/60 dark:border-white/10 flex items-center justify-center bg-slate-50 dark:bg-white/5 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-primary-500/20 border-primary-500/30 text-primary-400' : 'text-on-surface-variant dark:text-white/50'}`}>
                        <Icon name="expand_more" size="sm" />
                      </div>
                    </button>

                    {isOpen && (
                      <div className="pt-4 pb-6 animate-slide-up">
                        <div className="bg-[#0B1120] border border-white/10 rounded-3xl p-8 overflow-hidden relative shadow-2xl">
                          <div className="flex items-center justify-between mb-6">
                            <span className="text-xs font-mono text-white/40 uppercase tracking-widest">Solution</span>
                          </div>
                          <pre className="text-accent-200 text-sm leading-relaxed overflow-x-auto font-mono whitespace-pre selection:bg-accent-500/30">
                            {q.solution}
                          </pre>
                          <div className="absolute top-0 right-0 w-32 h-32 bg-primary-600/10 rounded-full blur-[50px] pointer-events-none" />
                        </div>
                        {q.hint && (
                          <div className="mt-6 p-6 bg-accent-500/10 rounded-2xl border border-accent-500/20 shadow-inner backdrop-blur-sm">
                            <p className="text-on-surface-variant dark:text-white/80 leading-relaxed text-sm">
                              <strong className="text-accent-600 dark:text-accent-400 tracking-wide">HINT:</strong>{' '}
                              {q.hint}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </article>
          )
        })}

        {/* Level-up CTA */}
        <div
          className="mt-12 relative overflow-hidden rounded-[3rem] h-80 flex items-center justify-center border border-primary-500/30 shadow-[0_0_50px_rgba(59,130,246,0.15)] group cursor-pointer"
          onClick={() => setActiveTab('MEDIUM')}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600/80 to-accent-600/80 group-hover:opacity-90 transition-opacity duration-500" />
          <div className="relative z-10 text-center p-8 scale-95 group-hover:scale-100 transition-transform duration-500">
            <h3 className="font-headline text-4xl md:text-5xl font-black text-white tracking-tight mb-4">Ready for Medium?</h3>
            <p className="text-white/90 mb-8 text-lg font-medium drop-shadow-sm">You've mastered the basics. Level up your system thinking.</p>
            <div className="inline-block px-10 py-4 bg-white text-primary-600 rounded-full font-bold shadow-2xl group-hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all">
              Browse Medium Challenges
            </div>
          </div>
        </div>

        <div className="h-20" />
      </div>

      {/* FAB */}
      <button className="fixed bottom-8 right-8 w-16 h-16 bg-primary-600 text-white rounded-full shadow-[0_0_20px_rgba(59,130,246,0.5)] flex items-center justify-center hover:scale-110 hover:bg-primary-500 transition-all z-50 border border-primary-400" aria-label="Notes">
        <Icon name="history_edu" size="lg" />
      </button>
    </>
  )
}
