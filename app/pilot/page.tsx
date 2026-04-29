export default function PilotPage() {
  return (
    <main className="min-h-screen bg-[#f8f7f4] p-10 text-black">
      <div className="max-w-5xl mx-auto">

        <div className="inline-flex rounded-full bg-black text-white px-4 py-2 text-sm mb-6">
          District Risk Assessment
        </div>

        <h1 className="text-5xl font-bold mb-6">
          Identify leadership risk before instability becomes a vacancy.
        </h1>

        <p className="text-xl text-gray-600 leading-8 mb-8">
          LeadSharper helps districts surface principal risk, succession exposure, and intervention needs before schools experience disruption.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white border rounded-2xl p-6">
            <h3 className="font-bold text-lg">14 Days</h3>
            <p className="mt-3 text-gray-600">Initial district assessment turnaround</p>
          </div>

          <div className="bg-white border rounded-2xl p-6">
            <h3 className="font-bold text-lg">No New Systems</h3>
            <p className="mt-3 text-gray-600">Works with existing district data</p>
          </div>

          <div className="bg-white border rounded-2xl p-6">
            <h3 className="font-bold text-lg">Limited Pilot Capacity</h3>
            <p className="mt-3 text-gray-600">Only onboarding 3 districts this quarter</p>
          </div>
        </div>

        <div className="bg-white border rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-2">
            Request Assessment
          </h2>

          <p className="text-gray-600 mb-6">
            Executive review call included.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <input className="w-full border p-3 rounded-xl" placeholder="District Name" />
            <input className="w-full border p-3 rounded-xl" placeholder="Work Email" />
            <input className="w-full border p-3 rounded-xl" placeholder="Enrollment Size" />
            <input className="w-full border p-3 rounded-xl" placeholder="Current Principal Vacancies" />
          </div>

          <button className="mt-6 bg-black text-white px-6 py-3 rounded-full">
            Request Assessment
          </button>
        </div>
      </div>
    </main>
  );
}
