import type { FooterColumn, SocialLink } from '@types-app/index'
import Icon from '@components/ui/Icon'

interface FooterProps {
  brand?: string
  tagline?: string
  columns?: FooterColumn[]
  socials?: SocialLink[]
  copyrightYear?: number
}

const defaultColumns: FooterColumn[] = [
  {
    heading: 'Curriculum',
    links: [
      { label: 'Data Structures', href: '#' },
      { label: 'Algorithms', href: '#' },
      { label: 'System Design', href: '#' },
      { label: 'Mock Interviews', href: '#' },
    ],
  },
  {
    heading: 'Platform',
    links: [
      { label: 'About Us', href: '#' },
      { label: 'PrepMate Pro', href: '#' },
      { label: 'Help Center', href: '#' },
      { label: 'Privacy Policy', href: '#' },
    ],
  },
]

const defaultSocials: SocialLink[] = [
  { icon: 'share', href: '#', label: 'Share' },
  { icon: 'rss_feed', href: '#', label: 'RSS Feed' },
]

export default function Footer({
  brand = 'PrepMate',
  tagline = 'The focused interview prep platform for modern developers. Designed for clarity, built for success.',
  columns = defaultColumns,
  socials = defaultSocials,
  copyrightYear = new Date().getFullYear(),
}: FooterProps) {
  return (
    <footer className="relative bg-background pt-24 pb-12 px-6 lg:px-8 border-t border-slate-200 dark:border-white/10 overflow-hidden">
      <div className="relative z-10 max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="col-span-1 md:col-span-2 pr-8">
          <div className="text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-400 dark:to-accent-400 mb-6 font-headline">
            {brand}
          </div>
          <p className="text-on-surface-variant text-base leading-relaxed max-w-sm">{tagline}</p>
        </div>

        {/* Columns */}
        {columns.map((col) => (
          <div key={col.heading}>
            <h3 className="font-bold mb-6 text-on-surface dark:text-white uppercase tracking-widest text-xs">
              {col.heading}
            </h3>
            <ul className="space-y-4 text-sm text-on-surface-variant">
              {col.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center group"
                  >
                    <span className="w-0 overflow-hidden group-hover:w-4 transition-all duration-300 text-primary-600 dark:text-primary-400 opacity-0 group-hover:opacity-100 material-symbols-outlined text-[1rem]">arrow_right</span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
        
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto mt-20 pt-8 border-t border-slate-200 dark:border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex gap-4">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="w-10 h-10 rounded-full glass-button flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors"
              >
                <Icon name={social.icon} />
              </a>
            ))}
        </div>
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center text-sm text-on-surface-variant">
          <p className="font-medium">
            © {copyrightYear} {brand}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
