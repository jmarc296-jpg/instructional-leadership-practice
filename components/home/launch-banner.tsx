export function LaunchBanner() {
  return (
    <section className="premium-panel rounded-[28px] border border-emerald-200 bg-gradient-to-r from-emerald-50 to-blue-50 px-6 py-5 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
            Product Status
          </div>

          <h3 className="mt-2 text-lg font-semibold tracking-[-0.02em] text-slate-950">
            Beta platform built for school leadership simulation at scale
          </h3>

          <p className="mt-2 text-sm leading-7 text-slate-600">
            Designed for principal preparation programs, districts, leadership pipelines,
            and instructional leadership coaching ecosystems.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm">
            MVP Built
          </span>

          <span className="rounded-full bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm">
            Pilot Ready
          </span>

          <span className="rounded-full bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm">
            Scalable IP
          </span>
        </div>
      </div>
    </section>
  )
}
