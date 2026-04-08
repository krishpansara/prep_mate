import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import AdminShell from '@components/layout/AdminShell'
import Button from '@components/ui/Button'
import Icon from '@components/ui/Icon'
import Badge from '@components/ui/Badge'
import { questionsApi, topicsApi, type ApiTopic } from '@lib/api'

type Difficulty = 'EASY' | 'MEDIUM' | 'HARD'

const initialState = {
  title: '',
  topicId: '',
  difficulty: 'MEDIUM' as Difficulty,
  problemStatement: '',
  constraints: '',
  example: '',
  solution: '',
  hint: '',
  concepts: [] as string[],
  published: false,
}

const difficulties: Difficulty[] = ['EASY', 'MEDIUM', 'HARD']

const diffBadgeMap: Record<Difficulty, 'secondary' | 'neutral' | 'error'> = {
  EASY: 'secondary',
  MEDIUM: 'neutral',
  HARD: 'error',
}

export default function QuestionEditorPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const isEdit = Boolean(id)
  
  const [form, setForm] = useState(initialState)
  const [topics, setTopics] = useState<ApiTopic[]>([])
  const [newConcept, setNewConcept] = useState('')
  const [loading, setLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [savedMsg, setSavedMsg] = useState<string | null>(null)

  useEffect(() => {
    Promise.all([
      topicsApi.list().then((res) => {
        setTopics(res.data)
        if (!isEdit && res.data.length > 0) {
          setForm((f) => ({ ...f, topicId: res.data[0]._id }))
        }
      }),
      isEdit ? questionsApi.getById(id!).then((q) => {
        setForm({
          title: q.title,
          topicId: typeof q.topicId === 'object' ? (q.topicId as any)._id : q.topicId,
          difficulty: q.difficulty as Difficulty,
          problemStatement: q.problemStatement,
          constraints: q.constraints || '',
          example: q.example || '',
          solution: q.solution || '',
          hint: q.hint || '',
          concepts: q.concepts || [],
          published: q.published,
        })
      }) : Promise.resolve()
    ]).catch(console.error).finally(() => setLoading(false))
  }, [id, isEdit])

  const set = <K extends keyof typeof initialState>(key: K, value: (typeof initialState)[K]) =>
    setForm((f) => ({ ...f, [key]: value }))

  const addConcept = () => {
    if (newConcept.trim()) {
      setForm((f) => ({ ...f, concepts: [...f.concepts, newConcept.trim()] }))
      setNewConcept('')
    }
  }

  const removeConcept = (index: number) => {
    setForm((f) => ({ ...f, concepts: f.concepts.filter((_, i) => i !== index) }))
  }

  const handleSave = async (publish = false) => {
    setIsSaving(true)
    setSavedMsg(null)
    try {
      const payload = { ...form, published: publish }
      if (isEdit) {
        await questionsApi.update(id!, payload)
      } else {
        await questionsApi.create(payload)
      }
      setSavedMsg(publish ? 'Question published!' : 'Draft saved.')
      setTimeout(() => navigate('/admin/questions'), 1500)
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Save failed')
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
            onClick={() => navigate('/admin/questions')}
            className="flex items-center gap-1.5 text-xs font-semibold text-on-surface-variant uppercase tracking-widest mb-2 hover:text-on-surface transition-colors"
          >
            <Icon name="arrow_back" size="xs" />
            Question Bank
          </button>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight font-headline">
            {isEdit ? `Editing Question` : 'New Question'}
          </h2>
        </div>
        <div className="flex items-center gap-4">
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
            <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">Question Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => set('title', e.target.value)}
              placeholder="e.g. Two Sum"
              className="w-full p-4 bg-surface-container-lowest border border-outline-variant/20 rounded-2xl text-lg font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">Problem Statement</label>
            <textarea
              value={form.problemStatement}
              onChange={(e) => set('problemStatement', e.target.value)}
              rows={5}
              placeholder="Describe the problem clearly..."
              className="w-full p-4 bg-surface-container-lowest border border-outline-variant/20 rounded-2xl text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">Example Input / Output</label>
            <div className="bg-surface-container-highest dark:bg-[#0f1524] rounded-2xl overflow-hidden border border-outline-variant/50 dark:border-white/10 shadow-lg">
              <div className="px-5 py-3 flex items-center justify-between border-b border-outline-variant/50 dark:border-white/5 bg-slate-100 dark:bg-transparent">
                <div className="flex gap-2">
                  {['#ff5f56', '#ffbd2e', '#27c93f'].map((c) => <div key={c} className="w-3 h-3 rounded-full shadow-inner" style={{ background: c }} aria-hidden="true" />)}
                </div>
                <span className="text-xs font-mono text-on-surface-variant/80 dark:text-white/40 uppercase tracking-widest">example.txt</span>
              </div>
              <div className="flex bg-white dark:bg-[#050914] relative">
                <div className="py-4 pl-4 pr-3 text-right bg-slate-50 dark:bg-white/[0.02] border-r border-outline-variant/30 dark:border-white/5 select-none font-mono text-sm text-outline dark:text-white/20 hidden sm:block">
                  {Array.from({ length: Math.max(4, form.example.split('\n').length) }).map((_, i) => <div key={i} className="leading-relaxed">{i + 1}</div>)}
                </div>
                <textarea
                  value={form.example}
                  onChange={(e) => set('example', e.target.value)}
                  rows={Math.max(4, form.example.split('\n').length)}
                  placeholder={'Input: nums = [2,7,11,15], target = 9\nOutput: [0,1]'}
                  className="w-full bg-transparent text-secondary dark:text-accent-100 p-4 font-mono text-sm leading-relaxed focus:outline-none resize-none focus:bg-primary-50/30 dark:focus:bg-white/[0.02] transition-colors"
                  spellCheck={false}
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">Editorial Solution (Python)</label>
            <div className="bg-surface-container-highest dark:bg-[#0f1524] rounded-2xl overflow-hidden border border-outline-variant/50 dark:border-white/10 shadow-lg">
              <div className="px-5 py-3 flex items-center justify-between border-b border-outline-variant/50 dark:border-white/5 bg-slate-100 dark:bg-transparent">
                <div className="flex gap-2">
                  {['#ff5f56', '#ffbd2e', '#27c93f'].map((c) => <div key={c} className="w-3 h-3 rounded-full shadow-inner" style={{ background: c }} aria-hidden="true" />)}
                </div>
                <span className="text-xs font-mono text-on-surface-variant/80 dark:text-white/40 uppercase tracking-widest">solution.py</span>
              </div>
              <div className="flex bg-white dark:bg-[#050914] relative">
                <div className="py-4 pl-4 pr-3 text-right bg-slate-50 dark:bg-white/[0.02] border-r border-outline-variant/30 dark:border-white/5 select-none font-mono text-sm text-outline dark:text-white/20 hidden sm:block">
                  {Array.from({ length: Math.max(8, form.solution.split('\n').length) }).map((_, i) => <div key={i} className="leading-relaxed">{i + 1}</div>)}
                </div>
                <textarea
                  value={form.solution}
                  onChange={(e) => set('solution', e.target.value)}
                  rows={Math.max(8, form.solution.split('\n').length)}
                  placeholder={'def twoSum(nums, target):\n    prevMap = {}\n    for i, n in enumerate(nums):\n        diff = target - n\n        if diff in prevMap:\n            return [prevMap[diff], i]\n        prevMap[n] = i'}
                  className="w-full bg-transparent text-secondary dark:text-accent-100 p-4 font-mono text-sm leading-relaxed focus:outline-none resize-none focus:bg-primary-50/30 dark:focus:bg-white/[0.02] transition-colors"
                  spellCheck={false}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-surface-container-lowest border border-outline-variant/10 rounded-2xl p-6 space-y-5">
            <h3 className="font-bold text-on-surface">Question Settings</h3>
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
                    className={`flex-1 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${form.difficulty === d ? 'ring-2 ring-primary scale-105' : 'opacity-60 hover:opacity-80'}`}
                  >
                    <Badge label={d} variant={diffBadgeMap[d]} uppercase className="w-full justify-center" />
                  </button>
                ))}
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

          <div className="bg-surface-container-lowest border border-outline-variant/10 rounded-2xl p-6 space-y-4">
            <h3 className="font-bold text-on-surface">Key Concepts</h3>
            <div className="flex gap-2">
              <input
                type="text"
                value={newConcept}
                onChange={(e) => setNewConcept(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addConcept()}
                placeholder="Add concept tag..."
                className="flex-1 p-2.5 bg-surface-container-low border-none rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <button onClick={addConcept} className="p-2.5 bg-primary text-white rounded-xl hover:bg-primary-dim transition-colors">
                <Icon name="add" size="sm" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {form.concepts.map((tag, i) => (
                <span key={i} className="flex items-center gap-1 px-3 py-1 bg-primary-container text-on-primary-container rounded-full text-xs font-semibold">
                  {tag}
                  <button onClick={() => removeConcept(i)} aria-label={`Remove ${tag}`} className="hover:opacity-70">
                    <Icon name="close" size="xs" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant/10 rounded-2xl p-6 space-y-3">
            <h3 className="font-bold text-on-surface flex items-center gap-2">
              <Icon name="lightbulb" className="text-primary" size="sm" /> Author Hint
            </h3>
            <textarea
              value={form.hint}
              onChange={(e) => set('hint', e.target.value)}
              rows={3}
              placeholder="Provide a nudge without giving away the solution..."
              className="w-full p-3 bg-surface-container-low border-none rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
            />
          </div>
        </div>
      </div>
    </AdminShell>
  )
}
