export default function SecurityPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-16 text-white">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">
          Enterprise Trust Layer
        </p>

        <h1 className="mt-4 text-5xl font-semibold tracking-tight">
          Security and governance posture
        </h1>

        <p className="mt-6 max-w-4xl text-lg leading-8 text-zinc-300">
          LeadSharper operates as executive accountability infrastructure for district leadership systems.
          Leadership actions, escalation history, evidence verification, and executive intervention
          timelines are persistently traceable through immutable audit architecture.
        </p>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {[
            {
              title: "Immutable audit persistence",
              body: "Executive actions, escalations, and intervention timelines are persistently recorded.",
            },
            {
              title: "Role-scoped visibility",
              body: "Future RBAC architecture supports superintendent, cabinet, network, and school-scoped governance.",
            },
            {
              title: "District operational isolation",
              body: "District leadership records are architected for tenant-aware operational separation.",
            },
            {
              title: "Evidence lineage",
              body: "Signals, ownership actions, and evidence remain historically attributable across intervention cycles.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-6"
            >
              <h2 className="text-xl font-semibold">{item.title}</h2>
              <p className="mt-4 text-sm leading-7 text-zinc-400">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
