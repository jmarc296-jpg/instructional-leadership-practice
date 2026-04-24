export function ProductFooter() {
  return (
    <footer className="rounded-[28px] border border-slate-200 bg-white/80 px-6 py-5 text-sm text-slate-600 shadow-sm backdrop-blur">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <span className="font-semibold text-slate-900">LeadSharper</span>
          <span className="ml-2">Instructional leadership simulation platform</span>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
            Timed Simulation
          </span>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
            AI Feedback
          </span>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
            Adaptive Practice
          </span>
        </div>
      </div>
    </footer>
  )
}
