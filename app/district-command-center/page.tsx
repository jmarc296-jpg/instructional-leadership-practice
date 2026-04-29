import Link from "next/link";

const metrics = [
  { label: "High Risk Principals", value: "12" },
  { label: "Open Vacancies", value: "4" },
  { label: "Succession Ready", value: "7" },
  { label: "Financial Exposure", value: "$2.1M" }
];

export default function DistrictCommandCenterPage() {
  return (
    <main className="min-h-screen bg-[#f8f7f4] text-black p-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold mb-8">
          District Command Center
        </h1>

        <div className="grid md:grid-cols-4 gap-6 mb-10">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="bg-white border rounded-2xl p-6"
            >
              <p className="text-sm text-gray-500">
                {metric.label}
              </p>

              <p className="text-3xl font-bold mt-2">
                {metric.value}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-white border rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">
            Immediate Intervention Schools
          </h2>

          <div className="space-y-3">
            <div className="bg-gray-50 p-4 rounded-xl">
              East High School
            </div>

            <div className="bg-gray-50 p-4 rounded-xl">
              Lincoln K-8
            </div>

            <div className="bg-gray-50 p-4 rounded-xl">
              Washington STEM
            </div>
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
