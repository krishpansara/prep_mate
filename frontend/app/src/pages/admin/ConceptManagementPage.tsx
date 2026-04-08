import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminShell from '@components/layout/AdminShell'
import Button from '@components/ui/Button'
import Icon from '@components/ui/Icon'
import Badge from '@components/ui/Badge'
import { conceptsApi, type ApiConcept } from '@lib/api'

const diffBadge: Record<string, 'secondary' | 'neutral' | 'error'> = {
  EASY: 'secondary',
  MEDIUM: 'neutral',
  HARD: 'error',
}

export default function ConceptManagementPage() {
  const navigate = useNavigate()
  const [concepts, setConcepts] = useState<ApiConcept[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    conceptsApi.adminList()
      .then((res) => setConcepts(res.data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this concept?')) return
    try {
      await conceptsApi.delete(id)
      setConcepts((prev) => prev.filter((c) => c._id !== id))
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Delete failed')
    }
  }

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

      {/* Search + filter placeholder */}
      <section className="mb-8 flex flex-wrap gap-4 items-center">
        <div className="relative flex-1 max-w-sm">
          <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" size="sm" />
          <input
            type="text"
            placeholder="Search concepts..."
            className="w-full pl-10 pr-4 py-2.5 bg-surface-container-lowest border border-outline-variant/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
      </section>

      {/* Concept list */}
      <div className="bg-surface-container-lowest rounded-3xl overflow-hidden border border-outline-variant/10 shadow-sm">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-surface-container-low/50 border-b border-outline-variant/10">
              {['Concept', 'Topic', 'Difficulty', 'Code', 'Actions'].map((col) => (
                <th key={col} className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-on-surface-variant/70">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container">
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td className="px-6 py-5"><div className="h-4 w-48 bg-surface-container rounded" /></td>
                  <td className="px-6 py-5"><div className="h-4 w-24 bg-surface-container rounded" /></td>
                  <td className="px-6 py-5"><div className="h-6 w-16 bg-surface-container rounded-full" /></td>
                  <td className="px-6 py-5"><div className="h-4 w-4 bg-surface-container rounded" /></td>
                  <td className="px-6 py-5"><div className="h-8 w-16 bg-surface-container rounded ml-auto" /></td>
                </tr>
              ))
            ) : concepts.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-10 text-center text-on-surface-variant">
                  No concepts created yet.
                </td>
              </tr>
            ) : concepts.map((c) => (
              <tr key={c._id} className="hover:bg-surface-container-low/30 transition-colors group">
                <td className="px-6 py-5 gap-2">
                  <div className="flex flex-col">
                     <div className="flex items-center gap-2">
                       <p className="font-bold text-on-surface group-hover:text-primary transition-colors">{c.title}</p>
                       {!c.published && <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded uppercase font-bold">Draft</span>}
                     </div>
                  </div>
                </td>
                <td className="px-6 py-5 text-sm text-on-surface-variant">
                  {typeof c.topicId === 'object' ? (c.topicId as any).name : c.topicId}
                </td>
                <td className="px-6 py-5">
                  <Badge label={c.difficulty} variant={diffBadge[c.difficulty] || 'neutral'} uppercase />
                </td>
                <td className="px-6 py-5">
                  {c.hasCode ? <Icon name="code" className="text-secondary" size="sm" /> : <Icon name="remove" className="text-outline-variant" size="sm" />}
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => navigate(`/admin/concepts/${c._id}/edit`)}
                      className="p-2 hover:bg-primary-container text-primary rounded-xl transition-colors"
                      aria-label="Edit concept"
                    >
                      <Icon name="edit" size="sm" />
                    </button>
                    <button onClick={() => handleDelete(c._id)} className="p-2 hover:bg-error-container/20 text-error rounded-xl transition-colors" aria-label="Delete concept">
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
