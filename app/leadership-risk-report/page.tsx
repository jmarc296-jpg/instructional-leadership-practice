import Link from "next/link";

const riskFactors = [
  {
    title: "Principal Retention Risk",
    score: "82%",
    level: "High Risk",
    drivers: [
      "Teacher retention declined 14%",
      "Attendance dropped 3 consecutive quarters",
      "Walkthrough scores declined",
      "Compliance deadlines missed"
    ]
  },
  {
    title: "Instructional Leadership Risk",
    score: "67%",
    level: "Moderate Risk",
    drivers: [
      "Math proficiency stagnant",
      "Low coaching frequency",
      "Weak reteach execution"
    ]
  }
];

const interventions = [
  {
    timeline: "30 Days",
    owner: "Chief Academic Officer",
    outcome: "Stabilize leadership execution"
  },
  {
    timeline: "90 Days",
    owner: "Talent Team",
    outcome: "Build succession bench"
  }
];

export default function LeadershipRiskReportPage() {
  return (
    <main className="min-h-screen bg-[#f8f7f4] text-black px-6 py-12">
      <div className="max-w-6xl mx-auto">

        <div className="mb-10">
          <div className="inline-flex rounded-full bg-black text-white px-4 py-2 text-sm mb-6">
            LeadSharper Risk Engine™
          </div>

          <p className="text-sm uppercase tracking-[0.2em] text-gray-500">
            Leadership Risk Report
          </p>

          <h1 className="text-5xl font-bold mt-4 leading-tight">
            Predict leadership instability before schools pay the price.
          </h1>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {riskFactors.map((risk) => (
            <div
              key={risk.title}
              className="bg-white rounded-2xl p-6 shadow-sm border"
            >
              <h2 className="text-xl font-semibold">
                {risk.title}
              </h2>

              <div className="mt-4 flex items-center gap-4">
                <p className="text-5xl font-bold">
                  {risk.score}
                </p>

                <div
                  className={`rounded-full px-3 py-1 text-sm font-medium ${
                    risk.level === "High Risk"
                      ? "bg-orange-100 text-orange-600"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {risk.level}
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {risk.drivers.map((driver) => (
                  <div
                    key={driver}
                    className="flex items-center justify-between border-b pb-3"
                  >
                    <span className="text-sm text-gray-600">
                      {driver}
                    </span>

                    <span className="text-gray-400 text-sm">
                      Signal
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-8 border shadow-sm mb-10">
          <h2 className="text-2xl font-bold mb-6">
            Recommended Interventions
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {interventions.map((item) => (
              <div
                key={item.timeline}
                className="bg-gray-50 rounded-2xl p-6 border"
              >
                <h3 className="text-xl font-bold mb-3">
                  {item.timeline}
                </h3>

                <p className="text-gray-600 mb-2">
                  Owner: {item.owner}
                </p>

                <p className="text-gray-600">
                  Outcome: {item.outcome}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-black text-white rounded-2xl p-8">
          <h2 className="text-2xl font-bold">
            Estimated Financial Exposure
          </h2>

          <p className="text-6xl font-bold mt-4">
            $305K
          </p>

          <p className="mt-3 text-gray-300">
            Preventable annual leadership instability costs.
          </p>
        </div>

        <div className="mt-10">
          <Link
            href="/district-command-center"
            className="inline-block bg-black text-white px-6 py-3 rounded-full"
          >
            See District Risk
          </Link>
        </div>
      </div>
    </main>
  );
}
