export default function ImplementationPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-16 text-white">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs uppercase tracking-[0.3em] text-emerald-300">
          District Implementation
        </p>

        <h1 className="mt-4 text-5xl font-semibold tracking-tight">
          Executive operating system deployment
        </h1>

        <div className="mt-12 space-y-6">
          {[
            "Leadership calibration and accountability alignment",
            "Walkthrough and DDI evidence integration",
            "Signal escalation configuration",
            "Cabinet review workflow establishment",
            "Executive intervention routing",
            "Board-ready reporting cadence",
          ].map((step, index) => (
            <div
              key={step}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-6"
            >
              <p className="text-sm uppercase tracking-[0.25em] text-zinc-500">
                Phase 0{index + 1}
              </p>

              <h2 className="mt-3 text-2xl font-semibold">
                {step}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
