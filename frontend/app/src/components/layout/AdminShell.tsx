import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import type { ReactNode } from 'react'
import Icon from '@components/ui/Icon'

interface AdminShellProps {
  children: ReactNode
  activePath?: string
}

const adminNavItems = [
  { label: 'Dashboard', href: '/admin', icon: 'dashboard' },
  { label: 'Topics', href: '/admin/topics', icon: 'category' },
  { label: 'Concepts', href: '/admin/concepts', icon: 'lightbulb' },
  { label: 'Questions', href: '/admin/questions', icon: 'quiz' },
  { label: 'Deep Dive', href: '/admin/deep-dive', icon: 'psychology' },
  { label: 'Users', href: '/admin/users', icon: 'group' },
  { label: 'Analytics', href: '/analytics', icon: 'analytics' },
]

const adminFooterItems = [
  { label: 'Settings', href: '#', icon: 'settings' },
  { label: 'Support', href: '#', icon: 'help' },
]

export default function AdminShell({ children }: AdminShellProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background font-body relative">
      {/* Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Fixed Sidebar */}
      <aside className={`fixed left-0 top-0 h-full flex flex-col py-6 px-4 bg-slate-50 dark:bg-slate-900 w-64 z-50 border-r border-slate-100 dark:border-slate-800 transition-transform duration-300 lg:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Brand */}
        <div className="mb-8 px-2">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tighter font-headline">
            PrepMate
          </h1>
          <p className="text-xs text-on-surface-variant opacity-70">Admin Console</p>
        </div>

        {/* New Question CTA */}
        <NavLink
          to="/admin/questions/new"
          className="mb-8 flex items-center justify-center gap-2 bg-gradient-to-br from-primary to-primary-dim text-white py-3 px-4 rounded-xl font-semibold shadow-sm hover:opacity-90 transition-all active:scale-[0.98]"
        >
          <Icon name="add" size="sm" />
          <span>New Question</span>
        </NavLink>

        {/* Nav items */}
        <nav className="flex-1 space-y-1 overflow-y-auto" aria-label="Admin navigation">
          {adminNavItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              end={item.href === '/admin'}
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors duration-200 ${
                  isActive
                    ? 'text-blue-700 dark:text-blue-400 font-semibold bg-slate-200/50 dark:bg-slate-800 border-r-2 border-blue-700'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800'
                }`
              }
            >
              <Icon name={item.icon} size="sm" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer links */}
        <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800/50 space-y-1">
          {adminFooterItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-slate-500 hover:text-slate-900 hover:bg-slate-200/50 transition-colors"
            >
              <Icon name={item.icon} size="sm" />
              <span>{item.label}</span>
            </a>
          ))}
        </div>
      </aside>

      {/* Main content: offset by sidebar width */}
      <div className="lg:ml-64 flex flex-col min-h-screen">
        {/* Glassmorphic top header */}
        <header className="flex justify-between items-center w-full px-4 lg:px-8 py-3 sticky top-0 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800/50 z-30 shadow-sm">
          <div className="flex items-center gap-2 flex-1 max-w-xl">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 -ml-2 text-on-surface-variant hover:bg-surface-container rounded-xl transition-colors"
              aria-label="Open Menu"
            >
              <Icon name="menu" size="sm" />
            </button>
            {/* Search */}
            <div className="relative w-full group hidden sm:block">
              <Icon
                name="search"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant opacity-50 group-focus-within:text-primary transition-colors"
                size="sm"
              />
              <input
                type="text"
                placeholder="Search system logs..."
                className="w-full bg-surface-container-low border-none rounded-xl py-2 pl-10 pr-4 focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-on-surface-variant/50 text-sm"
              />
            </div>
            <button className="sm:hidden p-2 text-on-surface-variant hover:bg-surface-container rounded-xl transition-colors" aria-label="Search">
              <Icon name="search" size="sm" />
            </button>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-4 lg:gap-6 ml-auto lg:ml-6">
            <div className="flex items-center gap-2 lg:gap-4 text-on-surface-variant">
              <button
                aria-label="Notifications"
                className="p-2 hover:text-primary transition-all focus:ring-2 focus:ring-primary/20 outline-none rounded-full"
              >
                <Icon name="notifications" size="sm" />
              </button>
              <button
                aria-label="Help"
                className="p-2 hover:text-primary transition-all rounded-full"
              >
                <Icon name="help" size="sm" />
              </button>
            </div>
            <div className="h-6 w-px bg-slate-200 dark:bg-slate-800" />
            <button className="text-on-surface-variant hover:text-primary font-medium transition-all text-sm hidden md:block">
              Feedback
            </button>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="font-bold text-on-surface leading-none text-sm">Admin Profile</p>
                <p className="text-[10px] text-on-surface-variant font-normal uppercase tracking-wider">
                  Superuser
                </p>
              </div>
              <div className="w-9 h-9 rounded-full bg-primary-container flex items-center justify-center flex-shrink-0">
                <Icon name="person" size="sm" className="text-on-primary-container" />
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  )
}
