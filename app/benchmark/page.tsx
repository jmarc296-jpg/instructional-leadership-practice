export default function BenchmarkPage() {
  const benchmarks = [
    {
      category: "Instructional Leadership",
      districtScore: 82,
      nationalAverage: 71,
      variance: "+11%"
    },
    {
      category: "Conflict Leadership",
      districtScore: 64,
      nationalAverage: 78,
      variance: "-14%"
    },
    {
      category: "Talent Leadership",
      districtScore: 88,
      nationalAverage: 74,
      variance: "+14%"
    },
    {
      category: "Operational Leadership",
      districtScore: 79,
      nationalAverage: 76,
      variance: "+3%"
    }
  ]

  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-7xl space-y-8">

        <div className="rounded-3xl bg-white p-8 border shadow-sm">
          <h1 className="text-4xl font-bold text-slate-900">
            Leadership Benchmark Engine
          </h1>

          <p className="mt-3 text-lg text-slate-600">
            Compare your leadership pipeline against national performance benchmarks.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <div className="rounded-2xl bg-white p-6 border shadow-sm">
            <div className="text-sm text-slate-500">District Ranking</div>
            <div className="text-4xl font-bold text-blue-600 mt-2">Top 18%</div>
          </div>

          <div className="rounded-2xl bg-white p-6 border shadow-sm">
            <div className="text-sm text-slate-500">National Cohorts</div>
            <div className="text-4xl font-bold text-green-600 mt-2">412</div>
          </div>

          <div className="rounded-2xl bg-white p-6 border shadow-sm">
            <div className="text-sm text-slate-500">Benchmark Accuracy</div>
            <div className="text-4xl font-bold text-purple-600 mt-2">94%</div>
          </div>

          <div className="rounded-2xl bg-white p-6 border shadow-sm">
            <div className="text-sm text-slate-500">Pipeline Strength</div>
            <div className="text-4xl font-bold text-orange-600 mt-2">Strong</div>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-8 border shadow-sm">
          <h2 className="text-2xl font-bold mb-6">
            National Leadership Benchmark Comparison
          </h2>

          <table className="w-full">
            <thead>
              <tr className="border-b text-left">
                <th className="pb-4">Category</th>
                <th className="pb-4">Your District</th>
                <th className="pb-4">National Avg</th>
                <th className="pb-4">Variance</th>
              </tr>
            </thead>

            <tbody>
              {benchmarks.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="py-4">{item.category}</td>
                  <td>{item.districtScore}</td>
                  <td>{item.nationalAverage}</td>
                  <td>{item.variance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </main>
  )
}
