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
      { label: 'Zenith Pro', href: '#' },
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
  brand = 'Zenith Prep',
  tagline = 'The focused interview prep platform for modern developers. Designed for clarity, built for success.',
  columns = defaultColumns,
  socials = defaultSocials,
  copyrightYear = new Date().getFullYear(),
}: FooterProps) {
  return (
    <footer className="bg-surface py-20 px-6 lg:px-8 border-t border-outline-variant/10">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="col-span-1">
          <div className="text-2xl font-black tracking-tighter text-on-surface mb-4 font-headline">
            {brand}
          </div>
          <p className="text-on-surface-variant text-sm leading-relaxed">{tagline}</p>
        </div>

        {/* Columns */}
        {columns.map((col) => (
          <div key={col.heading}>
            <h5 className="font-bold mb-6 text-on-surface uppercase tracking-widest text-xs">
              {col.heading}
            </h5>
            <ul className="space-y-4 text-sm text-on-surface-variant">
              {col.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Socials */}
        <div>
          <h5 className="font-bold mb-6 text-on-surface uppercase tracking-widest text-xs">
            Connect
          </h5>
          <div className="flex gap-4">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-primary hover:text-white transition-all"
              >
                <Icon name={social.icon} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-[1440px] mx-auto mt-20 pt-8 border-t border-outline-variant/10 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-sm text-on-surface-variant opacity-60">
          © {copyrightYear} {brand}. All rights reserved.
        </p>
        <div className="flex gap-8 text-sm text-on-surface-variant opacity-60">
          <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-primary transition-colors">Cookie Policy</a>
        </div>
      </div>
    </footer>
  )
}
