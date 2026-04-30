type Props = {
  escalationCount: number
}

export default function EscalationBanner({ escalationCount }: Props) {
  if (escalationCount === 0) return null

  return (
    <div className='bg-red-600 text-white p-4 rounded-xl shadow-lg flex justify-between items-center'>
      <div className='font-semibold'>
        {escalationCount} CRITICAL ESCALATION{escalationCount > 1 ? 'S' : ''} REQUIRING ACTION
      </div>
      <div className='text-sm opacity-90'>
        Immediate intervention required
      </div>
    </div>
  )
}
