type Props = {
  totalCompleted: number
  strongestDomain: string
}

export function SimulatorPanel({
  totalCompleted,
  strongestDomain
}: Props) {
  const displayedDomain = strongestDomain === '-' ? 'Pending' : strongestDomain

  return (
    <div className="premium-panel fade-in-up relative overflow-hidden rounded-[32px] bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 p-7 text-white shadow-xl">
      <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/20 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-cyan-300/20 blur-3xl" />

      <div className="relative z-10">
        <div className="flex items-center justify-between gap-4">
          <div className="rounded-full bg-white/15 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] backdrop-blur">
            Leadership Simulator
          </div>

          <div className="rounded-full bg-emerald-400 px-4 py-2 text-[11px] font-semibold text-slate-950">
            Live Product
          </div>
        </div>

        <div className="mt-10">
          <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-blue-100">
            Leadership Readiness Engine
          </div>

          <h3 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.04em]">
            Measure principal readiness before the job is on the line.
          </h3>

          <p className="mt-5 text-base leading-8 text-white/85">
            AI-powered leadership simulations that identify blind spots, surface risk patterns, and build stronger principal pipelines.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
            <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/70">
              Readiness Reps
            </div>
            <div className="mt-2 text-3xl font-semibold">{totalCompleted}</div>
          </div>

          <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
            <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/70">
              Strongest Domain
            </div>
            <div className="mt-2 text-2xl font-semibold capitalize">
              {displayedDomain}
            </div>
          </div>

          <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
            <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/70">
              Timed Mode
            </div>
            <div className="mt-2 text-2xl font-semibold">Live</div>
          </div>

          <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
            <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/70">
              Behavioral Intelligence
            </div>
            <div className="mt-2 text-2xl font-semibold">Enabled</div>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
            Simulation Loop
          </div>

          <div className="mt-3 flex flex-wrap gap-2 text-sm">
            <span className="rounded-full bg-white/15 px-3 py-1">Scenario</span>
            <span className="rounded-full bg-white/15 px-3 py-1">Timed Response</span>
            <span className="rounded-full bg-white/15 px-3 py-1">AI Coach</span>
            <span className="rounded-full bg-white/15 px-3 py-1">Likely Reaction</span>
          </div>
        </div>
      </div>
    </div>
  )
}


