import { cookies } from "next/headers"

type Directive = {
  id: string
  school_name?: string | null
  directive_level?: string
  superintendent_directive?: string
  pressure_score?: number
}

type DirectiveResponse = {
  generated_at: string
  district_narrative: string
  directives: Directive[]
}

async function getDirectives(): Promise<DirectiveResponse | null> {
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
      `${normalizedBaseUrl}/api/superintendent-directives`,
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

    return payload.directives ?? null
  } catch {
    return null
  }
}

export default async function WorkspaceDirectivesPage() {
  const response = await getDirectives()

  if (!response) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
        <div className="mx-auto max-w-6xl rounded-3xl border border-amber-300/20 bg-amber-300/10 p-8">
          <p className="text-xs uppercase tracking-[0.3em] text-amber-200">
            Superintendent Directives
          </p>

          <h1 className="mt-4 text-4xl font-semibold">
            Directive engine unavailable
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
            Superintendent Directive Engine
          </p>

          <h1 className="mt-4 text-5xl font-semibold tracking-tight">
            Executive intervention directives
          </h1>

          <p className="mt-5 max-w-4xl text-base leading-7 text-slate-300">
            {response.district_narrative}
          </p>
        </div>

        <section className="space-y-4">
          {response.directives.map((directive) => (
            <article
              key={directive.id}
              className="rounded-3xl border border-white/10 bg-slate-900/80 p-6"
            >
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full border border-red-300/20 bg-red-300/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-red-200">
                  {directive.directive_level}
                </span>

                <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-cyan-200">
                  Pressure {directive.pressure_score}
                </span>
              </div>

              <h2 className="mt-4 text-2xl font-semibold">
                {directive.school_name}
              </h2>

              <p className="mt-4 max-w-4xl text-sm leading-6 text-slate-300">
                {directive.superintendent_directive}
              </p>
            </article>
          ))}
        </section>
      </section>
    </main>
  )
}
