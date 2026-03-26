import { Link } from 'react-router-dom'
import AdminShell from '@components/layout/AdminShell'
import Button from '@components/ui/Button'
import Icon from '@components/ui/Icon'
import Badge from '@components/ui/Badge'

interface Topic {
  id: string
  name: string
  questionCount: number
  conceptCount: number
  status: 'published' | 'draft'
  icon: string
}

const topics: Topic[] = [
  { id: '1', name: 'Data Structures & Algorithms', questionCount: 142, conceptCount: 38, status: 'published', icon: 'account_tree' },
  { id: '2', name: 'System Design', questionCount: 64, conceptCount: 22, status: 'published', icon: 'hub' },
  { id: '3', name: 'Python Mastery', questionCount: 89, conceptCount: 31, status: 'published', icon: 'terminal' },
  { id: '4', name: 'Java Backend', questionCount: 47, conceptCount: 18, status: 'draft', icon: 'coffee' },
  { id: '5', name: 'Database & SQL', questionCount: 55, conceptCount: 24, status: 'published', icon: 'database' },
  { id: '6', name: 'Behavioral Interviews', questionCount: 33, conceptCount: 15, status: 'draft', icon: 'psychology' },
]

export default function TopicManagementPage() {
  return (
    <AdminShell>
      <section className="mb-10 flex flex-wrap gap-6 justify-between items-end">
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2 font-headline">Topic Management</h2>
          <p className="text-on-surface-variant leading-relaxed">
            Create and manage the curriculum structure. Topics organize all questions and concepts.
          </p>
        </div>
        <Link to="/admin/topics/new">
          <Button variant="primary" size="sm" icon="add" iconPosition="left">
            New Topic
          </Button>
        </Link>
      </section>

      {/* Stats row */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        {[
          { label: 'Total Topics', value: '24', icon: 'category', color: 'text-primary bg-primary/10' },
          { label: 'Published', value: '18', icon: 'public', color: 'text-secondary bg-secondary/10' },
          { label: 'Draft', value: '6', icon: 'edit_note', color: 'text-outline bg-surface-container' },
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

      {/* Topic grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((topic) => (
          <div key={topic.id} className="bg-surface-container-lowest rounded-2xl border border-outline-variant/10 p-6 hover:shadow-lg transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Icon name={topic.icon} className="text-primary" size="sm" />
              </div>
              <Badge label={topic.status} variant={topic.status === 'published' ? 'secondary' : 'neutral'} uppercase />
            </div>
            <h3 className="font-bold text-lg font-headline mb-2 group-hover:text-primary transition-colors">{topic.name}</h3>
            <div className="flex items-center gap-4 text-sm text-on-surface-variant mb-6">
              <span>{topic.questionCount} Questions</span>
              <span>·</span>
              <span>{topic.conceptCount} Concepts</span>
            </div>
            <div className="flex items-center gap-2">
              <Link to={`/admin/topics/${topic.id}/edit`} className="flex-1">
                <Button variant="secondary" size="sm" icon="edit" iconPosition="left" fullWidth>
                  Edit
                </Button>
              </Link>
              <button className="p-2 hover:bg-error-container/20 text-error rounded-xl transition-colors" aria-label="Delete topic">
                <Icon name="delete" size="sm" />
              </button>
            </div>
          </div>
        ))}

        {/* Add new placeholder */}
        <Link
          to="/admin/topics/new"
          className="bg-dashed border-2 border-dashed border-outline-variant/30 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 hover:border-primary hover:bg-primary/5 transition-all cursor-pointer group min-h-[200px]"
        >
          <div className="w-12 h-12 rounded-full bg-surface-container group-hover:bg-primary/10 flex items-center justify-center transition-colors">
            <Icon name="add" className="text-on-surface-variant group-hover:text-primary" size="lg" />
          </div>
          <p className="text-sm font-semibold text-on-surface-variant group-hover:text-primary transition-colors">Create New Topic</p>
        </Link>
      </div>
    </AdminShell>
  )
}
