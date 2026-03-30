import AdminShell from '@components/layout/AdminShell'
import Icon from '@components/ui/Icon'
import Badge from '@components/ui/Badge'
import Button from '@components/ui/Button'

const deepDiveQuestions = [
  { id: 'dd1', question: 'Explain the difference between a Stack and a Queue.', topic: 'Data Structures', difficulty: 'foundational', status: 'published' as const },
  { id: 'dd2', question: 'Why is the average time complexity of a Hash Table O(1)?', topic: 'Algorithms', difficulty: 'intermediate', status: 'published' as const },
  { id: 'dd3', question: 'When would you choose a Trie over a Hash Map?', topic: 'Data Structures', difficulty: 'advanced', status: 'draft' as const },
  { id: 'dd4', question: 'Describe the STAR method for behavioral questions.', topic: 'Behavioral', difficulty: 'foundational', status: 'published' as const },
  { id: 'dd5', question: 'How do you explain a design decision when you were wrong?', topic: 'Behavioral', difficulty: 'intermediate', status: 'draft' as const },
]

const diffBadge: Record<string, 'secondary' | 'neutral' | 'error'> = {
  foundational: 'secondary',
  intermediate: 'neutral',
  advanced: 'error',
}

const selectClass = [
  'px-3 py-1.5 rounded-xl text-sm outline-none transition-all cursor-pointer',
  'bg-slate-100 text-on-surface border border-slate-200',
  'hover:border-slate-300 focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20',
  'dark:bg-surface-container dark:text-on-surface dark:border-white/[0.08]',
  'dark:hover:border-white/15 dark:focus:border-primary-500/50 dark:focus:ring-primary-500/15',
].join(' ')

export default function AdminPanelPage() {
  return (
    <AdminShell>
      <section className="mb-10 flex flex-wrap gap-6 justify-between items-end">
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2 font-headline text-on-surface">
            Deep Dive Editor
          </h2>
          <p className="text-on-surface-variant leading-relaxed">
            Manage behavioral and conceptual deep-dive questions. These appear in Deep Dive sessions.
          </p>
        </div>
        <Button variant="primary" size="sm" icon="add" iconPosition="left">
          New Deep Dive Q
        </Button>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
        {[
          { label: 'Total Questions', value: '48', icon: 'psychology',   colorBg: 'bg-primary-50 dark:bg-primary-900/30',   colorText: 'text-primary-700 dark:text-primary-300' },
          { label: 'Published',       value: '36', icon: 'public',        colorBg: 'bg-success-container/60 dark:bg-success-container/30', colorText: 'text-on-success-container dark:text-success' },
          { label: 'Pending Review',  value: '12', icon: 'hourglass_top', colorBg: 'bg-slate-100 dark:bg-surface-container-high',           colorText: 'text-on-surface-variant' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white dark:bg-surface-container-lowest p-6 rounded-2xl
              border border-slate-200 dark:border-white/[0.08]
              shadow-card-light dark:shadow-card-dark
              flex items-center gap-4 hover-card-premium"
          >
            <div className={`p-3 rounded-xl ${stat.colorBg} ${stat.colorText}`}>
              <Icon name={stat.icon} size="sm" />
            </div>
            <div>
              <p className="text-2xl font-extrabold font-headline text-on-surface">{stat.value}</p>
              <p className="text-sm text-on-surface-variant mt-0.5">{stat.label}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Deep dive question table */}
      <div
        className="bg-white dark:bg-surface-container-lowest rounded-3xl overflow-hidden
          border border-slate-200 dark:border-white/[0.08]
          shadow-card-light dark:shadow-card-dark"
      >
        <div className="px-6 py-4 border-b border-slate-100 dark:border-white/[0.06] flex items-center justify-between">
          <h3 className="font-bold text-on-surface">All Questions</h3>
          <div className="flex gap-3">
            <select className={selectClass}>
              <option>All Topics</option>
              <option>Data Structures</option>
              <option>Behavioral</option>
            </select>
            <select className={selectClass}>
              <option>All Status</option>
              <option>Published</option>
              <option>Draft</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 dark:bg-surface-container-low/60">
                {['Question', 'Topic', 'Difficulty', 'Status', 'Actions'].map((col) => (
                  <th key={col} className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-on-surface-variant">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/[0.04]">
              {deepDiveQuestions.map((q) => (
                <tr key={q.id} className="hover:bg-slate-50 dark:hover:bg-white/3 transition-colors group">
                  <td className="px-6 py-5">
                    <p className="font-semibold text-on-surface max-w-xs group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors truncate">
                      {q.question}
                    </p>
                  </td>
                  <td className="px-6 py-5 text-sm text-on-surface-variant whitespace-nowrap">{q.topic}</td>
                  <td className="px-6 py-5">
                    <Badge label={q.difficulty} variant={diffBadge[q.difficulty]} uppercase />
                  </td>
                  <td className="px-6 py-5">
                    <Badge
                      label={q.status}
                      variant={q.status === 'published' ? 'success' : 'neutral'}
                      uppercase
                    />
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        className="p-2 rounded-xl transition-colors
                          hover:bg-primary-50 text-primary-600
                          dark:hover:bg-primary-900/40 dark:text-primary-400"
                        aria-label="Edit"
                      >
                        <Icon name="edit" size="sm" />
                      </button>
                      <button
                        className="p-2 rounded-xl transition-colors
                          hover:bg-error-container/40 text-error
                          dark:hover:bg-error-container/50"
                        aria-label="Delete"
                      >
                        <Icon name="delete" size="sm" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  )
}
