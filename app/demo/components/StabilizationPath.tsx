export default function StabilizationPath() {
  return (
    <div className='grid gap-4 md:grid-cols-2'>
      <div className='rounded-xl border bg-red-50 p-5'>
        <div className='text-sm font-semibold text-red-700'>Before LeadSharper</div>
        <div className='mt-2 text-sm text-gray-700'>
          Risk signals sit across walkthroughs, coaching notes, vacancies, and performance data without a clear owner or escalation path.
        </div>
      </div>
      <div className='rounded-xl border bg-green-50 p-5'>
        <div className='text-sm font-semibold text-green-700'>After LeadSharper</div>
        <div className='mt-2 text-sm text-gray-700'>
          Each signal becomes an action with ownership, evidence, due dates, and escalation visibility for executive decision-making.
        </div>
      </div>
    </div>
  )
}
