// ─── Auth ────────────────────────────────────────────────────────────────────

export type UserRole = 'learner' | 'admin'

export interface AuthUser {
  id: string
  name: string
  email: string
  role: UserRole
  avatarUrl: string
  joinedAt: string
}

// ─── Navigation ─────────────────────────────────────────────────────────────

export interface NavItem {
  label: string
  href: string
  icon?: string
  isActive?: boolean
  /** If true, renders as a section header (non-clickable label) instead of a nav link */
  isSection?: boolean
  /** If true, the link is only active when the path matches exactly (React Router `end` prop) */
  end?: boolean
}

export interface SidebarFooterItem {
  label: string
  href: string
  icon: string
  danger?: boolean
}

// ─── User ───────────────────────────────────────────────────────────────────

export interface User {
  name: string
  role: string
  avatarUrl: string
}

// ─── Cards / Topics ─────────────────────────────────────────────────────────

export type TopicCardVariant = 'large' | 'small' | 'wide'

export interface TopicCard {
  id: string
  title: string
  description: string
  icon: string
  lessonCount?: number
  variant: TopicCardVariant
  accentColor?: 'primary' | 'secondary' | 'tertiary'
}

// ─── Dashboard ───────────────────────────────────────────────────────────────

export interface MilestoneItem {
  id: string
  title: string
  subtitle: string
  timeAgo: string
  icon?: string
}

export interface ActivityDay {
  label: string
  heightClass: string
  intensity: 'low' | 'medium' | 'high'
}

export interface LearningPath {
  title: string
  tag: string
  lastSession: string
  progressPercent: number
  icon: string
}

// ─── Sections ────────────────────────────────────────────────────────────────

export interface FeatureItem {
  title: string
  description: string
  color: 'primary' | 'secondary' | 'neutral'
}

export interface StatItem {
  icon: string
  label: string
  iconColor?: string
}

export interface Testimonial {
  quote: string
  author: string
  role: string
  avatarUrl: string
}

export interface FooterColumn {
  heading: string
  links: Array<{ label: string; href: string }>
}

export interface SocialLink {
  icon: string
  href: string
  label: string
}
