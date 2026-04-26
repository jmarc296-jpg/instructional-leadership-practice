export default function WorkforcePage() {
  const metrics = [
    { label: "Projected principal vacancies", value: "2,840" },
    { label: "Ready-now leaders", value: "1,126" },
    { label: "Readiness gap", value: "1,714" },
    { label: "High-need regions", value: "18" }
  ]

  const regions = [
    { region: "Urban systems", vacancies: "1,020", ready: "392", gap: "628" },
    { region: "Rural systems", vacancies: "740", ready: "218", gap: "522" },
    { region: "Suburban systems", vacancies: "680", ready: "361", gap: "319" },
    { region: "Charter networks", vacancies: "400", ready: "155", gap: "245" }
  ]

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-7xl space-y-8">

        <section className="rounded-3xl bg-slate-900 p-10 text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-300">
            Leadership Workforce Intelligence
          </p>

          <h1 className="mt-4 text-5xl font-semibold tracking-tight">
            Forecast principal shortages before they become system failures.
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            LeadSharper helps states, foundations, and systems understand where leadership readiness gaps are emerging across regions, school types, and talent pipelines.
          </p>
        </section>

        <section className="grid gap-5 md:grid-cols-4">
          {metrics.map((metric) => (
            <div key={metric.label} className="rounded-3xl bg-white p-8 shadow-sm">
              <div className="text-sm text-slate-500">{metric.label}</div>
              <div className="mt-3 text-4xl font-bold text-blue-700">{metric.value}</div>
            </div>
          ))}
        </section>

        <section className="rounded-3xl bg-white p-8 shadow-sm">
          <h2 className="text-3xl font-semibold text-slate-900">
            Regional readiness gap
          </h2>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="pb-4">Region / System Type</th>
                  <th className="pb-4">Projected Vacancies</th>
                  <th className="pb-4">Ready Leaders</th>
                  <th className="pb-4">Readiness Gap</th>
                </tr>
              </thead>

              <tbody>
                {regions.map((item) => (
                  <tr key={item.region} className="border-b">
                    <td className="py-4">{item.region}</td>
                    <td>{item.vacancies}</td>
                    <td>{item.ready}</td>
                    <td>{item.gap}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-3xl bg-blue-50 p-8">
          <h2 className="text-3xl font-semibold text-slate-900">
            Policy implication
          </h2>

          <p className="mt-4 max-w-3xl leading-8 text-slate-700">
            States and funders can use readiness intelligence to target leadership investment, expand preparation pathways, and reduce principal vacancy risk before shortages destabilize schools.
          </p>
        </section>
      </div>
    </main>
  )
}
