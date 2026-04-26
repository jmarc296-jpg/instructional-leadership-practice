export default function HiringPage() {
  const candidates = [
    {
      candidate: "Principal Candidate A",
      instruction: 91,
      culture: 84,
      crisis: 89,
      talent: 87,
      finalScore: 88,
      recommendation: "Strong Hire"
    },
    {
      candidate: "Principal Candidate B",
      instruction: 72,
      culture: 95,
      crisis: 68,
      talent: 80,
      finalScore: 79,
      recommendation: "Development Needed"
    },
    {
      candidate: "Principal Candidate C",
      instruction: 65,
      culture: 61,
      crisis: 58,
      talent: 70,
      finalScore: 63,
      recommendation: "High Risk Hire"
    }
  ]

  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-7xl space-y-8">

        <div className="rounded-3xl bg-white p-8 border shadow-sm">
          <h1 className="text-4xl font-bold text-slate-900">
            Principal Hiring OS
          </h1>

          <p className="mt-3 text-lg text-slate-600">
            Replace gut-feel hiring with simulation-based leadership selection.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <div className="rounded-2xl bg-white p-6 border shadow-sm">
            <div className="text-sm text-slate-500">Candidates Assessed</div>
            <div className="text-4xl font-bold text-blue-600 mt-2">148</div>
          </div>

          <div className="rounded-2xl bg-white p-6 border shadow-sm">
            <div className="text-sm text-slate-500">Strong Hire</div>
            <div className="text-4xl font-bold text-green-600 mt-2">37</div>
          </div>

          <div className="rounded-2xl bg-white p-6 border shadow-sm">
            <div className="text-sm text-slate-500">High Risk</div>
            <div className="text-4xl font-bold text-red-600 mt-2">19</div>
          </div>

          <div className="rounded-2xl bg-white p-6 border shadow-sm">
            <div className="text-sm text-slate-500">Turnover Risk Reduced</div>
            <div className="text-4xl font-bold text-purple-600 mt-2">32%</div>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-8 border shadow-sm">
          <h2 className="text-2xl font-bold mb-6">
            Candidate Evaluation Engine
          </h2>

          <table className="w-full">
            <thead>
              <tr className="border-b text-left">
                <th className="pb-4">Candidate</th>
                <th className="pb-4">Instruction</th>
                <th className="pb-4">Culture</th>
                <th className="pb-4">Crisis</th>
                <th className="pb-4">Talent</th>
                <th className="pb-4">Final Score</th>
                <th className="pb-4">Recommendation</th>
              </tr>
            </thead>

            <tbody>
              {candidates.map((candidate, index) => (
                <tr key={index} className="border-b">
                  <td className="py-4">{candidate.candidate}</td>
                  <td>{candidate.instruction}</td>
                  <td>{candidate.culture}</td>
                  <td>{candidate.crisis}</td>
                  <td>{candidate.talent}</td>
                  <td>{candidate.finalScore}</td>
                  <td>{candidate.recommendation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </main>
  )
}
