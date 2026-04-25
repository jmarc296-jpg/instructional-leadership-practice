import { Brain } from 'lucide-react'

type Props = {
  activeTab: string
  setActiveTab: (tab: any) => void
}

export function TopNav({ setActiveTab }: Props) {
  return (
    <header className="premium-panel rounded-[28px] border border-slate-200/80 bg-white/90 p-4 shadow-sm backdrop-blur">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white">
            <Brain size={20} />
          </div>

          <div>
            <div className="text-sm font-semibold text-slate-950">
              LeadSharper
            </div>
            <div className="text-xs text-slate-500">
              Leadership Infrastructure Platform
            </div>
          </div>
        </div>

        <nav className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab('practice')}
            className="rounded-2xl bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-700"
          >
            Platform
          </button>

          <a href="/district" className="rounded-2xl bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-700">
            District Demo
          </a>

          <a href="/enterprise" className="rounded-2xl bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-700">
            Enterprise
          </a>

          <a href="/pilot" className="rounded-2xl bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-700">
            Pilot
          </a>

          <button
            onClick={() => setActiveTab('practice')}
            className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white"
          >
            Start Simulation
          </button>
        </nav>

      </div>
    </header>
  )
}
