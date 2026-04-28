import { talentLeaders } from "@/lib/talent/mock-data"
import { getPromotionRecommendation, getReadinessBand, formatCompetency } from "@/lib/talent/scoring"

export default function PromotionReadinessPage() {
  return (
    <main className="min-h-screen bg-[#f7f7f4] p-8 text-[#111827]">
      <div className="rounded-[2rem] border border-black/10 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">Promotion Readiness</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight">Evidence-based readiness decisions</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-gray-600">
          Translate simulation evidence, competency strength, and evaluator confidence into defensible promotion recommendations.
        </p>
      </div>

      <section className="mt-6 grid gap-5">
        {talentLeaders.map((leader) => {
          const recommendation = getPromotionRecommendation(leader)

          return (
            <article key={leader.id} className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
              <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
                <div>
                  <h2 className="text-2xl font-bold">{leader.name}</h2>
                  <p className="mt-1 text-gray-600">{leader.currentRole} to {leader.targetRole}</p>
                  <p className="mt-1 text-gray-600">{leader.school}</p>
                </div>

                <div className="rounded-2xl border border-black/10 bg-[#fbfbf8] p-4 text-right">
                  <p className="text-sm text-gray-500">Readiness</p>
                  <p className="text-3xl font-bold">{leader.readinessScore}%</p>
                  <p className="text-sm font-semibold">{getReadinessBand(leader.readinessScore)}</p>
                </div>
              </div>

              <div className="mt-6 grid gap-3 md:grid-cols-5">
                {Object.entries(leader.competencies).map(([key, value]) => (
                  <div key={key} className="rounded-2xl border border-black/10 bg-[#fbfbf8] p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">{formatCompetency(key)}</p>
                    <p className="mt-2 text-2xl font-bold">{value}%</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-black/10 bg-[#f7f7f4] p-5">
                <p className="font-semibold">{recommendation.decision}</p>
                <p className="mt-2 leading-7 text-gray-700">{recommendation.rationale}</p>
                <p className="mt-2 text-sm font-medium text-gray-600">{recommendation.caution}</p>
              </div>
            </article>
          )
        })}
      </section>
    </main>
  )
}
