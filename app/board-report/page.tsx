export default function BoardReportPage() {
  const recommendations = [
    "Stabilize 4 high-risk schools",
    "Build assistant principal pipeline",
    "Reduce principal churn by 20%"
  ];

  return (
    <main className="min-h-screen bg-[#f8f7f4] p-10 text-black">
      <div className="max-w-5xl mx-auto">

        <div className="inline-flex rounded-full bg-black text-white px-4 py-2 text-sm mb-6">
          Board Export
        </div>

        <h1 className="text-5xl font-bold mb-8">
          Board Leadership Risk Report
        </h1>

        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 mb-8">
          <p className="text-sm uppercase text-red-600 font-bold tracking-wide">
            Financial Exposure
          </p>

          <p className="text-6xl font-bold mt-4">
            $2.1M
          </p>

          <p className="mt-3 text-gray-600">
            Projected annual loss tied to principal turnover, vacancies, and teacher attrition.
          </p>
        </div>

        <div className="bg-[#f8f7f4] rounded-2xl border p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">
            Immediate Recommendations
          </h2>

          <div className="space-y-4">
            {recommendations.map((item) => (
              <div
                key={item}
                className="flex items-center justify-between border-b pb-4"
              >
                <span className="text-gray-700">
                  {item}
                </span>

                <span className="text-gray-400 text-sm">
                  Priority
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <button className="bg-black text-white px-6 py-3 rounded-full">
            Download PDF
          </button>

          <button className="border px-6 py-3 rounded-full">
            Export Board Deck
          </button>
        </div>
      </div>
    </main>
  );
}
