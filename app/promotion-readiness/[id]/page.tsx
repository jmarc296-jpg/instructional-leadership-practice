const competencyScores = [
  { skill: "Instructional Leadership", score: "88%" },
  { skill: "Coaching", score: "82%" },
  { skill: "School Culture", score: "91%" },
  { skill: "Operations", score: "64%" },
  { skill: "Strategic Thinking", score: "78%" },
  { skill: "Communication", score: "85%" }
]

const simulationHistory = [
  {
    scenario: "Difficult Teacher Conversation",
    score: "84%",
    result: "Strong"
  },
  {
    scenario: "Family Conflict Resolution",
    score: "89%",
    result: "Strong"
  },
  {
    scenario: "Staffing Decision",
    score: "71%",
    result: "Needs Improvement"
  },
  {
    scenario: "School Crisis Response",
    score: "67%",
    result: "Needs Improvement"
  }
]

const growthTimeline = [
  {
    period: "6 Months Ago",
    score: "68%"
  },
  {
    period: "3 Months Ago",
    score: "74%"
  },
  {
    period: "Current",
    score: "82%"
  }
]

export default function PromotionReadinessPage() {
  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-7xl space-y-8">

        <section className="rounded-3xl bg-gradient-to-r from-slate-950 to-blue-900 p-8 text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-300">
            Promotion Readiness
          </p>

          <h1 className="mt-4 text-4xl font-bold">
            Principal #4 Leadership Review
          </h1>

          <p className="mt-4 text-slate-300 max-w-3xl">
            Review readiness signals before making promotion decisions.
          </p>
        </section>

        <section className="grid md:grid-cols-4 gap-5">
          {growthTimeline.map((item) => (
            <div
              key={item.period}
              className="rounded-2xl bg-white p-6 border border-slate-100"
            >
              <p className="text-sm text-slate-500">
                {item.period}
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-950">
                {item.score}
              </h2>
            </div>
          ))}

          <div className="rounded-2xl bg-green-50 p-6 border border-green-100">
            <p className="text-sm text-green-700">
              Recommendation
            </p>

            <h2 className="mt-2 text-2xl font-bold text-green-700">
              Ready in 6 Months
            </h2>
          </div>
        </section>

        <section className="grid lg:grid-cols-2 gap-6">

          <div className="rounded-3xl bg-white p-8 border border-slate-100">
            <h2 className="text-2xl font-bold mb-6">
              Competency Breakdown
            </h2>

            <div className="space-y-5">
              {competencyScores.map((item) => (
                <div key={item.skill}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">
                      {item.skill}
                    </span>

                    <span className="text-blue-600 font-semibold">
                      {item.score}
                    </span>
                  </div>

                  <div className="w-full bg-slate-200 rounded-full h-3">
                    <div
                      className="bg-blue-600 h-3 rounded-full"
                      style={{ width: item.score }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-white p-8 border border-slate-100">
            <h2 className="text-2xl font-bold mb-6">
              Simulation History
            </h2>

            <div className="space-y-4">
              {simulationHistory.map((item) => (
                <div
                  key={item.scenario}
                  className="rounded-2xl bg-slate-50 p-5"
                >
                  <div className="flex justify-between">
                    <div>
                      <p className="font-semibold">
                        {item.scenario}
                      </p>

                      <p className="text-sm text-slate-500 mt-1">
                        Score: {item.score}
                      </p>
                    </div>

                    <span className="text-blue-600 font-semibold">
                      {item.result}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </section>

        <section className="rounded-3xl bg-blue-50 p-8 border border-blue-100">
          <h2 className="text-2xl font-bold">
            Executive Summary
          </h2>

          <p className="mt-4 text-slate-700 leading-8">
            Principal #4 demonstrates strong instructional leadership, communication,
            and culture-building capacity. The largest remaining risk area is operational execution.
            Recommend a targeted operational leadership pathway before final promotion placement.
          </p>

          <div className="mt-6 flex gap-4">
            <button className="rounded-2xl bg-blue-600 px-6 py-3 text-white font-semibold">
              Assign Final Development Plan
            </button>

            <button className="rounded-2xl bg-white px-6 py-3 font-semibold border border-slate-200">
              Promote Now
            </button>
          </div>
        </section>

      </div>
    </main>
  )
}
