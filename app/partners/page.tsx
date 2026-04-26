export default function PartnersPage() {
  const groups = [
    {
      title: "Ideal District Partners",
      logos: [
        "Urban School Districts",
        "Mid-Sized Districts",
        "Charter Networks",
        "State Leadership Academies"
      ]
    },
    {
      title: "University Leadership Programs",
      logos: [
        "Principal Prep Programs",
        "Leadership Fellowships",
        "Residency Models",
        "Aspiring Leader Cohorts"
      ]
    },
    {
      title: "Potential Strategic Partners",
      logos: [
        "State Departments",
        "Foundations",
        "Talent Organizations",
        "Leadership Nonprofits"
      ]
    }
  ]

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-6xl space-y-8">

        <section className="rounded-3xl bg-slate-900 p-10 text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-300">
            Design Partners
          </p>

          <h1 className="mt-4 text-5xl font-semibold tracking-tight">
            Built for systems serious about leadership quality.
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            LeadSharper is designed for organizations responsible for identifying, developing, and placing school leaders.
          </p>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          {groups.map((group) => (
            <div key={group.title} className="rounded-3xl bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900">
                {group.title}
              </h2>

              <div className="mt-6 space-y-3">
                {group.logos.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center font-medium text-slate-700"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section className="rounded-3xl bg-blue-50 p-8">
          <h2 className="text-3xl font-semibold text-slate-900">
            Become a founding design partner
          </h2>

          <p className="mt-4 max-w-3xl leading-7 text-slate-700">
            We’re selectively partnering with organizations that want early access, influence product direction, and help shape the future of leadership readiness.
          </p>

          <a
            href="/pilot"
            className="mt-6 inline-block rounded-2xl bg-blue-600 px-6 py-4 text-sm font-semibold text-white"
          >
            Apply for partnership
          </a>
        </section>

      </div>
    </main>
  )
}
