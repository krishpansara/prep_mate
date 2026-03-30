import AppShell from '@components/layout/AppShell'
import Icon from '@components/ui/Icon'
import Badge from '@components/ui/Badge'
import Button from '@components/ui/Button'

interface DeepDiveQuestion {
  id: string
  number: string
  question: string
  difficulty: 'foundational' | 'intermediate' | 'advanced'
  answer: string
  framework?: string
}

const questions: DeepDiveQuestion[] = [
  {
    id: 'd1', number: '01', question: 'Explain the difference between a Stack and a Queue.',
    difficulty: 'foundational', answer: 'A Stack is a LIFO (Last In, First Out) data structure, like a stack of plates. A Queue is FIFO (First In, First Out), like a line at a ticket counter. Both are abstract data types that can be implemented with arrays or linked lists.',
    framework: 'LIFO vs FIFO distinction — always anchor with a real-world analogy.',
  },
  {
    id: 'd2', number: '02', question: 'Why is the average time complexity of a Hash Table O(1) and not O(n)?',
    difficulty: 'intermediate', answer: "A hash table uses a hash function to map keys to an index in an underlying array. In the average case with a good hash function and a low load factor, each lookup, insertion, and deletion requires computing the hash (O(1)) and accessing a direct memory address — so O(1) overall. Collisions can degrade this to O(n) in the worst case.",
    framework: 'Hash function → array index → O(1) access. Address the caveat: collision handling.',
  },
  {
    id: 'd3', number: '03', question: 'When would you choose a Trie over a Hash Map?',
    difficulty: 'advanced', answer: 'Choose a Trie when you need prefix-based operations, like autocomplete or spell-checking. A Hash Map gives O(1) exact lookups but cannot efficiently find all keys with a given prefix. Tries store characters as edges and allow prefix traversal in O(k) where k is the prefix length.',
    framework: 'Prefix operations → Trie. Exact lookups → Hash Map. Bring up autocomplete as the canonical use case.',
  },
]

const diffMap: Record<DeepDiveQuestion['difficulty'], 'secondary' | 'neutral' | 'error'> = {
  foundational: 'secondary',
  intermediate: 'neutral',
  advanced: 'error',
}

export default function DeepDiveQuestionPage() {
  return (
    <AppShell>
      <div className="max-w-4xl mx-auto py-12 relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600/10 rounded-full blur-[120px] pointer-events-none"></div>

        {/* Header */}
        <header className="mb-16 relative z-10 animate-slide-up">
          <Badge label="Deep Dive" variant="primary" uppercase className="mb-8 shadow-[0_0_15px_rgba(59,130,246,0.3)]" />
          <h1 className="font-headline text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-on-surface to-on-surface-variant dark:from-white dark:to-white/70 tracking-tighter mb-6">
            Behavioral Deep Dive
          </h1>
          <p className="text-xl text-on-surface-variant dark:text-white/70 leading-relaxed max-w-2xl font-body">
            Master the "why" and "when", not just the "what". These questions test your ability to reason aloud under pressure — like a real senior engineer interview.
          </p>
        </header>

        {/* Questions */}
        <div className="space-y-16 relative z-10">
          {questions.map((q, i) => (
            <article key={q.id} className="group animate-fade-in" style={{ animationDelay: `${0.2 + i * 0.1}s` }}>
              {/* Question number + difficulty */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center font-mono font-bold text-primary-600 dark:text-primary-400 text-lg flex-shrink-0 shadow-inner group-hover:bg-primary-50 dark:group-hover:bg-primary-500/10 transition-colors">
                  {q.number}
                </div>
                <Badge label={q.difficulty} variant={diffMap[q.difficulty]} uppercase />
              </div>

              {/* Question */}
              <h2 className="text-3xl font-black font-headline text-on-surface dark:text-white mb-8 leading-snug tracking-tight">
                {q.question}
              </h2>

              {/* Answer Box */}
              <div className="bg-white dark:bg-surface/40 backdrop-blur-md rounded-3xl p-8 md:p-10 border border-slate-200 dark:border-white/5 shadow-md dark:shadow-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-primary-500 to-accent-500"></div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-primary-500/10 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 flex items-center justify-center"><Icon name="psychology" size="sm" /></div>
                  <span className="text-sm font-bold uppercase tracking-widest text-primary-600 dark:text-primary-200">Model Answer</span>
                </div>
                <p className="text-on-surface-variant dark:text-white/90 text-lg leading-relaxed font-body">{q.answer}</p>
              </div>

              {/* Framework hint */}
              {q.framework && (
                <div className="mt-6 p-6 bg-accent-500/5 dark:bg-accent-500/5 rounded-2xl border border-accent-200 dark:border-accent-500/20 flex gap-4 backdrop-blur-sm group-hover:border-accent-300 dark:group-hover:border-accent-500/40 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-accent-500/10 dark:bg-accent-500/20 text-accent-600 dark:text-accent-400 flex items-center justify-center flex-shrink-0">
                     <Icon name="lightbulb" size="sm" filled />
                  </div>
                  <p className="text-on-surface-variant dark:text-white/80 leading-relaxed pt-1">
                    <span className="font-bold text-accent-600 dark:text-accent-300 mr-2">Answer Framework:</span>
                    {q.framework}
                  </p>
                </div>
              )}

              {/* Divider */}
              {i !== questions.length - 1 && (
                <div className="mt-16 h-px w-full bg-gradient-to-r from-transparent via-outline-variant/50 dark:via-white/10 to-transparent" />
              )}
            </article>
          ))}
        </div>

        {/* Progress CTA */}
        <div className="mt-24 glass-panel-heavy rounded-3xl p-12 text-center border-primary-500/20 dark:border-primary-500/30 shadow-lg dark:shadow-[0_0_40px_rgba(59,130,246,0.1)] relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-t from-primary-600/5 dark:from-primary-600/10 to-transparent pointer-events-none"></div>
          <p className="text-xs uppercase tracking-widest text-primary-600 dark:text-primary-300 font-bold mb-4">Session Complete</p>
          <h3 className="text-4xl font-black font-headline text-on-surface dark:text-white mb-6">Great depth, Zen.</h3>
          <p className="text-on-surface-variant dark:text-white/70 mb-10 max-w-md mx-auto text-lg">
            You reasoned through 3 Deep Dive questions. Ready to test your speed with the next module?
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
      </div>
    </AppShell>
  )
}
