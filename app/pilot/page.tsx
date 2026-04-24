const pilotFeatures = [
  'Custom leadership simulations',
  'Principal growth analytics',
  'Scenario performance tracking',
  'Leadership competency development',
  'Interview prep simulations',
  'Implementation coaching use cases'
]

export default function PilotPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="premium-panel rounded-[36px] border border-slate-200 bg-white px-8 py-12 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">
            Leadership Flight Simulator
          </p>

          <h1 className="mt-6 max-w-5xl text-5xl font-semibold tracking-[-0.05em] text-slate-950 leading-tight">
            Simulation-based leadership development for principals before the real pressure hits.
          </h1>

          <p className="mt-6 max-w-4xl text-xl text-slate-600 leading-relaxed">
            Most school leaders are evaluated on moments they rarely get to practice:
            difficult feedback conversations, instructional leadership decisions,
            staff resistance, parent conflict, culture breakdowns, and board-level pressure.
            LeadSharper gives leaders realistic reps before those moments happen in real schools.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="/"
              className="premium-button rounded-2xl bg-slate-950 px-6 py-3 text-white font-semibold"
            >
              Try Live Demo
            </a>

            <a
              href="/#waitlist"
              className="premium-button rounded-2xl border border-slate-300 px-6 py-3 font-semibold text-slate-800"
            >
              Request Pilot Conversation
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            ['Aspiring Principals', 'Practice interviews, leadership judgment, and real-world scenarios before stepping into the role.'],
            ['District Leadership Pipelines', 'Build stronger principal benches through simulation-based leadership reps.'],
            ['University Prep Programs', 'Replace theoretical discussion with applied leadership decision-making practice.']
          ].map(([title, text]) => (
            <div key={title} className="premium-panel rounded-3xl bg-white p-8 shadow-sm border border-slate-200">
              <h3 className="text-xl font-semibold text-slate-950">{title}</h3>
              <p className="mt-4 text-slate-600 leading-7">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="premium-panel rounded-3xl bg-slate-950 p-10 text-white shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-300">
            Pilot Package
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">
            What districts get in a pilot
          </h2>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {pilotFeatures.map((feature) => (
              <div key={feature} className="rounded-2xl bg-white/10 px-5 py-4 text-sm font-medium">
                {feature}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-20 text-center">
        <div className="premium-panel rounded-[32px] border border-slate-200 bg-white px-8 py-10 shadow-sm">
          <h2 className="text-4xl font-semibold tracking-[-0.05em] text-slate-950">
            The cost of unprepared leadership is too high.
          </h2>

          <p className="mt-6 text-xl text-slate-600 leading-8">
            Leaders should not practice high-stakes decisions for the first time on teachers, students, and families.
          </p>

          <div className="mt-10">
            <a
              href="/#waitlist"
              className="premium-button rounded-2xl bg-blue-600 px-8 py-4 text-white font-semibold"
            >
              Start a Pilot Conversation
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
