import Link from "next/link";

const metrics = [
  { label: "High Risk Principals", value: "12", context: "Require support" },
  { label: "Open Vacancies", value: "4", context: "Current exposure" },
  { label: "Succession Ready", value: "7", context: "Ready-now leaders" },
  { label: "Financial Exposure", value: "$2.1M", context: "Estimated annual risk" }
];

const schools = [
  {
    name: "Priority Campus 01",
    risk: "High Risk",
    action: "Executive coaching intervention",
    owner: "Chief Academic Officer"
  },
  {
    name: "Priority Campus 02",
    risk: "Moderate Risk",
    action: "Succession monitoring",
    owner: "Talent Team"
  },
  {
    name: "Priority Campus 03",
    risk: "High Risk",
    action: "Staff stabilization plan",
    owner: "Human Capital"
  }
];

export default function DistrictCommandCenterPage() {
  return (
    <main className="min-h-screen bg-[#f8f7f4] text-black px-6 py-12">
      <div className="max-w-6xl mx-auto">

        <div className="mb-10">
          <div className="inline-flex rounded-full bg-black text-white px-4 py-2 text-sm mb-6">
            LeadSharper Command Center
          </div>

          <p className="text-sm uppercase tracking-[0.2em] text-gray-500">
            District Risk Snapshot
          </p>

          <h1 className="text-5xl font-bold mt-4 leading-tight">
            Monitor leadership risk, vacancy exposure, and succession readiness in one place.
          </h1>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-10">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="bg-white border rounded-2xl p-6 shadow-sm"
            >
              <p className="text-sm text-gray-500">
                {metric.label}
              </p>

              <p className="text-5xl font-bold mt-4">
                {metric.value}
              </p>

              <p className="text-sm text-gray-400 mt-3">
                {metric.context}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-white border rounded-2xl p-8 shadow-sm mb-8">
          <div className="flex items-start justify-between gap-6 mb-6">
            <div>
              <h2 className="text-2xl font-bold">
                Immediate Intervention Schools
              </h2>

              <p className="text-gray-500 mt-2">
                Prioritized campuses requiring executive attention this cycle.
              </p>
            </div>

            <span className="rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-600">
              3 Active Signals
            </span>
          </div>

          <div className="space-y-4">
            {schools.map((school) => (
              <div
                key={school.name}
                className="grid gap-4 rounded-2xl border p-5 md:grid-cols-[1.5fr_1fr_1fr]"
              >
                <div>
                  <h3 className="font-bold">
                    {school.name}
                  </h3>

                  <p className="text-gray-600 mt-2">
                    {school.action}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-400">
                    Owner
                  </p>

                  <p className="mt-2 text-gray-700">
                    {school.owner}
                  </p>
                </div>

                <div className="md:text-right">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${
                      school.risk === "High Risk"
                        ? "bg-orange-100 text-orange-600"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {school.risk}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Link
          href="/board-report"
          className="inline-block bg-black text-white px-6 py-3 rounded-full"
        >
          Generate Board Report
        </Link>
      </div>
    </main>
  );
}
