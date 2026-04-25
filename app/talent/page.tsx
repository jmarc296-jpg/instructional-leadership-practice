export default function TalentPage() {
  const candidates = [
    {
      role: "Assistant Principal Candidate",
      readiness: 91,
      timeline: "Ready Now",
      risk: "Low"
    },
    {
      role: "Dean of Instruction",
      readiness: 78,
      timeline: "6 Months",
      risk: "Medium"
    },
    {
      role: "Teacher Leader",
      readiness: 65,
      timeline: "12 Months",
      risk: "Medium"
    },
    {
      role: "Leadership Fellow",
      readiness: 52,
      timeline: "Not Ready",
      risk: "High"
    }
  ]

  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-7xl space-y-8">

        <div className="rounded-3xl bg-white p-8 shadow-sm border">
          <h1 className="text-4xl font-bold text-slate-900">
            Talent Marketplace
          </h1>

          <p className="mt-3 text-lg text-slate-600">
            Identify internal leadership talent before vacancies create chaos.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <div className="rounded-2xl bg-white p-6 border shadow-sm">
            <div className="text-sm text-slate-500">Ready Now</div>
            <div className="text-4xl font-bold text-green-600 mt-2">14</div>
          </div>

          <div className="rounded-2xl bg-white p-6 border shadow-sm">
            <div className="text-sm text-slate-500">Ready in 6 Months</div>
            <div className="text-4xl font-bold text-blue-600 mt-2">31</div>
          </div>

          <div className="rounded-2xl bg-white p-6 border shadow-sm">
            <div className="text-sm text-slate-500">High Risk Leaders</div>
            <div className="text-4xl font-bold text-red-600 mt-2">9</div>
          </div>

          <div className="rounded-2xl bg-white p-6 border shadow-sm">
            <div className="text-sm text-slate-500">Vacancies Covered</div>
            <div className="text-4xl font-bold text-purple-600 mt-2">100%</div>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-sm border">
          <h2 className="text-2xl font-bold mb-6">
            Succession Pipeline
          </h2>

          <table className="w-full">
            <thead>
              <tr className="border-b text-left">
                <th className="pb-4">Leadership Track</th>
                <th className="pb-4">Readiness Score</th>
                <th className="pb-4">Timeline</th>
                <th className="pb-4">Risk</th>
              </tr>
            </thead>

            <tbody>
              {candidates.map((candidate, index) => (
                <tr key={index} className="border-b">
                  <td className="py-4">{candidate.role}</td>
                  <td>{candidate.readiness}</td>
                  <td>{candidate.timeline}</td>
                  <td>{candidate.risk}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </main>
  )
}
