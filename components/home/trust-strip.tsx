export function TrustStrip() {
  return (
    <section className="premium-panel rounded-[28px] border border-slate-200 bg-white px-6 py-5 shadow-sm">
      <div className="grid gap-4 text-center md:grid-cols-3">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
            Built For
          </div>
          <div className="mt-2 text-sm font-medium text-slate-700">
            Principals, APs, instructional coaches, and district leaders
          </div>
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
            Practice Focus
          </div>
          <div className="mt-2 text-sm font-medium text-slate-700">
            Coaching, DDI, rigor, culture, and instructional judgment
          </div>
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
            Training Loop
          </div>
          <div className="mt-2 text-sm font-medium text-slate-700">
            Scenario ? Timed response ? AI feedback ? next rep
          </div>
        </div>
      </div>
    </section>
  )
}
