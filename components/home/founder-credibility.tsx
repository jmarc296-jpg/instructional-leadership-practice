export function FounderCredibility() {
  const proof = [
    "Built by a current school leadership consultant supporting district improvement work",
    "Designed from real principal coaching, APT, DDI, and leadership pipeline challenges",
    "Built for districts, charter networks, and university leadership programs",
    "Created to reduce failed principal placements and improve readiness"
  ]

  return (
    <section className="rounded-[32px] bg-slate-900 p-10 text-white">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-300">
        Why LeadSharper
      </p>

      <h2 className="mt-4 text-4xl font-semibold">
        Built by someone who actually lives these leadership problems.
      </h2>

      <p className="mt-5 max-w-3xl text-lg text-slate-300">
        Most leadership platforms are built by people far removed from real district decision-making.
        LeadSharper was built inside real school improvement work where leadership mistakes carry real consequences.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {proof.map((item) => (
          <div
            key={item}
            className="rounded-2xl bg-slate-800 p-5 text-slate-200"
          >
            {item}
          </div>
        ))}
      </div>
    </section>
  )
}
