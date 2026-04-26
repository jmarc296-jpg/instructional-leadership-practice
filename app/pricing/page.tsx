export default function PricingPage() {
  const plans = [
    {
      name: "Pilot",
      price: "$15K–$25K",
      audience: "Districts, charter networks, universities",
      features: [
        "30-day leadership readiness pilot",
        "20–50 leader cohort",
        "Simulation-based readiness data",
        "District dashboard",
        "Executive summary report",
        "Implementation support"
      ]
    },
    {
      name: "District",
      price: "$50K–$150K",
      audience: "Multi-school district leadership pipelines",
      features: [
        "Annual district license",
        "Unlimited leadership reps",
        "Cohort readiness dashboards",
        "Risk radar and reporting",
        "Talent pipeline intelligence",
        "Custom district scenarios"
      ]
    },
    {
      name: "Enterprise",
      price: "Custom",
      audience: "Large districts, states, universities, networks",
      features: [
        "Multi-cohort implementation",
        "Benchmarking engine",
        "Certification pathways",
        "Procurement and board reporting",
        "Security and data ownership support",
        "Strategic implementation partnership"
      ]
    }
  ]

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="rounded-3xl bg-slate-900 p-10 text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-300">
            Pricing Architecture
          </p>

          <h1 className="mt-4 text-5xl font-semibold tracking-tight">
            Built for pilots, district rollouts, and enterprise partnerships.
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            LeadSharper is priced around leadership pipeline impact, not individual seat usage.
          </p>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <div key={plan.name} className="rounded-3xl bg-white p-8 shadow-sm border">
              <h2 className="text-3xl font-semibold text-slate-900">{plan.name}</h2>
              <div className="mt-4 text-4xl font-bold text-blue-700">{plan.price}</div>
              <p className="mt-3 text-slate-600">{plan.audience}</p>

              <ul className="mt-6 space-y-3 text-slate-700">
                {plan.features.map((feature) => (
                  <li key={feature}>✓ {feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="rounded-3xl bg-blue-50 p-8">
          <h2 className="text-3xl font-semibold text-slate-900">
            Recommended starting point
          </h2>

          <p className="mt-4 max-w-3xl leading-7 text-slate-700">
            Most partners should begin with a 30-day pilot cohort to establish baseline readiness data, validate use case fit, and identify district-specific leadership development priorities.
          </p>

          <a href="/pilot" className="mt-6 inline-block rounded-2xl bg-blue-600 px-6 py-4 text-sm font-semibold text-white">
            Apply for pilot
          </a>
        </section>
      </div>
    </main>
  )
}
