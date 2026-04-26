'use client'

export default function CabinetPage() {
  const decisions = [
    {
      decision: "Launch pilot cohort",
      status: "Recommended",
      rationale: "Creates baseline readiness data before expanding district-wide."
    },
    {
      decision: "Prioritize coaching focus",
      status: "Immediate",
      rationale: "Conflict navigation and instructional feedback appear as recurring risk areas."
    },
    {
      decision: "Review succession bench",
      status: "Urgent",
      rationale: "Projected vacancies require stronger visibility into ready-now leaders."
    }
  ]

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 print:bg-white">
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="rounded-3xl bg-slate-900 p-10 text-white print:bg-white print:text-slate-900 print:border">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-300 print:text-blue-700">
            Cabinet Briefing Room
          </p>

          <h1 className="mt-4 text-5xl font-semibold tracking-tight">
            Leadership pipeline decisions, simplified for executive teams.
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300 print:text-slate-700">
            A superintendent-facing briefing view that turns principal readiness, risk, succession, and ROI into clear cabinet-level action.
          </p>
        </section>

        <section className="grid gap-5 md:grid-cols-4">
          <Metric label="Ready-now leaders" value="18" />
          <Metric label="Leaders needing coaching" value="42" />
          <Metric label="High-risk promotions" value="9" />
          <Metric label="Estimated exposure" value="$1.2M" />
        </section>

        <section className="rounded-3xl bg-white p-8 shadow-sm print:shadow-none print:border">
          <h2 className="text-3xl font-semibold text-slate-900">
            Cabinet Decisions
          </h2>

          <div className="mt-6 space-y-4">
            {decisions.map((item) => (
              <div key={item.decision} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-xl font-semibold text-slate-900">
                    {item.decision}
                  </h3>

                  <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
                    {item.status}
                  </span>
                </div>

                <p className="mt-3 leading-7 text-slate-700">
                  {item.rationale}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <Panel title="What this solves">
            <li>Reduces overreliance on interviews and reputation.</li>
            <li>Gives cabinet leaders visibility into leadership bench strength.</li>
            <li>Aligns coaching investments to observable readiness gaps.</li>
            <li>Creates clearer evidence before promotion or hiring decisions.</li>
          </Panel>

          <Panel title="Recommended next 30 days">
            <li>Select a 20–50 leader pilot cohort.</li>
            <li>Run baseline leadership simulations.</li>
            <li>Review readiness, risk, and coaching patterns.</li>
            <li>Return to cabinet with a pilot impact brief.</li>
          </Panel>
        </section>

        <section className="rounded-3xl bg-blue-50 p-8 print:border">
          <h2 className="text-3xl font-semibold text-slate-900">
            Executive Recommendation
          </h2>

          <p className="mt-4 max-w-4xl leading-8 text-slate-700">
            Approve a limited LeadSharper pilot to determine whether simulation-based readiness data can improve principal pipeline visibility, reduce placement risk, and sharpen leadership development priorities.
          </p>

          <div className="mt-6 flex flex-wrap gap-3 print:hidden">
            <a href="/pilot" className="rounded-2xl bg-blue-600 px-6 py-4 text-sm font-semibold text-white">
              Apply for pilot
            </a>

            <button
              onClick={() => window.print()}
              className="rounded-2xl border border-slate-300 px-6 py-4 text-sm font-semibold text-slate-900"
            >
              Print cabinet brief
            </button>
          </div>
        </section>
      </div>
    </main>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl bg-white p-7 shadow-sm print:shadow-none print:border">
      <div className="text-sm text-slate-500">{label}</div>
      <div className="mt-3 text-4xl font-bold text-blue-700">{value}</div>
    </div>
  )
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-3xl bg-white p-8 shadow-sm print:shadow-none print:border">
      <h2 className="text-3xl font-semibold text-slate-900">{title}</h2>
      <ul className="mt-5 list-disc space-y-3 pl-6 leading-7 text-slate-700">
        {children}
      </ul>
    </section>
  )
}
