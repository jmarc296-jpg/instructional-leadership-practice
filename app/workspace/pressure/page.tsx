import { cookies } from "next/headers"

type PressureSignal = {
  id: string
  school_name?: string | null
  severity?: string | null
  pressure_score?: number
  pressure_level?: string
  pressure_narrative?: string
}

type PressurePosture = {
  generated_at: string
  average_pressure: number
  board_exposure_count: number
  critical_count: number
  signals: PressureSignal[]
}

async function getPressurePosture(): Promise<PressurePosture | null> {
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
      `${normalizedBaseUrl}/api/pressure-posture`,
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

    return payload.posture ?? null
  } catch {
    return null
  }
}

export default async function WorkspacePressurePage() {
  const posture = await getPressurePosture()

  if (!posture) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
        <div className="mx-auto max-w-6xl rounded-3xl border border-amber-300/20 bg-amber-300/10 p-8">
          <p className="text-xs uppercase tracking-[0.3em] text-amber-200">
            Executive Pressure
          </p>

          <h1 className="mt-4 text-4xl font-semibold">
            Pressure posture unavailable
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
            Executive Pressure Posture
          </p>

          <h1 className="mt-4 text-5xl font-semibold tracking-tight">
            District operational pressure system
          </h1>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
              Average Pressure
            </p>

            <p className="mt-3 text-5xl font-semibold">
              {posture.average_pressure}
            </p>
          </div>

          <div className="rounded-3xl border border-red-300/20 bg-red-300/10 p-5">
            <p className="text-xs uppercase tracking-[0.25em] text-red-200">
              Board Exposure
            </p>

            <p className="mt-3 text-5xl font-semibold">
              {posture.board_exposure_count}
            </p>
          </div>

          <div className="rounded-3xl border border-amber-300/20 bg-amber-300/10 p-5">
            <p className="text-xs uppercase tracking-[0.25em] text-amber-200">
              Critical Signals
            </p>

            <p className="mt-3 text-5xl font-semibold">
              {posture.critical_count}
            </p>
          </div>
        </div>

        <section className="space-y-4">
          {posture.signals.map((signal) => (
            <article
              key={signal.id}
              className="rounded-3xl border border-white/10 bg-slate-900/80 p-6"
            >
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-cyan-200">
                  {signal.pressure_level}
                </span>

                <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-slate-300">
                  Pressure {signal.pressure_score}
                </span>

                <span className="rounded-full border border-purple-300/20 bg-purple-300/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-purple-200">
                  {signal.severity}
                </span>
              </div>

              <h2 className="mt-4 text-2xl font-semibold">
                {signal.school_name}
              </h2>

              <p className="mt-4 max-w-4xl text-sm leading-6 text-slate-300">
                {signal.pressure_narrative}
              </p>
            </article>
          ))}
        </section>
      </section>
    </main>
  )
}
