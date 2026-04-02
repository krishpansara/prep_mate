import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Card from '@components/ui/Card'
import Badge from '@components/ui/Badge'
import Button from '@components/ui/Button'
import Icon from '@components/ui/Icon'
import { conceptsApi, progressApi, type ApiConcept, type ApiProgress } from '@lib/api'

export default function ConceptDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  
  const [concept, setConcept] = useState<ApiConcept | null>(null)
  const [loading, setLoading] = useState(true)
  const [progressData, setProgressData] = useState<ApiProgress[]>([])
  const [isMarking, setIsMarking] = useState(false)

  useEffect(() => {
    if (!slug) return
    Promise.all([
      conceptsApi.getBySlug(slug).then(setConcept),
      progressApi.list().then(setProgressData)
    ])
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [slug])

  const isCompleted = concept && progressData.some(p => p.completedConcepts?.includes(concept._id))

  const handleMarkAsDone = async () => {
    if (!concept || isCompleted || isMarking) return
    setIsMarking(true)
    try {
      const updatedProgress = await progressApi.markConceptCompleted(concept._id)
      setProgressData((prev) => {
        const getTopicId = (t: any) => t && typeof t === 'object' ? t._id : t;
        const uId = getTopicId(updatedProgress.topicId);
        const existing = prev.find(p => getTopicId(p.topicId) === uId);
        if (existing) {
          return prev.map(p => p === existing ? updatedProgress : p)
        }
        return [...prev, updatedProgress]
      })
    } catch (err) {
      console.error('Failed to mark concept as done', err)
      alert('Failed to mark as done.')
    } finally {
      setIsMarking(false)
    }
  }

  if (loading) {
    return <div className="p-10 text-center text-on-surface-variant animate-pulse">Loading Concept...</div>
  }

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
    <nav className="flex items-center justify-start gap-1 text-sm text-on-surface-variant dark:text-white/50 mb-8">
  <Link 
    to="/app/learn/concepts" 
    className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium"
  >
    Concepts
  </Link>

  <Icon name="chevron_right" size="sm" />

  <span className="text-on-surface dark:text-white font-semibold">
    {concept.title}
  </span>
</nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <Card variant="elevated">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-3">
                  <Badge label={typeof concept.topicId === 'object' ? (concept.topicId as any).name : 'Topic'} variant="neutral" />
                  <Badge label={concept.difficulty} variant={concept.difficulty === 'HARD' ? 'error' : concept.difficulty === 'MEDIUM' ? 'neutral' : 'secondary'} />
                </div>
                <h1 className="text-3xl font-black font-headline text-on-surface dark:text-white tracking-tight mb-2">
                  {concept.title}
                </h1>
              </div>
              <div className="flex items-center">
                {isCompleted ? (
                  <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl font-bold text-sm">
                    <Icon name="check_circle" size="sm" />
                    Completed
                  </div>
                ) : (
                  <Button variant="primary" icon="done" onClick={handleMarkAsDone} disabled={isMarking}>
                    {isMarking ? 'Marking...' : 'Mark as Done'}
                  </Button>
                )}
              </div>
            </div>
            <p className="text-on-surface-variant dark:text-white/75 leading-relaxed text-lg mt-4 font-medium italic border-l-4 border-primary pl-4">
              {concept.summary}
            </p>
          </Card>

          <Card>
            <h2 className="text-lg font-bold text-on-surface dark:text-white mb-5 flex items-center gap-2">
              <Icon name="subject" size="sm" className="text-primary-600 dark:text-primary-400" />
              Content details
            </h2>
            <div className="prose dark:prose-invert max-w-none text-on-surface dark:text-white/80 font-body">
              {/* Very basic manual Markdown approximation for display. In production use ReactMarkdown */}
              {concept.body.split('\n').map((line, i) => {
                if (line.startsWith('## ')) return <h2 key={i} className="text-2xl font-bold mt-6 mb-4">{line.replace('## ', '')}</h2>
                if (line.startsWith('### ')) return <h3 key={i} className="text-xl font-bold mt-4 mb-2">{line.replace('### ', '')}</h3>
                if (line.startsWith('- ')) return <li key={i} className="ml-4 list-disc">{line.replace('- ', '')}</li>
                if (line.trim() === '') return <div key={i} className="h-4" />
                if (line.startsWith('```')) return null
                return <p key={i} className="mb-4">{line}</p>
              })}
            </div>
            {concept.hasCode && (
               <div className="mt-8 p-4 bg-surface-container-lowest border border-outline-variant/20 rounded-xl">
                 <p className="text-sm text-on-surface-variant flex items-center gap-2"><Icon name="code" size="sm"/> This concept includes code samples in the body.</p>
               </div>
            )}
          </Card>
        </div>

        <div className="flex flex-col gap-4">
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
