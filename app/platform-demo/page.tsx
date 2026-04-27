import Image from "next/image"
import Link from "next/link"

const demoFlow = [
  {
    step: "1",
    title: "Executive District View",
    description: "See district-wide leadership readiness, risks, gaps, and next actions.",
    route: "/demo-district",
    cta: "Open Demo District"
  },
  {
    step: "2",
    title: "District Dashboard",
    description: "Monitor active assignments, readiness growth, and leaders requiring attention.",
    route: "/district",
    cta: "View Dashboard"
  },
  {
    step: "3",
    title: "Talent Review",
    description: "Review promotion readiness, succession planning, and external hiring dependency.",
    route: "/talent-review",
    cta: "Open Talent Review"
  },
  {
    step: "4",
    title: "Promotion Readiness Dossier",
    description: "Drill into one leader readiness trend, competencies, simulation history, and recommendation.",
    route: "/promotion-readiness/4",
    cta: "Review Leader"
  },
  {
    step: "5",
    title: "Simulation Room",
    description: "Experience the leadership scenario assessment from the principal perspective.",
    route: "/simulation-room",
    cta: "Try Simulation"
  },
  {
    step: "6",
    title: "Recommendations",
    description: "Connect assessment results to targeted development modules.",
    route: "/recommendations",
    cta: "View Recommendations"
  },
  {
    step: "7",
    title: "Assignments",
    description: "Assign modules, set due dates, and queue notifications.",
    route: "/assignments",
    cta: "Create Assignment"
  },
  {
    step: "8",
    title: "Assignment Dashboard",
    description: "Track completion, overdue assignments, and notification status.",
    route: "/assignment-dashboard",
    cta: "Track Assignments"
  },
  {
    step: "9",
    title: "Impact Dashboard",
    description: "Show readiness growth, competency gains, and district ROI.",
    route: "/impact-dashboard",
    cta: "View Impact"
  }
]

export default function PlatformDemoPage() {
  return (
    <main className="min-h-screen bg-slate-100">
      <section className="bg-slate-950 px-8 py-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Image
            src="/logo.png"
            alt="LeadSharper"
            width={180}
            height={70}
            className="h-auto w-[170px]"
          />

          <Link
            href="/pilot"
            className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white"
          >
            Launch Pilot
          </Link>
        </div>
      </section>

      <section className="bg-gradient-to-r from-slate-950 to-blue-900 px-8 py-12 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-300">
            Guided Platform Demo
          </p>

          <h1 className="mt-4 max-w-4xl text-3xl sm:text-4xl sm:text-5xl font-bold tracking-tight">
            See how LeadSharper helps districts assess, develop, and retain stronger school leaders.
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            Follow the full workflow from district readiness insights to individual leader development, assignment tracking, and measurable impact.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-8 py-10">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {demoFlow.map((item) => (
            <div
              key={item.step}
              className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 font-bold text-white">
                  {item.step}
                </div>

                <h2 className="text-xl font-bold text-slate-950">
                  {item.title}
                </h2>
              </div>

              <p className="mt-4 min-h-[72px] text-slate-600">
                {item.description}
              </p>

              <Link
                href={item.route}
                className="mt-6 inline-flex w-full justify-center rounded-2xl bg-slate-950 px-5 py-3 font-semibold text-white"
              >
                {item.cta}
              </Link>
            </div>
          ))}
        </div>

        <section className="mt-10 rounded-3xl border border-blue-100 bg-blue-50 px-4 py-6 sm:p-8">
          <h2 className="text-2xl font-bold text-slate-950">
            Demo Narrative
          </h2>

          <p className="mt-4 max-w-4xl leading-8 text-slate-700">
            LeadSharper gives districts a closed-loop leadership development system: assess leadership judgment, diagnose readiness gaps, assign targeted development, track execution, and prove growth over time.
          </p>
        </section>
      </section>
    </main>
  )
}

