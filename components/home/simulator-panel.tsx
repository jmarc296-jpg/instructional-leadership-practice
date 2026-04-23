type Props = {
  totalCompleted: number
  strongestDomain: string
}

export function SimulatorPanel({
  totalCompleted,
  strongestDomain
}: Props) {
  return (
    <div className="rounded-[32px] bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-600 p-7 text-white shadow-xl">
      <div className="rounded-full bg-white/15 px-4 py-2 inline-block text-[11px] font-semibold uppercase tracking-[0.16em]">
        Leadership Simulator
      </div>

      <h3 className="mt-8 text-4xl font-semibold leading-tight">
        Rehearse high-stakes leadership moments before they happen.
      </h3>

      <p className="mt-5 text-white/80 leading-8">
        Practice coaching conversations, DDI meetings,
        instructional judgment calls, and accountability moves.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-4">
        <div className="rounded-2xl bg-white/10 p-4">
          <div className="text-xs uppercase text-white/70">
            Scenario Reps
          </div>
          <div className="text-2xl font-bold">{totalCompleted}</div>
        </div>

        <div className="rounded-2xl bg-white/10 p-4">
          <div className="text-xs uppercase text-white/70">
            Strongest Domain
          </div>
          <div className="text-xl font-bold">
            {strongestDomain === '-' ? 'Pending' : strongestDomain}
          </div>
        </div>
      </div>
    </div>
  )
}