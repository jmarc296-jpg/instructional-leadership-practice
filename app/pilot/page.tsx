export default function PilotPage() {
  return (
    <main className="min-h-screen bg-[#f8f7f4] p-10 text-black">
      <div className="max-w-4xl mx-auto">

        <div className="inline-flex rounded-full bg-black text-white px-4 py-2 text-sm mb-6">
          District Pilot Assessment
        </div>

        <h1 className="text-5xl font-bold mb-6">
          Identify your district’s leadership risk in 14 days.
        </h1>

        <p className="text-xl text-gray-600 leading-8 mb-10">
          Districts lose between $250K–$500K per principal vacancy through turnover, staffing disruption, and student performance decline.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white border rounded-2xl p-6">
            <h3 className="font-bold text-lg">14 Days</h3>
            <p className="mt-3 text-gray-600">
              Average implementation timeline
            </p>
          </div>

          <div className="bg-white border rounded-2xl p-6">
            <h3 className="font-bold text-lg">No New Systems</h3>
            <p className="mt-3 text-gray-600">
              Uses existing district data sources
            </p>
          </div>

          <div className="bg-white border rounded-2xl p-6">
            <h3 className="font-bold text-lg">Executive Visibility</h3>
            <p className="mt-3 text-gray-600">
              Immediate district leadership insights
            </p>
          </div>
        </div>

        <div className="bg-white border rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-6">
            Request Pilot Assessment
          </h2>

          <div className="space-y-4">
            <input className="w-full border p-3 rounded-xl" placeholder="District Name" />
            <input className="w-full border p-3 rounded-xl" placeholder="Enrollment Size" />
            <input className="w-full border p-3 rounded-xl" placeholder="Current Principal Vacancies" />
            <input className="w-full border p-3 rounded-xl" placeholder="Work Email" />
          </div>

          <button className="mt-6 bg-black text-white px-6 py-3 rounded-full">
            Request Assessment
          </button>
        </div>
      </div>
    </main>
  );
}
