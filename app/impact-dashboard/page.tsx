const metrics = [
  {
    label: "Readiness Growth",
    value: "+18%",
    subtext: "After assigned modules"
  },
  {
    label: "Ready Now Leaders",
    value: "39%",
    subtext: "Up from 22%"
  },
  {
    label: "High Risk Leaders",
    value: "12%",
    subtext: "Down from 17%"
  },
  {
    label: "Module Completion",
    value: "87%",
    subtext: "Across active cohort"
  }
]

const competencyGains = [
  { competency: "Instructional Feedback", before: "42%", after: "68%" },
  { competency: "Coaching Conversations", before: "48%", after: "71%" },
  { competency: "School Culture", before: "55%", after: "74%" },
  { competency: "Strategic Staffing", before: "51%", after: "66%" }
]

const outcomes = [
  "14 leaders moved from needs-development to ready-now",
  "9 high-risk leaders completed targeted support plans",
  "Instructional feedback showed the largest readiness gain",
  "District reduced external hiring dependency for upcoming openings"
]

export default function ImpactDashboardPage() {
  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6 sm:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="rounded-3xl bg-gradient-to-r from-slate-950 to-blue-900 px-4 py-6 sm:p-8 text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-300">
            Impact Dashboard
          </p>

          <h1 className="mt-4 text-3xl sm:text-4xl font-bold">
            Prove leadership growth after targeted development.
          </h1>

          <p className="mt-4 max-w-3xl text-slate-300">
            Track readiness movement, competency gains, and district-level return on leadership development.
          </p>
        </section>

        <section className="grid gap-5 md:grid-cols-4">
          {metrics.map((metric) => (
            <div key={metric.label} className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
              <p className="text-sm text-slate-500">{metric.label}</p>
              <h2 className="mt-2 text-3xl font-bold text-slate-950">{metric.value}</h2>
              <p className="mt-2 text-sm text-slate-500">{metric.subtext}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
          <div className="rounded-3xl bg-white px-4 py-6 sm:p-8 shadow-sm border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-950">
              Competency Growth
            </h2>

            <div className="mt-6 space-y-6">
              {competencyGains.map((item) => (
                <div key={item.competency}>
                  <div className="mb-2 flex justify-between">
                    <p className="font-semibold text-slate-900">{item.competency}</p>
                    <p className="text-sm text-slate-500">
                      {item.before} to {item.after}
                    </p>
                  </div>

                  <div className="h-3 rounded-full bg-slate-100">
                    <div
                      className="h-3 rounded-full bg-blue-600"
                      style={{ width: item.after }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-white px-4 py-6 sm:p-8 shadow-sm border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-950">
              District Outcomes
            </h2>

            <div className="mt-6 space-y-4">
              {outcomes.map((outcome) => (
                <div key={outcome} className="rounded-2xl bg-blue-50 p-4 text-slate-700">
                  {outcome}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

