'use client'

export default function NationalCommandPage() {
  const metrics = [
    { label: "States Participating", value: "14" },
    { label: "Districts Connected", value: "287" },
    { label: "Leaders Assessed", value: "42,000+" },
    { label: "Projected Failed Placements Avoided", value: "$48M" }
  ]

  const priorities = [
    {
      title: "Principal Shortage Risk",
      detail: "Identify regions where projected vacancies outpace ready leaders."
    },
    {
      title: "Leadership Equity",
      detail: "Track whether underrepresented leaders are receiving equitable readiness opportunities."
    },
    {
      title: "Preparation Program Quality",
      detail: "Compare readiness outcomes across universities and leadership pipelines."
    },
    {
      title: "National Benchmarking",
      detail: "Create readiness standards across states and districts."
    }
  ]

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-7xl space-y-8">

        <section className="rounded-3xl bg-slate-900 p-10 text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-300">
            National Command Center
          </p>

          <h1 className="mt-4 text-5xl font-semibold tracking-tight">
            The operating system for America’s school leadership pipeline.
          </h1>

          <p className="mt-5 max-w-4xl text-lg leading-8 text-slate-300">
            LeadSharper gives states, foundations, universities, and major systems visibility into principal readiness, leadership shortages, and pipeline health at scale.
          </p>
        </section>

        <section className="grid gap-5 md:grid-cols-4">
          {metrics.map((metric) => (
            <Metric
              key={metric.label}
              label={metric.label}
              value={metric.value}
            />
          ))}
        </section>

        <section className="rounded-3xl bg-white p-8 shadow-sm">
          <h2 className="text-3xl font-semibold text-slate-900">
            National priorities this solves
          </h2>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {priorities.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
              >
                <h3 className="text-xl font-semibold text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-700">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl bg-blue-50 p-8">
          <h2 className="text-3xl font-semibold text-slate-900">
            Why this matters nationally
          </h2>

          <p className="mt-4 max-w-4xl leading-8 text-slate-700">
            We have national systems for teacher certification, student testing, and financial accountability. We still lack modern infrastructure for measuring principal readiness at scale. LeadSharper fills that gap.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="/pilot"
              className="rounded-2xl bg-blue-600 px-6 py-4 text-sm font-semibold text-white"
            >
              Become a founding partner
            </a>

            <a
              href="/data-room"
              className="rounded-2xl border border-slate-300 px-6 py-4 text-sm font-semibold text-slate-900"
            >
              View enterprise materials
            </a>
          </div>
        </section>

      </div>
    </main>
  )
}

function Metric({
  label,
  value
}: {
  label: string
  value: string
}) {
  return (
    <div className="rounded-3xl bg-white p-7 shadow-sm">
      <div className="text-sm text-slate-500">{label}</div>
      <div className="mt-3 text-4xl font-bold text-blue-700">
        {value}
      </div>
    </div>
  )
}
