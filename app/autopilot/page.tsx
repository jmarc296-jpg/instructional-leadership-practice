export default function AutopilotPage() {
  const alerts = [
    {
      type: "Pipeline Risk",
      message: "Your assistant principal pipeline is weak in instructional leadership.",
      priority: "High"
    },
    {
      type: "Hiring Risk",
      message: "3 external candidates show elevated turnover risk.",
      priority: "Medium"
    },
    {
      type: "Succession Planning",
      message: "5 principal vacancies projected within 18 months.",
      priority: "High"
    },
    {
      type: "Coaching Recommendation",
      message: "12 leaders should be assigned conflict management simulations.",
      priority: "Medium"
    }
  ]

  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      <div className="mx-auto max-w-7xl space-y-8">

        <section className="rounded-3xl bg-slate-900 p-10 border border-slate-800">
          <p className="text-sm uppercase tracking-wider text-blue-300 font-semibold">
            Autonomous Leadership Command Center
          </p>

          <h1 className="mt-4 text-5xl font-bold">
            Let AI manage your leadership pipeline.
          </h1>

          <p className="mt-5 max-w-3xl text-lg text-slate-300">
            LeadSharper automatically identifies risks, predicts vacancies,
            recommends successors, and generates leadership development plans.
          </p>
        </section>

        <section className="grid md:grid-cols-4 gap-6">
          <Metric label="Projected Vacancies" value="5" />
          <Metric label="High Risk Leaders" value="14" />
          <Metric label="Ready Successors" value="27" />
          <Metric label="Automated Reports" value="100%" />
        </section>

        <section className="rounded-3xl bg-slate-900 p-8 border border-slate-800">
          <h2 className="text-2xl font-bold mb-6">
            AI Leadership Alerts
          </h2>

          <div className="space-y-4">
            {alerts.map((alert, index) => (
              <div
                key={index}
                className="rounded-2xl bg-slate-800 p-5"
              >
                <div className="text-sm text-blue-300 font-semibold">
                  {alert.type}
                </div>

                <div className="mt-2 text-lg">
                  {alert.message}
                </div>

                <div className="mt-3 text-sm text-red-300">
                  Priority: {alert.priority}
                </div>
              </div>
            ))}
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
    <div className="rounded-2xl bg-slate-900 p-6 border border-slate-800">
      <div className="text-sm text-slate-400">{label}</div>
      <div className="text-4xl font-bold text-blue-400 mt-2">{value}</div>
    </div>
  )
}
