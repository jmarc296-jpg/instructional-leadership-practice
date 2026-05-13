export default function GovernancePage() {
  return (
    <main className="min-h-screen bg-black px-6 py-16 text-white">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs uppercase tracking-[0.3em] text-orange-300">
          Governance Architecture
        </p>

        <h1 className="mt-4 text-5xl font-semibold tracking-tight">
          Executive accountability lifecycle
        </h1>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {[
            "Signal detection",
            "Ownership assignment",
            "Evidence verification",
            "Escalation pressure",
            "Cabinet review",
            "Executive closure",
          ].map((item) => (
            <div
              key={item}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-6"
            >
              <h2 className="text-xl font-semibold">{item}</h2>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
