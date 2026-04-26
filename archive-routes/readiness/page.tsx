export default function ReadinessPage() {
  const readinessData = [
    { category: "Strategic Leadership", score: 82 },
    { category: "Talent Leadership", score: 61 },
    { category: "Culture Leadership", score: 74 },
    { category: "Operational Leadership", score: 89 }
  ]

  const overallScore = 76

  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-6xl space-y-8">

        <div className="rounded-3xl bg-white p-8 shadow-sm border">
          <h1 className="text-4xl font-bold text-slate-900">
            Leadership Readiness Index™
          </h1>

          <p className="mt-3 text-slate-600 text-lg">
            Measure principal readiness before the role is on the line.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {readinessData.map((item) => (
            <div
              key={item.category}
              className="rounded-2xl bg-white p-6 shadow-sm border"
            >
              <div className="text-sm text-slate-500">
                {item.category}
              </div>

              <div className="mt-4 text-4xl font-bold text-blue-600">
                {item.score}
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-3xl bg-slate-900 text-white p-10">
          <div className="text-sm uppercase tracking-wider text-slate-300">
            Overall Readiness Score
          </div>

          <div className="text-6xl font-bold mt-4">
            {overallScore}/100
          </div>

          <div className="mt-4 text-xl text-green-400">
            Emerging Principal Ready in 6–12 Months
          </div>
        </div>

      </div>
    </main>
  )
}
