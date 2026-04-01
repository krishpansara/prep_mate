import { useParams, Link, useNavigate } from 'react-router-dom'
import Card from '@components/ui/Card'
import Badge from '@components/ui/Badge'
import Button from '@components/ui/Button'
import Icon from '@components/ui/Icon'

// ─── Mock Concept Data ───────────────────────────────────────────────────────

interface Concept {
  slug: string
  title: string
  category: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  readTime: string
  description: string
  keyPoints: string[]
  codeExample: { language: string; code: string }
  relatedSlugs: string[]
}

const CONCEPTS: Record<string, Concept> = {
  'big-o': {
    slug: 'big-o',
    title: 'Big O Notation',
    category: 'Algorithms',
    difficulty: 'Beginner',
    readTime: '8 min read',
    description:
      'Big O notation is the mathematical language we use to describe how the runtime or space requirements of an algorithm grow as the input size grows. It focuses on the dominant term and ignores constants.',
    keyPoints: [
      'O(1) — Constant time: hash map lookups, array index access',
      'O(log n) — Logarithmic: binary search, balanced BST operations',
      'O(n) — Linear: single-pass array traversal',
      'O(n log n) — Linearithmic: merge sort, heap sort',
      'O(n²) — Quadratic: nested loops, bubble sort',
      'O(2ⁿ) — Exponential: recursive subsets, backtracking',
    ],
    codeExample: {
      language: 'python',
      code: `# O(1) — Constant
def get_first(arr):
    return arr[0]

# O(n) — Linear
def find_max(arr):
    max_val = arr[0]
    for item in arr:       # iterates n times
        if item > max_val:
            max_val = item
    return max_val

# O(n²) — Quadratic
def has_duplicate(arr):
    for i in range(len(arr)):         # n
        for j in range(i + 1, len(arr)):  # n
            if arr[i] == arr[j]:
                return True
    return False`,
    },
    relatedSlugs: ['binary-search', 'merge-sort', 'dynamic-programming'],
  },
  'binary-search': {
    slug: 'binary-search',
    title: 'Binary Search',
    category: 'Algorithms',
    difficulty: 'Beginner',
    readTime: '6 min read',
    description:
      'Binary search is a classic O(log n) algorithm for finding a target value in a sorted array by repeatedly halving the search space.',
    keyPoints: [
      'Requires the array to be sorted first',
      'Each iteration halves the search space',
      'Works for monotonic functions, not just arrays',
      "Classic pitfall: off-by-one errors in lo/hi bounds",
    ],
    codeExample: {
      language: 'python',
      code: `def binary_search(arr, target):
    lo, hi = 0, len(arr) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1`,
    },
    relatedSlugs: ['big-o', 'merge-sort'],
  },
  'merge-sort': {
    slug: 'merge-sort',
    title: 'Merge Sort',
    category: 'Sorting',
    difficulty: 'Intermediate',
    readTime: '10 min read',
    description:
      'Merge sort is a stable, O(n log n) divide-and-conquer sorting algorithm. It repeatedly splits the array in half, sorts each half recursively, then merges them.',
    keyPoints: [
      'Time: O(n log n) in all cases',
      'Space: O(n) auxiliary — not in-place',
      'Stable sort (preserves order of equal elements)',
      'Preferred for linked lists over quick sort',
    ],
    codeExample: {
      language: 'python',
      code: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left  = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i]); i += 1
        else:
            result.append(right[j]); j += 1
    return result + left[i:] + right[j:]`,
    },
    relatedSlugs: ['big-o', 'binary-search'],
  },
}

const DIFFICULTY_VARIANT: Record<string, 'primary' | 'secondary' | 'neutral'> = {
  Beginner:     'primary',
  Intermediate: 'neutral',
  Advanced:     'secondary',
}

export default function ConceptDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const concept = slug ? CONCEPTS[slug] : undefined

  if (!concept) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <Icon name="search_off" className="!text-6xl text-on-surface-variant dark:text-white/30 mb-4" />
        <h1 className="text-2xl font-black text-on-surface dark:text-white mb-2">Concept Not Found</h1>
        <p className="text-on-surface-variant dark:text-white/60 mb-6">
          The concept <code className="font-mono bg-slate-100 dark:bg-white/10 px-2 py-0.5 rounded text-sm">{slug}</code> doesn't exist yet.
        </p>
        <Button variant="primary" icon="arrow_back" onClick={() => navigate('/app/learn/concepts')}>
          Back to Concepts
        </Button>
      </div>
    )
  }

  return (
    <>
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-on-surface-variant dark:text-white/50 mb-8">
        <Link to="/app/learn/concepts" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium">
          Concepts
        </Link>
        <Icon name="chevron_right" size="sm" />
        <span className="text-on-surface dark:text-white font-semibold">{concept.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Header */}
          <Card variant="elevated">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-3">
                  <Badge label={concept.category} variant="neutral" />
                  <Badge label={concept.difficulty} variant={DIFFICULTY_VARIANT[concept.difficulty]} />
                </div>
                <h1 className="text-3xl font-black font-headline text-on-surface dark:text-white tracking-tight mb-2">
                  {concept.title}
                </h1>
                <div className="flex items-center gap-1.5 text-sm text-on-surface-variant dark:text-white/50">
                  <Icon name="schedule" size="sm" />
                  {concept.readTime}
                </div>
              </div>
            </div>

            <p className="text-on-surface-variant dark:text-white/75 leading-relaxed text-base mt-6">
              {concept.description}
            </p>
          </Card>

          {/* Key Points */}
          <Card>
            <h2 className="text-lg font-bold text-on-surface dark:text-white mb-5 flex items-center gap-2">
              <Icon name="key" size="sm" className="text-primary-600 dark:text-primary-400" />
              Key Points
            </h2>
            <ul className="space-y-3">
              {concept.keyPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-lg bg-primary-500/10 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 flex items-center justify-center flex-shrink-0 text-xs font-black mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-sm text-on-surface dark:text-white/80 leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Code Example */}
          <Card variant="dark">
            <h2 className="text-lg font-bold text-on-surface dark:text-white mb-5 flex items-center gap-2">
              <Icon name="code" size="sm" className="text-accent-500" />
              Code Example
              <Badge label={concept.codeExample.language} variant="neutral" className="uppercase text-xs ml-auto" />
            </h2>
            <pre className="overflow-x-auto rounded-xl p-5 text-sm leading-relaxed font-mono
              bg-[#0d1117] text-green-400
              dark:bg-black/40 dark:text-green-300">
              <code>{concept.codeExample.code}</code>
            </pre>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-4">
          <Card variant="surface-low">
            <h3 className="font-bold text-on-surface dark:text-white mb-4">Related Concepts</h3>
            <div className="flex flex-col gap-2">
              {concept.relatedSlugs.map((relSlug) => {
                const related = CONCEPTS[relSlug]
                return related ? (
                  <Link
                    key={relSlug}
                    to={`/app/learn/concepts/${relSlug}`}
                    className="flex items-center gap-3 p-3 rounded-xl transition-all
                      hover:bg-slate-100 dark:hover:bg-white/5"
                  >
                    <Icon name="article" size="sm" className="text-primary-600 dark:text-primary-400" />
                    <div>
                      <div className="text-sm font-semibold text-on-surface dark:text-white">{related.title}</div>
                      <div className="text-xs text-on-surface-variant dark:text-white/40">{related.difficulty}</div>
                    </div>
                    <Icon name="chevron_right" size="sm" className="ml-auto text-on-surface-variant" />
                  </Link>
                ) : null
              })}
            </div>
          </Card>

          <Card>
            <h3 className="font-bold text-on-surface dark:text-white mb-2">Practice This</h3>
            <p className="text-xs text-on-surface-variant dark:text-white/50 mb-4">
              Reinforce this concept with targeted practice questions.
            </p>
            <Button variant="primary" size="sm" icon="fitness_center" className="w-full justify-center" onClick={() => navigate('/app/practice')}>
              Go to Practice
            </Button>
          </Card>
        </div>
      </div>
    </>
  )
}
