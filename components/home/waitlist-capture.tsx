export function WaitlistCapture() {
  return (
    <section className="premium-panel rounded-[32px] border border-slate-200 bg-white px-8 py-8 shadow-sm">
      <div className="mx-auto max-w-4xl text-center">
        <div className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-600">
          Early Access
        </div>

        <h3 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
          Join the first cohort of school leaders using LeadSharper
        </h3>

        <p className="mt-4 text-slate-600 leading-8">
          We’re opening pilot partnerships with districts, principal preparation programs,
          leadership coaches, and charter networks.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="rounded-2xl border border-slate-300 px-5 py-3 text-sm w-full sm:w-[320px]"
          />

          <button className="rounded-2xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition">
            Join Waitlist
          </button>
        </div>

        <p className="mt-4 text-xs text-slate-500">
          Pilot spots are limited during beta rollout.
        </p>
      </div>
    </section>
  )
}
