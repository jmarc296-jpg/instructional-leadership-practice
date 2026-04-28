import Link from "next/link"
import { talentLeaders } from "@/lib/talent/mock-data"
import { getReadinessBand } from "@/lib/talent/scoring"

type Props = {
  params: Promise<{
    id: string
  }>
}

function getPrescription(score: number) {
  if (score >= 85) {
    return {
      timeline: "90 Days",
      promotionWindow: "Ready for active promotion slate",
      simulations: [
        "Principal hiring decision simulation",
        "School turnaround leadership simulation"
      ],
      learning: [
        "Board communication for school leaders",
        "Advanced talent retention strategy"
      ],
      supervisorActions: [
        "Include in principal interview slate",
        "Assign strategic district initiative leadership"
      ]
    }
  }

  if (score >= 70) {
    return {
      timeline: "6 Months",
      promotionWindow: "Potential promotion in next cycle",
      simulations: [
        "Difficult staff accountability conversation",
        "Instructional leadership simulation"
      ],
      learning: [
        "Adult accountability systems",
        "Coaching struggling teachers"
      ],
      supervisorActions: [
        "Monthly coaching cadence",
        "Shadow principal operational planning"
      ]
    }
  }

  return {
    timeline: "9-12 Months",
    promotionWindow: "Not ready for promotion consideration",
    simulations: [
      "Crisis leadership simulation",
      "Parent escalation management"
    ],
    learning: [
      "Core instructional leadership",
      "School systems execution"
    ],
    supervisorActions: [
      "Weekly coaching support",
      "Residency placement"
    ]
  }
}

export default async function DevelopmentPrescriptionPage({ params }: Props) {
  const resolvedParams = await params
    const leader =
    talentLeaders.find((item) => item.id === resolvedParams.id) ||
    talentLeaders.find(
      (item) =>
        item.name.toLowerCase().replace(/\s+/g, "-") ===
        resolvedParams.id.toLowerCase()
    ) ||
    talentLeaders[0]

  if (!leader) {
    return (
      <main className="min-h-screen bg-[#f7f7f4] p-8 text-[#111827]">
        <section className="rounded-[2rem] border border-black/10 bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-bold">Leader not found</h1>
          <Link href="/talent-decisions/promotion-readiness" className="mt-5 inline-block rounded-2xl bg-[#111827] px-5 py-3 text-sm font-semibold text-white">
            Return to promotion readiness
          </Link>
        </section>
      </main>
    )
  }

  const prescription = getPrescription(leader.readinessScore)

  return (
    <main className="min-h-screen bg-[#f7f7f4] p-8 text-[#111827]">
      <section className="rounded-[2rem] border border-black/10 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
          Development Prescription
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight">{leader.name}</h1>
        <p className="mt-3 text-lg text-gray-600">
          {leader.currentRole} to {leader.targetRole} at {leader.school}
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-black/10 bg-[#fbfbf8] p-5">
            <p className="text-sm text-gray-500">Readiness Score</p>
            <p className="mt-2 text-3xl font-bold">{leader.readinessScore}%</p>
          </div>

          <div className="rounded-2xl border border-black/10 bg-[#fbfbf8] p-5">
            <p className="text-sm text-gray-500">Readiness Band</p>
            <p className="mt-2 text-xl font-bold">{getReadinessBand(leader.readinessScore)}</p>
          </div>

          <div className="rounded-2xl border border-black/10 bg-[#fbfbf8] p-5">
            <p className="text-sm text-gray-500">Reassessment Timeline</p>
            <p className="mt-2 text-xl font-bold">{prescription.timeline}</p>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link href="/calibration-engine" className="rounded-2xl bg-[#111827] px-5 py-3 text-center text-sm font-semibold text-white">
            Validate evaluator calibration
          </Link>
          <Link href="/talent-decisions/executive-reports" className="rounded-2xl border border-black/10 bg-white px-5 py-3 text-center text-sm font-semibold text-[#111827] shadow-sm transition hover:bg-black/[0.03]">
            View executive report
          </Link>
        </div>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold">Assigned Simulations</h2>
          <ul className="mt-4 space-y-3 text-gray-600">
            {prescription.simulations.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold">Learning Assignments</h2>
          <ul className="mt-4 space-y-3 text-gray-600">
            {prescription.learning.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold">Supervisor Actions</h2>
          <ul className="mt-4 space-y-3 text-gray-600">
            {prescription.supervisorActions.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-6 rounded-3xl border border-black/10 bg-[#111827] p-6 text-white shadow-sm">
        <h2 className="text-2xl font-bold">Promotion Timeline Recommendation</h2>
        <p className="mt-4 text-white/80">{prescription.promotionWindow}</p>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <Link href="/talent-decisions/promotion-readiness" className="rounded-2xl bg-white px-5 py-3 text-center text-sm font-semibold text-[#111827]">
            Return to promotion readiness
          </Link>
          <Link href="/talent-decisions/succession-pipeline" className="rounded-2xl border border-white/20 px-5 py-3 text-center text-sm font-semibold text-white">
            View succession pipeline
          </Link>
        </div>
      </section>
    </main>
  )
}


