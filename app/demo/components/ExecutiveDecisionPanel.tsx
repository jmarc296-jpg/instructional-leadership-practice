import { districtScenario } from '../config/districtScenario'

export default function ExecutiveDecisionPanel() {
  const highEscalations = districtScenario.filter((row) => row.escalation === 'HIGH')

  return (
    <section className='rounded-2xl border bg-white p-6 shadow-sm'>
      <div className='text-sm font-semibold uppercase tracking-wide text-gray-500'>
        Action Required Now
      </div>

      <h2 className='mt-2 text-2xl font-bold text-gray-950'>
        {highEscalations.length} leadership failures are preventable right now.
      </h2>

      <div className='mt-5 grid gap-3 md:grid-cols-2'>
        {highEscalations.map((row) => (
          <div key={row.school + row.signal} className='rounded-xl border border-red-300 bg-red-50 p-4'>
            <div className='text-xs font-semibold uppercase tracking-wide text-red-700'>
              {row.school}
            </div>
            <div className='mt-1 font-semibold text-gray-950'>
              {row.signal}
            </div>
            <div className='mt-2 text-sm text-gray-800'>
              Owner: {row.owner || 'UNASSIGNED'}
            </div>
            <div className='text-xs mt-1 text-red-700'>
              Delay Risk: Instructional inconsistency within 30 days
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
