import { useState } from 'react'
import AppShell from '@components/layout/AppShell'
import Icon from '@components/ui/Icon'

type Difficulty = 'easy' | 'medium' | 'hard'
type FilterTab = 'all' | Difficulty

interface Question {
  id: string
  title: string
  number: number
  difficulty: Difficulty
  concepts: string[]
  solution: string
  example: { input: string; output: string }
  insight: string
}

const questions: Question[] = [
  {
    id: 'q1', title: 'Two Sum', number: 1, difficulty: 'easy',
    concepts: ['Hash Maps', 'Array Traversal', 'O(n) Time Complexity'],
    solution: `def twoSum(nums, target):\n    prevMap = {}  # val : index\n    for i, n in enumerate(nums):\n        diff = target - n\n        if diff in prevMap:\n            return [prevMap[diff], i]\n        prevMap[n] = i`,
    example: { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]' },
    insight: 'By using a Hash Map, we trade space for time. We only iterate through the list once, looking for the complement of the current number.',
  },
  {
    id: 'q2', title: 'Valid Anagram', number: 242, difficulty: 'easy',
    concepts: ['Frequency Counting', 'Sorting', 'String Manipulation'],
    solution: `def isAnagram(s, t):\n    if len(s) != len(t):\n        return False\n    countS, countT = {}, {}\n    for i in range(len(s)):\n        countS[s[i]] = 1 + countS.get(s[i], 0)\n        countT[t[i]] = 1 + countT.get(t[i], 0)\n    return countS == countT`,
    example: { input: 's = "anagram", t = "nagaram"', output: 'true' },
    insight: 'Character frequency counting is the key insight. Two strings are anagrams if and only if they have identical character frequencies.',
  },
  {
    id: 'q3', title: 'Merge Intervals', number: 56, difficulty: 'medium',
    concepts: ['Sorting', 'Greedy', 'Arrays'],
    solution: `def merge(intervals):\n    intervals.sort(key=lambda i: i[0])\n    output = [intervals[0]]\n    for start, end in intervals[1:]:\n        lastEnd = output[-1][1]\n        if start <= lastEnd:\n            output[-1][1] = max(lastEnd, end)\n        else:\n            output.append([start, end])\n    return output`,
    example: { input: 'intervals = [[1,3],[2,6],[8,10],[15,18]]', output: '[[1,6],[8,10],[15,18]]' },
    insight: 'Sorting by start time guarantees that overlapping intervals are adjacent. Then a simple linear scan can merge them greedily.',
  },
]

const difficultyColor: Record<Difficulty, string> = {
  easy: 'bg-secondary/10 text-secondary',
  medium: 'bg-amber-400/15 text-amber-600',
  hard: 'bg-error/10 text-error',
}

export default function InterviewQuestionsPage() {
  const [activeTab, setActiveTab] = useState<FilterTab>('all')
  const [openId, setOpenId] = useState<string | null>(null)

  const filtered = activeTab === 'all' ? questions : questions.filter((q) => q.difficulty === activeTab)
  const tabs: { key: FilterTab; label: string; dot?: string }[] = [
    { key: 'all', label: 'All Challenges' },
    { key: 'easy', label: 'Easy', dot: 'bg-secondary' },
    { key: 'medium', label: 'Medium', dot: 'bg-amber-400' },
    { key: 'hard', label: 'Hard', dot: 'bg-error' },
  ]

  return (
    <AppShell>
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-12">
        <h1 className="font-headline text-5xl font-extrabold text-on-surface tracking-tighter mb-4">
          Algorithm Mastery
        </h1>
        <p className="text-on-surface-variant text-lg max-w-2xl leading-relaxed">
          A curated collection of industry-standard coding challenges. Focused, distraction-free, and architected for deep learning.
        </p>

        {/* Filter tabs */}
        <div className="mt-10 flex items-center gap-8 border-b border-surface-container-highest pb-0">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`pb-4 text-sm flex items-center gap-2 border-b-2 transition-all -mb-px ${
                activeTab === t.key
                  ? 'border-primary text-primary font-bold'
                  : 'border-transparent text-on-surface-variant hover:text-on-surface font-medium'
              }`}
            >
              {t.dot && <span className={`w-2 h-2 rounded-full ${t.dot}`} />}
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Question cards */}
      <div className="max-w-4xl mx-auto flex flex-col gap-10">
        {filtered.map((q) => {
          const isOpen = openId === q.id
          return (
            <article key={q.id} className="bg-surface-container-lowest rounded-2xl p-10 shadow-sm group">
              {/* Card header */}
              <div className="flex justify-between items-start mb-8">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest rounded-lg ${difficultyColor[q.difficulty]}`}>
                      {q.difficulty}
                    </span>
                    <span className="text-on-surface-variant text-sm font-medium">Problem #{q.number}</span>
                  </div>
                  <h2 className="font-headline text-3xl font-extrabold text-on-surface tracking-tight group-hover:text-primary transition-colors">
                    {q.title}
                  </h2>
                </div>
                <button
                  className="p-3 bg-surface-container-low hover:bg-primary-container text-on-surface-variant hover:text-primary rounded-full transition-all"
                  aria-label="Bookmark"
                >
                  <Icon name="bookmark" size="sm" />
                </button>
              </div>

              {/* Content */}
              <div className="space-y-6">
                {/* Example */}
                <div className="p-5 bg-surface-container-low rounded-xl border-l-4 border-primary/20">
                  <p className="text-sm font-mono text-on-surface-variant italic">Example: {q.example.input}</p>
                  <p className="text-sm font-mono text-on-surface font-bold mt-1">Output: {q.example.output}</p>
                </div>

                {/* Concepts */}
                <div>
                  <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-3">Key Concepts Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {q.concepts.map((c) => (
                      <span key={c} className="px-4 py-2 bg-surface-container-high text-on-surface-variant text-sm font-medium rounded-full">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Expandable solution */}
                <div className="border-t border-outline-variant/10 mt-8">
                  <button
                    onClick={() => setOpenId(isOpen ? null : q.id)}
                    className="flex items-center justify-between w-full py-4 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="font-bold text-primary flex items-center gap-2">
                      <Icon name="auto_awesome" size="sm" />
                      View Editorial Solution
                    </span>
                    <Icon
                      name="expand_more"
                      className={`text-on-surface-variant transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                      size="sm"
                    />
                  </button>

                  {isOpen && (
                    <div className="pt-2 pb-4">
                      <div className="bg-inverse-surface rounded-2xl p-8 overflow-hidden relative">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-xs font-mono text-white/40 uppercase">Python 3</span>
                          <button className="text-white/60 hover:text-white transition-colors" aria-label="Copy code">
                            <Icon name="content_copy" size="sm" />
                          </button>
                        </div>
                        <pre className="text-secondary-fixed-dim text-sm leading-relaxed overflow-x-auto font-mono whitespace-pre">
                          {q.solution}
                        </pre>
                        <div className="absolute bottom-4 right-4 text-[10px] text-white/20 font-mono">Verified Solution</div>
                      </div>
                      {q.insight && (
                        <div className="mt-4 p-4 bg-secondary/5 rounded-xl border border-secondary/10">
                          <p className="text-sm text-secondary-dim leading-relaxed">
                            <strong>Insight:</strong> {q.insight}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </article>
          )
        })}

        {/* Level-up CTA */}
        <div className="relative overflow-hidden rounded-3xl h-64 flex items-center justify-center bg-gradient-to-br from-primary to-secondary">
          <div className="relative z-10 text-center p-8">
            <h3 className="font-headline text-3xl font-extrabold text-white tracking-tight mb-2">
              Ready for Medium?
            </h3>
            <p className="text-on-primary/80 mb-6">
              You've mastered the basics. Level up your system thinking.
            </p>
            <button
              onClick={() => setActiveTab('medium')}
              className="px-8 py-3 bg-white text-primary rounded-2xl font-bold shadow-xl hover:scale-105 transition-transform active:scale-95"
            >
              Browse Medium Challenges
            </button>
          </div>
        </div>

        <div className="h-12" />
      </div>

      {/* FAB */}
      <button className="fixed bottom-8 right-8 w-14 h-14 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-90 transition-all z-50" aria-label="Notes">
        <Icon name="history_edu" size="md" />
      </button>
    </AppShell>
  )
}
