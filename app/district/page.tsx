export default function DistrictPage() {
  const metrics = [
    {
      label: "Active Assignments",
      value: "142"
    },
    {
      label: "Completion Rate",
      value: "81%"
    },
    {
      label: "Top Development Gap",
      value: "Instructional Feedback"
    },
    {
      label: "Readiness Growth",
      value: "+11%"
    }
  ]

  const leaders = [
    {
      name: "Principal #1",
      gap: "Coaching"
    },
    {
      name: "Principal #2",
      gap: "Instructional Feedback"
    },
    {
      name: "Principal #3",
      gap: "Operations"
    }
  ]

  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">
          District Leadership Dashboard
        </h1>

        <p className="text-slate-600 mb-8">
          Track leadership development progress across your district.
        </p>

        <section className="grid md:grid-cols-4 gap-6 mb-10">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="bg-white p-6 rounded-2xl border border-slate-200"
            >
              <p className="text-sm text-slate-500">
                {metric.label}
              </p>

              <h2 className="text-2xl font-bold mt-2">
                {metric.value}
              </h2>
            </div>
          ))}
        </section>

        <section className="bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="text-xl font-semibold mb-4">
            Leaders Needing Support
          </h2>

          <div className="space-y-4">
            {leaders.map((leader) => (
              <div
                key={leader.name}
                className="flex justify-between border-b pb-3"
              >
                <span>{leader.name}</span>
                <span className="text-slate-500">
                  {leader.gap}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

