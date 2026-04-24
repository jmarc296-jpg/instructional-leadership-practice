type Props = {
  activeTab: string
}

export function ProductStatusBar({ activeTab }: Props) {
  return (
    <section className="fade-in-up rounded-[24px] border border-blue-100 bg-blue-50/80 px-5 py-4 shadow-sm">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
          <div className="text-sm font-medium text-slate-800">
            LeadSharper is running in <span className="font-semibold capitalize">{activeTab}</span> mode.
          </div>
        </div>

        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
          Simulation | Coaching | Growth
        </div>
      </div>
    </section>
  )
}
