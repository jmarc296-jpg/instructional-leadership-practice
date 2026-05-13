import { cookies } from "next/headers"

type TimelinePhase = {
  phase: string
  completed: boolean
  narrative: string
}

type Timeline = {
  school_name?: string | null
  severity?: string
  days_open?: number
  phases: TimelinePhase[]
}

type TimelineResponse = {
  generated_at: string
  timelines: Timeline[]
}

async function getTimeline(): Promise<TimelineResponse | null> {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL ||
      process.env.VERCEL_PROJECT_PRODUCTION_URL ||
      process.env.VERCEL_URL

    const normalizedBaseUrl = baseUrl?.startsWith("http")
      ? baseUrl
      : baseUrl
        ? `https://${baseUrl}`
        : "http://localhost:3000"

    const cookieStore = await cookies()

    const response = await fetch(
      `${normalizedBaseUrl}/api/executive-timeline`,
      {
        cache: "no-store",
        headers: {
          Cookie: cookieStore
            .getAll()
            .map(
              (cookie) => `${cookie.name}=${cookie.value}`
            )
            .join("; "),
        },
      }
    )

    if (!response.ok) return null

    const payload = await response.json()

    return payload.timeline ?? null
  } catch {
    return null
  }
}

export default async function WorkspaceTimelinePage() {
  const response = await getTimeline()

  if (!response) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
        <div className="mx-auto max-w-6xl rounded-3xl border border-amber-300/20 bg-amber-300/10 p-8">
          <p className="text-xs uppercase tracking-[0.3em] text-amber-200">
            Executive Timeline
          </p>

          <h1 className="mt-4 text-4xl font-semibold">
            Timeline unavailable
          </h1>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <section className="mx-auto flex max-w-7xl flex-col gap-8">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">
            Executive Timeline Engine
          </p>

          <h1 className="mt-4 text-5xl font-semibold tracking-tight">
            Escalation chronology system
          </h1>
        </div>

        <section className="space-y-6">
          {response.timelines.map((timeline, index) => (
            <article
              key={`${timeline.school_name}-${index}`}
              className="rounded-3xl border border-white/10 bg-slate-900/80 p-6"
            >
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-cyan-200">
                  {timeline.severity}
                </span>

                <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-slate-300">
                  {timeline.days_open} days open
                </span>
              </div>

              <h2 className="mt-4 text-2xl font-semibold">
                {timeline.school_name}
              </h2>

              <div className="mt-6 space-y-4">
                {timeline.phases.map((phase, phaseIndex) => (
                  <div
                    key={`${phase.phase}-${phaseIndex}`}
                    className={`rounded-2xl border p-4 ${
                      phase.completed
                        ? "border-cyan-300/20 bg-cyan-300/10"
                        : "border-white/10 bg-slate-950/60"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">
                        {phase.phase}
                      </h3>

                      <span className="text-xs uppercase tracking-[0.2em] text-slate-400">
                        {phase.completed
                          ? "Completed"
                          : "Pending"}
                      </span>
                    </div>

                    <p className="mt-3 text-sm leading-6 text-slate-300">
                      {phase.narrative}
                    </p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </section>
      </section>
    </main>
  )
}
