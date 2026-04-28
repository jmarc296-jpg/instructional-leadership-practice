import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f8f7f4] text-[#111111]">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-20">
        <div className="max-w-4xl">
          <p className="mb-6 text-sm font-semibold uppercase tracking-[0.28em] text-neutral-500">
            District Leadership Intelligence
          </p>

          <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
            Predict principal failure before it becomes district failure.
          </h1>

          <p className="mt-8 max-w-2xl text-xl leading-8 text-neutral-600">
            LeadSharper helps districts identify leadership risk, prescribe targeted intervention, and build succession pipelines before vacancies and student outcomes suffer.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/district-audit"
              className="rounded-full bg-black px-7 py-4 text-sm font-semibold text-white transition hover:bg-neutral-800"
            >
              Upload District Data
            </Link>

            <Link
              href="/executive-intelligence"
              className="rounded-full border border-neutral-300 px-7 py-4 text-sm font-semibold transition hover:border-black"
            >
              View Executive Intelligence
            </Link>
          </div>
        </div>

        <div className="mt-20 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-neutral-500">01</p>
            <h2 className="mt-4 text-xl font-semibold">Risk</h2>
            <p className="mt-3 text-neutral-600">Identify leaders most likely to underperform before the system reacts too late.</p>
          </div>

          <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-neutral-500">02</p>
            <h2 className="mt-4 text-xl font-semibold">Prescription</h2>
            <p className="mt-3 text-neutral-600">Convert leadership risk into specific intervention plans leaders can execute.</p>
          </div>

          <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-neutral-500">03</p>
            <h2 className="mt-4 text-xl font-semibold">Succession</h2>
            <p className="mt-3 text-neutral-600">Know who is ready now, who needs development, and where vacancies create exposure.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
