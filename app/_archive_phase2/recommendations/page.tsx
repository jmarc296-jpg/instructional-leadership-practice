const recommendations = [
  {
    gap: "Instructional Feedback",
    signal: "Leader avoided naming the instructional gap directly.",
    action: "Assign Coaching Difficult Conversations module",
    priority: "High"
  },
  {
    gap: "Operational Execution",
    signal: "Response lacked clear owner, timeline, and follow-up cadence.",
    action: "Assign Systems Execution module",
    priority: "Medium"
  },
  {
    gap: "Culture Leadership",
    signal: "Leader preserved relationships but did not create enough accountability.",
    action: "Assign Culture Reset module",
    priority: "Medium"
  }
]

export default function RecommendationsPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 lg:px-10">
      <div className="mx-auto max-w-6xl space-y-10">

        <a
          href="/district"
          className="inline-block rounded-2xl border border-slate-300 px-5 py-3 font-medium hover:bg-white"
        >
          Back to Dashboard
        </a>

        <section className="rounded-[32px] bg-white border border-slate-200 px-8 py-10">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">
            Recommendations Engine
          </p>

          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-slate-900">
            Convert readiness signals into targeted development.
          </h1>

          <p className="mt-5 text-lg text-slate-600 max-w-2xl leading-8">
            LeadSharper connects observed leadership gaps to development moves that districts can assign and track.
          </p>
        </section>

        <section className="space-y-5">
          {recommendations.map((item) => (
            <div
              key={item.gap}
              className="rounded-3xl bg-white border border-slate-200 p-7"
            >
              <div className="flex justify-between gap-6">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
                    {item.priority} Priority
                  </p>

                  <h2 className="mt-3 text-3xl font-semibold text-slate-900">
                    {item.gap}
                  </h2>

                  <p className="mt-4 text-slate-600 leading-7">
                    {item.signal}
                  </p>
                </div>

                <a
                  href="/assignments"
                  className="h-fit rounded-2xl bg-blue-600 px-6 py-4 text-white font-semibold"
                >
                  Assign
                </a>
              </div>

              <div className="mt-6 rounded-2xl bg-slate-50 p-5">
                <p className="text-sm text-slate-500">Recommended Action</p>
                <p className="mt-2 font-semibold text-slate-900">
                  {item.action}
                </p>
              </div>
            </div>
          ))}
        </section>

      </div>
    </main>
  )
}
