import { questionsWithStrongExemplars } from '@/data/questions'
import { validateScenarioQuality } from '@/lib/scenario-quality-validator'

export default function QualityPage() {
  const rows = questionsWithStrongExemplars.map((question) => {
    const quality = validateScenarioQuality({ exemplar: question.exemplar })

    return {
      ...question,
      quality
    }
  })

  const passing = rows.filter((row) => row.quality.passes).length
  const total = rows.length
  const passRate = total ? Math.round((passing / total) * 100) : 0

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="premium-panel rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-600">
            Scenario Intelligence Dashboard
          </div>

          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-slate-950">
            Content quality control for LeadSharper
          </h1>

          <p className="mt-4 max-w-3xl text-slate-600 leading-8">
            Every scenario is checked for stakeholder awareness, specific problem naming,
            leadership action, follow-up, and student impact before it is trusted in demo or pilot use.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-slate-50 p-5">
              <div className="text-xs uppercase tracking-[0.18em] text-slate-500">
                Total Scenarios
              </div>
              <div className="mt-2 text-3xl font-semibold text-slate-950">
                {total}
              </div>
            </div>

            <div className="rounded-2xl bg-emerald-50 p-5">
              <div className="text-xs uppercase tracking-[0.18em] text-emerald-700">
                Passing
              </div>
              <div className="mt-2 text-3xl font-semibold text-emerald-950">
                {passing}
              </div>
            </div>

            <div className="rounded-2xl bg-blue-50 p-5">
              <div className="text-xs uppercase tracking-[0.18em] text-blue-700">
                Quality Rate
              </div>
              <div className="mt-2 text-3xl font-semibold text-blue-950">
                {passRate}%
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-5">
          {rows.map((row) => (
            <div
              key={row.id}
              className="premium-panel rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold capitalize text-blue-700">
                      {row.domain}
                    </span>

                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold capitalize text-slate-700">
                      {row.difficulty}
                    </span>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        row.quality.passes
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-red-50 text-red-700'
                      }`}
                    >
                      Quality {row.quality.score}/5
                    </span>
                  </div>

                  <h2 className="mt-4 text-xl font-semibold text-slate-950">
                    {row.stem}
                  </h2>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {row.scenario}
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-2xl bg-slate-50 p-5">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Exemplar
                </div>

                <p className="mt-3 text-sm leading-7 text-slate-700">
                  {row.exemplar}
                </p>
              </div>

              <div className="mt-5 grid gap-3 md:grid-cols-5">
                {Object.entries(row.quality.checks).map(([key, value]) => (
                  <div
                    key={key}
                    className={`rounded-2xl p-3 text-xs font-semibold ${
                      value
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-red-50 text-red-700'
                    }`}
                  >
                    {value ? '✓' : '✕'} {key}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  )
}
