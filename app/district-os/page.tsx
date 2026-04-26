export default function DistrictOSPage() {
  const roles = [
    {
      role: "Aspiring Principal",
      action: "Completes leadership simulations"
    },
    {
      role: "Principal Supervisor",
      action: "Reviews coaching needs"
    },
    {
      role: "Talent Office",
      action: "Tracks promotion readiness"
    },
    {
      role: "Superintendent",
      action: "Monitors district risk"
    },
    {
      role: "Board",
      action: "Receives strategic updates"
    }
  ]

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-7xl space-y-8">

        <section className="rounded-3xl bg-slate-900 p-10 text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-300">
            District Operating System
          </p>

          <h1 className="mt-4 text-5xl font-semibold tracking-tight">
            One platform. Every leadership decision.
          </h1>

          <p className="mt-5 max-w-4xl text-lg leading-8 text-slate-300">
            LeadSharper becomes exponentially more valuable when every leadership stakeholder operates inside the same intelligence system.
          </p>
        </section>

        <section className="space-y-4">
          {roles.map((item, index) => (
            <div
              key={item.role}
              className="rounded-3xl bg-white p-8 shadow-sm"
            >
              <div className="text-sm font-semibold text-blue-700">
                Layer {index + 1}
              </div>

              <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                {item.role}
              </h2>

              <p className="mt-3 text-slate-700 leading-7">
                {item.action}
              </p>
            </div>
          ))}
        </section>

        <section className="rounded-3xl bg-blue-50 p-8">
          <h2 className="text-3xl font-semibold text-slate-900">
            Why this becomes hard to replace
          </h2>

          <p className="mt-4 max-w-4xl leading-8 text-slate-700">
            Once a district’s leadership pipeline, succession planning, coaching workflows, and executive reporting all run through one system, replacement becomes extremely difficult.
          </p>
        </section>

      </div>
    </main>
  )
}
