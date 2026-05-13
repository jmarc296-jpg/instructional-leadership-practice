import { cookies } from "next/headers"

type SnapshotPayload = {
  total_signals: number
  severity_counts: {
    high: number
    medium: number
    low: number
  }
  cabinet_review_required: number
  board_exposure_count: number
  superintendent_narrative: string
}

type PressurePayload = {
  average_pressure: number
  board_exposure_count: number
  critical_count: number
}

type DirectivePayload = {
  district_narrative: string
  directives: {
    id: string
    school_name?: string | null
    directive_level?: string
    superintendent_directive?: string
    pressure_score?: number
  }[]
}

async function internalFetch(path: string) {
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

  const response = await fetch(`${normalizedBaseUrl}${path}`, {
    cache: "no-store",
    headers: {
      Cookie: cookieStore
        .getAll()
        .map((cookie) => `${cookie.name}=${cookie.value}`)
        .join("; "),
    },
  })

  if (!response.ok) return null

  return response.json()
}

async function getCommandCenter() {
  const [snapshotResult, pressureResult, directiveResult] =
    await Promise.all([
      internalFetch("/api/executive-snapshot"),
      internalFetch("/api/pressure-posture"),
      internalFetch("/api/superintendent-directives"),
    ])

  return {
    snapshot: snapshotResult?.snapshot as SnapshotPayload | undefined,
    pressure: pressureResult?.posture as PressurePayload | undefined,
    directives: directiveResult?.directives as DirectivePayload | undefined,
  }
}

export default async function ExecutiveCommandCenterPage() {
  const data = await getCommandCenter()

  const unavailable =
    !data.snapshot ||
    !data.pressure ||
    !data.directives

  if (unavailable) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
        <div className="mx-auto max-w-6xl rounded-3xl border border-amber-300/20 bg-amber-300/10 p-8">
          <p className="text-xs uppercase tracking-[0.3em] text-amber-200">
            Executive Command Center
          </p>

          <h1 className="mt-4 text-4xl font-semibold">
            Command center unavailable
          </h1>

          <p className="mt-4 max-w-3xl text-sm leading-6 text-amber-50/90">
            Sign in to view protected district leadership posture, pressure, and superintendent directives.
          </p>
        </div>
      </main>
    )
  }

  const snapshot = data.snapshot!
  const pressure = data.pressure!
  const directives = data.directives!
  const highestDirective = directives.directives?.[0]

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <section className="mx-auto flex max-w-7xl flex-col gap-8">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 shadow-2xl">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">
            Executive Command Center
          </p>

          <h1 className="mt-4 text-5xl font-semibold tracking-tight">
            District leadership operating posture
          </h1>

          <p className="mt-5 max-w-5xl text-base leading-7 text-slate-300">
            {snapshot.superintendent_narrative}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-5">
          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
              Signals
            </p>
            <p className="mt-3 text-4xl font-semibold">
              {snapshot.total_signals}
            </p>
          </div>

          <div className="rounded-3xl border border-red-300/20 bg-red-300/10 p-5">
            <p className="text-xs uppercase tracking-[0.25em] text-red-200">
              High Risk
            </p>
            <p className="mt-3 text-4xl font-semibold">
              {snapshot.severity_counts.high}
            </p>
          </div>

          <div className="rounded-3xl border border-amber-300/20 bg-amber-300/10 p-5">
            <p className="text-xs uppercase tracking-[0.25em] text-amber-200">
              Cabinet Review
            </p>
            <p className="mt-3 text-4xl font-semibold">
              {snapshot.cabinet_review_required}
            </p>
          </div>

          <div className="rounded-3xl border border-purple-300/20 bg-purple-300/10 p-5">
            <p className="text-xs uppercase tracking-[0.25em] text-purple-200">
              Board Exposure
            </p>
            <p className="mt-3 text-4xl font-semibold">
              {snapshot.board_exposure_count}
            </p>
          </div>

          <div className="rounded-3xl border border-cyan-300/20 bg-cyan-300/10 p-5">
            <p className="text-xs uppercase tracking-[0.25em] text-cyan-200">
              Avg Pressure
            </p>
            <p className="mt-3 text-4xl font-semibold">
              {pressure.average_pressure}
            </p>
          </div>
        </div>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
              Superintendent Narrative
            </p>

            <h2 className="mt-3 text-2xl font-semibold">
              Current executive readout
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-300">
              {directives.district_narrative}
            </p>
          </div>

          <div className="rounded-3xl border border-red-300/20 bg-red-300/10 p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-red-200">
              Highest Directive
            </p>

            <h2 className="mt-3 text-2xl font-semibold">
              {highestDirective?.school_name ?? "No active directive"}
            </h2>

            <p className="mt-4 text-sm leading-7 text-red-50/90">
              {highestDirective?.superintendent_directive ??
                "No directive currently requires superintendent containment."}
            </p>
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
            Executive Action Queue
          </p>

          <h2 className="mt-3 text-2xl font-semibold">
            Leadership interventions requiring attention
          </h2>

          <div className="mt-6 space-y-4">
            {directives.directives.slice(0, 10).map((directive) => (
              <article
                key={directive.id}
                className="rounded-2xl border border-white/10 bg-slate-900/80 p-5"
              >
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full border border-red-300/20 bg-red-300/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-red-200">
                    {directive.directive_level}
                  </span>

                  <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-cyan-200">
                    Pressure {directive.pressure_score}
                  </span>
                </div>

                <h3 className="mt-4 text-xl font-semibold">
                  {directive.school_name}
                </h3>

                <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-300">
                  {directive.superintendent_directive}
                </p>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  )
}


