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
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 top-[65px] bg-black/60 backdrop-blur-sm z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={[
          'fixed lg:sticky top-[65px] left-0 h-[calc(100vh-65px)] w-64 p-5 z-40',
          'flex flex-col gap-4 flex-shrink-0',
          'transition-transform duration-300 lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          // Light: white sidebar
          'bg-white border-r border-slate-200 shadow-[1px_0_8px_rgba(15,23,42,0.05)]',
          // Dark: charcoal #1E1E1E sidebar
          'dark:bg-[#1E1E1E] dark:border-r dark:border-white/[0.06]',
        ].join(' ')}
      >
        {/* Workspace info */}
        <div className="mb-1 px-1">
          <h2 className="text-lg font-black text-on-surface font-headline tracking-tight">
            {workspaceTitle}
          </h2>
          <p className="text-xs text-on-surface-variant font-medium mt-0.5">{workspaceSubtitle}</p>
        </div>

        {/* Nav items */}
        <nav className="flex-1 flex flex-col gap-0.5 overflow-y-auto" aria-label="Sidebar navigation">
          {items.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              onClick={onClose}
              className={({ isActive }) =>
                [
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border',
                  isActive
                    ? [
                        'bg-primary-50 text-primary-700 border-primary-200 shadow-sm',
                        // Dark active: purple tint
                        'dark:bg-primary-500/15 dark:text-primary-300 dark:border-primary-500/40',
                        'dark:shadow-[0_0_16px_rgba(187,134,252,0.2)]',
                      ].join(' ')
                    : [
                        'border-transparent text-on-surface-variant',
                        'hover:bg-slate-100 hover:text-on-surface',
                        // Dark hover: charcoal — NOT white
                        'dark:hover:bg-surface-hover dark:hover:text-on-surface',
                      ].join(' '),
                ].join(' ')
              }
            >
              {item.icon && <Icon name={item.icon} size="sm" />}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer section */}
        <div className="mt-auto flex flex-col gap-3">
          {showUpgradeCTA && (
            <button
              className="w-full py-3 rounded-xl font-semibold text-sm text-white transition-all active:scale-[0.98]
                bg-gradient-to-br from-accent-600 to-primary-600
                hover:from-accent-500 hover:to-primary-500
                shadow-md shadow-accent-500/25 hover:shadow-lg hover:shadow-accent-500/40
                dark:from-accent-500 dark:to-primary-500
                dark:shadow-[0_4px_20px_rgba(3,218,197,0.3)]
                dark:hover:shadow-[0_6px_28px_rgba(3,218,197,0.5)]
                dark:text-on-surface"
            >
              Upgrade to Pro
            </button>
          )}

          <div className="border-t border-slate-200 dark:border-white/[0.06] pt-3 flex flex-col gap-0.5">
            {footerItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={[
                  'flex items-center gap-3 px-3 py-2 rounded-xl text-sm border border-transparent transition-all duration-200',
                  item.danger
                    ? 'text-error hover:bg-error-container/30 dark:hover:bg-error/15 dark:hover:text-error'
                    : 'text-on-surface-variant hover:bg-slate-100 hover:text-on-surface dark:hover:bg-surface-hover dark:hover:text-on-surface',
                ].join(' ')}
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
