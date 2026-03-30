import { NavLink } from 'react-router-dom'
import type { NavItem } from '@types-app/index'

interface MobileBottomBarProps {
  items?: NavItem[]
  onAddClick?: () => void
}

const defaultItems: NavItem[] = [
  { label: 'Algorithms', href: '/dashboard', icon: 'code' },
  { label: 'System Design', href: '/system-design', icon: 'shutter_speed' },
  { label: 'Insights', href: '/analytics', icon: 'analytics' },
  { label: 'Profile', href: '/profile', icon: 'person' },
]

export default function MobileBottomBar({
  items = defaultItems,
  onAddClick,
}: MobileBottomBarProps) {
  return (
    <nav
      aria-label="Mobile navigation"
      className="lg:hidden fixed bottom-0 left-0 right-0 flex justify-around items-center px-4 py-3 z-50
        bg-white dark:bg-[#1E1E1E]
        border-t border-slate-200 dark:border-white/[0.06]
        shadow-[0_-4px_24px_rgba(15,23,42,0.08)] dark:shadow-[0_-4px_24px_rgba(0,0,0,0.5)]"
    >
      {items.slice(0, 2).map((item) => (
        <NavLink
          key={item.href}
          to={item.href}
          aria-label={item.label}
          className={({ isActive }) =>
            `p-2 rounded-lg transition-colors ${
              isActive
                ? 'text-primary-600 dark:text-primary-400'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-slate-100 dark:hover:bg-surface-hover dark:hover:text-on-surface'
            }`
          }
        >
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}
          >
            {item.icon}
          </span>
        </NavLink>
      ))}

      {/* Centre FAB — purple in dark */}
      <button
        onClick={onAddClick}
        aria-label="Quick action"
        className="bg-primary-600 hover:bg-primary-500 p-3 rounded-full -mt-10 transition-all active:scale-90
          dark:bg-primary-500 dark:hover:bg-primary-400
          shadow-lg shadow-primary-500/30
          dark:shadow-[0_4px_24px_rgba(187,134,252,0.55)]"
      >
        <span className="material-symbols-outlined text-white dark:text-on-surface">add</span>
      </button>

      {items.slice(2).map((item) => (
        <NavLink
          key={item.href}
          to={item.href}
          aria-label={item.label}
          className={({ isActive }) =>
            `p-2 rounded-lg transition-colors ${
              isActive
                ? 'text-primary-600 dark:text-primary-400'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-slate-100 dark:hover:bg-surface-hover dark:hover:text-on-surface'
            }`
          }
        >
          <span className="material-symbols-outlined">{item.icon}</span>
        </NavLink>
      ))}
    </nav>
  )
}
