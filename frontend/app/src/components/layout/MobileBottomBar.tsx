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
      className="lg:hidden fixed bottom-0 left-0 right-0 bg-surface-container-lowest dark:bg-slate-900 flex justify-around items-center px-4 py-3 z-50 shadow-[0_-4px_24px_rgba(0,0,0,0.06)] border-t border-outline-variant/10"
    >
      {items.slice(0, 2).map((item) => (
        <NavLink
          key={item.href}
          to={item.href}
          aria-label={item.label}
          className={({ isActive }) =>
            `p-2 rounded-lg transition-colors ${
              isActive ? 'text-primary' : 'text-on-surface-variant'
            }`
          }
        >
          <span
            className={`material-symbols-outlined`}
            style={{
              fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
            }}
          >
            {item.icon}
          </span>
        </NavLink>
      ))}

      {/* Centre FAB */}
      <button
        onClick={onAddClick}
        aria-label="Quick action"
        className="bg-primary p-3 rounded-full -mt-10 shadow-lg hover:bg-primary-dim active:scale-95 transition-all"
      >
        <span className="material-symbols-outlined text-white">add</span>
      </button>

      {items.slice(2).map((item) => (
        <NavLink
          key={item.href}
          to={item.href}
          aria-label={item.label}
          className={({ isActive }) =>
            `p-2 rounded-lg transition-colors ${
              isActive ? 'text-primary' : 'text-on-surface-variant'
            }`
          }
        >
          <span className="material-symbols-outlined">{item.icon}</span>
        </NavLink>
      ))}
    </nav>
  )
}
