import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import type { NavItem, User } from '@types-app/index'
import Icon from '@components/ui/Icon'
import ThemeToggle from '@components/ui/ThemeToggle'

interface NavbarProps {
  logoText?: string
  navLinks?: NavItem[]
  user?: User
  showSearch?: boolean
  onMenuClick?: () => void
}

const defaultNavLinks: NavItem[] = [
  { label: 'Practice', href: '/dashboard', isActive: true },
  { label: 'Insights', href: '/analytics' },
  { label: 'Community', href: '#' },
]

export default function Navbar({
  logoText = 'PrepMate',
  navLinks = defaultNavLinks,
  user,
  showSearch = true,
  onMenuClick,
}: NavbarProps) {
  const [searchFocused, setSearchFocused] = useState(false)

  return (
    <header
      className={[
        'w-full top-0 sticky z-50 transition-all duration-300',
        'bg-white/90 backdrop-blur-lg border-b border-slate-200 shadow-sm',
        // Dark: charcoal glass header
        'dark:bg-[#121212]/90 dark:border-white/[0.06] dark:shadow-[0_1px_24px_rgba(0,0,0,0.5)]',
      ].join(' ')}
    >
      <nav className="flex justify-between items-center px-6 lg:px-8 py-3.5 w-full max-w-[1440px] mx-auto">

        {/* Left: Logo + links */}
        <div className="flex items-center gap-4 lg:gap-8">
          <button
            className="lg:hidden p-2 -ml-2 rounded-xl transition-colors
              text-on-surface-variant hover:bg-slate-100 hover:text-on-surface
              dark:hover:bg-surface-hover dark:hover:text-on-surface"
            onClick={onMenuClick}
            aria-label="Open Menu"
          >
            <Icon name="menu" size="sm" />
          </button>

          <NavLink
            to="/"
            className="text-2xl font-black tracking-tighter font-headline
              text-transparent bg-clip-text
              bg-gradient-to-r from-primary-600 to-accent-600
              dark:from-primary-400 dark:to-accent-500
              hover:opacity-80 transition-opacity"
          >
            {logoText}
          </NavLink>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1 ml-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                className={({ isActive }) =>
                  isActive
                    ? [
                        'px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 border',
                        'bg-primary-50 text-primary-700 border-primary-200',
                        // Dark active: purple tint
                        'dark:bg-primary-500/15 dark:text-primary-300 dark:border-primary-500/30',
                      ].join(' ')
                    : [
                        'px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border border-transparent',
                        'text-on-surface-variant hover:text-on-surface hover:bg-slate-100',
                        // Dark hover: charcoal — not white
                        'dark:hover:text-on-surface dark:hover:bg-surface-hover',
                      ].join(' ')
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>

        {/* Right: Search + actions */}
        <div className="flex items-center gap-3">
          {showSearch && (
            <div className="relative hidden sm:block">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
                search
              </span>
              <input
                type="text"
                placeholder="Search topics..."
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className={[
                  'pl-10 pr-4 py-2 rounded-full text-sm outline-none transition-all duration-300',
                  'bg-slate-100 text-on-surface placeholder:text-on-surface-variant',
                  'border border-slate-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20 focus:bg-white',
                  // Dark: charcoal input, purple focus
                  'dark:bg-[#2C2C2C] dark:text-on-surface dark:placeholder:text-on-surface-variant',
                  'dark:border-white/[0.08] dark:focus:border-primary-400/70 dark:focus:ring-primary-500/20 dark:focus:bg-[#383838]',
                  searchFocused ? 'w-64' : 'w-44',
                ].join(' ')}
              />
            </div>
          )}

          <ThemeToggle />

          {/* Notifications */}
          <button
            aria-label="Notifications"
            className="relative p-2 rounded-xl transition-all duration-200
              text-on-surface-variant hover:text-primary-600 hover:bg-slate-100
              dark:hover:text-primary-400 dark:hover:bg-surface-hover
              active:scale-90"
          >
            <Icon name="notifications" />
            <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-accent-500 rounded-full animate-pulse-slow" />
          </button>

          {/* Avatar / Login */}
          {user ? (
            <div className="h-9 w-9 rounded-full overflow-hidden flex-shrink-0 cursor-pointer
              border-2 border-primary-200 dark:border-primary-400/40
              ring-2 ring-primary-500/20 hover:ring-primary-500/50
              dark:ring-primary-400/20 dark:hover:ring-primary-400/50 transition-all duration-300">
              <img src={user.avatarUrl} alt={`${user.name} avatar`} className="w-full h-full object-cover" />
            </div>
          ) : (
            <button className="h-9 px-5 rounded-full font-semibold text-sm flex-shrink-0 transition-all duration-200
              bg-primary-600 hover:bg-primary-500 text-white
              shadow-md shadow-primary-500/30 hover:shadow-lg hover:shadow-primary-500/50
              dark:bg-primary-500 dark:hover:bg-primary-400
              dark:shadow-[0_4px_20px_rgba(187,134,252,0.45)] dark:hover:shadow-[0_6px_28px_rgba(187,134,252,0.65)]
              active:scale-95">
              Sign In
            </button>
          )}
        </div>
      </nav>
    </header>
  )
}
