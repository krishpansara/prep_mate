import { useState } from 'react'
import type { ReactNode } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import MobileBottomBar from './MobileBottomBar'
import type { NavItem, User } from '@types-app/index'

interface AppShellProps {
  children: ReactNode
  navLinks?: NavItem[]
  user?: User
  showSearch?: boolean
}

export default function AppShell({ children, navLinks, user, showSearch }: AppShellProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background relative">
      <Navbar navLinks={navLinks} user={user} showSearch={showSearch} onMenuClick={() => setIsMobileMenuOpen(true)} />

      <div className="flex max-w-[1440px] mx-auto min-h-[calc(100vh-65px)]">
        <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

        <main className="flex-1 p-6 lg:p-10 max-w-full overflow-hidden pb-24 lg:pb-10">
          {children}
        </main>
      </div>

      <MobileBottomBar />
    </div>
  )
}
