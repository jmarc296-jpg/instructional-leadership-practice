export function EnterpriseTrustSection() {
  const items = [
    {
      title: "No Student PII Required",
      text: "LeadSharper evaluates adult leadership behavior without requiring student data."
    },
    {
      title: "30-Day Pilot Launch",
      text: "Districts can launch a leadership cohort in weeks—not months."
    },
    {
      title: "Procurement Friendly",
      text: "Board reports, ROI models, pricing architecture, and implementation documentation already built."
    },
    {
      title: "Built for Scale",
      text: "Designed for districts, universities, charter networks, and leadership pipelines."
    }
  ]

  return (
    <section className="rounded-3xl bg-white p-10 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-700">
        Enterprise Ready
      </p>

      <h2 className="mt-4 text-4xl font-semibold text-slate-900">
        Built to move through real district buying processes.
      </h2>

      <p className="mt-5 max-w-3xl text-lg text-slate-600">
        Most education startups lose momentum because procurement friction kills urgency. LeadSharper was intentionally built to reduce buying friction.
      </p>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {items.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
          >
            <h3 className="text-xl font-semibold text-slate-900">
              {item.title}
            </h3>

            <p className="mt-3 text-slate-600 leading-7">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
