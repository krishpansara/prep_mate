import { useNavigate } from 'react-router-dom'
import AppShell from '@components/layout/AppShell'
import Icon from '@components/ui/Icon'
import Badge from '@components/ui/Badge'

interface Concept {
  id: string
  number: string
  title: string
  summary: string
  tags: string[]
  completed: boolean
  readMinutes: number
}

const concepts: Concept[] = [
  {
    id: 'c1', number: '01', title: 'Dynamic Arrays', completed: true, readMinutes: 8,
    summary: 'Dynamic arrays grow automatically when capacity is exceeded, typically doubling their size. Understanding amortized O(1) insertions is critical for senior interviews.',
    tags: ['Arrays', 'Memory Management', 'Amortized Analysis'],
  },
  {
    id: 'c2', number: '02', title: 'Hash Tables & Collision Resolution', completed: true, readMinutes: 12,
    summary: 'Hash Tables use a hash function to map keys to array indices. Collision resolution strategies include chaining (linked lists) and open addressing (linear probing).',
    tags: ['Hash Functions', 'Chaining', 'Open Addressing'],
  },
  {
    id: 'c3', number: '03', title: 'Singly & Doubly Linked Lists', completed: false, readMinutes: 10,
    summary: 'Linked lists excel at O(1) insertions/deletions at known positions but suffer O(n) access time. Doubly-linked lists allow traversal in both directions at the cost of extra memory.',
    tags: ['Pointers', 'Traversal', 'Memory'],
  },
  {
    id: 'c4', number: '04', title: 'Binary Trees & Tree Traversal', completed: false, readMinutes: 15,
    summary: 'Binary trees are hierarchical structures where each node has at most two children. Master all three DFS traversal orders (inorder, preorder, postorder) and BFS.',
    tags: ['DFS', 'BFS', 'Recursion'],
  },
]

const completedCount = concepts.filter((c) => c.completed).length

export default function LearningConceptsPage() {
  const navigate = useNavigate()
  return (
    <AppShell>
      <div className="max-w-4xl mx-auto py-12 relative">
        {/* Background Glow */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-600/10 rounded-full blur-[120px] pointer-events-none"></div>

        {/* Header */}
        <header className="mb-16 relative z-10 animate-slide-up">
          <div className="flex items-center gap-4 mb-6">
            <Badge label="Data Structures" variant="primary" className="shadow-[0_0_15px_rgba(59,130,246,0.3)]" />
            <span className="text-white/50 text-sm font-medium tracking-wide">· 4 Concepts</span>
          </div>
          <h1 className="font-headline text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 tracking-tighter mb-6">
            Core Concepts
          </h1>
          <p className="text-white/70 text-lg md:text-xl max-w-2xl leading-relaxed mb-10">
            Master the building blocks. These concepts form the foundation of every technical interview at top companies.
          </p>

          {/* Progress */}
          <div className="glass-panel rounded-3xl p-8 border border-white/10 flex flex-col md:flex-row md:items-center gap-8 shadow-xl">
            <div className="flex-1">
              <div className="flex justify-between items-center mb-3">
                 <span className="text-sm font-bold text-white/80 uppercase tracking-widest">Course Progress</span>
                 <span className="text-xs font-medium text-white/50">{completedCount} of {concepts.length} completed</span>
              </div>
              <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden shadow-inner">
                <div 
                  className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)] transition-all duration-1000" 
                  style={{ width: `${(completedCount / concepts.length) * 100}%` }}
                />
              </div>
            </div>
            <div className="text-3xl md:text-4xl font-black font-headline text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-400 flex-shrink-0">
              {Math.round((completedCount / concepts.length) * 100)}%
            </div>
          </div>
        </header>

        {/* Concept cards */}
        <div className="space-y-8 relative z-10">
          {concepts.map((concept, index) => (
            <article
              key={concept.id}
              onClick={() => navigate('/deep-dive')}
              className={`rounded-2xl border transition-all duration-500 group overflow-hidden relative ${
                concept.completed
                  ? 'bg-white/[0.03] border-white/5 hover:bg-white/[0.05]'
                  : 'bg-white/[0.05] border-primary-500/30 hover:border-primary-400 shadow-[0_0_30px_rgba(59,130,246,0.1)] hover:shadow-[0_0_40px_rgba(59,130,246,0.2)]'
              }`}
            >
              {/* Active glow */}
              {!concept.completed && (
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              )}

              <div className="p-8 md:p-10 relative z-10">
                <div className="flex flex-col md:flex-row items-start justify-between gap-8 md:gap-10">
                  <div className="flex flex-col md:flex-row items-start gap-8">
                    {/* Number + status */}
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 font-mono font-bold text-lg shadow-inner ${
                      concept.completed
                        ? 'bg-accent-500/20 text-accent-400 border border-accent-500/30'
                        : 'bg-primary-500/20 text-primary-400 border border-primary-500/30 shadow-[0_0_15px_rgba(59,130,246,0.4)]'
                    }`}>
                      {concept.completed ? (
                        <Icon name="check" size="md" />
                      ) : (
                        concept.number
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-4 mb-4">
                        {concept.completed && (
                          <Badge label="Completed" variant="secondary" uppercase className="!bg-accent-500/20 !text-accent-300 !border-accent-500/30" />
                        )}
                        {!concept.completed && index === completedCount && (
                          <Badge label="Up Next" variant="primary" uppercase className="shadow-[0_0_10px_rgba(59,130,246,0.4)]" />
                        )}
                        <span className="text-xs text-white/40 font-medium tracking-wide">
                          {concept.readMinutes} min read
                        </span>
                      </div>
                      <h2 className={`text-2xl md:text-3xl font-bold font-headline mb-4 transition-colors ${concept.completed ? 'text-white/80' : 'text-white group-hover:text-primary-300'}`}>
                        {concept.title}
                      </h2>
                      <p className="text-white/60 leading-relaxed text-lg max-w-2xl mb-6">{concept.summary}</p>
                      
                      <div className="flex flex-wrap gap-3 mt-2">
                        {concept.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`px-4 py-1.5 border text-xs font-semibold rounded-full tracking-wide ${
                              concept.completed 
                                ? 'bg-white/5 border-white/5 text-white/40' 
                                : 'bg-primary-500/10 border-primary-500/20 text-primary-300 shadow-sm'
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    className={`flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                      concept.completed
                        ? 'bg-transparent text-white/20 border border-white/10'
                        : 'bg-primary-600 text-white hover:bg-primary-500 shadow-[0_0_20px_rgba(59,130,246,0.6)] hover:scale-110 active:scale-95'
                    }`}
                    aria-label={concept.completed ? 'Completed' : 'Start'}
                  >
                    <Icon name={concept.completed ? 'check' : 'arrow_forward'} size="md" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Next module CTA */}
        <div className="mt-20 p-12 glass-panel-heavy rounded-[3rem] text-center relative overflow-hidden group hover:border-primary-500/40 transition-colors">
          <div className="absolute inset-0 bg-gradient-to-t from-primary-600/20 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          <div className="relative z-10">
            <p className="text-primary-400 text-sm uppercase tracking-widest font-black mb-6">All Done?</p>
            <h3 className="text-4xl md:text-5xl font-black font-headline text-white mb-6 tracking-tight">
              Test Your Knowledge
            </h3>
            <p className="text-white/70 mb-10 text-lg max-w-lg mx-auto leading-relaxed">
              Apply what you've learned with curated interview questions for this topic.
            </p>
            <button 
              onClick={() => navigate('/deep-dive')}
              className="px-8 py-3 bg-surface text-on-surface rounded-2xl font-bold hover:bg-primary-container hover:text-on-primary-container transition-colors"
            >
              Start Practice Questions
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
