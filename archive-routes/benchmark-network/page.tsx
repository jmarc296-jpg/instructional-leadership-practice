export default function BenchmarkNetworkPage() {
  const metrics = [
    { label: "Participating Districts", value: "42" },
    { label: "Leaders Assessed", value: "8,400+" },
    { label: "Average Readiness Score", value: "76%" },
    { label: "Promotion Risk Reduction", value: "31%" }
  ]

  const benchmarks = [
    {
      metric: "Instructional Coaching",
      yourDistrict: "71%",
      nationalAverage: "64%"
    },
    {
      metric: "Conflict Navigation",
      yourDistrict: "58%",
      nationalAverage: "69%"
    },
    {
      metric: "Urgency Decision Making",
      yourDistrict: "81%",
      nationalAverage: "73%"
    },
    {
      metric: "Talent Development",
      yourDistrict: "66%",
      nationalAverage: "62%"
    }
  ]

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-7xl space-y-8">

        <section className="rounded-3xl bg-slate-900 p-10 text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-300">
            National Benchmark Network
          </p>

          <h1 className="mt-4 text-5xl font-semibold tracking-tight">
            Compare leadership readiness against peer systems.
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            LeadSharper helps districts understand how their leadership pipeline compares nationally across readiness, coaching effectiveness, and succession strength.
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
            Benchmark comparison
          </h2>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="pb-4">Leadership Competency</th>
                  <th className="pb-4">Your District</th>
                  <th className="pb-4">National Average</th>
                </tr>
              </thead>

              <tbody>
                {benchmarks.map((item) => (
                  <tr key={item.metric} className="border-b">
                    <td className="py-4">{item.metric}</td>
                    <td>{item.yourDistrict}</td>
                    <td>{item.nationalAverage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-3xl bg-blue-50 p-8">
          <h2 className="text-3xl font-semibold text-slate-900">
            Strategic implication
          </h2>

          <p className="mt-4 max-w-3xl leading-8 text-slate-700">
            Districts no longer need to guess whether their leadership pipeline is strong. Benchmarking creates external visibility that strengthens succession planning and talent investment decisions.
          </p>
        </section>
      </div>
    </main>
  )
}
