type Props = {
  escalationCount: number
}

export default function EscalationBanner({ escalationCount }: Props) {
  if (escalationCount === 0) return null

  return (
    <div className='bg-red-700 text-white p-5 rounded-xl shadow-lg'>
      <div className='text-lg font-semibold'>
        You Have {escalationCount} Schools at Immediate Leadership Risk
      </div>
      <div className='text-sm mt-1 opacity-90'>
        No action is currently assigned to stabilize them.
      </div>
      <div className='text-xs mt-2 opacity-80'>
        If unaddressed, instructional decline is projected within 6–12 weeks.
      </div>
    </div>
  )
}
