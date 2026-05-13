type SnapshotSignal = {
  id: string
  school_name?: string | null
  leader_name?: string | null
  severity?: string | null
  summary?: string | null
  status?: string | null
  unresolved_days?: number
  escalation_level?: string
  cabinet_review_required?: boolean
  pressure_narrative?: string
  created_at?: string | null
}

type ExecutiveSnapshot = {
  generated_at: string
  total_signals: number
  severity_counts: {
    high: number
    medium: number
    low: number
  }
  escalation_counts: Record<string, number>
  cabinet_review_required: number
  board_exposure_count: number
  superintendent_narrative: string
  signals: SnapshotSignal[]
}

async function getSnapshot(): Promise<ExecutiveSnapshot | null> {
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

    const response = await fetch(`${normalizedBaseUrl}/api/executive-snapshot`, {
      cache: "no-store",
    })

    if (!response.ok) return null

    const payload = await response.json()
    return payload.snapshot ?? null
  } catch {
    return null
  }
}

function formatDate(value?: string | null) {
  if (!value) return "Pending"
  try {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(new Date(value))
  } catch {
    return value
  }
}

export default async function WorkspaceSnapshotPage() {
  const snapshot = await getSnapshot()

  if (!snapshot) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
        <section className="mx-auto max-w-6xl rounded-3xl border border-amber-300/20 bg-amber-300/10 p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-200">
            Executive Snapshot
          </p>
          <h1 className="mt-4 text-4xl font-semibold">Snapshot unavailable</h1>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-amber-50/90">
            Sign in to view the protected executive snapshot and escalation posture.
          </p>
        </section>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <section className="mx-auto flex max-w-7xl flex-col gap-8">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 shadow-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
            Executive Snapshot
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
            District leadership pressure posture
          </h1>
          <p className="mt-5 max-w-4xl text-base leading-7 text-slate-300">
            {snapshot.superintendent_narrative}
          </p>
          <p className="mt-4 text-sm text-slate-500">
            Generated {formatDate(snapshot.generated_at)}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Signals</p>
            <p className="mt-3 text-4xl font-semibold">{snapshot.total_signals}</p>
          </div>
          <div className="rounded-3xl border border-red-300/20 bg-red-300/10 p-5">
            <p className="text-xs uppercase tracking-[0.25em] text-red-200">High risk</p>
            <p className="mt-3 text-4xl font-semibold">{snapshot.severity_counts.high}</p>
          </div>
          <div className="rounded-3xl border border-amber-300/20 bg-amber-300/10 p-5">
            <p className="text-xs uppercase tracking-[0.25em] text-amber-200">Cabinet review</p>
            <p className="mt-3 text-4xl font-semibold">{snapshot.cabinet_review_required}</p>
          </div>
          <div className="rounded-3xl border border-purple-300/20 bg-purple-300/10 p-5">
            <p className="text-xs uppercase tracking-[0.25em] text-purple-200">Board exposure</p>
            <p className="mt-3 text-4xl font-semibold">{snapshot.board_exposure_count}</p>
          </div>
        </div>

        <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <div className="mb-5">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
              Escalation chronology
            </p>
            <h2 className="mt-2 text-2xl font-semibold">Signals requiring executive attention</h2>
          </div>

          <div className="space-y-4">
            {snapshot.signals.map((signal) => (
              <article
                key={signal.id}
                className="rounded-2xl border border-white/10 bg-slate-900/80 p-5"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-slate-300">
                        {signal.severity ?? "medium"}
                      </span>
                      <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-cyan-200">
                        {signal.escalation_level ?? "Monitor"}
                      </span>
                      {signal.cabinet_review_required ? (
                        <span className="rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-amber-200">
                          Cabinet Review
                        </span>
                      ) : null}
                    </div>

                    <h3 className="mt-4 text-xl font-semibold">
                      {signal.school_name ?? "District signal"}
                    </h3>
                    <p className="mt-1 text-sm text-slate-400">
                      {signal.leader_name ?? "Leadership owner pending"}
                    </p>
                    <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-300">
                      {signal.pressure_narrative ?? signal.summary ?? "Signal requires review."}
                    </p>
                  </div>

                  <div className="min-w-fit text-sm text-slate-400 md:text-right">
                    <p>{signal.unresolved_days ?? 0} unresolved days</p>
                    <p className="mt-2">{formatDate(signal.created_at)}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  )
}
