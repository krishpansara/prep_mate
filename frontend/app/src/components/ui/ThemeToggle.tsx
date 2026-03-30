import { useTheme } from '../../contexts/ThemeContext'

export default function ThemeToggle() {
  const { isDark, setTheme } = useTheme()

  const handleToggle = () => {
    setTheme(isDark ? 'light' : 'dark')
  }

  return (
    <button
      onClick={handleToggle}
      aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      className={[
        'relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300',
        'overflow-hidden group outline-none',
        // Light mode style
        'bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 hover:text-primary-600',
        // Dark mode style: charcoal, purple accent on hover
        'dark:bg-[#2C2C2C] dark:border-white/[0.08] dark:text-on-surface-variant',
        'dark:hover:bg-[#383838] dark:hover:text-primary-300 dark:hover:border-primary-500/40',
        'focus:ring-2 focus:ring-primary-500/30',
        'shadow-sm dark:shadow-none',
      ].join(' ')}
    >
      {/* Sun icon — visible in dark (to indicate "switch to light") */}
      <span
        className={[
          'material-symbols-outlined text-[20px] absolute transition-all duration-300',
          isDark
            ? 'translate-y-0 opacity-100'
            : 'translate-y-4 opacity-0',
        ].join(' ')}
        style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}
      >
        light_mode
      </span>

      {/* Moon icon — visible in light (to indicate "switch to dark") */}
      <span
        className={[
          'material-symbols-outlined text-[20px] absolute transition-all duration-300',
          isDark
            ? '-translate-y-4 opacity-0'
            : 'translate-y-0 opacity-100',
        ].join(' ')}
        style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}
      >
        dark_mode
      </span>
    </button>
  )
}
