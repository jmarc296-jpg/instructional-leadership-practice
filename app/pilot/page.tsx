export default function PilotPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-8">
      <div className="mx-auto max-w-6xl space-y-8">

        <section className="rounded-3xl bg-slate-900 p-10 text-white">
          <div className="text-sm uppercase tracking-[0.2em] text-blue-200">
            District Pilot Program
          </div>

          <h1 className="mt-4 text-5xl font-semibold tracking-tight">
            Build stronger principal pipelines before leadership vacancies happen.
          </h1>

          <p className="mt-5 max-w-3xl text-lg text-slate-300">
            LeadSharper helps districts identify future principals, reduce failed placements,
            and accelerate leadership readiness through simulation-based behavioral intelligence.
          </p>
        </section>

        <section className="grid gap-5 md:grid-cols-3">
          <Card
            title="Reduce Failed Principal Hires"
            text="Measure leadership decision-making before promotions happen."
          />

          <Card
            title="Build Stronger Internal Pipelines"
            text="Develop assistant principals before vacancies emerge."
          />

          <Card
            title="Give Superintendents Visibility"
            text="Track readiness, risks, and coaching priorities across leadership pipelines."
          />
        </section>

        <section className="rounded-3xl bg-white p-8 shadow-sm">
          <h2 className="text-3xl font-semibold">
            30-Day Pilot Timeline
          </h2>

          <div className="mt-6 space-y-4 text-slate-700">
            <p><strong>Week 1:</strong> Launch leadership cohort</p>
            <p><strong>Week 2:</strong> Leaders complete simulations</p>
            <p><strong>Week 3:</strong> District receives readiness dashboard</p>
            <p><strong>Week 4:</strong> Superintendent reporting + coaching recommendations</p>
          </div>
        </section>

        <section className="rounded-3xl bg-white p-8 shadow-sm">
          <h2 className="text-3xl font-semibold">
            Pilot Pricing
          </h2>

          <div className="mt-6 space-y-3 text-slate-700">
            <p><strong>Pilot:</strong> $15K–$25K</p>
            <p><strong>District Rollout:</strong> Custom Pricing</p>
            <p><strong>University Partnerships:</strong> Custom Pricing</p>
          </div>
        </section>

      </div>
    </main>
  )
}

function Card({
  title,
  text
}: {
  title: string
  text: string
}) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-3 text-slate-600">{text}</p>
    </div>
  )
}
