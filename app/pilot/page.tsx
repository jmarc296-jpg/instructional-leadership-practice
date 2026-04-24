export default function PilotPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">
            Leadership Flight Simulator
          </p>

          <h1 className="mt-6 text-5xl font-bold tracking-tight text-slate-950 leading-tight">
            Simulation-based leadership development for principals before the real pressure hits.
          </h1>

          <p className="mt-6 text-xl text-slate-600 leading-relaxed">
            Most school leaders are evaluated on moments they rarely get to practice:
            difficult feedback conversations, instructional leadership decisions,
            staff resistance, parent conflict, culture breakdowns, and board-level pressure.
            LeadSharper gives leaders realistic reps before those moments happen in real schools.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="/"
              className="rounded-2xl bg-slate-950 px-6 py-3 text-white font-semibold"
            >
              Try Live Demo
            </a>

            <a
              href="mailto:jmarc296@gmail.com?subject=LeadSharper Pilot Inquiry"
              className="rounded-2xl border border-slate-300 px-6 py-3 font-semibold"
            >
              Request Pilot Conversation
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <h3 className="text-xl font-bold">Aspiring Principals</h3>
            <p className="mt-4 text-slate-600">
              Practice interviews, leadership judgment, and real-world scenarios before stepping into the role.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <h3 className="text-xl font-bold">District Leadership Pipelines</h3>
            <p className="mt-4 text-slate-600">
              Build stronger principal benches through simulation-based leadership reps.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <h3 className="text-xl font-bold">University Prep Programs</h3>
            <p className="mt-4 text-slate-600">
              Replace theoretical discussion with applied leadership decision-making practice.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="rounded-3xl bg-slate-950 p-12 text-white">
          <h2 className="text-3xl font-bold">
            What districts get in a pilot
          </h2>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div>Custom leadership simulations</div>
            <div>Principal growth analytics</div>
            <div>Scenario performance tracking</div>
            <div>Leadership competency development</div>
            <div>Interview prep simulations</div>
            <div>Implementation coaching use cases</div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-20 text-center">
        <h2 className="text-4xl font-bold">
          The cost of unprepared leadership is too high.
        </h2>

        <p className="mt-6 text-xl text-slate-600">
          Leaders should not practice high-stakes decisions for the first time on teachers, students, and families.
        </p>

        <div className="mt-10">
          <a
            href="mailto:jmarc296@gmail.com?subject=LeadSharper District Pilot"
            className="rounded-2xl bg-blue-600 px-8 py-4 text-white font-semibold"
          >
            Start a Pilot Conversation
          </a>
        </div>
      </section>
    </main>
  )
}
