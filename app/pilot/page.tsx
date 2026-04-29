export default function PilotPage() {
  return (
    <main className="min-h-screen bg-[#f8f7f4] p-10 text-black">
      <div className="max-w-3xl mx-auto bg-white p-10 rounded-2xl border">
        <h1 className="text-4xl font-bold mb-6">
          Run Pilot Assessment
        </h1>

        <div className="space-y-4">
          <input className="w-full border p-3 rounded-xl" placeholder="District Name" />
          <input className="w-full border p-3 rounded-xl" placeholder="Enrollment Size" />
          <input className="w-full border p-3 rounded-xl" placeholder="Current Principal Vacancies" />
          <input className="w-full border p-3 rounded-xl" placeholder="District Email" />
        </div>

        <button className="mt-6 bg-black text-white px-6 py-3 rounded-full">
          Submit Pilot Request
        </button>
      </div>
    </main>
  );
}
