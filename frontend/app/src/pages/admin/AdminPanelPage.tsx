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

export default function AdminPanelPage() {
  return (
    <AdminShell>
      <section className="mb-10 flex flex-wrap gap-6 justify-between items-end">
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2 font-headline">Deep Dive Editor</h2>
          <p className="text-on-surface-variant leading-relaxed">
            Manage behavioral and conceptual deep-dive questions. These appear in Deep Dive sessions.
          </p>
        </div>
        <Button variant="primary" size="sm" icon="add" iconPosition="left">
          New Deep Dive Q
        </Button>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        {[
          { label: 'Total Questions', value: '48', icon: 'psychology', color: 'text-primary bg-primary/10' },
          { label: 'Published', value: '36', icon: 'public', color: 'text-secondary bg-secondary/10' },
          { label: 'Pending Review', value: '12', icon: 'hourglass_top', color: 'text-outline bg-outline-variant/20' },
        ].map((stat) => (
          <div key={stat.label} className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/10 shadow-sm flex items-center gap-4">
            <div className={`p-3 rounded-xl ${stat.color}`}>
              <Icon name={stat.icon} size="sm" />
            </div>
            <div>
              <p className="text-2xl font-extrabold font-headline">{stat.value}</p>
              <p className="text-sm text-on-surface-variant">{stat.label}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Deep dive question table */}
      <div className="bg-surface-container-lowest rounded-3xl overflow-hidden border border-outline-variant/10 shadow-sm">
        <div className="px-6 py-4 border-b border-outline-variant/10 flex items-center justify-between">
          <h3 className="font-bold text-on-surface">All Questions</h3>
          <div className="flex gap-3">
            <select className="px-3 py-1.5 bg-surface-container border-none rounded-xl text-sm focus:outline-none">
              <option>All Topics</option>
              <option>Data Structures</option>
              <option>Behavioral</option>
            </select>
            <select className="px-3 py-1.5 bg-surface-container border-none rounded-xl text-sm focus:outline-none">
              <option>All Status</option>
              <option>Published</option>
              <option>Draft</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container-low/30">
                {['Question', 'Topic', 'Difficulty', 'Status', 'Actions'].map((col) => (
                  <th key={col} className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-on-surface-variant/70">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container">
              {deepDiveQuestions.map((q) => (
                <tr key={q.id} className="hover:bg-surface-container-low/30 transition-colors group">
                  <td className="px-6 py-5">
                    <p className="font-semibold text-on-surface max-w-xs group-hover:text-primary transition-colors truncate">
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
                      variant={q.status === 'published' ? 'secondary' : 'neutral'}
                      uppercase
                    />
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-primary-container text-primary rounded-xl transition-colors" aria-label="Edit">
                        <Icon name="edit" size="sm" />
                      </button>
                      <button className="p-2 hover:bg-error-container/20 text-error rounded-xl transition-colors" aria-label="Delete">
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
