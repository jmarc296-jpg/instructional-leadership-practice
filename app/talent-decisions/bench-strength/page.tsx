import { districtBenchStrength } from "@/lib/talent/mock-data"

function riskClass(risk: string) {
  if (risk === "Critical") return "bg-red-50 text-red-700 border-red-200"
  if (risk === "High") return "bg-orange-50 text-orange-700 border-orange-200"
  if (risk === "Moderate") return "bg-yellow-50 text-yellow-700 border-yellow-200"
  return "bg-emerald-50 text-emerald-700 border-emerald-200"
}

export default function BenchStrengthPage() {
  return (
    <main className="min-h-screen bg-[#f7f7f4] p-8 text-[#111827]">
      <div className="rounded-[2rem] border border-black/10 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">Bench Strength</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight">Successor depth by school</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-gray-600">
          A superintendent-ready view of where the district has leadership depth, where the bench is thin, and where succession planning needs immediate attention.
        </p>
      </div>

      <div className="mt-6 overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#f2f2ed] text-gray-600">
            <tr>
              <th className="px-5 py-4">School</th>
              <th className="px-5 py-4">Principal Successors</th>
              <th className="px-5 py-4">AP Successors</th>
              <th className="px-5 py-4">Risk</th>
              <th className="px-5 py-4">Next Move</th>
            </tr>
          </thead>
          <tbody>
            {districtBenchStrength.map((school) => (
              <tr key={school.school} className="border-t border-black/10">
                <td className="px-5 py-4 font-semibold">{school.school}</td>
                <td className="px-5 py-4">{school.principalSuccessors}</td>
                <td className="px-5 py-4">{school.apSuccessors}</td>
                <td className="px-5 py-4">
                  <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${riskClass(school.vacancyRisk)}`}>
                    {school.vacancyRisk}
                  </span>
                </td>
                <td className="px-5 py-4 text-gray-600">{school.nextAction}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}
