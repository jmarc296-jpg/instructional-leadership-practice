const competencies = [
  { skill: "Instructional Leadership", score: "88%" },
  { skill: "People Leadership", score: "81%" },
  { skill: "Operational Leadership", score: "69%" },
  { skill: "Culture Leadership", score: "84%" }
]

const strengths = [
  "Strong instructional coaching conversations",
  "High accountability orientation",
  "Strong communication under pressure"
]

const concerns = [
  "Operational execution inconsistency",
  "Delegation gaps",
  "Needs stronger systems leadership"
]

export default function PromotionReadinessPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 lg:px-10">
      <div className="mx-auto max-w-6xl space-y-10">

        <a
          href="/talent-review"
          className="inline-block rounded-2xl border border-slate-300 px-5 py-3 font-medium hover:bg-white"
        >
          Back to Talent Review
        </a>

        <section className="rounded-[32px] bg-white border border-slate-200 px-8 py-10">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">
            Promotion Readiness
          </p>

          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-slate-900">
            Principal Candidate Review
          </h1>

          <p className="mt-5 text-lg text-slate-600 max-w-2xl leading-8">
            Evaluate readiness before making high-stakes placement decisions.
          </p>
        </section>

        <section className="grid md:grid-cols-4 gap-6">
          {competencies.map((item) => (
            <div key={item.skill} className="rounded-3xl bg-white border border-slate-200 p-6">
              <p className="text-sm text-slate-500">{item.skill}</p>
              <h2 className="mt-3 text-4xl font-bold text-slate-900">{item.score}</h2>
            </div>
          ))}
        </section>

        <section className="grid md:grid-cols-2 gap-6">
          <div className="rounded-[32px] bg-white border border-slate-200 p-8">
            <h2 className="text-3xl font-semibold text-slate-900">Strength Signals</h2>
            <div className="mt-6 space-y-4">
              {strengths.map((item) => (
                <div key={item} className="rounded-2xl bg-slate-50 p-4">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] bg-white border border-slate-200 p-8">
            <h2 className="text-3xl font-semibold text-slate-900">Development Risks</h2>
            <div className="mt-6 space-y-4">
              {concerns.map((item) => (
                <div key={item} className="rounded-2xl bg-slate-50 p-4">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-[32px] bg-slate-900 text-white px-8 py-10">
          <h2 className="text-4xl font-semibold tracking-tight">
            Executive Recommendation
          </h2>

          <p className="mt-5 text-lg text-slate-300 max-w-3xl leading-8">
            Candidate demonstrates strong instructional leadership readiness but should complete operational leadership development before final placement.
          </p>

          <a
            href="/assignments"
            className="inline-block mt-6 rounded-2xl bg-blue-600 px-6 py-4 text-white font-semibold"
          >
            Assign Development Plan
          </a>
        </section>

      </div>
    </main>
  )
}
