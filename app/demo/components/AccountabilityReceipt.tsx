import { districtScenario } from '../config/districtScenario'

export default function AccountabilityReceipt() {
  const highRisk = districtScenario.filter((row) => row.escalation === 'HIGH')
  const unassigned = districtScenario.filter((row) => !row.owner)

  return (
    <section className="rounded-2xl border bg-gray-950 p-6 text-white shadow-sm">
      <div className="text-xs font-semibold uppercase tracking-wide text-red-300">
        Executive Receipt
      </div>

      <h2 className="mt-2 max-w-3xl text-2xl font-bold">
        The district now has a record of what is at risk, who owns it, and what remains uncontained.
      </h2>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="text-xs uppercase tracking-wide text-gray-400">High escalations</div>
          <div className="mt-1 text-3xl font-bold">{highRisk.length}</div>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="text-xs uppercase tracking-wide text-gray-400">Unassigned risks</div>
          <div className="mt-1 text-3xl font-bold">{unassigned.length}</div>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="text-xs uppercase tracking-wide text-gray-400">Containment status</div>
          <div className="mt-2 text-sm font-semibold text-red-300">UNCONTAINED</div>
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-red-400/30 bg-red-500/10 p-4 text-sm text-red-100">
        If this record is not acted on, leadership risk remains known, documented, and unresolved.
      </div>
    </section>
  )
}
