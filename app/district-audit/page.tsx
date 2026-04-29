export default function DistrictAuditPage() {
  return (
    <main className="min-h-screen bg-[#f8f7f4] px-6 py-10 text-[#111111] sm:px-10">
      <section className="mx-auto max-w-5xl">
        <div className="border-b border-black/10 pb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-black/50">
            District Audit
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            Upload district leadership data.
          </h1>

          <p className="mt-4 max-w-3xl text-lg leading-8 text-black/60">
            Upload principal evaluations, retention data, vacancies, and performance metrics to generate a leadership risk audit.
          </p>
        </div>

        <section className="mt-10 rounded-3xl border border-black/10 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold">
            District Audit Intake
          </h2>

          <p className="mt-3 text-black/60 leading-7">
            CSV uploads connect district data directly into LeadSharper’s risk, prescription, and succession engines.
          </p>

          <div className="mt-8 rounded-2xl bg-[#f8f7f4] p-6 text-black/65">
            CSV Upload Ready
          </div>
        </section>
      </section>
    </main>
  );
}
