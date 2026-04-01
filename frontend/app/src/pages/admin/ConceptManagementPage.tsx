import { useNavigate } from 'react-router-dom'
import AdminShell from '@components/layout/AdminShell'
import Button from '@components/ui/Button'
import Icon from '@components/ui/Icon'
import Badge from '@components/ui/Badge'

interface Concept {
  id: string
  title: string
  topic: string
  difficulty: 'easy' | 'medium' | 'hard'
  wordCount: number
  hasCode: boolean
}

const concepts: Concept[] = [
  { id: '1', title: 'Hash Maps & Collision Resolution', topic: 'Data Structures', difficulty: 'medium', wordCount: 420, hasCode: true },
  { id: '2', title: 'Big O Notation Fundamentals', topic: 'Algorithms', difficulty: 'easy', wordCount: 310, hasCode: false },
  { id: '3', title: 'CAP Theorem Explained', topic: 'System Design', difficulty: 'hard', wordCount: 580, hasCode: false },
  { id: '4', title: 'Python List Comprehensions', topic: 'Python Mastery', difficulty: 'easy', wordCount: 220, hasCode: true },
  { id: '5', title: 'Database Indexing Strategies', topic: 'Database & SQL', difficulty: 'medium', wordCount: 490, hasCode: true },
  { id: '6', title: 'Consensus Algorithms: Raft & Paxos', topic: 'Distributed Systems', difficulty: 'hard', wordCount: 710, hasCode: false },
]

const diffBadge: Record<Concept['difficulty'], 'secondary' | 'neutral' | 'error'> = {
  easy: 'secondary',
  medium: 'neutral',
  hard: 'error',
}

export default function ConceptManagementPage() {
  const navigate = useNavigate()
  return (
    <AdminShell>
      <section className="mb-10 flex flex-wrap gap-6 justify-between items-end">
        <div>
          <h2 className="text-4xl font-extrabold tracking-tight mb-2 font-headline">Concept Library</h2>
          <p className="text-on-surface-variant leading-relaxed">
            Curate the core knowledge units. Concepts power the Deep Dive and learning modules.
          </p>
        </div>
        <Button variant="primary" size="sm" icon="add" iconPosition="left" onClick={() => navigate('/admin/concepts/new')}>
          New Concept
        </Button>
      </section>

      {/* Search + filter */}
      <section className="mb-8 flex flex-wrap gap-4 items-center">
        <div className="relative flex-1 max-w-sm">
          <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" size="sm" />
          <input
            type="text"
            placeholder="Search concepts..."
            className="w-full pl-10 pr-4 py-2.5 bg-surface-container-lowest border border-outline-variant/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
        <select className="px-4 py-2.5 bg-surface-container-lowest border border-outline-variant/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
          <option>All Topics</option>
          <option>Data Structures</option>
          <option>Algorithms</option>
          <option>System Design</option>
        </select>
        <select className="px-4 py-2.5 bg-surface-container-lowest border border-outline-variant/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
          <option>All Difficulties</option>
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>
      </section>

      {/* Concept list */}
      <div className="bg-surface-container-lowest rounded-3xl overflow-hidden border border-outline-variant/10 shadow-sm">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-surface-container-low/50 border-b border-outline-variant/10">
              {['Concept', 'Topic', 'Difficulty', 'Word Count', 'Code', 'Actions'].map((col) => (
                <th key={col} className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-on-surface-variant/70">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container">
            {concepts.map((c) => (
              <tr key={c.id} className="hover:bg-surface-container-low/30 transition-colors group">
                <td className="px-6 py-5">
                  <p className="font-bold text-on-surface group-hover:text-primary transition-colors">{c.title}</p>
                </td>
                <td className="px-6 py-5 text-sm text-on-surface-variant">{c.topic}</td>
                <td className="px-6 py-5">
                  <Badge label={c.difficulty} variant={diffBadge[c.difficulty]} uppercase />
                </td>
                <td className="px-6 py-5 text-sm text-on-surface-variant">{c.wordCount} words</td>
                <td className="px-6 py-5">
                  {c.hasCode ? (
                    <Icon name="code" className="text-secondary" size="sm" />
                  ) : (
                    <Icon name="remove" className="text-outline-variant" size="sm" />
                  )}
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => navigate(`/admin/concepts/${c.id}/edit`)}
                      className="p-2 hover:bg-primary-container text-primary rounded-xl transition-colors"
                      aria-label="Edit concept"
                    >
                      <Icon name="edit" size="sm" />
                    </button>
                    <button className="p-2 hover:bg-error-container/20 text-error rounded-xl transition-colors" aria-label="Delete concept">
                      <Icon name="delete" size="sm" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  )
}
