export function PilotCta() {
  return (
    <section className="premium-panel rounded-[32px] border border-slate-200 bg-slate-950 px-8 py-8 text-white shadow-sm">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-300">
            District Pilot Ready
          </div>

          <h3 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">
            Bring simulation-based leadership practice to your principals.
          </h3>

          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-300">
            LeadSharper is built for leadership pipelines, principal coaching,
            instructional leadership development, and district-level implementation.
          </p>
        </div>

        <a
          href="/#waitlist"
          className="premium-button inline-flex justify-center rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-100"
        >
          Request Pilot Conversation
        </a>
      </div>
    </section>
  )
}
