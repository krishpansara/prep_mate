import AppShell from '@components/layout/AppShell'
import Icon from '@components/ui/Icon'
import Badge from '@components/ui/Badge'
import ProgressBar from '@components/ui/ProgressBar'

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
  return (
    <AppShell>
      <div className="max-w-4xl mx-auto py-8">
        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Badge label="Data Structures" variant="primary" />
            <span className="text-on-surface-variant text-sm">· 4 Concepts</span>
          </div>
          <h1 className="font-headline text-5xl font-extrabold text-on-surface tracking-tighter mb-4">
            Core Concepts
          </h1>
          <p className="text-on-surface-variant text-lg max-w-2xl leading-relaxed mb-8">
            Master the building blocks. These concepts form the foundation of every technical interview at top companies.
          </p>

          {/* Progress */}
          <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/10 flex items-center gap-6">
            <div className="flex-1">
              <ProgressBar
                value={completedCount}
                max={concepts.length}
                label={`${completedCount} of ${concepts.length} completed`}
              />
            </div>
            <span className="text-2xl font-extrabold font-headline text-primary flex-shrink-0">
              {Math.round((completedCount / concepts.length) * 100)}%
            </span>
          </div>
        </header>

        {/* Concept cards */}
        <div className="space-y-6">
          {concepts.map((concept, index) => (
            <article
              key={concept.id}
              className={`rounded-2xl border transition-all group cursor-pointer ${
                concept.completed
                  ? 'bg-surface-container-lowest border-outline-variant/10 hover:shadow-md'
                  : 'bg-surface-container-lowest border-primary/20 hover:border-primary/40 hover:shadow-lg'
              }`}
            >
              <div className="p-8">
                <div className="flex items-start justify-between gap-6">
                  <div className="flex items-start gap-6">
                    {/* Number + status */}
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 font-mono font-bold text-sm ${
                      concept.completed
                        ? 'bg-secondary/10 text-secondary'
                        : 'bg-primary/10 text-primary'
                    }`}>
                      {concept.completed ? (
                        <Icon name="check" size="sm" />
                      ) : (
                        concept.number
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        {concept.completed && (
                          <Badge label="Completed" variant="secondary" uppercase />
                        )}
                        {!concept.completed && index === completedCount && (
                          <Badge label="Up Next" variant="primary" uppercase />
                        )}
                        <span className="text-xs text-on-surface-variant font-medium">
                          {concept.readMinutes} min read
                        </span>
                      </div>
                      <h2 className="text-xl font-bold font-headline text-on-surface mb-3 group-hover:text-primary transition-colors">
                        {concept.title}
                      </h2>
                      <p className="text-on-surface-variant leading-relaxed">{concept.summary}</p>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {concept.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-surface-container text-on-surface-variant text-xs font-medium rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    className={`flex-shrink-0 p-3 rounded-full transition-all ${
                      concept.completed
                        ? 'bg-secondary/10 text-secondary'
                        : 'bg-primary text-white hover:bg-primary-dim shadow-md'
                    }`}
                    aria-label={concept.completed ? 'Completed' : 'Start'}
                  >
                    <Icon name={concept.completed ? 'check' : 'arrow_forward'} size="sm" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Next module CTA */}
        <div className="mt-16 p-10 bg-inverse-surface rounded-3xl text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 pointer-events-none" />
          <div className="relative z-10">
            <p className="text-inverse-on-surface text-xs uppercase tracking-widest font-bold mb-4">All Done?</p>
            <h3 className="text-3xl font-bold font-headline text-surface mb-4">
              Test Your Knowledge
            </h3>
            <p className="text-surface-variant mb-8 max-w-sm mx-auto">
              Apply what you've learned with curated interview questions for this topic.
            </p>
            <button className="px-8 py-3 bg-surface text-on-surface rounded-2xl font-bold hover:bg-primary-container hover:text-on-primary-container transition-colors">
              Start Practice Questions
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
