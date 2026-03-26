import AppShell from '@components/layout/AppShell'
import Icon from '@components/ui/Icon'
import Button from '@components/ui/Button'
import Card from '@components/ui/Card'

interface Section {
  id: string
  title: string
  content: string
  codeExample?: { filename: string; code: string }
  highlight?: { label: string; quote: string }
  callouts?: { icon: string; iconColor: string; title: string; desc: string }[]
}

const sections: Section[] = [
  {
    id: 'intro',
    title: 'Why Python?',
    content: 'Python is an interpreted, high-level, general-purpose programming language. Created by Guido van Rossum and first released in 1991, its design philosophy emphasizes code readability with its notable use of significant whitespace. For system designers and architects, Python serves as the ultimate glue — scripting infrastructure, building high-performance APIs, and prototyping machine learning models.',
    highlight: {
      label: 'Key Philosophy',
      quote: '"Beautiful is better than ugly. Explicit is better than implicit. Simple is better than complex."',
    },
    callouts: [
      { icon: 'bolt', iconColor: 'text-secondary', title: 'Rapid Prototyping', desc: 'Go from concept to working prototype in hours, not days.' },
      { icon: 'hub', iconColor: 'text-primary', title: 'Massive Ecosystem', desc: 'Over 300,000 packages available via PyPI for every imaginable task.' },
    ],
  },
  {
    id: 'clean-slate',
    title: 'The Clean Slate',
    content: 'Unlike many other languages that rely on curly braces, Python uses indentation. This isn\'t just a stylistic choice — it\'s enforced by the compiler. Notice the lack of semicolons and types. While Python is dynamically typed, it supports type hinting for larger projects.',
    codeExample: {
      filename: 'hello_world.py',
      code: `def greet_user(name: str) -> bool:\n    # A simple greeting function\n    message = f"Hello, {name}!"\n    print(message)\n    return True\n\ngreet_user("Architect")`,
    },
  },
]

const tocItems = ['Introduction', 'The Clean Slate', 'Code Example', 'Architectural Impact', 'Next Steps']

export default function TopicPagePython() {
  return (
    <AppShell>
      {/* Progress rail under navbar */}
      <div className="absolute top-0 left-0 w-full h-0.5 bg-surface-variant pointer-events-none">
        <div className="h-full bg-gradient-to-r from-primary to-secondary w-[35%]" />
      </div>

      <div className="flex min-h-screen">
        {/* Main reader */}
        <main className="flex-1 min-w-0">
          <div className="max-w-[720px] mx-auto px-6 py-16 md:py-24">
            {/* Topic header */}
            <header className="mb-12">
              <div className="flex items-center gap-3 text-primary font-semibold mb-4 tracking-tight">
                <span className="px-2 py-1 bg-primary-container/40 rounded-xl text-xs">Module 01</span>
                <span className="text-on-surface-variant/40">•</span>
                <span className="text-sm">15 min read</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold text-on-surface leading-[1.1] tracking-tight mb-8 font-headline">
                Introduction to Python
              </h1>
              <div className="flex items-center gap-4 py-6 border-y border-outline-variant/10">
                <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center flex-shrink-0">
                  <Icon name="person" className="text-on-primary-container" size="sm" />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-on-surface">Alex Rivera</div>
                  <div className="text-sm text-on-surface-variant">Senior Architect @ Python Core</div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 text-on-surface-variant hover:text-primary transition-colors" aria-label="Bookmark">
                    <Icon name="bookmark_add" size="sm" />
                  </button>
                  <button className="p-2 text-on-surface-variant hover:text-primary transition-colors" aria-label="Share">
                    <Icon name="share" size="sm" />
                  </button>
                </div>
              </div>
            </header>

            {/* Article sections */}
            <article className="space-y-10 text-lg leading-relaxed text-on-surface-variant font-body">
              {sections.map((section) => (
                <section key={section.id} id={section.id}>
                  <h2 className="text-3xl font-bold text-on-surface tracking-tight pt-4 mb-4 font-headline">
                    {section.title}
                  </h2>
                  <p>{section.content}</p>

                  {section.highlight && (
                    <div className="my-10 p-8 bg-surface-container-low rounded-2xl border-l-4 border-secondary shadow-sm">
                      <h3 className="text-xl font-bold text-on-surface mb-2">{section.highlight.label}</h3>
                      <p className="italic text-on-surface-variant">{section.highlight.quote}</p>
                    </div>
                  )}

                  {section.codeExample && (
                    <div className="my-10 overflow-hidden rounded-2xl shadow-xl shadow-on-surface/5">
                      {/* Mac-style header */}
                      <div className="bg-on-surface px-6 py-3 flex items-center justify-between">
                        <div className="flex gap-2">
                          {['#e06c75', '#98c379', '#61afef'].map((c) => (
                            <div key={c} className="w-3 h-3 rounded-full" style={{ background: c }} aria-hidden="true" />
                          ))}
                        </div>
                        <span className="text-xs font-mono text-surface-variant/50 uppercase tracking-widest">
                          {section.codeExample.filename}
                        </span>
                      </div>
                      <div className="bg-surface-container-highest p-8 text-sm leading-relaxed overflow-x-auto">
                        <pre className="font-mono whitespace-pre text-on-surface">{section.codeExample.code}</pre>
                      </div>
                    </div>
                  )}

                  {section.callouts && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12">
                      {section.callouts.map((c) => (
                        <Card key={c.title} hover>
                          <Icon name={c.icon} className={`${c.iconColor} mb-4`} size="lg" />
                          <h4 className="font-bold text-on-surface mb-2">{c.title}</h4>
                          <p className="text-sm">{c.desc}</p>
                        </Card>
                      ))}
                    </div>
                  )}
                </section>
              ))}
            </article>

            {/* Footer nav */}
            <footer className="mt-20 pt-12 border-t border-outline-variant/20 flex flex-col md:flex-row justify-between items-center gap-8">
              <div>
                <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-widest opacity-60">
                  Next Lesson
                </span>
                <a href="#" className="block text-xl font-bold text-primary hover:underline mt-1">
                  Variables &amp; Dynamic Typing →
                </a>
              </div>
              <Button variant="secondary" size="md" icon="check" iconPosition="left">
                Mark as Completed
              </Button>
            </footer>
          </div>
        </main>

        {/* Right TOC sidebar — xl+ */}
        <aside className="hidden xl:block w-72 sticky top-16 h-[calc(100vh-4rem)] p-8 border-l border-outline-variant/5 flex-shrink-0">
          <h5 className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-6 opacity-60">
            On this page
          </h5>
          <nav className="flex flex-col gap-4 relative">
            {/* Rail */}
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-surface-variant">
              <div className="absolute top-0 left-0 w-full bg-secondary h-16 rounded-full shadow-sm" />
            </div>
            {tocItems.map((item, i) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                className={`pl-6 text-sm transition-colors ${i === 0 ? 'text-on-surface font-semibold' : 'text-on-surface-variant hover:text-on-surface'}`}
              >
                {item}
              </a>
            ))}
          </nav>
          <div className="mt-12 p-6 bg-primary-container/30 rounded-2xl">
            <Icon name="lightbulb" className="text-primary mb-2" size="sm" filled />
            <p className="text-xs leading-relaxed text-on-primary-container/80">
              <strong>Tip:</strong> Python 3.10+ introduced structural pattern matching — a game changer for complex conditional logic!
            </p>
          </div>
        </aside>
      </div>
    </AppShell>
  )
}
