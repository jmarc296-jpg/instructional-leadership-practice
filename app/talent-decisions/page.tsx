import Link from "next/link"
import { districtBenchStrength, talentLeaders } from "@/lib/talent/mock-data"
import { getReadinessBand } from "@/lib/talent/scoring"

const readyNow = talentLeaders.filter((leader) => leader.readinessScore >= 85).length
const highRisk = districtBenchStrength.filter((item) => item.vacancyRisk === "High" || item.vacancyRisk === "Critical").length
const averageReadiness = Math.round(
  talentLeaders.reduce((sum, leader) => sum + leader.readinessScore, 0) / talentLeaders.length
)

const cards = [
  {
    label: "Ready Now",
    value: readyNow,
    detail: "leaders eligible for active promotion slate"
  },
  {
    label: "Average Readiness",
    value: `${averageReadiness}%`,
    detail: "district leadership pipeline score"
  },
  {
    label: "Vacancy Risk",
    value: highRisk,
    detail: "schools requiring succession attention"
  },
  {
    label: "Evaluator Confidence",
    value: "83%",
    detail: "average confidence across current evidence"
  }
]

const journey = [
  {
    step: "1",
    title: "Review promotion readiness",
    href: "/talent-decisions/promotion-readiness",
    description: "See who is ready now, who needs development, and where promotion decisions carry risk."
  },
  {
    step: "2",
    title: "Check bench strength",
    href: "/talent-decisions/bench-strength",
    description: "Identify schools with successor depth and schools exposed by thin leadership pipelines."
  },
  {
    step: "3",
    title: "Inspect succession pipeline",
    href: "/talent-decisions/succession-pipeline",
    description: "Track internal candidates by target role, readiness band, and next development move."
  },
  {
    step: "4",
    title: "Validate scoring confidence",
    href: "/calibration-engine",
    description: "Detect evaluator variance before finalizing high-stakes promotion recommendations."
  },
  {
    step: "5",
    title: "Generate executive report",
    href: "/talent-decisions/executive-reports",
    description: "Create a superintendent-ready view of readiness, vacancy risk, and pipeline health."
  }
]

export default function TalentDecisionsPage() {
  return (
    <main className="min-h-screen bg-[#f7f7f4] p-8 text-[#111827]">
      <section className="rounded-[2rem] border border-black/10 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
          Talent Engine
        </p>
        <h1 className="mt-3 max-w-4xl text-4xl font-bold tracking-tight">
          Turn leadership evidence into confident district talent decisions.
        </h1>
        <p className="mt-4 max-w-4xl text-lg leading-8 text-gray-600">
          LeadSharper connects simulation performance, readiness evidence, bench strength, scoring confidence, and development prescriptions into one decision workflow.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {cards.map((card) => (
            <div key={card.label} className="rounded-2xl border border-black/10 bg-[#fbfbf8] p-5">
              <p className="text-sm text-gray-500">{card.label}</p>
              <p className="mt-2 text-3xl font-bold">{card.value}</p>
              <p className="mt-2 text-sm leading-6 text-gray-600">{card.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-6 rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-3 lg:flex-row lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
              Recommended buyer path
            </p>
            <h2 className="mt-2 text-2xl font-bold">Start here, then keep drilling deeper.</h2>
          </div>
          <Link
            href="/talent-decisions/promotion-readiness"
            className="rounded-2xl bg-[#111827] px-5 py-3 text-center text-sm font-semibold text-white"
          >
            Start with promotion readiness
          </Link>
        </div>

        <div className="mt-6 grid gap-4">
          {journey.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group grid gap-4 rounded-2xl border border-black/10 bg-[#fbfbf8] p-5 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-sm md:grid-cols-[64px_1fr_auto] md:items-center"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#111827] text-sm font-bold text-white">
                {item.step}
              </div>
              <div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-1 leading-7 text-gray-600">{item.description}</p>
              </div>
              <span className="text-sm font-semibold text-gray-500 group-hover:text-[#111827]">
                Open
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-6 rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Current Promotion Slate</h2>
        <div className="mt-4 overflow-hidden rounded-2xl border border-black/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#f2f2ed] text-gray-600">
              <tr>
                <th className="px-4 py-3">Leader</th>
                <th className="px-4 py-3">Current Role</th>
                <th className="px-4 py-3">Target Role</th>
                <th className="px-4 py-3">Readiness</th>
                <th className="px-4 py-3">Band</th>
              </tr>
            </thead>
            <tbody>
              {talentLeaders.map((leader) => (
                <tr key={leader.id} className="border-t border-black/10">
                  <td className="px-4 py-3 font-medium">{leader.name}</td>
                  <td className="px-4 py-3 text-gray-600">{leader.currentRole}</td>
                  <td className="px-4 py-3 text-gray-600">{leader.targetRole}</td>
                  <td className="px-4 py-3 font-semibold">{leader.readinessScore}%</td>
                  <td className="px-4 py-3">{getReadinessBand(leader.readinessScore)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
}
