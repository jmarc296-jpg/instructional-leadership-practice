export default function DesignPartnerPage() {
  const fit = [
    "Districts building principal pipelines",
    "Charter networks developing future school leaders",
    "University principal preparation programs",
    "Leadership nonprofits supporting aspiring principals"
  ]

  const benefits = [
    "Early platform access",
    "Influence on product direction",
    "Custom scenario development",
    "Readiness dashboard review",
    "Pilot implementation support"
  ]

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="rounded-3xl bg-slate-900 p-10 text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-300">
            Design Partner Program
          </p>

          <h1 className="mt-4 text-5xl font-semibold tracking-tight">
            Help shape the future of principal readiness.
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            We are selecting a small number of early partners to pilot LeadSharper, pressure-test readiness intelligence, and help define what leadership development should become.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <Panel title="Best fit">
            {fit.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </Panel>

          <Panel title="What partners receive">
            {benefits.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </Panel>
        </section>

        <section className="rounded-3xl bg-white p-8 shadow-sm">
          <h2 className="text-3xl font-semibold text-slate-900">
            Why the cohort is limited
          </h2>

          <p className="mt-4 max-w-3xl leading-8 text-slate-700">
            Early implementation requires close collaboration. We are intentionally limiting the first cohort so each partner receives meaningful support, product influence, and a clear implementation path.
          </p>

          <a href="/pilot" className="mt-6 inline-block rounded-2xl bg-blue-600 px-6 py-4 text-sm font-semibold text-white">
            Apply as a design partner
          </a>
        </section>
      </div>
    </main>
  )
}

function Panel({
  title,
  children
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="rounded-3xl bg-white p-8 shadow-sm">
      <h2 className="text-3xl font-semibold text-slate-900">{title}</h2>
      <ul className="mt-5 list-disc space-y-3 pl-6 text-slate-700">
        {children}
      </ul>
    </section>
  )
}
