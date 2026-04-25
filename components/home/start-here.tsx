export function StartHere() {
  const paths = [
    {
      title: "I am a school leader",
      text: "Practice real leadership scenarios and get targeted AI feedback.",
      href: "#practice-workspace",
      cta: "Start practicing"
    },
    {
      title: "I lead district talent or coaching",
      text: "View pipeline readiness, risk patterns, and coaching priorities.",
      href: "/district",
      cta: "View district demo"
    },
    {
      title: "I am evaluating LeadSharper",
      text: "Explore the full enterprise platform for pilots, reporting, security, and implementation.",
      href: "/enterprise",
      cta: "Explore enterprise"
    }
  ]

  return (
    <section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">
        Start here
      </p>

      <h2 className="mt-3 text-3xl font-semibold text-slate-950">
        Choose the path that fits your role.
      </h2>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {paths.map((path) => (
          <a
            key={path.title}
            href={path.href}
            className="rounded-3xl border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-1 hover:bg-white hover:shadow-md"
          >
            <h3 className="text-xl font-semibold text-slate-950">
              {path.title}
            </h3>

            <p className="mt-3 text-slate-600">
              {path.text}
            </p>

            <div className="mt-5 text-sm font-semibold text-blue-700">
              {path.cta} →
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
