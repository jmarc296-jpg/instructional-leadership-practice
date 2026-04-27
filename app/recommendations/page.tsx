const simulationResults = {
  overallScore: 72,
  weakAreas: [
    "Coaching Conversations",
    "Instructional Feedback",
    "School Culture"
  ]
}

const recommendedModules = [
  {
    weakness: "Coaching Conversations",
    module: "Instructional Coaching Foundations",
    reason: "Leader struggled with accountability conversations."
  },
  {
    weakness: "Instructional Feedback",
    module: "Observation & Feedback Excellence",
    reason: "Leader missed actionable feedback opportunities."
  },
  {
    weakness: "School Culture",
    module: "Building School Culture Systems",
    reason: "Leader struggled to address culture breakdowns."
  }
]

export default function RecommendationsPage() {
  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">
          Development Recommendations
        </h1>

        <p className="text-slate-600 mb-8">
          Personalized development recommendations based on simulation performance.
        </p>

        <div className="bg-white rounded-2xl border p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">
            Simulation Results
          </h2>

          <p className="text-lg mb-4">
            Overall Readiness Score: 
            <span className="font-bold ml-2">
              {simulationResults.overallScore}%
            </span>
          </p>

          <div>
            <h3 className="font-medium mb-2">
              Identified Growth Areas
            </h3>

            <div className="flex gap-3 flex-wrap">
              {simulationResults.weakAreas.map((area) => (
                <span
                  key={area}
                  className="bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {recommendedModules.map((item) => (
            <div
              key={item.module}
              className="bg-white rounded-2xl border p-6"
            >
              <h3 className="text-xl font-semibold mb-2">
                {item.module}
              </h3>

              <p className="text-sm text-slate-500 mb-3">
                Triggered by: {item.weakness}
              </p>

              <p className="text-slate-600 mb-4">
                {item.reason}
              </p>

              <button className="w-full bg-black text-white py-3 rounded-xl">
                Assign Module
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
