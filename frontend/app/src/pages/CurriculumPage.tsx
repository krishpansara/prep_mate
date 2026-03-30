import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '@components/layout/Navbar'
import Card from '@components/ui/Card'
import Icon from '@components/ui/Icon'

interface Question {
  id: string
  title: string
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert'
}

interface Concept {
  id: string
  title: string
  description: string
}

interface Topic {
  id: string
  title: string
  tag: string
  progress: number
  locked: boolean
  lockReason?: string
  concepts: Concept[]
  questions: Question[]
}

const mockCourseData: Record<string, { title: string; subtitle: string; description: string; topics: Topic[] }> = {
  dsa: {
    title: 'Data Structures Core Mastery.',
    subtitle: 'CURRICULUM',
    description: 'Explore the fundamental building blocks of software engineering. This track bridges the gap between basic implementation and high-level architectural optimization.',
    topics: [
      {
        id: 'arrays-strings',
        title: 'Arrays & Strings',
        tag: 'FOUNDATIONAL',
        progress: 85,
        locked: false,
        concepts: [
          { id: 'c1', title: 'Amortized Time Complexity', description: 'Understanding dynamic array resizing internals.' },
          { id: 'c2', title: 'Two-Pointer Techniques', description: 'In-place manipulation and space efficiency.' },
          { id: 'c3', title: 'Sliding Window Pattern', description: 'Optimal solutions for subarray problems.' }
        ],
        questions: [
          { id: 'q1', title: 'Longest Substring Without Repeating...', difficulty: 'Hard' },
          { id: 'q2', title: 'Container With Most Water', difficulty: 'Medium' },
          { id: 'q3', title: 'Valid Palindrome', difficulty: 'Easy' }
        ]
      },
      {
        id: 'linked-lists',
        title: 'Linked Lists',
        tag: 'ACTIVE',
        progress: 66,
        locked: false,
        concepts: [
          { id: 'c4', title: 'Floyd\'s Cycle-Finding Algorithm', description: 'Detecting loops in linear structures.' },
          { id: 'c5', title: 'Reversing Segments', description: 'Pointer manipulation and constant space algorithms.' }
        ],
        questions: [
          { id: 'q4', title: 'Reverse Linked List', difficulty: 'Easy' },
          { id: 'q5', title: 'Merge k Sorted Lists', difficulty: 'Hard' }
        ]
      },
      {
        id: 'trees-graphs',
        title: 'Trees & Graphs',
        tag: 'ADVANCED',
        progress: 0,
        locked: true,
        lockReason: "Complete 'Recursion' and 'Stack & Queues' to unlock this module.",
        concepts: [
          { id: 'c6', title: 'AVL & Red-Black Trees', description: 'Self-balancing search tree mechanics.' },
          { id: 'c7', title: 'Dijkstra\'s Algorithm', description: 'Shortest path in weighted graphs.' }
        ],
        questions: [
          { id: 'q6', title: 'Serialize and Deserialize Binary Tree', difficulty: 'Expert' },
          { id: 'q7', title: 'Number of Islands', difficulty: 'Medium' }
        ]
      }
    ]
  }
}

const difficultyColors = {
  Easy: 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300',
  Medium: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
  Hard: 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300',
  Expert: 'bg-rose-200 text-rose-900 dark:bg-rose-900/50 dark:text-rose-400'
}

export default function CurriculumPage() {
  const { courseId } = useParams<{ courseId: string }>()
  const navigate = useNavigate()
  
  // Default to dsa if course is not found for mockup purposes
  const courseData = mockCourseData[courseId || 'dsa'] || mockCourseData['dsa']
  
  const [expandedTopicId, setExpandedTopicId] = useState<string | null>(courseData.topics[0]?.id || null)

  const toggleTopic = (topicId: string) => {
    setExpandedTopicId(prev => (prev === topicId ? null : topicId))
  }

  return (
    <div className="min-h-screen bg-background relative flex flex-col font-sans">
      <Navbar showSearch={false} />

      <main className="flex-1 w-full max-w-[1000px] mx-auto px-6 py-12 lg:py-16">
        {/* Navigation & Header */}
        <button 
          onClick={() => navigate('/library')}
          className="flex items-center text-sm font-bold text-on-surface-variant hover:text-primary transition-colors mb-8"
        >
          <Icon name="arrow_back" size="sm" className="mr-2" /> Back to Library
        </button>

        <header className="mb-16 max-w-2xl">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-secondary tracking-widest uppercase text-xs font-bold font-headline">{courseData.subtitle}</span>
            <div className="h-px bg-outline-variant/30 flex-1 ml-4" />
          </div>
          <h1 className="text-[3.5rem] font-extrabold font-headline text-on-surface leading-tight tracking-tight mb-6">
            {courseData.title}
          </h1>
          <p className="text-xl text-on-surface-variant leading-relaxed">
            {courseData.description}
          </p>
        </header>

        {/* Timeline / Topics List */}
        <div className="relative border-l-2 border-surface-container-high pl-8 ml-4 space-y-12">
          {courseData.topics.map((topic) => {
            const isExpanded = expandedTopicId === topic.id
            const isLocked = topic.locked

            return (
              <div key={topic.id} className="relative">
                {/* Timeline node marker */}
                <div className={`absolute -left-[41px] top-6 w-5 h-5 rounded-full border-4 border-background ${
                  isLocked ? 'bg-surface-container-high' : 'bg-primary'
                }`} />

                <Card 
                  variant={isLocked ? 'surface-low' : 'default'}
                  className={`transition-all duration-300 ${!isLocked ? 'cursor-pointer hover:border-primary/30' : 'opacity-80'}`}
                  onClick={() => !isLocked && toggleTopic(topic.id)}
                >
                  {/* Topic Header Summary */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                    <div className="flex items-center gap-3">
                      {isLocked ? (
                        <Icon name="lock" className="text-on-surface-variant" size="sm" />
                       ) : (
                        <Icon name="check_circle" className="text-primary" size="sm" filled />
                       )}
                      <span className={`text-xs font-bold tracking-widest uppercase ${
                        topic.tag === 'FOUNDATIONAL' ? 'text-emerald-500' : 
                        topic.tag === 'ACTIVE' ? 'text-primary' : 'text-on-surface-variant'
                      }`}>
                        {topic.tag}
                      </span>
                    </div>

                    {!isLocked && topic.progress > 0 && (
                      <div className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full">
                        {topic.progress}% Complete
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-center mb-4">
                    <h2 className={`text-3xl font-bold font-headline mt-2 mb-4 ${isLocked ? 'text-on-surface-variant' : 'text-on-surface'}`}>
                      {topic.title}
                    </h2>
                    {!isLocked && (
                      <div className={`transform transition-transform duration-300 text-on-surface-variant ${isExpanded ? 'rotate-180' : ''}`}>
                         <Icon name="expand_more" />
                      </div>
                    )}
                  </div>

                  {/* Pre-requisite Warning for Locked */}
                  {isLocked && topic.lockReason && (
                    <div className="mt-4 p-4 bg-surface-container rounded-xl flex items-start gap-4 border border-outline-variant/10 max-w-sm">
                      <div className="bg-warning-container text-on-warning-container p-2 rounded-lg">
                        <Icon name="warning" size="sm" />
                      </div>
                      <div>
                         <h4 className="font-bold text-sm text-on-surface mb-1">Prerequisite required</h4>
                         <p className="text-xs text-on-surface-variant">{topic.lockReason}</p>
                      </div>
                    </div>
                  )}

                  {/* Expandable Content Area */}
                  <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 overflow-hidden transition-all duration-500 ease-in-out ${
                    isExpanded && !isLocked ? 'max-h-[1000px] mt-8 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    {/* Left Column: Deep Dive Concepts */}
                    <div>
                      <div className="flex items-center gap-2 mb-6">
                        <Icon name="auto_stories" className="text-primary" size="sm" />
                        <h3 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant">
                          Deep Dive Concepts
                        </h3>
                      </div>
                      
                      <ul className="space-y-6">
                        {topic.concepts.map(concept => (
                          <li 
                            key={concept.id} 
                            className="relative pl-6 group/concept cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation()
                              navigate('/concepts')
                            }}
                          >
                            <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-primary group-hover/concept:scale-125 transition-transform" />
                            <h4 className="font-bold text-on-surface mb-1 group-hover/concept:text-primary transition-colors">
                              {concept.title}
                            </h4>
                            <p className="text-sm text-on-surface-variant leading-relaxed">
                              {concept.description}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Right Column: Practice Questions */}
                    <div className="bg-surface-container-lowest lg:bg-transparent rounded-2xl lg:rounded-none p-4 lg:p-0">
                      <div className="flex items-center gap-2 mb-6">
                        <Icon name="terminal" className="text-primary" size="sm" />
                        <h3 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant">
                          Practice Questions
                        </h3>
                      </div>

                      <div className="space-y-3">
                        {topic.questions.map(question => (
                          <div 
                            key={question.id}
                            className="bg-surface-container-low hover:bg-surface-container transition-colors rounded-xl p-4 flex items-center justify-between group cursor-pointer border border-outline-variant/10"
                            onClick={(e) => {
                                e.stopPropagation() // Prevent toggling the topic card
                                navigate(`/practice?questionId=${question.id}`)
                            }}
                          >
                            <span className="font-medium text-on-surface text-sm">{question.title}</span>
                            <div className={`text-[10px] font-bold uppercase px-2 py-1 rounded-md tracking-wider ${difficultyColors[question.difficulty]}`}>
                              {question.difficulty}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                </Card>
              </div>
            )
          })}
        </div>
      </main>

      <footer className="py-8 text-center text-sm text-on-surface-variant border-t border-outline-variant/10 w-full mt-auto">
        PrepMate © 2026. Engineering excellence through mindful preparation.
      </footer>
    </div>
  )
}
