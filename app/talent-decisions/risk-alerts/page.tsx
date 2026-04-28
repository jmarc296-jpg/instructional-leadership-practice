import { districtBenchStrength, talentLeaders } from "@/lib/talent/mock-data"

const highRiskSchools = districtBenchStrength.filter((school) => school.vacancyRisk === "High" || school.vacancyRisk === "Critical")
const highRiskLeaders = talentLeaders.filter((leader) => leader.readinessScore < 68 || leader.evaluatorConfidence < 78)

export default function RiskAlertsPage() {
  return (
    <main className="min-h-screen bg-[#f7f7f4] p-8 text-[#111827]">
      <div className="rounded-[2rem] border border-black/10 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">Risk Alerts</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight">Leadership placement and vacancy risk</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-gray-600">
          Identify succession exposure, weak readiness evidence, and promotion decisions that require tighter review before action.
        </p>
      </div>

      <section className="mt-6 grid gap-5 lg:grid-cols-2">
        <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold">School Vacancy Risk</h2>
          <div className="mt-4 space-y-3">
            {highRiskSchools.map((school) => (
              <div key={school.school} className="rounded-2xl border border-black/10 bg-[#fbfbf8] p-4">
                <div className="flex justify-between gap-4">
                  <p className="font-semibold">{school.school}</p>
                  <p className="font-semibold text-red-700">{school.vacancyRisk}</p>
                </div>
                <p className="mt-2 text-sm leading-6 text-gray-600">{school.nextAction}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold">Candidate Risk</h2>
          <div className="mt-4 space-y-3">
            {highRiskLeaders.map((leader) => (
              <div key={leader.id} className="rounded-2xl border border-black/10 bg-[#fbfbf8] p-4">
                <div className="flex justify-between gap-4">
                  <p className="font-semibold">{leader.name}</p>
                  <p className="font-semibold">{leader.readinessScore}%</p>
                </div>
                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {leader.school}. Evaluator confidence: {leader.evaluatorConfidence}%. Current status: {leader.successorStatus}.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
