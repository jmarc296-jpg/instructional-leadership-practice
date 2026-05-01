import { districtScenario } from '../config/districtScenario'

export default function BoardExposureNarrative() {
  const highEscalations = districtScenario.filter((row) => row.escalation === 'HIGH')
  const unassigned = districtScenario.filter((row) => !row.owner)

  return (
    <section className="rounded-2xl border border-gray-900 bg-white p-6 shadow-sm">
      <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">
        Board-Level Exposure
      </div>

      <h2 className="mt-2 max-w-4xl text-2xl font-bold text-gray-950">
        If this were reviewed today, the unresolved issue would not be awareness. It would be action.
      </h2>

      <div className="mt-4 rounded-xl bg-gray-950 p-5 text-white">
        <div className="text-sm leading-6 text-gray-200">
          Current record: {highEscalations.length} executive escalations, {unassigned.length} ownership gaps, and active risks requiring containment. The district now has visibility. The remaining question is whether leadership assigns ownership before impact reaches classrooms.
        </div>
      </div>
    </section>
  )
}
