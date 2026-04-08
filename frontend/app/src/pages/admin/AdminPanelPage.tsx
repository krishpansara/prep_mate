import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminShell from '@components/layout/AdminShell'
import Icon from '@components/ui/Icon'
import Badge from '@components/ui/Badge'
import Button from '@components/ui/Button'
import { conceptsApi, type ApiConcept } from '@lib/api'

const diffBadge: Record<string, 'secondary' | 'neutral' | 'error'> = {
  EASY: 'secondary',
  MEDIUM: 'neutral',
  HARD: 'error',
}

const selectClass = [
  'px-3 py-1.5 rounded-xl text-sm outline-none transition-all cursor-pointer',
  'bg-slate-100 text-on-surface border border-slate-200',
  'hover:border-slate-300 focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20',
  'dark:bg-surface-container dark:text-on-surface dark:border-white/[0.08]',
  'dark:hover:border-white/15 dark:focus:border-primary-500/50 dark:focus:ring-primary-500/15',
].join(' ')

export default function AdminPanelPage() {
  const navigate = useNavigate()
  const [concepts, setConcepts] = useState<ApiConcept[]>([])
  const [loading, setLoading] = useState(true)

  const fetchConcepts = async () => {
    setLoading(true)
    try {
      const res = await conceptsApi.adminList()
      // Optional: If you only want to show behavioral deep dives, 
      // you could filter here based on topic slug. But we will show all in Deep Dive for now, or match any keyword.
      setConcepts(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchConcepts()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this deep dive concept?')) return
    try {
      await conceptsApi.delete(id)
      setConcepts(c => c.filter(x => x._id !== id))
    } catch (err) {
      alert('Failed to delete concept')
    }
  }

  return (
    <AdminShell>
      <section className="mb-10 flex flex-wrap gap-6 justify-between items-end">
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2 font-headline text-on-surface">
            Deep Dive Editor
          </h2>
          <p className="text-on-surface-variant leading-relaxed">
            Manage behavioral and conceptual deep-dives.
          </p>
        </div>
        <Button variant="primary" size="sm" icon="add" iconPosition="left" onClick={() => navigate('/admin/concepts/new')}>
          New Deep Dive Concept
        </Button>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
        {[
          { label: 'Total Concepts', value: concepts.length.toString(), icon: 'psychology',   colorBg: 'bg-primary-50 dark:bg-primary-900/30',   colorText: 'text-primary-700 dark:text-primary-300' },
          { label: 'Published',       value: concepts.filter(c => c.published).length.toString(), icon: 'public',        colorBg: 'bg-success-container/60 dark:bg-success-container/30', colorText: 'text-on-success-container dark:text-success' },
          { label: 'Draft',  value: concepts.filter(c => !c.published).length.toString(), icon: 'edit_document', colorBg: 'bg-slate-100 dark:bg-surface-container-high',           colorText: 'text-on-surface-variant' },
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
          <h3 className="font-bold text-on-surface">Deep Dive Concepts</h3>
          <div className="flex gap-3">
            <select className={selectClass}>
              <option>All Topics</option>
            </select>
            <select className={selectClass}>
              <option>All Status</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 dark:bg-surface-container-low/60">
                {['Concept', 'Topic', 'Difficulty', 'Status', 'Actions'].map((col) => (
                  <th key={col} className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-on-surface-variant">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/[0.04]">
              {loading ? (
                <tr><td colSpan={5} className="p-6 text-center text-on-surface-variant">Loading...</td></tr>
              ) : concepts.map((c) => (
                <tr key={c._id} className="hover:bg-slate-50 dark:hover:bg-white/3 transition-colors group">
                  <td className="px-6 py-5">
                    <p className="font-semibold text-on-surface max-w-xs group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors truncate">
                      {c.title}
                    </p>
                  </td>
                  <td className="px-6 py-5 text-sm text-on-surface-variant whitespace-nowrap">{(c.topicId as any)?.name || 'Unknown'}</td>
                  <td className="px-6 py-5">
                    <Badge label={c.difficulty} variant={diffBadge[c.difficulty] || 'neutral'} uppercase />
                  </td>
                  <td className="px-6 py-5">
                    <Badge
                      label={c.published ? 'PUBLISHED' : 'DRAFT'}
                      variant={c.published ? 'success' : 'neutral'}
                      uppercase
                    />
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => navigate(`/admin/concepts/${c._id}/edit`)}
                        className="p-2 rounded-xl transition-colors
                          hover:bg-primary-50 text-primary-600
                          dark:hover:bg-primary-900/40 dark:text-primary-400"
                        aria-label="Edit"
                      >
                        <Icon name="edit" size="sm" />
                      </button>
                      <button
                        onClick={() => handleDelete(c._id)}
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
