export default function BoardReportCTA() {
  return (
    <div className='rounded-xl bg-gray-900 text-white p-5 flex items-center justify-between shadow-sm'>
      <div>
        <div className='font-semibold'>Board-ready output</div>
        <div className='text-sm text-gray-300'>
          Convert this risk snapshot into an executive report in one click.
        </div>
      </div>
      <a
        href='/board-report'
        className='rounded-lg bg-white px-4 py-2 text-sm font-semibold text-gray-900'
      >
        View Report
      </a>
    </div>
  )
}
