const metrics = [
  { label: "Leaders Assessed", value: "84" },
  { label: "Average Readiness Score", value: "78%" },
  { label: "Module Completion Rate", value: "81%" },
  { label: "Retention Risk Leaders", value: "9" }
]

const gaps = [
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
    <main className="min-h-screen bg-slate-100 px-6 py-8">
      <div className="mx-auto max-w-7xl">

        <a
          href="/"
          className="inline-flex items-center rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          ? Back to Homepage
        </a>

        <div className="mt-6">
          <h1 className="text-5xl font-bold text-slate-900">
            District Leadership Command Center
          </h1>

          <p className="mt-4 text-xl text-slate-600">
            Identify leadership gaps, assign development, and reduce costly turnover.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-4">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-3xl border border-slate-200 bg-white p-8"
            >
              <p className="text-sm text-slate-500">{metric.label}</p>
              <h2 className="mt-4 text-5xl font-bold text-slate-900">
                {metric.value}
              </h2>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-8">
            <h2 className="text-3xl font-bold text-slate-900">
              Top Leadership Gaps
            </h2>

            <div className="mt-6 space-y-4">
              {gaps.map((gap) => (
                <div
                  key={gap}
                  className="rounded-2xl bg-slate-100 p-5"
                >
                  {gap}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8">
            <h2 className="text-3xl font-bold text-slate-900">
              Recommended District Actions
            </h2>

            <div className="mt-6 space-y-4">
              {actions.map((action) => (
                <div
                  key={action}
                  className="rounded-2xl bg-green-50 p-5"
                >
                  {action}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
