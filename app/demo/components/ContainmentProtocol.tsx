import { districtScenario } from '../config/districtScenario'

export default function ContainmentProtocol() {
  const highEscalations = districtScenario.filter((row) => row.escalation === 'HIGH')
  const unassigned = districtScenario.filter((row) => !row.owner)

  return (
    <section className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">
        Containment Protocol
      </div>

      <h2 className="mt-2 max-w-3xl text-2xl font-bold text-gray-950">
        The next move is not discussion. It is containment.
      </h2>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-red-200 bg-red-50 p-4">
          <div className="text-xs font-semibold uppercase tracking-wide text-red-700">
            01 Identify
          </div>
          <div className="mt-2 text-sm font-semibold text-gray-950">
            {highEscalations.length} high-risk signals surfaced.
          </div>
          <div className="mt-1 text-xs text-gray-700">
            Risk is now visible and cannot be treated as informal.
          </div>
        </div>

        <div className="rounded-xl border border-orange-200 bg-orange-50 p-4">
          <div className="text-xs font-semibold uppercase tracking-wide text-orange-700">
            02 Assign
          </div>
          <div className="mt-2 text-sm font-semibold text-gray-950">
            {unassigned.length} ownership gaps remain.
          </div>
          <div className="mt-1 text-xs text-gray-700">
            Every unassigned risk stays with executive leadership.
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
          <div className="text-xs font-semibold uppercase tracking-wide text-gray-700">
            03 Prove
          </div>
          <div className="mt-2 text-sm font-semibold text-gray-950">
            Evidence must be logged before the next review.
          </div>
          <div className="mt-1 text-xs text-gray-700">
            No evidence means no containment.
          </div>
        </div>
      </div>
    </section>
  )
}
