export default function ProcurementPage() {
  return (
    <main className="min-h-screen bg-slate-100 px-8 py-10">
      <div className="mx-auto max-w-6xl space-y-8">
        <a
          href="/"
          className="inline-block rounded-xl border border-slate-300 px-5 py-3 font-medium"
        >
          Back to Homepage
        </a>

        <div className="rounded-3xl bg-white p-8">
          <h1 className="text-5xl font-bold text-slate-900">
            Procurement Overview
          </h1>

          <p className="mt-4 text-xl text-slate-600">
            Everything districts need to evaluate a LeadSharper pilot.
          </p>
        </div>

        <div className="rounded-3xl bg-blue-50 p-8">
          <h2 className="text-3xl font-bold">District Risk Reduction</h2>

          <ul className="mt-6 space-y-4 text-lg text-slate-700">
            <li>• Identify leaders who avoid difficult conversations before promotion.</li>
            <li>• Surface weak instructional feedback patterns early.</li>
            <li>• Strengthen succession planning before vacancies create urgency.</li>
            <li>• Provide board-ready reporting on leadership pipeline health.</li>
          </ul>
        </div>

        <div className="rounded-3xl bg-white p-8">
          <h2 className="text-3xl font-bold mb-6">Pilot Overview</h2>

          <div className="grid grid-cols-3 gap-6">
            <div className="rounded-2xl bg-slate-50 p-6">
              <p className="text-sm text-slate-500">Pilot Length</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">30 Days</p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-6">
              <p className="text-sm text-slate-500">Recommended Cohort</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">20-50 Leaders</p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-6">
              <p className="text-sm text-slate-500">Data Requirement</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">
                No Student PII Required
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <a
            href="/pilot"
            className="rounded-xl bg-blue-600 px-6 py-4 text-white font-semibold"
          >
            Apply for Pilot
          </a>

          <button className="rounded-xl border border-slate-300 px-6 py-4 font-semibold">
            Print / Save PDF
          </button>
        </div>
      </div>
    </main>
  )
}
