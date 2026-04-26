import { Brain } from 'lucide-react'

export function TopNav() {
  return (
    <header className="rounded-[28px] border border-slate-200/80 bg-white/90 p-4 shadow-sm backdrop-blur">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <a href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white">
            <Brain size={20} />
          </div>

          <div>
            <div className="text-sm font-semibold text-slate-950">
              LeadSharper
            </div>
            <div className="text-xs text-slate-500">
              Leadership readiness infrastructure
            </div>
          </div>
        </a>

        <nav className="flex flex-wrap gap-2">
          <a
            href="/instant-demo"
            className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Try Simulation
          </a>

          <a
            href="/district"
            className="rounded-2xl bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-200"
          >
            District View
          </a>

          <a
            href="/pilot"
            className="rounded-2xl bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-200"
          >
            Launch Pilot
          </a>
        </nav>
      </div>
    </header>
  )
}
