const districtMetrics = [
  {
    label: "Leaders Assessed",
    value: "84"
  },
  {
    label: "Average Readiness Score",
    value: "78%"
  },
  {
    label: "Module Completion Rate",
    value: "81%"
  },
  {
    label: "Retention Risk Leaders",
    value: "9"
  }
]

const topGaps = [
  "Instructional Feedback",
  "Coaching Conversations",
  "School Culture",
  "Strategic Staffing"
]

const actions = [
  "Assign coaching modules to 14 principals",
  "Launch culture intervention cohort",
  "Prepare succession pipeline for 3 vacancies"
]

export default function DemoDistrictPage() {
  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">
          District Leadership Command Center
        </h1>

        <p className="text-slate-600 mb-8">
          Identify leadership gaps, assign development, and reduce costly turnover.
        </p>

        <section className="grid md:grid-cols-4 gap-6 mb-10">
          {districtMetrics.map((metric) => (
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

        <div className="grid md:grid-cols-2 gap-8">
          <section className="bg-white p-6 rounded-2xl border">
            <h2 className="text-xl font-semibold mb-4">
              Top Leadership Gaps
            </h2>

            <div className="space-y-3">
              {topGaps.map((gap) => (
                <div
                  key={gap}
                  className="bg-slate-100 rounded-xl p-3"
                >
                  {gap}
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white p-6 rounded-2xl border">
            <h2 className="text-xl font-semibold mb-4">
              Recommended District Actions
            </h2>

            <div className="space-y-3">
              {actions.map((action) => (
                <div
                  key={action}
                  className="bg-green-50 rounded-xl p-3"
                >
                  {action}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
