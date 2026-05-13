type AuditEvent = {
  id: string
  event_type: string
  entity_type: string
  entity_id: string
  actor_id?: string | null
  actor_email?: string | null
  event_payload?: Record<string, unknown> | null
  immutable_hash?: string | null
  created_at: string
}

async function getAuditEvents(): Promise<AuditEvent[]> {
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

    const response = await fetch(`${normalizedBaseUrl}/api/audit-events`, {
      cache: "no-store",
    })

    if (!response.ok) {
      return []
    }

    const payload = await response.json()

    return Array.isArray(payload.events) ? payload.events : []
  } catch {
    return []
  }
}

function formatEventLabel(eventType: string) {
  return eventType
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

function formatDate(value: string) {
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

function getPayloadText(event: AuditEvent) {
  const payload = event.event_payload ?? {}

  const schoolName = payload.schoolName || payload.school_name
  const leaderName = payload.leaderName || payload.leader_name
  const severity = payload.severity
  const summary = payload.summary

  return {
    schoolName: typeof schoolName === "string" ? schoolName : "District signal",
    leaderName: typeof leaderName === "string" ? leaderName : "Leadership owner pending",
    severity: typeof severity === "string" ? severity : "event",
    summary: typeof summary === "string" ? summary : "Audit event recorded for executive traceability.",
  }
}

export default async function WorkspaceAuditPage() {
  const events = await getAuditEvents()
  const latestEvent = events[0]
  const signalEvents = events.filter((event) => event.event_type === "signal_captured").length
  const uniqueEntities = new Set(events.map((event) => event.entity_id)).size

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-8">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl">
          <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
                Executive Audit Stream
              </p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
                Immutable leadership event history
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-300 md:text-base">
                Every captured leadership signal becomes part of a defensible executive record.
                This stream gives cabinet teams a durable timeline of what was detected, when it
                entered the system, and which leadership risk it is tied to.
              </p>
            </div>

            <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 px-4 py-3 text-sm text-cyan-100">
              Audit posture: active
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Events logged</p>
              <p className="mt-3 text-3xl font-semibold">{events.length}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Signal captures</p>
              <p className="mt-3 text-3xl font-semibold">{signalEvents}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Unique records</p>
              <p className="mt-3 text-3xl font-semibold">{uniqueEntities}</p>
            </div>
          </div>
        </div>

        {latestEvent ? (
          <section className="rounded-3xl border border-emerald-300/20 bg-emerald-300/10 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-200">
              Latest executive event
            </p>
            <h2 className="mt-3 text-2xl font-semibold">{formatEventLabel(latestEvent.event_type)}</h2>
            <p className="mt-2 text-sm text-emerald-50">
              {formatDate(latestEvent.created_at)} · {latestEvent.entity_type} · {latestEvent.entity_id}
            </p>
            <p className="mt-4 max-w-4xl text-sm leading-6 text-emerald-50/90">
              {getPayloadText(latestEvent).summary}
            </p>
          </section>
        ) : (
          <section className="rounded-3xl border border-amber-300/20 bg-amber-300/10 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-200">
              No audit events yet
            </p>
            <h2 className="mt-3 text-2xl font-semibold">Audit stream is ready for event capture</h2>
            <p className="mt-3 text-sm leading-6 text-amber-50/90">
              Capture a leadership signal from the demo or API to populate this immutable timeline.
            </p>
          </section>
        )}

        <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                Event chronology
              </p>
              <h2 className="mt-2 text-2xl font-semibold">Cabinet-traceable leadership actions</h2>
            </div>
            <p className="text-sm text-slate-400">Latest 100 events</p>
          </div>

          <div className="space-y-4">
            {events.map((event) => {
              const payload = getPayloadText(event)

              return (
                <article
                  key={event.id}
                  className="rounded-2xl border border-white/10 bg-slate-900/70 p-5"
                >
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">
                          {formatEventLabel(event.event_type)}
                        </span>
                        <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">
                          {payload.severity}
                        </span>
                      </div>

                      <h3 className="mt-4 text-lg font-semibold">{payload.schoolName}</h3>
                      <p className="mt-1 text-sm text-slate-400">{payload.leaderName}</p>
                      <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-300">
                        {payload.summary}
                      </p>
                    </div>

                    <div className="min-w-fit text-left text-xs text-slate-400 md:text-right">
                      <p>{formatDate(event.created_at)}</p>
                      <p className="mt-2">Entity: {event.entity_type}</p>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-3 border-t border-white/10 pt-4 text-xs text-slate-400 md:grid-cols-2">
                    <p className="break-all">Record ID: {event.entity_id}</p>
                    <p className="break-all">Hash: {event.immutable_hash ?? "pending"}</p>
                  </div>
                </article>
              )
            })}
          </div>
        </section>
      </section>
    </main>
  )
}

