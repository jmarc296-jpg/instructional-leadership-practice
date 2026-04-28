import { districtBenchStrength, talentLeaders } from "@/lib/talent/mock-data"

const readyNow = talentLeaders.filter((leader) => leader.readinessScore >= 85).length
const readySoon = talentLeaders.filter((leader) => leader.readinessScore >= 68 && leader.readinessScore < 85).length
const highRisk = districtBenchStrength.filter((school) => school.vacancyRisk === "High" || school.vacancyRisk === "Critical").length
const pipelineHealth = highRisk >= 2 ? "Moderate Risk" : "Stable"

export default function ExecutiveReportsPage() {
  return (
    <main className="min-h-screen bg-[#f7f7f4] p-8 text-[#111827]">
      <div className="rounded-[2rem] border border-black/10 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">Executive Reports</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight">Superintendent talent summary</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-gray-600">
          A board-ready summary of leadership readiness, succession exposure, and recommended district action.
        </p>
      </div>

      <section className="mt-6 grid gap-4 md:grid-cols-4">
        <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Ready Now</p>
          <p className="mt-2 text-4xl font-bold">{readyNow}</p>
        </div>
        <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Ready in 12 Months</p>
          <p className="mt-2 text-4xl font-bold">{readySoon}</p>
        </div>
        <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Critical Risk Schools</p>
          <p className="mt-2 text-4xl font-bold">{highRisk}</p>
        </div>
        <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Pipeline Health</p>
          <p className="mt-2 text-3xl font-bold">{pipelineHealth}</p>
        </div>
      </section>

      <section className="mt-6 rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold">Executive Summary</h2>
        <p className="mt-4 leading-8 text-gray-700">
          The district has a developing internal leadership pipeline with several candidates approaching promotion readiness. The strongest near-term opportunity is to formalize a promotion slate for ready-now candidates while placing high-potential leaders into targeted development cycles tied to simulation evidence and field-based performance.
        </p>
        <p className="mt-4 leading-8 text-gray-700">
          Immediate attention should be given to schools with limited successor depth. These schools create operational and instructional continuity risk if leadership vacancies emerge without a prepared internal bench.
        </p>
      </section>
    </main>
  )
}
