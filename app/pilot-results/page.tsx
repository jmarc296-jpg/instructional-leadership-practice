const pilotMetrics = [
  {
    label: "Average Readiness Growth",
    value: "+18%"
  },
  {
    label: "Module Completion Rate",
    value: "87%"
  },
  {
    label: "Retention Risk Reduction",
    value: "-32%"
  },
  {
    label: "Internal Promotion Readiness",
    value: "+21%"
  }
]

const roiMetrics = [
  "Estimated avoided principal turnover cost: $180,000",
  "14 leaders moved from high-risk to ready-now",
  "District reduced external hiring dependency",
]

export default function PilotResultsPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">
          90-Day Pilot Results
        </h1>

        <p className="text-slate-600 mb-8">
          What districts can expect after implementing LeadSharper.
        </p>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {pilotMetrics.map((metric) => (
            <div
              key={metric.label}
              className="bg-white p-6 rounded-2xl border"
            >
              <p className="text-sm text-slate-500">
                {metric.label}
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {metric.value}
              </h2>
            </div>
          ))}
        </section>

        <section className="bg-white rounded-2xl border p-6">
          <h2 className="text-xl font-semibold mb-4">
            District ROI
          </h2>

          <div className="space-y-4">
            {roiMetrics.map((item) => (
              <div
                key={item}
                className="bg-green-50 p-4 rounded-xl"
              >
                {item}
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

