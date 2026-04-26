export default function SuperintendentPage() {
  const metrics = [
    { label: "Promotion Ready Leaders", value: "18" },
    { label: "High Risk Leadership Placements", value: "9" },
    { label: "Projected Vacancies (12 Months)", value: "14" },
    { label: "Turnover Exposure", value: "$1.2M" }
  ]

  const schools = [
    {
      school: "North Region Cluster",
      risk: "High",
      ready: "3 leaders",
      vacancies: "4 projected"
    },
    {
      school: "East Region Cluster",
      risk: "Moderate",
      ready: "7 leaders",
      vacancies: "3 projected"
    },
    {
      school: "West Region Cluster",
      risk: "Low",
      ready: "8 leaders",
      vacancies: "2 projected"
    }
  ]

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-7xl space-y-8">

        <section className="rounded-3xl bg-slate-900 p-10 text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-300">
            Superintendent Intelligence Layer
          </p>

          <h1 className="mt-4 text-5xl font-semibold tracking-tight">
            See leadership pipeline risk before vacancies happen.
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            LeadSharper helps superintendents proactively manage leadership succession, reduce failed placements, and strengthen district bench depth.
          </p>
        </section>

        <section className="grid gap-5 md:grid-cols-4">
          {metrics.map((metric) => (
            <div key={metric.label} className="rounded-3xl bg-white p-8 shadow-sm">
              <div className="text-sm text-slate-500">
                {metric.label}
              </div>
              <div className="mt-3 text-4xl font-bold text-blue-700">
                {metric.value}
              </div>
            </div>
          ))}
        </section>

        <section className="rounded-3xl bg-white p-8 shadow-sm">
          <h2 className="text-3xl font-semibold text-slate-900">
            Regional leadership risk map
          </h2>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="pb-4">Region</th>
                  <th className="pb-4">Risk Level</th>
                  <th className="pb-4">Ready Leaders</th>
                  <th className="pb-4">Projected Vacancies</th>
                </tr>
              </thead>

              <tbody>
                {schools.map((school) => (
                  <tr key={school.school} className="border-b">
                    <td className="py-4">{school.school}</td>
                    <td>{school.risk}</td>
                    <td>{school.ready}</td>
                    <td>{school.vacancies}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-3xl bg-blue-50 p-8">
          <h2 className="text-3xl font-semibold text-slate-900">
            Recommended superintendent action
          </h2>

          <p className="mt-4 max-w-3xl leading-8 text-slate-700">
            Prioritize succession planning in high-risk clusters, accelerate readiness reps for emerging leaders, and proactively reduce leadership turnover exposure before vacancies create urgency.
          </p>
        </section>
      </div>
    </main>
  )
}
