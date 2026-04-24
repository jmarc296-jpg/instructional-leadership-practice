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
    <header className="premium-panel rounded-[28px] border border-slate-200/80 bg-white/90 p-4 shadow-sm backdrop-blur">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white">
            <Brain size={20} />
          </div>

          <div>
            <div className="text-sm font-semibold tracking-[-0.02em] text-slate-950">
              LeadSharper
            </div>
            <div className="text-xs font-medium text-slate-500">
              Instructional leadership simulator
            </div>
          </div>
        </div>

        <nav className="flex flex-wrap gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`premium-button inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-[15px] font-semibold ${
                  activeTab === tab.id
                    ? 'bg-slate-950 text-white shadow-[0_10px_25px_rgba(15,23,42,0.18)]'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            )
          })}
        <a href="/pilot" className="premium-button inline-flex items-center rounded-2xl bg-blue-600 px-5 py-3 text-[15px] font-semibold text-white hover:bg-blue-700">Pilot</a>`r`n        </nav>
      </div>
    </header>
  )
}

