import type { ActivityDay } from '@types-app/index'

interface ActivityChartProps {
  data?: ActivityDay[]
  title?: string
}

const defaultData: ActivityDay[] = [
  { label: 'M', heightClass: 'h-24', intensity: 'low' },
  { label: 'T', heightClass: 'h-32', intensity: 'low' },
  { label: 'W', heightClass: 'h-44', intensity: 'high' },
  { label: 'T', heightClass: 'h-16', intensity: 'low' },
  { label: 'F', heightClass: 'h-28', intensity: 'medium' },
  { label: 'S', heightClass: 'h-12', intensity: 'low' },
  { label: 'S', heightClass: 'h-8', intensity: 'low' },
]

const intensityToOpacity: Record<ActivityDay['intensity'], string> = {
  low: 'bg-primary/20',
  medium: 'bg-primary/40',
  high: 'bg-primary/70',
}

export default function ActivityChart({
  data = defaultData,
  title = 'Weekly Activity',
}: ActivityChartProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold font-headline text-on-surface">{title}</h3>
        <div className="flex gap-2">
          <button className="px-3 py-1 text-xs font-semibold bg-surface-container text-on-surface-variant rounded-md">
            W
          </button>
          <button className="px-3 py-1 text-xs font-semibold hover:bg-surface-container text-on-surface-variant rounded-md transition-colors">
            M
          </button>
        </div>
      </div>

      <div className="flex items-end justify-between h-48 gap-3 px-2">
        {data.map((day, index) => (
          <div key={`${day.label}-${index}`} className="flex flex-col items-center gap-3 flex-1">
            <div
              className={`w-full ${day.heightClass} bg-surface-container-low rounded-t-lg relative overflow-hidden group hover:opacity-80 transition-all duration-300`}
            >
              <div className={`absolute bottom-0 w-full h-full ${intensityToOpacity[day.intensity]} rounded-t-lg`} />
            </div>
            <span className="text-xs font-medium text-on-surface-variant">{day.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
