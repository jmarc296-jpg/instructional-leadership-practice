import Link from "next/link";

const riskFactors = [
  {
    title: "Principal Retention Risk",
    score: "82%",
    level: "High Risk",
    drivers: [
      "Teacher retention declined 14%",
      "Attendance dropped for 3 consecutive quarters",
      "Instructional walkthrough scores declined",
      "Missed compliance deadlines"
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
    actions: [
      "Assign executive coach",
      "Conduct attendance systems audit",
      "Increase walkthrough cadence"
    ]
  },
  {
    timeline: "90 Days",
    actions: [
      "Build staffing stabilization plan",
      "Develop assistant principal pipeline",
      "Launch retention strategy"
    ]
  }
];

export default function LeadershipRiskReportPage() {
  return (
    <main className="min-h-screen bg-[#f8f7f4] text-black px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.2em] text-gray-500">
            Leadership Risk Report
          </p>

          <h1 className="text-5xl font-bold mt-4">
            Predict leadership instability before schools pay the price.
          </h1>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {riskFactors.map((risk) => (
            <div
              key={risk.title}
              className="bg-white rounded-2xl p-6 shadow-sm border"
            >
              <h2 className="text-xl font-semibold">{risk.title}</h2>
              <p className="text-4xl font-bold mt-3">{risk.score}</p>
              <p className="text-red-600 font-medium mt-2">{risk.level}</p>

              <ul className="mt-4 space-y-2 text-gray-600">
                {risk.drivers.map((driver) => (
                  <li key={driver}>• {driver}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-8 border shadow-sm mb-10">
          <h2 className="text-2xl font-bold mb-6">
            Recommended Interventions
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {interventions.map((item) => (
              <div key={item.timeline}>
                <h3 className="font-semibold text-lg mb-3">
                  {item.timeline}
                </h3>

                <ul className="space-y-2 text-gray-600">
                  {item.actions.map((action) => (
                    <li key={action}>• {action}</li>
                ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-black text-white rounded-2xl p-8">
          <h2 className="text-2xl font-bold">
            Estimated Financial Exposure
          </h2>

          <p className="text-5xl font-bold mt-4">$305,000</p>

          <p className="mt-3 text-gray-300">
            Estimated turnover, vacancy, and school disruption costs if no intervention occurs.
          </p>
        </div>

        <div className="mt-10">
          <Link
            href="/demo"
            className="inline-block bg-black text-white px-6 py-3 rounded-full"
          >
            Request Pilot Access
          </Link>
        </div>
      </div>
    </main>
  );
}
