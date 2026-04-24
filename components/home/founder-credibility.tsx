export function FounderCredibility() {
  return (
    <section className="premium-panel rounded-[32px] border border-slate-200 bg-white px-8 py-8 shadow-sm">
      <div className="max-w-5xl">
        <div className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-600">
          Built From Real Leadership Work
        </div>

        <h3 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
          Created by someone who has led real school improvement work.
        </h3>

        <p className="mt-5 text-slate-600 leading-8">
          LeadSharper was built from real principal coaching, instructional leadership development,
          turnaround school support, classroom walkthrough calibration, and district leadership work.
          These scenarios reflect the actual moments leaders face when stakes are high and decisions matter.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-slate-50 p-5">
            <div className="text-2xl font-semibold text-slate-950">100+</div>
            <div className="text-sm text-slate-600 mt-1">
              leadership coaching interactions
            </div>
          </div>

          <div className="rounded-2xl bg-slate-50 p-5">
            <div className="text-2xl font-semibold text-slate-950">District</div>
            <div className="text-sm text-slate-600 mt-1">
              school improvement experience
            </div>
          </div>

          <div className="rounded-2xl bg-slate-50 p-5">
            <div className="text-2xl font-semibold text-slate-950">Real-world</div>
            <div className="text-sm text-slate-600 mt-1">
              instructional leadership simulations
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
