import { districtScenario } from '../config/districtScenario'

export default function ExecutiveDecisionPanel() {
  const highEscalations = districtScenario.filter((row) => row.escalation === 'HIGH')

  return (
    <section className='rounded-2xl border bg-white p-6 shadow-sm'>
      <div className='text-sm font-semibold uppercase tracking-wide text-gray-500'>
        Executive Decision Required
      </div>

      <h2 className='mt-2 text-2xl font-bold text-gray-950'>
        {highEscalations.length} issues require cabinet-level visibility this week.
      </h2>

      <p className='mt-3 max-w-3xl text-sm text-gray-700'>
        Each escalation has a named owner, due date, evidence expectation, and follow-up path so leadership risk does not remain invisible or informal.
      </p>

      <div className='mt-5 grid gap-3 md:grid-cols-2'>
        {highEscalations.map((row) => (
          <div key={row.school + row.signal} className='rounded-xl border border-red-200 bg-red-50 p-4'>
            <div className='text-xs font-semibold uppercase tracking-wide text-red-700'>
              {row.school}
            </div>
            <div className='mt-1 font-semibold text-gray-950'>
              {row.signal}
            </div>
            <div className='mt-2 text-sm text-gray-700'>
              Owner: {row.owner} | Due: {row.due}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
