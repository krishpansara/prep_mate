import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import AdminShell from '@components/layout/AdminShell'
import Button from '@components/ui/Button'
import Icon from '@components/ui/Icon'
import Badge from '@components/ui/Badge'
import { conceptsApi, topicsApi, type ApiTopic } from '@lib/api'

type Difficulty = 'EASY' | 'MEDIUM' | 'HARD'

const diffBadgeMap: Record<Difficulty, 'secondary' | 'neutral' | 'error'> = {
  EASY: 'secondary',
  MEDIUM: 'neutral',
  HARD: 'error',
}

const difficulties: Difficulty[] = ['EASY', 'MEDIUM', 'HARD']

const initialState = {
  title: '',
  slug: '',
  topicId: '',
  difficulty: 'MEDIUM' as Difficulty,
  body: '',
  summary: '',
  hasCode: false,
  published: false,
}

export default function ConceptEditorPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const isEdit = Boolean(id)

  const [form, setForm] = useState(initialState)
  const [topics, setTopics] = useState<ApiTopic[]>([])
  const [isSaving, setIsSaving] = useState(false)
  const [savedMsg, setSavedMsg] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      topicsApi.list().then((res) => {
        setTopics(res.data)
        if (!isEdit && res.data.length > 0) {
          setForm((f) => ({ ...f, topicId: res.data[0]._id }))
        }
      }),
      isEdit ? conceptsApi.getBySlug(id!).then((c) => {
        setForm({
          title: c.title,
          slug: c.slug,
          topicId: typeof c.topicId === 'object' ? (c.topicId as any)._id : c.topicId,
          difficulty: c.difficulty,
          body: c.body || '',
          summary: c.summary || '',
          hasCode: c.hasCode,
          published: c.published,
        })
      }) : Promise.resolve()
    ]).catch(console.error).finally(() => setLoading(false))
  }, [id, isEdit])

  const set = <K extends keyof typeof initialState>(key: K, value: (typeof initialState)[K]) =>
    setForm((f) => ({ ...f, [key]: value }))

  const handleTitleChange = (title: string) => {
    setForm((f) => ({
      ...f,
      title,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
    }))
  }

  const handleSave = async (publish = false) => {
    setIsSaving(true)
    setSavedMsg(null)
    try {
      const payload = { ...form, published: publish }
      if (isEdit) {
        await conceptsApi.update(id!, payload)
      } else {
        await conceptsApi.create(payload)
      }
      setSavedMsg(publish ? 'Concept published!' : 'Draft saved.')
      setTimeout(() => navigate('/admin/concepts'), 1500)
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to save concept')
    } finally {
      setIsSaving(false)
    }
  }

  if (loading) {
    return <AdminShell><div className="p-10 animate-pulse text-on-surface-variant">Loading...</div></AdminShell>
  }

  return (
    <AdminShell>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
        <div>
          <button
            onClick={() => navigate('/admin/concepts')}
            className="flex items-center gap-1.5 text-xs font-semibold text-on-surface-variant uppercase tracking-widest mb-2 hover:text-on-surface transition-colors"
          >
            <Icon name="arrow_back" size="xs" />
            Concept Library
          </button>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight font-headline">
            {isEdit ? `Editing Concept` : 'New Concept'}
          </h2>
        </div>

        <div className="flex items-center gap-3">
          {savedMsg && (
            <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
              <Icon name="check_circle" size="sm" />
              {savedMsg}
            </span>
          )}
          <Button variant="ghost" size="sm" onClick={() => handleSave(false)} disabled={isSaving}>
            Save Draft
          </Button>
          <Button variant="primary" size="sm" icon="publish" iconPosition="left" onClick={() => handleSave(true)} disabled={isSaving}>
            {isSaving ? 'Saving…' : 'Publish'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">Concept Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="e.g. Hash Maps & Collision Resolution"
              className="w-full p-4 bg-surface-container-lowest border border-outline-variant/20 rounded-2xl text-lg font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">Slug (auto-generated)</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-outline text-sm font-mono">/concepts/</span>
              <input
                type="text"
                value={form.slug}
                onChange={(e) => set('slug', e.target.value)}
                className="w-full pl-[6rem] pr-4 py-3 bg-surface-container-lowest border border-outline-variant/20 rounded-2xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">
              Summary <span className="ml-2 normal-case font-normal text-on-surface-variant/70">(shown in concept cards)</span>
            </label>
            <textarea
              value={form.summary}
              onChange={(e) => set('summary', e.target.value)}
              rows={2}
              placeholder="One-sentence description of what learners will understand…"
              className="w-full p-4 bg-surface-container-lowest border border-outline-variant/20 rounded-2xl text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">
              Body Content <span className="ml-2 normal-case font-normal text-on-surface-variant/70">(supports Markdown)</span>
            </label>
            <textarea
              value={form.body}
              onChange={(e) => set('body', e.target.value)}
              rows={14}
              placeholder={'## Overview\n\nExplain the concept here...\n\n```python\n# Code example\n```'}
              className="w-full p-4 bg-surface-container-lowest border border-outline-variant/20 rounded-2xl text-sm font-mono leading-relaxed focus:outline-none focus:ring-2 focus:ring-primary/20 resize-y transition-all"
            />
            <p className="mt-1.5 text-xs text-on-surface-variant/70">{form.body.trim().split(/\s+/).filter(Boolean).length} words</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-surface-container-lowest border border-outline-variant/10 rounded-2xl p-6 space-y-5">
            <h3 className="font-bold text-on-surface">Settings</h3>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">Topic</label>
              <select
                value={form.topicId}
                onChange={(e) => set('topicId', e.target.value)}
                className="w-full p-3 bg-surface-container-low border-none rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                {topics.map((t) => (
                  <option key={t._id} value={t._id}>{t.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">Difficulty</label>
              <div className="flex gap-2">
                {difficulties.map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => set('difficulty', d)}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                      form.difficulty === d ? 'ring-2 ring-primary scale-105' : 'opacity-60 hover:opacity-80'
                    }`}
                  >
                    <Badge label={d} variant={diffBadgeMap[d]} uppercase className="w-full justify-center" />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-xl cursor-pointer" onClick={() => set('hasCode', !form.hasCode)}>
                <div className="flex items-center gap-2">
                  <Icon name="code" size="sm" className="text-on-surface-variant" />
                  <div>
                    <p className="text-sm font-semibold">Contains Code</p>
                    <p className="text-xs text-on-surface-variant">{form.hasCode ? 'Code samples included' : 'Text-only concept'}</p>
                  </div>
                </div>
                <div className={`w-12 h-6 rounded-full relative transition-colors ${form.hasCode ? 'bg-secondary' : 'bg-outline-variant'}`}>
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${form.hasCode ? 'left-7' : 'left-1'}`} />
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-xl cursor-pointer" onClick={() => set('published', !form.published)}>
                <div>
                  <p className="font-semibold text-sm">{form.published ? 'Published' : 'Draft'}</p>
                  <p className="text-xs text-on-surface-variant">{form.published ? 'Visible to learners' : 'Not visible yet'}</p>
                </div>
                <div className={`w-12 h-6 rounded-full relative transition-colors ${form.published ? 'bg-secondary' : 'bg-outline-variant'}`}>
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${form.published ? 'left-7' : 'left-1'}`} />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant/10 rounded-2xl p-6">
            <h3 className="font-bold text-sm text-on-surface-variant uppercase tracking-widest mb-4">Card Preview</h3>
            <div className="bg-surface-container-low rounded-2xl p-5 border border-outline-variant/10 space-y-2">
              <div className="flex items-center gap-2">
                <Badge label={form.difficulty} variant={diffBadgeMap[form.difficulty]} uppercase />
                {form.hasCode && <Icon name="code" size="xs" className="text-secondary" />}
              </div>
              <p className="font-bold text-on-surface">{form.title || 'Concept Title'}</p>
              <p className="text-xs text-on-surface-variant line-clamp-2">{form.summary || 'Summary will appear here…'}</p>
              <p className="text-xs text-outline">{topics.find(t => t._id === form.topicId)?.name || 'Topic'}</p>
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  )
}
