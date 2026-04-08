import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import Icon from '@components/ui/Icon'
import Button from '@components/ui/Button'
import Card from '@components/ui/Card'
import Badge from '@components/ui/Badge'
import { topicsApi, conceptsApi, progressApi, type ApiTopic, type ApiConcept, type ApiProgress } from '@lib/api'

export default function TopicPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  
  const [topic, setTopic] = useState<ApiTopic | null>(null)
  const [concepts, setConcepts] = useState<ApiConcept[]>([])
  const [progressData, setProgressData] = useState<ApiProgress[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return
    Promise.all([
      topicsApi.getBySlug(slug).then(setTopic),
      conceptsApi.listByTopic(slug).then((res) => setConcepts(res.data)),
      progressApi.list().then(setProgressData)
    ])
    .catch(console.error)
    .finally(() => setLoading(false))
  }, [slug])

  if (loading) {
    return <div className="p-10 animate-pulse flex flex-col items-center top-1/2">Loading Topic Details...</div>
  }

  if (!topic) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <Icon name="search_off" className="!text-6xl text-on-surface-variant mb-4" />
        <h1 className="text-2xl font-black text-on-surface mb-2">Topic Not Found</h1>
        <Button variant="primary" icon="arrow_back" onClick={() => navigate('/app/dashboard')}>
          Back to Dashboard
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-[1200px] mx-auto py-10 px-4 md:px-0 relative">
      <div className="absolute top-0 right-10 w-96 h-96 bg-primary-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="mb-12">
        <nav className="flex items-center gap-2 text-sm text-on-surface-variant mb-6 font-medium">
          <Link to="/app/dashboard" className="hover:text-primary transition-colors">Dashboard</Link>
          <Icon name="chevron_right" size="sm" />
          <span className="text-on-surface">{topic.name}</span>
        </nav>
        
        <div className="flex gap-4 items-center">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-primary-container text-primary shadow-inner">
            <Icon name={topic.icon || 'menu_book'} className="!text-[32px]" />
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-black font-headline tracking-tight text-on-surface">{topic.name}</h1>
            <p className="text-lg text-on-surface-variant mt-2 max-w-2xl">{topic.description}</p>
          </div>
        </div>
      </header>

      {/* Content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card variant="elevated">
            <h2 className="text-2xl font-bold font-headline mb-6 flex items-center gap-2">
              <Icon name="library_books" className="text-primary" /> Key Concepts
            </h2>
            {concepts.length === 0 ? (
              <p className="text-on-surface-variant">No concepts have been published for this topic yet.</p>
            ) : (
              <div className="space-y-4">
                {concepts.map((concept, index) => {
                  const isCompleted = progressData.some(p => p.completedConcepts?.includes(concept._id))
                  return (
                  <article
                    key={concept._id}
                    onClick={() => navigate(`/app/learn/concepts/${concept.slug}`)}
                    className="group border border-outline-variant/20 rounded-2xl p-5 hover:bg-surface-container-low transition-all cursor-pointer flex gap-4 items-start relative"
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${isCompleted ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400' : 'bg-primary-50 text-primary-600 font-bold'}`}>
                      {isCompleted ? <Icon name="check" /> : index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{concept.title}</h3>
                          {isCompleted && <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full">Completed</span>}
                        </div>
                        <Badge label={concept.difficulty} variant={concept.difficulty === 'HARD' ? 'error' : concept.difficulty === 'MEDIUM' ? 'neutral' : 'secondary'} />
                      </div>
                      <p className="text-sm text-on-surface-variant leading-relaxed line-clamp-2">{concept.summary}</p>
                    </div>
                  </article>
                  )
                })}
              </div>
            )}
          </Card>
        </div>

        <div className="flex flex-col gap-6">
          <Card variant="surface-low">
             <h3 className="font-bold text-on-surface mb-2">Topic Stats</h3>
             <div className="flex justify-between items-center py-2 border-b border-outline-variant/10">
               <span className="text-on-surface-variant text-sm">Total Concepts</span>
               <span className="font-bold">{concepts.length}</span>
             </div>
             <div className="flex justify-between items-center py-2">
               <span className="text-on-surface-variant text-sm">Status</span>
               <Badge label={topic.published ? 'Active' : 'Coming Soon'} variant={topic.published ? 'success' : 'neutral'} />
             </div>
          </Card>
          
          <Card variant="dark">
            <h3 className="font-bold mb-2 text-white">Practice This Topic</h3>
            <p className="text-sm text-white/70 mb-4">Validate your understanding with targeted interview questions.</p>
            <Button variant="primary" icon="bolt" className="w-full justify-center" onClick={() => navigate(`/app/practice?topicId=${topic._id}`)}>
              Start Practice
            </Button>
          </Card>
        </div>
      </div>
    </div>
  )
}
