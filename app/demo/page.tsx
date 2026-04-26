export default function DemoPage() {
  const steps = [
    {
      step: "1",
      title: "Practice Leadership Decisions",
      text: "Leaders respond to realistic school leadership scenarios and receive targeted feedback.",
      href: "/"
    },
    {
      step: "2",
      title: "Measure Readiness",
      text: "LeadSharper turns responses into readiness indicators, risk patterns, and growth signals.",
      href: "/readiness"
    },
    {
      step: "3",
      title: "View District Intelligence",
      text: "District teams see pipeline strength, coaching needs, and high-risk leadership patterns.",
      href: "/district"
    },
    {
      step: "4",
      title: "Generate Executive Reports",
      text: "Superintendents and boards get clear summaries of readiness, risk, and next steps.",
      href: "/reports"
    }
  ]

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-7xl space-y-8">

        <section className="rounded-3xl bg-slate-900 p-10 text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-300">
            LeadSharper Guided Demo
          </p>

          <h1 className="mt-4 text-5xl font-semibold tracking-tight">
            See how leadership readiness becomes measurable.
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            Walk through the full LeadSharper experience: practice, readiness scoring,
            district intelligence, and executive reporting.
          </p>
        </section>

        <section className="grid gap-5 md:grid-cols-2">
          {steps.map((item) => (
            <a
              key={item.step}
              href={item.href}
              className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-lg font-bold text-white">
                {item.step}
              </div>

              <h2 className="mt-5 text-2xl font-semibold text-slate-900">
                {item.title}
              </h2>

              <p className="mt-3 text-slate-600">
                {item.text}
              </p>

              <div className="mt-5 text-sm font-semibold text-blue-700">
                View this step →
              </div>
            </a>
          ))}
        </section>

        <section className="rounded-3xl bg-white p-8 shadow-sm">
          <h2 className="text-3xl font-semibold text-slate-900">
            Best for district leaders, principal supervisors, and leadership prep programs.
          </h2>

          <p className="mt-4 max-w-3xl text-slate-600">
            This guided demo is designed to show how LeadSharper can support principal pipelines,
            reduce leadership risk, and create better visibility before promotion or hiring decisions.
          </p>

          <a
            href="/pilot"
            className="mt-6 inline-block rounded-2xl bg-blue-600 px-6 py-4 text-sm font-semibold text-white"
          >
            Apply for pilot access
          </a>
        </section>

      </div>
    </main>
  )
}
