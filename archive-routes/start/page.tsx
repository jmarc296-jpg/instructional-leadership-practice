export default function StartPage() {
  const paths = [
    { title: "I want to understand the platform", href: "/demo", text: "Walk through practice, readiness, district intelligence, and reporting." },
    { title: "I need to justify the investment", href: "/roi", text: "Estimate the cost of weak principal pipelines and avoided turnover risk." },
    { title: "I need to share internally", href: "/data-room", text: "Access the one-pager, procurement packet, board report, pricing, and security center." },
    { title: "I am ready to explore a pilot", href: "/pilot", text: "Submit pilot interest for a district, university, or leadership program." }
  ]

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="rounded-3xl bg-slate-900 p-10 text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-300">
            Start Here
          </p>

          <h1 className="mt-4 text-5xl font-semibold tracking-tight">
            Choose the fastest path to evaluate LeadSharper.
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            Whether you are exploring the platform, building a case for investment, or preparing for a pilot, this hub will point you to the right next step.
          </p>
        </section>

        <section className="grid gap-5 md:grid-cols-2">
          {paths.map((path) => (
            <a
              key={path.title}
              href={path.href}
              className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <h2 className="text-2xl font-semibold text-slate-900">{path.title}</h2>
              <p className="mt-3 leading-7 text-slate-600">{path.text}</p>
              <div className="mt-5 text-sm font-semibold text-blue-700">Continue →</div>
            </a>
          ))}
        </section>
      </div>
    </main>
  )
}
