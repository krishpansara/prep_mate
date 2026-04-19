import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '@components/ui/Icon'
import Badge from '@components/ui/Badge'
import { conceptsApi, progressApi, type ApiConcept, type ApiProgress } from '@lib/api'

export default function LearningConceptsPage() {
  const navigate = useNavigate()
  const [concepts, setConcepts] = useState<ApiConcept[]>([])
  const [progressData, setProgressData] = useState<ApiProgress[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      conceptsApi.list().then((res) => setConcepts(res.data)),
      progressApi.list().then(setProgressData),
    ])
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  // Calculate completed count based on progressData
  const completedCount = concepts.filter(concept =>
    progressData.some(p => p.completedConcepts?.includes(concept._id))
  ).length

  return (
    <div className="max-w-4xl mx-auto py-12 relative">
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="mb-20 relative z-10 flex flex-col items-center text-center">
        <div className="absolute -top-20 w-[500px] h-[300px] bg-primary-600/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="flex items-center gap-3 mb-6 flex-wrap justify-center">
          <div className="px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-primary-500/10 border border-primary-500/30 text-primary-300 shadow-[0_0_20px_rgba(59,130,246,0.25)]">
            Deep Dive Track
          </div>
          <span className="text-outline-variant/60 dark:text-white/30 hidden sm:inline">•</span>
          <span className="text-sm text-on-surface-variant dark:text-white/60 font-medium">All Topics</span>
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-on-surface dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-white dark:via-white dark:to-white/70 leading-[1.05] tracking-tight max-w-4xl font-headline mb-6">
          Core Concepts Mastery
        </h1>

        <p className="text-lg md:text-xl text-on-surface-variant dark:text-white/70 max-w-2xl leading-relaxed font-body mb-10">
          Build a strong mental model of software engineering — optimized for interviews, system design, and real-world problem solving.
        </p>

        <div className="w-full max-w-3xl bg-white dark:bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-outline-variant/60 dark:border-white/10 shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant/80 dark:text-white/60">
              Learning Progress
            </span>
            <span className="text-sm text-on-surface-variant dark:text-white/50">
              {completedCount} / {concepts.length} completed
            </span>
          </div>
          <div className="h-3 w-full bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden mb-4">
            <div
              className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full shadow-[0_0_12px_rgba(59,130,246,0.6)] transition-all duration-700"
              style={{ width: `${concepts.length > 0 ? (completedCount / concepts.length) * 100 : 0}%` }}
            />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-on-surface-variant/70 dark:text-white/50">Stay consistent — mastery compounds</span>
            <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-400">
              {Math.round(concepts.length > 0 ? (completedCount / concepts.length) * 100 : 0)}%
            </span>
          </div>
        </div>
      </header>

      {/* Concept cards */}
      <div className="space-y-6 md:space-y-8 relative z-10">
        {loading ? (
           Array.from({ length: 3 }).map((_, i) => (
             <div key={i} className="h-40 rounded-2xl bg-surface-container animate-pulse" />
           ))
        ) : concepts.length === 0 ? (
          <div className="text-center py-20 text-on-surface-variant">No concepts available yet.</div>
        ) : concepts.map((concept, index) => {
          const isCompleted = progressData.some(p => p.completedConcepts?.includes(concept._id))
          
          return (
            <article
              key={concept._id}
              onClick={() => navigate(`/app/learn/concepts/${concept.slug}`)}
              className={`rounded-2xl border transition-all duration-500 group overflow-hidden relative cursor-pointer ${
                isCompleted
                  ? 'bg-slate-50 dark:bg-white/[0.03] border-slate-200 dark:border-white/5 hover:bg-slate-100 dark:hover:bg-white/[0.05]'
                  : 'bg-white dark:bg-white/[0.05] border-primary-200 dark:border-primary-500/30 hover:border-primary-400 shadow-[0_4px_24px_rgba(0,0,0,0.04)] dark:shadow-[0_0_30px_rgba(59,130,246,0.1)]'
              }`}
            >
              {!isCompleted && (
                <div className="absolute inset-0 bg-gradient-to-r from-primary-50 to-transparent dark:from-primary-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              )}

              <div className="p-6 md:p-10 relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 md:gap-10">
                <div className="flex flex-col sm:flex-row items-start gap-6 md:gap-8 flex-1 min-w-0">
                  <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center flex-shrink-0 font-mono font-bold text-base md:text-lg shadow-inner ${
                    isCompleted
                      ? 'bg-accent-50 dark:bg-accent-500/20 text-accent-600 dark:text-accent-400 border-accent-200 dark:border-accent-500/30'
                      : 'bg-primary-50 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 border-primary-200 dark:border-primary-500/30 shadow-[0_0_15px_rgba(59,130,246,0.1)] dark:shadow-[0_0_15px_rgba(59,130,246,0.4)]'
                  }`}>
                    {isCompleted ? <Icon name="check" size="md" /> : String(index + 1).padStart(2, '0')}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 md:gap-4 mb-3">
                      {isCompleted && (
                        <Badge label="Completed" variant="secondary" uppercase className="!bg-accent-50 dark:!bg-accent-500/20 !text-accent-700 dark:!text-accent-300 dark:!border-accent-500/30" />
                      )}
                      {!isCompleted && index === completedCount && (
                        <Badge label="Up Next" variant="primary" uppercase className="shadow-[0_0_10px_rgba(59,130,246,0.2)] dark:shadow-[0_0_10px_rgba(59,130,246,0.4)]" />
                      )}
                      <span className="text-xs text-on-surface-variant dark:text-white/40 font-medium tracking-wide">
                        {typeof concept.topicId === 'object' ? (concept.topicId as any).name : 'General'}
                      </span>
                    </div>
                    <h2 className={`text-xl md:text-2xl lg:text-3xl font-bold font-headline mb-3 transition-colors truncate sm:whitespace-normal ${isCompleted ? 'text-on-surface-variant dark:text-white/80' : 'text-on-surface dark:text-white group-hover:text-primary-700 dark:group-hover:text-primary-300'}`}>
                      {concept.title}
                    </h2>
                    <p className="text-on-surface-variant dark:text-white/60 leading-relaxed text-sm md:text-base lg:text-lg max-w-2xl mb-5 line-clamp-3 sm:line-clamp-none">
                      {concept.summary}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 md:gap-3">
                      <span className={`px-3 py-1 md:px-4 md:py-1.5 border text-[10px] md:text-xs font-semibold rounded-full tracking-wide ${
                        isCompleted ? 'bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/5 text-slate-500 dark:text-white/40' : 'bg-primary-50 dark:bg-primary-500/10 border-primary-200 dark:border-primary-500/20 text-primary-700 dark:text-primary-300 shadow-sm'
                      }`}>
                        {concept.difficulty}
                      </span>
                      {concept.hasCode && (
                        <span className={`px-3 py-1 md:px-4 md:py-1.5 border text-[10px] md:text-xs font-semibold rounded-full tracking-wide ${
                          isCompleted ? 'bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/5 text-slate-500 dark:text-white/40' : 'bg-secondary-50 dark:bg-secondary-500/10 border-secondary-200 dark:border-secondary-500/20 text-secondary-700 dark:text-secondary-300 shadow-sm'
                        }`}>
                          Code Included
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  className={`hidden sm:flex flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full items-center justify-center transition-all ${
                    isCompleted
                      ? 'bg-transparent text-slate-400 dark:text-white/20 border border-slate-300 dark:border-white/10'
                      : 'bg-primary-600 text-white hover:bg-primary-500 shadow-md hover:shadow-lg hover:shadow-primary-500/40 dark:shadow-[0_0_20px_rgba(59,130,246,0.6)] hover:scale-110 active:scale-95'
                  }`}
                  aria-label={isCompleted ? 'Completed' : 'Start'}
                >
                  <Icon name={isCompleted ? 'check' : 'arrow_forward'} size="sm" className="md:!text-[24px]" />
                </button>
              </div>
            </article>
          )
        })}
      </div>

      <div className="mt-20 p-10 md:p-12 bg-white/80 dark:bg-[#1E1E1E]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-[2rem] md:rounded-[3rem] text-center relative overflow-hidden group shadow-xl hover:border-primary-300 dark:hover:border-primary-500/40 transition-colors">
        <div className="absolute inset-0 bg-gradient-to-t from-primary-100/50 dark:from-primary-600/20 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        <div className="relative z-10">
          <p className="text-primary-600 dark:text-primary-400 text-sm md:text-base uppercase tracking-widest font-black mb-4 md:mb-6">All Done?</p>
          <h3 className="text-3xl md:text-5xl font-black font-headline text-on-surface dark:text-white mb-4 md:mb-6 tracking-tight">Test Your Knowledge</h3>
          <p className="text-on-surface-variant dark:text-white/70 mb-8 md:mb-10 text-base md:text-lg max-w-lg mx-auto leading-relaxed">
            Apply what you've learned with curated interview questions for this topic.
          </p>
          <button 
            onClick={() => navigate('/app/practice')}
            className="px-6 py-3 md:px-8 md:py-4 bg-primary-600 text-white dark:bg-surface dark:text-on-surface rounded-2xl font-bold hover:bg-primary-500 dark:hover:bg-primary-container dark:hover:text-on-primary-container shadow-md hover:shadow-lg transition-all active:scale-95"
          >
            Start Practice Questions
          </button>
        </div>
      </div>
    </div>
  )
}
