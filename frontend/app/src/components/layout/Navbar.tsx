import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import type { NavItem, User } from '@types-app/index'
import Icon from '@components/ui/Icon'

interface NavbarProps {
  logoText?: string
  navLinks?: NavItem[]
  user?: User
  showSearch?: boolean
  onMenuClick?: () => void
}

const defaultNavLinks: NavItem[] = [
  { label: 'Home', href: '/#' },
  { label: 'Library', href: '/library' },
  // { label: 'Course', href: '/deep-dive' },
  { label: 'Practice', href: '/practice' },
  { label: 'Community', href: '/community' },
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
    <header className="w-full top-0 sticky z-50 bg-surface-container-lowest dark:bg-slate-900 border-b border-outline-variant/10">
      <nav className="flex justify-between items-center px-6 lg:px-8 py-4 w-full max-w-[1440px] mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-4 lg:gap-8">
          <button 
            className="lg:hidden p-2 -ml-2 text-on-surface-variant hover:bg-surface-container rounded-xl transition-colors"
            onClick={onMenuClick}
            aria-label="Open Menu"
          >
            <Icon name="menu" size="sm" />
          </button>
          <NavLink
            to="/"
            className="text-2xl font-bold text-on-surface dark:text-slate-100 tracking-tighter font-headline"
          >
            {logoText}
          </NavLink>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                className={({ isActive }) =>
                  isActive
                    ? 'text-primary font-semibold border-b-2 border-primary pb-1 transition-colors'
                    : 'text-on-surface-variant hover:text-on-surface transition-colors font-medium'
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          {/* Search */}
          {showSearch && (
            <div className="relative hidden sm:block">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">
                search
              </span>
              <input
                type="text"
                placeholder="Search topics..."
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className={`pl-10 pr-4 py-2 bg-surface-container rounded-full text-sm border border-outline-variant/20 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all duration-200 ${
                  searchFocused ? 'w-64' : 'w-48'
                }`}
              />
            </div>
          )}

          {/* Notifications */}
          <button
            aria-label="Notifications"
            className="relative p-2 text-on-surface-variant hover:bg-surface-container rounded-xl transition-all duration-200 active:scale-95"
          >
            <Icon name="notifications" />
          </button>

          {/* Avatar */}
          {user ? (
            <div className="h-9 w-9 rounded-full overflow-hidden border-2 border-surface-container ring-2 ring-primary/10 flex-shrink-0">
              <img src={user.avatarUrl} alt={`${user.name} avatar`} className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="h-9 w-9 rounded-full bg-primary-container flex items-center justify-center flex-shrink-0">
              <Icon name="person" className="text-on-primary-container" />
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}
