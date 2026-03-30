import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import type { ReactNode } from 'react'
import Icon from '@components/ui/Icon'
import ThemeToggle from '@components/ui/ThemeToggle'

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
      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* ── Fixed Sidebar ──────────────────────────────────── */}
      <aside
        className={[
          'fixed left-0 top-0 h-full flex flex-col py-6 px-4 w-64 z-50',
          'transition-transform duration-300 lg:translate-x-0',
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full',
          // Light: white sidebar
          'bg-white border-r border-slate-200 shadow-[1px_0_12px_rgba(15,23,42,0.06)]',
          // Dark: charcoal (#1E1E1E) sidebar
          'dark:bg-[#1E1E1E] dark:border-r dark:border-white/[0.06] dark:shadow-[1px_0_20px_rgba(0,0,0,0.5)]',
        ].join(' ')}
      >
        {/* Brand */}
        <div className="mb-8 px-2">
          <h1 className="text-2xl font-bold tracking-tighter font-headline
            bg-gradient-to-r from-primary-600 to-accent-600
            dark:from-primary-400 dark:to-accent-500
            bg-clip-text text-transparent">
            PrepMate
          </h1>
          <p className="text-xs text-on-surface-variant mt-0.5 font-medium">Admin Console</p>
        </div>

        {/* New Question CTA */}
        <NavLink
          to="/admin/questions/new"
          className="mb-8 flex items-center justify-center gap-2 rounded-xl py-3 px-4 font-semibold text-sm text-white transition-all active:scale-[0.98]
            bg-gradient-to-br from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400
            shadow-md shadow-primary-500/25 hover:shadow-lg hover:shadow-primary-500/40
            dark:from-primary-500 dark:to-primary-600
            dark:shadow-[0_4px_20px_rgba(187,134,252,0.35)] dark:hover:shadow-[0_6px_28px_rgba(187,134,252,0.55)]"
        >
          <Icon name="add" size="sm" />
          <span>New Question</span>
        </NavLink>

        {/* Nav items */}
        <nav className="flex-1 flex flex-col gap-0.5 overflow-y-auto" aria-label="Admin navigation">
          {adminNavItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              end={item.href === '/admin'}
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                [
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border',
                  isActive
                    ? [
                        // Light active
                        'bg-primary-50 text-primary-700 border-primary-200 shadow-sm',
                        // Dark active: subtle purple bg with purple border
                        'dark:bg-primary-500/15 dark:text-primary-300 dark:border-primary-500/40',
                        'dark:shadow-[0_0_16px_rgba(187,134,252,0.2)]',
                      ].join(' ')
                    : [
                        'border-transparent text-on-surface-variant',
                        // Light hover: slate-100 bg
                        'hover:bg-slate-100 hover:text-on-surface',
                        // Dark hover: surface-hover (#2C2C2C) — not white!
                        'dark:hover:bg-surface-hover dark:hover:text-on-surface',
                      ].join(' '),
                ].join(' ')
              }
            >
              <Icon name={item.icon} size="sm" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer links */}
        <div className="mt-auto pt-4 border-t border-slate-200 dark:border-white/[0.06] flex flex-col gap-0.5">
          {adminFooterItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm border border-transparent text-on-surface-variant
                hover:bg-slate-100 hover:text-on-surface
                dark:hover:bg-surface-hover dark:hover:text-on-surface
                transition-colors duration-200"
            >
              <Icon name={item.icon} size="sm" />
              <span>{item.label}</span>
            </a>
          ))}
        </div>
      </aside>

      {/* ── Main area ──────────────────────────────────────── */}
      <div className="lg:ml-64 flex flex-col min-h-screen">
        {/* Sticky top header */}
        <header
          className={[
            'flex justify-between items-center w-full px-4 lg:px-8 py-3 sticky top-0 z-30 transition-all duration-300',
            // Light: crisp white
            'bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm',
            // Dark: charcoal glass
            'dark:bg-[#121212]/90 dark:border-white/[0.06] dark:shadow-[0_1px_20px_rgba(0,0,0,0.5)]',
          ].join(' ')}
        >
          <div className="flex items-center gap-2 flex-1 max-w-xl">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 -ml-2 rounded-xl transition-colors text-on-surface-variant
                hover:bg-slate-100 dark:hover:bg-surface-hover"
              aria-label="Open Menu"
            >
              <Icon name="menu" size="sm" />
            </button>

            {/* Search */}
            <div className="relative w-full group hidden sm:block">
              <Icon
                name="search"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant opacity-60 group-focus-within:text-primary-600 dark:group-focus-within:text-primary-400 group-focus-within:opacity-100 transition-colors"
                size="sm"
              />
              <input
                type="text"
                placeholder="Search system logs..."
                className={[
                  'w-full rounded-xl py-2 pl-10 pr-4 text-sm outline-none transition-all duration-200',
                  'bg-slate-100 text-on-surface placeholder:text-on-surface-variant',
                  'border border-slate-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20',
                  // Dark: charcoal input
                  'dark:bg-[#2C2C2C] dark:text-on-surface dark:placeholder:text-on-surface-variant',
                  'dark:border-white/[0.08] dark:focus:border-primary-400/70 dark:focus:ring-primary-500/20',
                ].join(' ')}
              />
            </div>
            <button
              className="sm:hidden p-2 rounded-xl transition-colors text-on-surface-variant
                hover:bg-slate-100 dark:hover:bg-surface-hover"
              aria-label="Search"
            >
              <Icon name="search" size="sm" />
            </button>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-4 lg:gap-5 ml-auto lg:ml-6">
            <div className="flex items-center gap-2 lg:gap-3 text-on-surface-variant">
              <ThemeToggle />
              <button
                aria-label="Notifications"
                className="p-2 rounded-xl transition-all
                  hover:bg-slate-100 hover:text-primary-600
                  dark:hover:bg-surface-hover dark:hover:text-primary-400
                  focus:ring-2 focus:ring-primary-500/30 outline-none"
              >
                <Icon name="notifications" size="sm" />
              </button>
              <button
                aria-label="Help"
                className="p-2 rounded-xl transition-all
                  hover:bg-slate-100 hover:text-primary-600
                  dark:hover:bg-surface-hover dark:hover:text-primary-400"
              >
                <Icon name="help" size="sm" />
              </button>
            </div>

            <div className="h-6 w-px bg-slate-200 dark:bg-white/[0.08]" />

            <button className="text-on-surface-variant font-medium transition-colors text-sm hidden md:block
              hover:text-primary-600 dark:hover:text-primary-400">
              Feedback
            </button>

            {/* Avatar */}
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="font-bold text-on-surface leading-none text-sm">Profile</p>
                <p className="text-[10px] text-on-surface-variant font-semibold uppercase tracking-wider mt-0.5">
                  Superuser
                </p>
              </div>
              <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 cursor-pointer
                bg-primary-100 dark:bg-primary-500/20
                border-2 border-primary-200 dark:border-primary-400/40
                ring-2 ring-primary-500/20 hover:ring-primary-500/50 dark:ring-primary-400/20 dark:hover:ring-primary-400/50 transition-all">
                <Icon name="person" size="sm" className="text-primary-700 dark:text-primary-300" />
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-8 w-full">
          {children}
        </main>
      </div>
    </div>
  )
}
