type ActionRow = {
  signal: string
  action: string
  owner: string
  due: string
  evidence: string
  escalation: 'LOW' | 'MEDIUM' | 'HIGH'
}

const rows: ActionRow[] = [
  {
    signal: 'Principal coaching evidence missing for 3 weeks',
    action: 'Schedule executive check-in and upload coaching artifact',
    owner: 'Area Superintendent',
    due: 'This Friday',
    evidence: 'Coaching log + follow-up note',
    escalation: 'HIGH'
  },
  {
    signal: 'Walkthrough feedback not converting into teacher action',
    action: 'Review feedback cycle and assign weekly implementation check',
    owner: 'Principal Coach',
    due: 'Next Tuesday',
    evidence: 'Feedback tracker',
    escalation: 'MEDIUM'
  },
  {
    signal: 'Succession bench unclear for priority campus',
    action: 'Identify interim coverage and readiness evidence',
    owner: 'Talent Lead',
    due: 'Next Friday',
    evidence: 'Bench readiness snapshot',
    escalation: 'HIGH'
  }
]

function escalationClass(level: ActionRow['escalation']) {
  if (level === 'HIGH') return 'bg-red-100 text-red-700 border-red-200'
  if (level === 'MEDIUM') return 'bg-orange-100 text-orange-700 border-orange-200'
  return 'bg-green-100 text-green-700 border-green-200'
}

export default function DemoActionTable() {
  return (
    <div className='rounded-2xl border bg-white p-5 shadow-sm'>
      <div className='mb-4'>
        <div className='text-sm font-semibold uppercase tracking-wide text-gray-500'>
          Execution System
        </div>
        <h2 className='mt-1 text-xl font-bold text-gray-950'>
          Every risk signal becomes an owned action.
        </h2>
      </div>

      <div className='overflow-hidden rounded-xl border'>
        <table className='w-full text-left text-sm'>
          <thead className='bg-gray-50 text-gray-600'>
            <tr>
              <th className='p-3 font-semibold'>Signal</th>
              <th className='p-3 font-semibold'>Action</th>
              <th className='p-3 font-semibold'>Owner</th>
              <th className='p-3 font-semibold'>Due</th>
              <th className='p-3 font-semibold'>Evidence</th>
              <th className='p-3 font-semibold'>Escalation</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.signal} className='border-t align-top'>
                <td className='p-3 text-gray-800'>{row.signal}</td>
                <td className='p-3 text-gray-800'>{row.action}</td>
                <td className='p-3 font-medium text-gray-950'>{row.owner}</td>
                <td className='p-3 text-gray-700'>{row.due}</td>
                <td className='p-3 text-gray-700'>{row.evidence}</td>
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
