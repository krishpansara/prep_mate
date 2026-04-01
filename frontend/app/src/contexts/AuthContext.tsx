import React, { createContext, useContext, useState, useCallback } from 'react'

// ─── Types ───────────────────────────────────────────────────────────────────

export type UserRole = 'learner' | 'admin'

export interface AuthUser {
  id: string
  name: string
  email: string
  role: UserRole
  avatarUrl: string
  joinedAt: string
}

interface AuthContextType {
  user: AuthUser | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
}

// ─── Mock user database ──────────────────────────────────────────────────────

const MOCK_USERS: Record<string, AuthUser & { password: string }> = {
  'admin@prepmate.io': {
    id: 'u_admin_01',
    name: 'Alex Admin',
    email: 'admin@prepmate.io',
    role: 'admin',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
    joinedAt: '2024-01-15',
    password: 'admin123',
  },
  'learner@prepmate.io': {
    id: 'u_learner_01',
    name: 'Zen Learner',
    email: 'learner@prepmate.io',
    role: 'learner',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zen',
    joinedAt: '2024-03-01',
    password: 'learner123',
  },
}

const SESSION_KEY = 'prepmate_session'

function loadPersistedUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    return raw ? (JSON.parse(raw) as AuthUser) : null
  } catch {
    return null
  }
}

// ─── Context ─────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(loadPersistedUser)
  const [isLoading, setIsLoading] = useState(false)

  const persist = (u: AuthUser | null) => {
    if (u) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(u))
    } else {
      localStorage.removeItem(SESSION_KEY)
    }
    setUser(u)
  }

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true)
    // Simulate network latency
    await new Promise((r) => setTimeout(r, 600))

    const match = MOCK_USERS[email.toLowerCase()]
    if (!match || match.password !== password) {
      setIsLoading(false)
      throw new Error('Invalid email or password.')
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _pw, ...safeUser } = match
    persist(safeUser)
    setIsLoading(false)
  }, [])

  const register = useCallback(async (name: string, email: string, _password: string) => {
    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 600))

    // For mock: any new account becomes a learner
    const newUser: AuthUser = {
      id: `u_${Date.now()}`,
      name,
      email: email.toLowerCase(),
      role: 'learner',
      avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
      joinedAt: new Date().toISOString().split('T')[0],
    }
    persist(newUser)
    setIsLoading(false)
  }, [])

  const logout = useCallback(() => {
    persist(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
