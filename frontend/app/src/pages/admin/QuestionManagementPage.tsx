import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminShell from '@components/layout/AdminShell'
import Button from '@components/ui/Button'
import Icon from '@components/ui/Icon'
import Badge from '@components/ui/Badge'
import { questionsApi, type ApiQuestion } from '@lib/api'

const diffBadge: Record<string, 'secondary' | 'neutral' | 'error'> = {
  EASY:   'secondary',
  MEDIUM: 'neutral',
  HARD:   'error',
}

export default function QuestionManagementPage() {
  const navigate = useNavigate()
  const [questions, setQuestions] = useState<ApiQuestion[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalQuestions, setTotalQuestions] = useState(0)

  const fetchQuestions = async (p = 1) => {
    setLoading(true)
    try {
      const res = await questionsApi.adminList({ page: p })
      setQuestions(res.data)
      setTotalPages(res.pagination.totalPages)
      setPage(res.pagination.page)
      setTotalQuestions(res.pagination.total)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchQuestions(1)
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this question?')) return
    try {
      await questionsApi.delete(id)
      setQuestions((prev) => prev.filter(q => q._id !== id))
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Delete failed')
    }
  }

  return (
    <AdminShell>
      <section className="mb-10 flex flex-wrap gap-6 justify-between items-end">
        <div>
          <h2 className="text-4xl font-extrabold tracking-tight mb-2 font-headline">Question Bank</h2>
          <p className="text-on-surface-variant leading-relaxed">
            Manage coding and interview questions. Questions power the Practice and Deep Dive modules.
          </p>
        </div>
        <Button variant="primary" size="sm" icon="add" iconPosition="left" onClick={() => navigate('/admin/questions/new')}>
          New Question
        </Button>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        {[
          { label: 'Total Questions', value: totalQuestions, icon: 'quiz', color: 'text-primary bg-primary/10' },
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

      <section className="mb-8 flex flex-wrap gap-4 items-center">
        <div className="relative flex-1 max-w-sm">
          <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" size="sm" />
          <input type="text" placeholder="Search questions..." className="w-full pl-10 pr-4 py-2.5 bg-surface-container-lowest border border-outline-variant/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
        </div>
        <div className="ml-auto flex items-center gap-4">
          <p className="text-xs text-on-surface-variant">Page {page} of {totalPages}</p>
          <div className="flex gap-1">
            <button onClick={() => fetchQuestions(page - 1)} disabled={page <= 1} className="p-2 rounded-xl transition-colors text-on-surface-variant hover:bg-slate-100 hover:text-on-surface dark:hover:bg-white/8 dark:hover:text-on-surface disabled:opacity-50">
              <Icon name="chevron_left" size="sm" />
            </button>
            <button onClick={() => fetchQuestions(page + 1)} disabled={page >= totalPages} className="p-2 rounded-xl transition-colors text-on-surface-variant hover:bg-slate-100 hover:text-on-surface dark:hover:bg-white/8 dark:hover:text-on-surface disabled:opacity-50">
              <Icon name="chevron_right" size="sm" />
            </button>
          </div>
        </div>
      </section>

      <div className="bg-surface-container-lowest rounded-3xl overflow-hidden border border-outline-variant/10 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[700px]">
            <thead>
              <tr className="bg-surface-container-low/50 border-b border-outline-variant/10">
                {['Question', 'Topic', 'Difficulty', 'Concepts', 'Status', 'Actions'].map((col) => (
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
                     <td className="px-6 py-5"><div className="h-4 w-32 bg-surface-container rounded" /></td>
                     <td className="px-6 py-5"><div className="h-6 w-16 bg-surface-container rounded-full" /></td>
                     <td className="px-6 py-5"><div className="h-4 w-32 bg-surface-container rounded" /></td>
                     <td className="px-6 py-5"><div className="h-6 w-16 bg-surface-container rounded-full" /></td>
                     <td className="px-6 py-5"><div className="h-8 w-16 bg-surface-container rounded ml-auto" /></td>
                  </tr>
                ))
              ) : questions.length === 0 ? (
                <tr>
                   <td colSpan={6} className="px-6 py-10 text-center text-on-surface-variant">No questions found.</td>
                </tr>
              ) : questions.map((q) => (
                <tr key={q._id} className="hover:bg-surface-container-low/30 transition-colors group">
                  <td className="px-6 py-5">
                    <p className="font-bold text-on-surface group-hover:text-primary transition-colors max-w-xs truncate">{q.title}</p>
                  </td>
                  <td className="px-6 py-5 text-sm text-on-surface-variant whitespace-nowrap">
                    {typeof q.topicId === 'object' ? (q.topicId as any).name : q.topicId}
                  </td>
                  <td className="px-6 py-5">
                    <Badge label={q.difficulty} variant={diffBadge[q.difficulty] || 'neutral'} uppercase />
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-wrap gap-1">
                      {q.concepts?.slice(0, 2).map((c) => (
                        <span key={c} className="px-2 py-0.5 text-[10px] font-semibold bg-primary-container/40 text-on-primary-container rounded-full">{c}</span>
                      ))}
                      {q.concepts && q.concepts.length > 2 && (
                        <span className="px-2 py-0.5 text-[10px] font-semibold bg-surface-container text-on-surface-variant rounded-full">
                          +{q.concepts.length - 2}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <Badge label={q.published ? 'Published' : 'Draft'} variant={q.published ? 'success' : 'neutral'} uppercase />
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => navigate(`/admin/questions/${q._id}/edit`)} className="p-2 hover:bg-primary-container text-primary rounded-xl transition-colors" aria-label="Edit question">
                        <Icon name="edit" size="sm" />
                      </button>
                      <button onClick={() => handleDelete(q._id)} className="p-2 hover:bg-error-container/20 text-error rounded-xl transition-colors" aria-label="Delete question">
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
