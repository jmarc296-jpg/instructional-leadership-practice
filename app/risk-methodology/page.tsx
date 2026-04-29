const signals = [
  "Principal retention and tenure patterns",
  "Teacher retention and staffing stability",
  "Attendance and culture trend indicators",
  "Instructional walkthrough and coaching cadence",
  "Succession bench strength and vacancy exposure"
];

export default function RiskMethodologyPage() {
  return (
    <main className="min-h-screen bg-[#f8f7f4] text-black px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="inline-flex rounded-full bg-black text-white px-4 py-2 text-sm mb-6">
          LeadSharper Risk Engine™
        </div>

        <p className="text-sm uppercase tracking-[0.2em] text-gray-500">
          Risk Methodology
        </p>

        <h1 className="text-5xl font-bold mt-4 leading-tight">
          How LeadSharper identifies leadership instability before it becomes a vacancy.
        </h1>

        <p className="mt-6 text-xl text-gray-600 leading-8">
          LeadSharper analyzes leadership, staffing, culture, instructional, and succession signals to help districts identify schools where leadership instability may require proactive intervention.
        </p>

        <div className="mt-10 bg-[#f8f7f4] rounded-2xl border p-8">
          <h2 className="text-2xl font-bold mb-6">
            Core Risk Signals
          </h2>

          <div className="space-y-4">
            {signals.map((signal) => (
              <div
                key={signal}
                className="flex items-center justify-between border-b pb-4"
              >
                <span className="text-gray-700">{signal}</span>
                <span className="text-gray-400 text-sm">Signal</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="bg-[#f8f7f4] border rounded-2xl p-6">
            <h3 className="font-bold text-lg">Predict</h3>
            <p className="mt-3 text-gray-600">
              Identify leadership risk before turnover or vacancy occurs.
            </p>
          </div>

          <div className="bg-[#f8f7f4] border rounded-2xl p-6">
            <h3 className="font-bold text-lg">Prescribe</h3>
            <p className="mt-3 text-gray-600">
              Convert risk signals into targeted intervention moves.
            </p>
          </div>

          <div className="bg-[#f8f7f4] border rounded-2xl p-6">
            <h3 className="font-bold text-lg">Protect</h3>
            <p className="mt-3 text-gray-600">
              Strengthen succession pipelines before schools are exposed.
            </p>
          </div>
        </div>

        <div className="mt-8 bg-black text-white rounded-2xl p-8">
          <h2 className="text-2xl font-bold">
            Built for decision support, not evaluation.
          </h2>

          <p className="mt-3 text-gray-300">
            LeadSharper is designed to help district leaders identify support needs earlier. It should complement, not replace, local context, supervisor judgment, and existing evaluation systems.
          </p>
        </div>
      </div>
    </main>
  );
}
