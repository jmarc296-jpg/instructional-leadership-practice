import { districtScenario } from '../config/districtScenario'

function escalationClass(level: 'LOW' | 'MEDIUM' | 'HIGH') {
  if (level === 'HIGH') return 'bg-red-100 text-red-700 border-red-200'
  if (level === 'MEDIUM') return 'bg-orange-100 text-orange-700 border-orange-200'
  return 'bg-green-100 text-green-700 border-green-200'
}

export default function DemoActionTable() {
  return (
    <div className='rounded-2xl border bg-white p-5 shadow-sm'>
      <div className='mb-4'>
        <div className='text-sm font-semibold uppercase tracking-wide text-gray-500'>
          Accountability
        </div>
        <h2 className='mt-1 text-xl font-bold text-gray-950'>
          Unresolved risk is assigned. Or it remains your exposure.
        </h2>
      </div>

      <div className='overflow-hidden rounded-xl border'>
        <table className='w-full text-left text-sm'>
          <thead className='bg-gray-50 text-gray-600'>
            <tr>
              <th className='p-3 font-semibold'>School</th>
              <th className='p-3 font-semibold'>Signal</th>
              <th className='p-3 font-semibold'>Action</th>
              <th className='p-3 font-semibold'>Owner</th>
              <th className='p-3 font-semibold'>Due</th>
              <th className='p-3 font-semibold'>Proof</th>
              <th className='p-3 font-semibold'>Status</th>
              <th className='p-3 font-semibold'>Escalation</th>
            </tr>
          </thead>
          <tbody>
            {districtScenario.map((row) => (
              <tr key={row.school + row.signal} className='border-t align-top'>
                <td className='p-3 font-medium text-gray-950'>{row.school}</td>
                <td className='p-3 text-gray-800'>{row.signal}</td>
                <td className='p-3 text-gray-800'>{row.action}</td>
                <td className='p-3 font-medium text-gray-950'>{row.owner || 'Unassigned'}</td>
                <td className='p-3 text-gray-700'>{row.due}</td>
                <td className='p-3 text-gray-700'>{row.evidence}</td>
                <td className='p-3 text-red-700 font-semibold'>At Risk</td>
                <td className='p-3'>
                  <span className={'rounded-full border px-2 py-1 text-xs font-semibold ' + escalationClass(row.escalation)}>
                    {row.escalation}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
