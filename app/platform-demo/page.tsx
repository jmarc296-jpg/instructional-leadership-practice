const demos = [
  {
    title: "Leadership Simulation",
    description: "See how school leaders respond to high-stakes leadership scenarios.",
    route: "/instant-demo",
    cta: "Try Simulation"
  },
  {
    title: "District Dashboard",
    description: "Track readiness trends, risks, and leadership pipeline health.",
    route: "/district",
    cta: "View Dashboard"
  },
  {
    title: "Development Engine",
    description: "Assign targeted development based on leadership gaps.",
    route: "/assignments",
    cta: "View Assignments"
  },
  {
    title: "Impact Reporting",
    description: "Measure leadership growth after intervention.",
    route: "/impact-dashboard",
    cta: "View Impact"
  }
]

export default function PlatformDemoPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 lg:px-10">
      <div className="mx-auto max-w-6xl space-y-10">

        <a
          href="/"
          className="inline-block rounded-2xl border border-slate-300 px-5 py-3 font-medium hover:bg-white"
        >
          Back to Homepage
        </a>

        {/* HERO */}
        <section className="rounded-[32px] bg-white border border-slate-200 px-8 py-10">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">
            Platform Walkthrough
          </p>

          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-slate-900 max-w-4xl leading-tight">
            See how LeadSharper helps districts assess, develop, and retain stronger school leaders.
          </h1>

          <p className="mt-5 text-lg text-slate-600 max-w-2xl leading-8">
            Follow the full workflow from leadership assessment to development planning and measurable readiness growth.
          </p>
        </section>

        {/* DEMO FLOW */}
        <section className="grid md:grid-cols-2 gap-6">
          {demos.map((demo) => (
            <a
              key={demo.title}
              href={demo.route}
              className="rounded-3xl bg-white border border-slate-200 p-8 hover:border-slate-300 transition"
            >
              <h2 className="text-3xl font-semibold text-slate-900">
                {demo.title}
              </h2>

              <p className="mt-4 text-slate-600 leading-8">
                {demo.description}
              </p>

              <div className="mt-6 text-blue-600 font-semibold">
                {demo.cta} >
              </div>
            </a>
          ))}
        </section>

        {/* PLATFORM VALUE */}
        <section className="rounded-[32px] bg-slate-900 text-white px-8 py-10">
          <h2 className="text-4xl font-semibold tracking-tight">
            Why districts care
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <ValueCard
              title="Reduce Failed Hires"
              text="Identify weak leadership judgment before promotions happen."
            />

            <ValueCard
              title="Accelerate Development"
              text="Assign targeted coaching faster."
            />

            <ValueCard
              title="Strengthen Succession"
              text="Build stronger internal leadership pipelines."
            />
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="rounded-[32px] bg-blue-50 px-8 py-10">
          <h2 className="text-4xl font-semibold text-slate-900">
            Ready to explore a pilot?
          </h2>

          <p className="mt-4 text-lg text-slate-600 max-w-2xl leading-8">
            Start with a small cohort and evaluate how LeadSharper fits your leadership pipeline.
          </p>

          <a
            href="/pilot"
            className="inline-block mt-6 rounded-2xl bg-blue-600 px-6 py-4 text-white font-semibold hover:bg-blue-700"
          >
            Apply for Pilot
          </a>
        </section>
      </div>
    </main>
  )
}

function ValueCard({
  title,
  text
}: {
  title: string
  text: string
}) {
  return (
    <div className="rounded-3xl bg-slate-800 p-6">
      <h3 className="text-2xl font-semibold text-white">
        {title}
      </h3>

      <p className="mt-3 text-slate-300 leading-7">
        {text}
      </p>
    </div>
  )
}
