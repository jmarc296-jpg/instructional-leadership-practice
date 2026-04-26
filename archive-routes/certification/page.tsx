export default function CertificationPage() {
  const pathways = [
    {
      pathway: "Instructional Leadership",
      completion: "100%",
      score: 91,
      status: "Passed"
    },
    {
      pathway: "Teacher Coaching",
      completion: "100%",
      score: 84,
      status: "Passed"
    },
    {
      pathway: "Crisis Leadership",
      completion: "75%",
      score: 79,
      status: "In Progress"
    },
    {
      pathway: "Community Leadership",
      completion: "100%",
      score: 88,
      status: "Passed"
    }
  ]

  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-7xl space-y-8">

        <div className="rounded-3xl bg-white p-8 border shadow-sm">
          <h1 className="text-4xl font-bold text-slate-900">
            State Certification Platform
          </h1>

          <p className="mt-3 text-lg text-slate-600">
            Replace seat-time certification models with performance-based leadership licensure.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <div className="rounded-2xl bg-white p-6 border shadow-sm">
            <div className="text-sm text-slate-500">Candidates Certified</div>
            <div className="text-4xl font-bold text-blue-600 mt-2">4,218</div>
          </div>

          <div className="rounded-2xl bg-white p-6 border shadow-sm">
            <div className="text-sm text-slate-500">State Partners</div>
            <div className="text-4xl font-bold text-green-600 mt-2">12</div>
          </div>

          <div className="rounded-2xl bg-white p-6 border shadow-sm">
            <div className="text-sm text-slate-500">Pass Rate</div>
            <div className="text-4xl font-bold text-purple-600 mt-2">89%</div>
          </div>

          <div className="rounded-2xl bg-white p-6 border shadow-sm">
            <div className="text-sm text-slate-500">Licensure Ready</div>
            <div className="text-4xl font-bold text-orange-600 mt-2">76%</div>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-8 border shadow-sm">
          <h2 className="text-2xl font-bold mb-6">
            Certification Pathways
          </h2>

          <table className="w-full">
            <thead>
              <tr className="border-b text-left">
                <th className="pb-4">Pathway</th>
                <th className="pb-4">Completion</th>
                <th className="pb-4">Score</th>
                <th className="pb-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {pathways.map((pathway, index) => (
                <tr key={index} className="border-b">
                  <td className="py-4">{pathway.pathway}</td>
                  <td>{pathway.completion}</td>
                  <td>{pathway.score}</td>
                  <td>{pathway.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </main>
  )
}
