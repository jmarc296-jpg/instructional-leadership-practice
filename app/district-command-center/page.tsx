const metrics = [
  { label: "High Risk Principals", value: "12" },
  { label: "Open Vacancies", value: "4" },
  { label: "Succession Ready", value: "7" },
  { label: "Financial Exposure", value: "$2.1M" }
];

const schools = [
  {
    name: "Priority Campus 01",
    risk: "High Risk",
    action: "Executive coaching intervention"
  },
  {
    name: "Priority Campus 02",
    risk: "Moderate Risk",
    action: "Succession monitoring"
  },
  {
    name: "Priority Campus 03",
    risk: "High Risk",
    action: "Staff stabilization plan"
  }
];

export default function DistrictCommandCenterPage() {
  return (
    <main className="min-h-screen bg-[#f8f7f4] p-10 text-black">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-6xl font-bold mb-10">
          District Command Center
        </h1>

        <div className="grid md:grid-cols-4 gap-6 mb-10">
          {metrics.map((metric) => (
            <div key={metric.label} className="bg-white border rounded-2xl p-6">
              <p className="text-gray-500">{metric.label}</p>
              <p className="text-5xl font-bold mt-4">{metric.value}</p>
            </div>
          ))}
        </div>

        <div className="bg-white border rounded-2xl p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6">
            Immediate Intervention Schools
          </h2>

          <div className="space-y-4">
            {schools.map((school) => (
              <div key={school.name} className="border rounded-xl p-5">
                <div className="flex justify-between">
                  <h3 className="font-bold">{school.name}</h3>
                  <span className="text-gray-500 text-sm">{school.risk}</span>
                </div>

                <p className="text-gray-600 mt-2">
                  {school.action}
                </p>
              </div>
            ))}
          </div>
        </div>

        <button className="bg-black text-white px-6 py-3 rounded-full">
          Generate Board Report
        </button>
      </div>
    </main>
  );
}
