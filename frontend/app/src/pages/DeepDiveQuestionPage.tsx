import AppShell from '@components/layout/AppShell'
import Icon from '@components/ui/Icon'
import Badge from '@components/ui/Badge'

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
      <div className="max-w-3xl mx-auto py-12">
        {/* Header */}
        <header className="mb-16">
          <Badge label="Deep Dive" variant="primary" uppercase className="mb-6" />
          <h1 className="font-headline text-5xl font-extrabold text-on-surface tracking-tighter mb-6">
            Behavioral Deep Dive
          </h1>
          <p className="text-lg text-on-surface-variant leading-relaxed max-w-xl">
            Master the "why" and "when", not just the "what". These questions test your ability to reason aloud under pressure — like a real senior engineer interview.
          </p>
        </header>

        {/* Questions */}
        <div className="space-y-12">
          {questions.map((q) => (
            <article key={q.id} className="group">
              {/* Question number + difficulty */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-surface-container-low flex items-center justify-center font-mono font-bold text-primary text-sm flex-shrink-0">
                  {q.number}
                </div>
                <Badge label={q.difficulty} variant={diffMap[q.difficulty]} uppercase />
              </div>

              {/* Question */}
              <h2 className="text-2xl font-bold font-headline text-on-surface mb-6 leading-snug">
                {q.question}
              </h2>

              {/* Answer */}
              <div className="bg-surface-container-lowest rounded-2xl p-8 border border-outline-variant/10">
                <div className="flex items-center gap-2 mb-4">
                  <Icon name="psychology" className="text-primary" size="sm" />
                  <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Model Answer</span>
                </div>
                <p className="text-on-surface leading-relaxed">{q.answer}</p>
              </div>

              {/* Framework hint */}
              {q.framework && (
                <div className="mt-4 p-4 bg-secondary/5 rounded-xl border-l-4 border-secondary/30 flex gap-3">
                  <Icon name="lightbulb" className="text-secondary flex-shrink-0 mt-0.5" size="sm" filled />
                  <p className="text-sm text-secondary-dim leading-relaxed">
                    <strong>Answer Framework:</strong> {q.framework}
                  </p>
                </div>
              )}

              {/* Divider */}
              <div className="mt-12 h-px bg-gradient-to-r from-transparent via-outline-variant/20 to-transparent" />
            </article>
          ))}
        </div>

        {/* Progress CTA */}
        <div className="mt-20 bg-surface-container-low rounded-3xl p-10 text-center border border-outline-variant/10">
          <p className="text-xs uppercase tracking-widest text-on-surface-variant font-bold mb-4">Session Complete</p>
          <h3 className="text-3xl font-bold font-headline mb-4">Great depth, Zen.</h3>
          <p className="text-on-surface-variant mb-8 max-w-sm mx-auto">
            You answered 3 Deep Dive questions. Ready to test your speed with the next module?
          </p>
          <div className="flex justify-center gap-4">
            <button className="px-6 py-3 bg-primary text-white rounded-2xl font-bold hover:bg-primary-dim transition-colors">
              Next Module
            </button>
            <button className="px-6 py-3 bg-surface-container text-on-surface rounded-2xl font-bold hover:bg-surface-container-high transition-colors">
              Review Again
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
