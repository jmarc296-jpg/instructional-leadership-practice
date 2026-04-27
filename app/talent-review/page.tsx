const metrics = [
  {
    label: "Ready Now Leaders",
    value: "12",
    subtext: "Prepared for immediate promotion"
  },
  {
    label: "Ready in 12 Months",
    value: "18",
    subtext: "Require targeted development"
  },
  {
    label: "High Risk Leaders",
    value: "7",
    subtext: "Retention concerns"
  },
  {
    label: "External Hiring Dependency",
    value: "3 Roles",
    subtext: "No internal successor identified"
  }
]

const talentMatrix = [
  {
    leader: "Principal #1",
    placement: "Promotion Ready",
    readiness: "High",
    performance: "High"
  },
  {
    leader: "Principal #2",
    placement: "Needs Development",
    readiness: "Medium",
    performance: "High"
  },
  {
    leader: "Principal #3",
    placement: "Retention Risk",
    readiness: "High",
    performance: "Medium"
  },
  {
    leader: "Principal #4",
    placement: "Future Principal",
    readiness: "Medium",
    performance: "Medium"
  }
]

const succession = [
  {
    role: "High School Principal",
    vacancyRisk: "Medium",
    successor: "Principal #4"
  },
  {
    role: "Director of Academics",
    vacancyRisk: "High",
    successor: "AP #2"
  },
  {
    role: "Regional Superintendent",
    vacancyRisk: "Low",
    successor: "None Identified"
  }
]

export default function TalentReviewPage() {
  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6 sm:p-8">
      <div className="mx-auto max-w-7xl space-y-8">

        <section className="rounded-3xl bg-gradient-to-r from-slate-950 to-blue-900 px-4 py-6 sm:p-8 text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-300">
            Talent Review
          </p>

          <h1 className="mt-4 text-3xl sm:text-4xl font-bold">
            Build stronger leadership pipelines.
          </h1>

          <p className="mt-4 max-w-3xl text-slate-300">
            Identify promotable leaders, reduce failed placements, and strengthen succession planning.
          </p>
        </section>

        <section className="grid gap-5 md:grid-cols-4">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100"
            >
              <p className="text-sm text-slate-500">
                {metric.label}
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-950">
                {metric.value}
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                {metric.subtext}
              </p>
            </div>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">

          <div className="rounded-3xl bg-white px-4 py-6 sm:p-8 shadow-sm border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-950">
              Leadership Placement Matrix
            </h2>

            <div className="mt-6 space-y-4">
              {talentMatrix.map((leader) => (
                <div
                  key={leader.leader}
                  className="rounded-2xl border border-slate-100 p-5"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-slate-950">
                        {leader.leader}
                      </p>

                      <p className="text-sm text-slate-500">
                        Readiness: {leader.readiness} | Performance: {leader.performance}
                      </p>
                    </div>

                    <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
                      {leader.placement}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-white px-4 py-6 sm:p-8 shadow-sm border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-950">
              Succession Planning
            </h2>

            <div className="mt-6 space-y-4">
              {succession.map((item) => (
                <div
                  key={item.role}
                  className="rounded-2xl bg-slate-50 p-5"
                >
                  <p className="font-semibold text-slate-950">
                    {item.role}
                  </p>

                  <p className="mt-2 text-sm text-slate-600">
                    Vacancy Risk: {item.vacancyRisk}
                  </p>

                  <p className="mt-1 text-sm text-slate-600">
                    Successor: {item.successor}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-3xl bg-blue-50 px-4 py-6 sm:p-8 border border-blue-100">
          <h2 className="text-2xl font-bold text-slate-950">
            Executive Insight
          </h2>

          <p className="mt-4 text-slate-700 leading-8">
            Based on current readiness trends, the district may require 3 external leadership hires in the next 18 months unless internal pipeline development accelerates.
          </p>
        </section>

      </div>
    </main>
  )
}


