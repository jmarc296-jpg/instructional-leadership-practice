export default function EvaluationReportPage() {
  const scores = [
    { label: "Leadership Readiness", score: "82%" },
    { label: "Coaching Effectiveness", score: "74%" },
    { label: "Decision Quality", score: "88%" },
    { label: "Urgency Handling", score: "69%" }
  ]

  const blindSpots = [
    "Avoids direct coaching conversations under pressure",
    "Strong instructional instincts but slower conflict resolution",
    "Needs tighter delegation systems"
  ]

  const strengths = [
    "Strong instructional judgment",
    "High student-centered decision making",
    "Calm under operational pressure"
  ]

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-6xl space-y-8">

        <section className="rounded-3xl bg-slate-900 p-10 text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-300">
            Leadership Evaluation Report
          </p>

          <h1 className="mt-4 text-5xl font-semibold tracking-tight">
            AI-generated readiness analysis after every simulation.
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            LeadSharper evaluates leadership decisions and translates behavioral performance into promotion, coaching, and succession insights.
          </p>
        </section>

        <section className="grid gap-5 md:grid-cols-4">
          {scores.map((item) => (
            <div key={item.label} className="rounded-3xl bg-white p-7 shadow-sm">
              <div className="text-sm text-slate-500">{item.label}</div>
              <div className="mt-3 text-4xl font-bold text-blue-700">
                {item.score}
              </div>
            </div>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="text-3xl font-semibold text-slate-900">
              Leadership strengths
            </h2>

            <ul className="mt-5 space-y-4 text-slate-700">
              {strengths.map((item) => (
                <li key={item}>✓ {item}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="text-3xl font-semibold text-slate-900">
              Blind spots
            </h2>

            <ul className="mt-5 space-y-4 text-slate-700">
              {blindSpots.map((item) => (
                <li key={item}>⚠ {item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="rounded-3xl bg-blue-50 p-8">
          <h2 className="text-3xl font-semibold text-slate-900">
            Promotion recommendation
          </h2>

          <div className="mt-5 text-2xl font-bold text-blue-700">
            Ready in 6–12 months with targeted coaching support
          </div>

          <p className="mt-4 max-w-3xl leading-7 text-slate-700">
            This leader demonstrates strong instructional leadership potential but needs additional reps in conflict navigation and staff accountability conversations before immediate promotion.
          </p>
        </section>

      </div>
    </main>
  )
}
