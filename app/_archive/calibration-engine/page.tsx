import Link from "next/link"
import { talentLeaders } from "@/lib/talent/mock-data"
import { evaluatorScores, getEvaluatorAverage, getLeaderCalibrationSummary } from "@/lib/talent/calibration"

const calibratedLeaders = Array.from(new Set(evaluatorScores.map((score) => score.leaderId)))

function statusClass(status: string) {
  if (status === "Calibration Required") return "bg-red-50 text-red-700 border-red-200"
  if (status === "Monitor Variance") return "bg-yellow-50 text-yellow-700 border-yellow-200"
  return "bg-emerald-50 text-emerald-700 border-emerald-200"
}

export default function CalibrationEnginePage() {
  return (
    <main className="min-h-screen bg-[#f7f7f4] p-8 text-[#111827]">
      <section className="rounded-[2rem] border border-black/10 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
          Multi-Evaluator Calibration Engine
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight">
          Detect scoring variance before it becomes a bad talent decision.
        </h1>
        <p className="mt-4 max-w-4xl text-lg leading-8 text-gray-600">
          LeadSharper compares evaluator scoring patterns, flags readiness decisions with weak scoring alignment, and protects districts from over-relying on a single evaluator judgment.
        </p>
      </section>

      <section className="mt-6 grid gap-5">
        {calibratedLeaders.map((leaderId) => {
          const leader = talentLeaders.find((item) => item.id === leaderId)
          const summary = getLeaderCalibrationSummary(leaderId)

          if (!leader) return null

          return (
            <article key={leaderId} className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
              <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
                <div>
                  <h2 className="text-2xl font-bold">{leader.name}</h2>
                  <p className="mt-1 text-gray-600">{leader.currentRole} to {leader.targetRole}</p>
                  <p className="mt-1 text-gray-600">{leader.school}</p>
                </div>

                <div className={`rounded-full border px-4 py-2 text-sm font-semibold ${statusClass(summary.status)}`}>
                  {summary.status}
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-4">
                <div className="rounded-2xl border border-black/10 bg-[#fbfbf8] p-5">
                  <p className="text-sm text-gray-500">Calibrated Average</p>
                  <p className="mt-2 text-3xl font-bold">{summary.average}%</p>
                </div>
                <div className="rounded-2xl border border-black/10 bg-[#fbfbf8] p-5">
                  <p className="text-sm text-gray-500">Highest Score</p>
                  <p className="mt-2 text-3xl font-bold">{summary.high}%</p>
                </div>
                <div className="rounded-2xl border border-black/10 bg-[#fbfbf8] p-5">
                  <p className="text-sm text-gray-500">Lowest Score</p>
                  <p className="mt-2 text-3xl font-bold">{summary.low}%</p>
                </div>
                <div className="rounded-2xl border border-black/10 bg-[#fbfbf8] p-5">
                  <p className="text-sm text-gray-500">Variance</p>
                  <p className="mt-2 text-3xl font-bold">{summary.variance} pts</p>
                </div>
              </div>

              <div className="mt-6 overflow-hidden rounded-2xl border border-black/10">
                <table className="w-full text-left text-sm">
                  <thead className="bg-[#f2f2ed] text-gray-600">
                    <tr>
                      <th className="px-4 py-3">Evaluator</th>
                      <th className="px-4 py-3">Role</th>
                      <th className="px-4 py-3">Simulation</th>
                      <th className="px-4 py-3">Average Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {summary.scores.map((score) => (
                      <tr key={`${score.leaderId}-${score.evaluator}`} className="border-t border-black/10">
                        <td className="px-4 py-3 font-medium">{score.evaluator}</td>
                        <td className="px-4 py-3 text-gray-600">{score.role}</td>
                        <td className="px-4 py-3 text-gray-600">{score.simulation}</td>
                        <td className="px-4 py-3 font-semibold">{getEvaluatorAverage(score)}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 rounded-2xl border border-black/10 bg-[#f7f7f4] p-5">
                <p className="font-semibold">Decision Confidence: {summary.confidence}</p>
                <p className="mt-2 leading-7 text-gray-700">{summary.recommendation}</p>
              </div>
            </article>
          )
        })}
      </section>

      <section className="mt-6 rounded-3xl border border-black/10 bg-[#111827] p-6 text-white shadow-sm">
        <h2 className="text-2xl font-bold">Why this matters</h2>
        <p className="mt-3 max-w-4xl leading-8 text-white/75">
          Promotion decisions become more defensible when districts can show evaluator alignment, scoring confidence, and clear calibration flags before making placement recommendations.
        </p>
        <Link
          href="/talent-decisions"
          className="mt-5 inline-block rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#111827]"
        >
          Return to Talent Decisions
        </Link>
      </section>
    </main>
  )
}
