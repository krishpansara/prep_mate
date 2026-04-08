import { useState } from 'react'
import type { ReactNode } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import MobileBottomBar from './MobileBottomBar'
import type { NavItem } from '@types-app/index'

// Note: Navbar reads its user from useAuth() internally — no user prop needed here.

interface AppShellProps {
  children: ReactNode
  navLinks?: NavItem[]
  showSearch?: boolean
}

export default function AppShell({ children, navLinks, showSearch }: AppShellProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background relative">
      <Navbar navLinks={navLinks} showSearch={showSearch} onMenuClick={() => setIsMobileMenuOpen(true)} />

      <div className="flex w-full min-h-[calc(100vh-65px)]">
        <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

        <main className="flex-1 p-6 lg:p-10 max-w-full overflow-hidden pb-24 lg:pb-10">
          {children}
        </main>
      </div>

      <MobileBottomBar />
    </div>
  )
}
