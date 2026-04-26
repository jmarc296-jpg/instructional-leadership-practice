export default function DesignPartnerPage() {
  const benefits = [
    'Early platform access',
    'Customized simulations',
    'District readiness reporting',
    'Direct product influence',
    'Founding partner pricing'
  ]

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-6xl space-y-8">

        <section className="rounded-3xl bg-slate-900 p-10 text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-300">
            Founding Design Partner Program
          </p>

          <h1 className="mt-4 text-5xl font-semibold tracking-tight">
            Help shape the future of leadership readiness.
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            We’re selecting a small number of district partners to help define how leadership readiness is measured nationwide.
          </p>
        </section>

        <section className="rounded-3xl bg-white p-8 shadow-sm">
          <h2 className="text-3xl font-semibold text-slate-900">
            What partners receive
          </h2>

          <div className="mt-6 space-y-4">
            {benefits.map((benefit) => (
              <div key={benefit} className="rounded-2xl bg-slate-50 p-5">
                {benefit}
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl bg-blue-50 p-8">
          <h2 className="text-3xl font-semibold text-slate-900">
            Limited availability
          </h2>

          <p className="mt-4 text-slate-700 leading-8">
            We’re only onboarding 2–3 founding partners before expanding broader access.
          </p>

          <a
            href="/pilot"
            className="mt-6 inline-block rounded-2xl bg-blue-600 px-6 py-4 text-sm font-semibold text-white"
          >
            Apply for founding access
          </a>
        </section>

      </div>
    </main>
  )
}
