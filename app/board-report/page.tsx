export default function BoardReportPage() {
  return (
    <main className="min-h-screen bg-white p-10 text-black">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-bold mb-6">
          Board Leadership Risk Report
        </h1>

        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 mb-8">
          <p className="text-sm uppercase text-red-600 font-bold">
            Financial Risk
          </p>
          <p className="text-5xl font-bold mt-3">
            $2.1M
          </p>
          <p className="mt-3 text-gray-600">
            Projected annual loss tied to principal turnover, vacancies, and teacher attrition.
          </p>
        </div>

        <div className="bg-gray-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-4">
            Immediate Recommendations
          </h2>

          <ul className="space-y-3">
            <li>• Stabilize 4 high-risk schools</li>
            <li>• Build assistant principal pipeline</li>
            <li>• Reduce principal churn by 20%</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
