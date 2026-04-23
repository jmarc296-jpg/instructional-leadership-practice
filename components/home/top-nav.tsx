import { Brain, BarChart3, Heart, History as HistoryIcon } from 'lucide-react'

type View = 'practice' | 'analytics' | 'favorites' | 'history'

type Props = {
  activeTab: View
  setActiveTab: (tab: View) => void
}

export function TopNav({ activeTab, setActiveTab }: Props) {
  const tabs = [
    { id: 'practice' as View, label: 'Practice', icon: Brain },
    { id: 'analytics' as View, label: 'Analytics', icon: BarChart3 },
    { id: 'favorites' as View, label: 'Favorites', icon: Heart },
    { id: 'history' as View, label: 'History', icon: HistoryIcon }
  ]

  return (
    <header className="rounded-[28px] border border-slate-200/80 bg-white/90 p-4 shadow-sm backdrop-blur">
      <div className="flex flex-wrap gap-3">
        {tabs.map((tab) => {
          const Icon = tab.icon

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-[15px] font-semibold ${
                activeTab === tab.id
                  ? 'bg-slate-950 text-white'
                  : 'bg-slate-100 text-slate-700'
              }`}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          )
        })}
      </div>
    </header>
  )
}