import Link from "next/link";

const pillars = [
  { label: "01", title: "Risk", body: "Identify leaders most likely to underperform before the system reacts too late." },
  { label: "02", title: "Prescription", body: "Convert leadership risk into specific intervention plans leaders can execute." },
  { label: "03", title: "Succession", body: "Know who is ready now, who needs development, and where vacancies create exposure." }
];

const trustSignals = [
  "Secure district workspace for leadership teams",
  "Protected uploads for evaluations, retention, and performance data",
  "Executive outputs for risk, intervention, and succession planning"
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f8f7f4] text-[#111111]">
      <section className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-20 sm:px-10">
        <div className="max-w-5xl">
          <p className="mb-6 text-xs font-bold uppercase tracking-[0.35em] text-neutral-500">
            District Leadership Intelligence
          </p>

          <h1 className="text-balance text-5xl font-semibold tracking-[-0.055em] sm:text-6xl lg:text-8xl">
            Predict principal failure before it becomes district failure.
          </h1>

          <p className="mt-8 max-w-3xl text-pretty text-xl leading-8 text-neutral-600 sm:text-2xl sm:leading-9">
            LeadSharper helps districts identify leadership risk, prescribe targeted intervention, and build succession pipelines before vacancies and student outcomes suffer.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link href="/district-audit" className="inline-flex items-center justify-center rounded-full bg-black px-7 py-4 text-sm font-bold text-white transition hover:bg-neutral-800">
              Upload District Data
            </Link>

            <Link href="/executive-intelligence" className="inline-flex items-center justify-center rounded-full border border-neutral-300 bg-white/40 px-7 py-4 text-sm font-bold transition hover:border-black hover:bg-white">
              View Executive Intelligence
            </Link>
          </div>
        </div>

        <div className="mt-20 grid gap-4 md:grid-cols-3">
          {pillars.map((pillar) => (
            <article key={pillar.title} className="rounded-[2rem] border border-neutral-200 bg-white p-7 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-neutral-400">{pillar.label}</p>
              <h2 className="mt-8 text-2xl font-semibold tracking-tight">{pillar.title}</h2>
              <p className="mt-3 leading-7 text-neutral-600">{pillar.body}</p>
            </article>
          ))}
        </div>

        <section className="mt-24 rounded-[2rem] border border-neutral-200 bg-white p-10 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-neutral-500">
            Built for District Leadership Teams
          </p>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight">
            Stop reacting to leadership failures after the damage is already done.
          </h2>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {trustSignals.map((signal) => (
              <div key={signal} className="rounded-2xl bg-[#f8f7f4] p-6 text-neutral-700">
                {signal}
              </div>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
