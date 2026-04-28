export default function InstantDemoPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 lg:px-10">
      <div className="mx-auto max-w-5xl space-y-10">

        <a
          href="/"
          className="inline-block rounded-2xl border border-slate-300 px-5 py-3 font-medium hover:bg-white"
        >
          Back to Homepage
        </a>

        {/* HERO */}
        <section className="rounded-[32px] bg-white border border-slate-200 px-8 py-10">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">
            Leadership Simulation
          </p>

          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-slate-900 leading-tight">
            Practice a real leadership decision.
          </h1>

          <p className="mt-5 text-lg text-slate-600 max-w-2xl leading-8">
            Respond to a high-stakes school leadership scenario and see how LeadSharper evaluates your readiness.
          </p>
        </section>

        {/* SCENARIO */}
        <section className="rounded-[32px] bg-white border border-slate-200 p-8">
          <h2 className="text-3xl font-semibold text-slate-900">
            Scenario
          </h2>

          <p className="mt-5 text-lg text-slate-600 leading-8">
            A veteran teacher has strong relationships with students but consistently delivers weak instruction. Student achievement is declining, and your instructional coach says this issue has been avoided for months.
          </p>

          <div className="mt-6 rounded-2xl bg-slate-50 p-6">
            <p className="text-lg font-medium text-slate-900">
              What is your leadership response?
            </p>
          </div>

          <textarea
            placeholder="Write your response..."
            className="mt-6 w-full min-h-[220px] rounded-2xl border border-slate-300 p-5"
          />

          <button
            className="mt-6 rounded-2xl bg-blue-600 px-6 py-4 text-white font-semibold hover:bg-blue-700"
          >
            Evaluate My Response
          </button>
        </section>

        {/* WHY IT MATTERS */}
        <section className="rounded-[32px] bg-slate-900 text-white px-8 py-10">
          <h2 className="text-3xl font-semibold">
            What buyers see here
          </h2>

          <p className="mt-5 text-lg text-slate-300 leading-8 max-w-2xl">
            Districts use this experience to evaluate leadership judgment before promotions, placements, and coaching decisions.
          </p>
        </section>
      </div>
    </main>
  )
}
