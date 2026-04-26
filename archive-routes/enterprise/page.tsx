export default function EnterprisePage() {
  const layers = [
    { name: "Practice", route: "/"},
    { name: "District Intelligence", route: "/district"},
    { name: "Risk Radar", route: "/district/risk"},
    { name: "Readiness Index", route: "/readiness"},
    { name: "Talent Pipeline", route: "/talent"},
    { name: "Hiring OS", route: "/hiring"},
    { name: "Certification", route: "/certification"},
    { name: "Benchmarking", route: "/benchmark"},
    { name: "Reports", route: "/reports"},
    { name: "Security", route: "/security"}
  ]

  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="rounded-3xl bg-slate-900 p-10 text-white">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-200">
            Enterprise Leadership Infrastructure
          </p>
          <h1 className="mt-4 text-5xl font-bold">
            One operating system for principal readiness, hiring, development, and succession.
          </h1>
          <p className="mt-5 max-w-3xl text-lg text-slate-300">
            LeadSharper helps districts and universities measure leadership behavior, identify pipeline risk, support principal development, and make stronger promotion decisions before the role is on the line.
          </p>
        </section>

        <section className="grid gap-5 md:grid-cols-3">
          {layers.map((layer) => (
            <a
              key={layer.name}
              href={layer.route}
              className="rounded-3xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="text-xl font-bold text-slate-900">
                {layer.name}
              </div>
              <div className="mt-2 text-sm text-blue-600">
                View {layer.route}
              </div>
            </a>
          ))}
        </section>
      </div>
    </main>
  )
}
