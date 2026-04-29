import Link from "next/link";

const metrics = [
  { label: "High Risk Principals", value: "12" },
  { label: "Open Leadership Vacancies", value: "4" },
  { label: "Succession Ready Leaders", value: "7" },
  { label: "Financial Exposure", value: "$2.1M" }
];

const schools = [
  "East High School",
  "Lincoln K-8",
  "North Academy",
  "Washington STEM"
];

export default function DistrictCommandCenter() {
  return (
    <main className="min-h-screen bg-[#f8f7f4] p-10 text-black">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold mb-8">
          District Command Center
        </h1>

        <div className="grid md:grid-cols-4 gap-6 mb-10">
          {metrics.map((metric) => (
            <div key={metric.label} className="bg-white p-6 rounded-2xl border">
              <p className="text-sm text-gray-500">{metric.label}</p>
              <p className="text-3xl font-bold mt-2">{metric.value}</p>
            </div>
          ))}
        </div>

        <div className="bg-white p-8 rounded-2xl border mb-8">
          <h2 className="text-2xl font-bold mb-4">
            Schools Requiring Immediate Intervention
          </h2>

          <div className="space-y-3">
            {schools.map((school) => (
              <div key={school} className="p-4 bg-gray-50 rounded-xl">
                {school}
              </div>
            ))}
          </div>
        </div>

        <Link
          href="/board-report"
          className="bg-black text-white px-6 py-3 rounded-full inline-block"
        >
          Generate Board Report
        </Link>
      </div>
    </main>
  );
}
