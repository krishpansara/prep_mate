import Icon from './Icon'

interface MilestoneItemProps {
  title: string
  subtitle: string
  timeAgo: string
  icon?: string
}

export default function MilestoneItem({
  title,
  subtitle,
  timeAgo,
  icon = 'check_circle',
}: MilestoneItemProps) {
  return (
    <div className="flex items-center gap-4 p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/5 hover:border-outline-variant/20 transition-all cursor-pointer group">
      <div className="h-10 w-10 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-secondary/20 transition-colors">
        <Icon name={icon} className="text-secondary" size="sm" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-bold text-on-surface truncate">{title}</h4>
        <p className="text-xs text-on-surface-variant truncate">{subtitle}</p>
      </div>
      <span className="text-[10px] font-bold text-outline uppercase flex-shrink-0">{timeAgo}</span>
    </div>
  )
}
