export function LimitedPilotBanner() {
  return (
    <section className="rounded-[32px] border border-blue-200 bg-blue-50 p-8">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-700">
        2026 Pilot Cohort
      </p>

      <h2 className="mt-3 text-3xl font-semibold text-slate-900">
        We’re selecting a small number of district and university partners.
      </h2>

      <p className="mt-4 max-w-3xl text-slate-600">
        We’re currently opening a limited number of pilot partnerships for districts,
        charter networks, and leadership preparation programs looking to modernize principal readiness.
      </p>

      <div className="mt-6 flex flex-wrap gap-4">
        <a
          href="/pilot"
          className="rounded-2xl bg-blue-600 px-6 py-4 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Apply for pilot
        </a>

        <a
          href="/pilot"
          className="rounded-2xl bg-white px-6 py-4 text-sm font-semibold text-slate-900 border"
        >
          Explore enterprise platform
        </a>
      </div>

      <p className="mt-5 text-sm text-slate-500">
        Limited pilot availability • onboarding support included
      </p>
    </section>
  )
}
