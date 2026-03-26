import { NavLink } from 'react-router-dom'
import type { NavItem, SidebarFooterItem } from '@types-app/index'
import Icon from '@components/ui/Icon'

interface SidebarProps {
  workspaceTitle?: string
  workspaceSubtitle?: string
  items?: NavItem[]
  footerItems?: SidebarFooterItem[]
  showUpgradeCTA?: boolean
  isOpen?: boolean
  onClose?: () => void
}

const defaultItems: NavItem[] = [
  { label: 'Algorithms', href: '/dashboard', icon: 'code' },
  { label: 'System Design', href: '/system-design', icon: 'shutter_speed' },
  { label: 'Insights', href: '/analytics', icon: 'analytics' },
  { label: 'Behavioral', href: '/behavioral', icon: 'psychology' },
  { label: 'Mock Interviews', href: '/mock', icon: 'groups' },
  { label: 'Roadmap', href: '/roadmap', icon: 'map' },
]

const defaultFooterItems: SidebarFooterItem[] = [
  { label: 'Help Center', href: '#', icon: 'help_outline' },
  { label: 'Log Out', href: '#', icon: 'logout', danger: true },
]

export default function Sidebar({
  workspaceTitle = 'Workspace',
  workspaceSubtitle = 'Interview Prep',
  items = defaultItems,
  footerItems = defaultFooterItems,
  showUpgradeCTA = true,
  isOpen = false,
  onClose,
}: SidebarProps) {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      <aside className={`fixed lg:sticky top-0 lg:top-[65px] left-0 h-full lg:h-[calc(100vh-65px)] w-64 p-6 bg-surface-container-low dark:bg-slate-800/50 z-50 flex flex-col gap-4 flex-shrink-0 transition-transform duration-300 lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      {/* Workspace info */}
      <div className="mb-2">
        <h2 className="text-lg font-black text-on-surface dark:text-white font-headline">
          {workspaceTitle}
        </h2>
        <p className="text-xs text-on-surface-variant font-medium">{workspaceSubtitle}</p>
      </div>

      {/* Nav items */}
      <nav className="flex-1 flex flex-col gap-1" aria-label="Sidebar navigation">
        {items.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium font-headline transition-all duration-200 hover:translate-x-1 active:opacity-80 ${
                isActive
                  ? 'bg-surface-container-lowest dark:bg-slate-700 text-primary dark:text-blue-300 shadow-sm'
                  : 'text-on-surface-variant dark:text-slate-400 hover:bg-surface-container dark:hover:bg-slate-700/50'
              }`
            }
          >
            {item.icon && <Icon name={item.icon} size="sm" />}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer section */}
      <div className="mt-auto flex flex-col gap-4">
        {showUpgradeCTA && (
          <button className="w-full py-3 bg-gradient-to-br from-primary to-primary-dim text-white rounded-xl font-semibold text-sm shadow-sm active:scale-95 transition-all hover:shadow-md hover:shadow-primary/20">
            Upgrade to Pro
          </button>
        )}

        <div className="border-t border-outline-variant/10 pt-4 flex flex-col gap-1">
          {footerItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2 rounded-xl text-sm transition-all hover:bg-surface-container ${
                item.danger ? 'text-error' : 'text-on-surface-variant'
              }`}
            >
              <Icon name={item.icon} size="sm" />
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </aside>
    </>
  )
}
