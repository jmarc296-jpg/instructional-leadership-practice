import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f8f7f4] text-[#111111]">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-20">
        <p className="mb-6 text-sm font-semibold uppercase tracking-[0.28em] text-neutral-500">
          District Leadership Intelligence
        </p>

        <h1 className="max-w-5xl text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
          Predict principal failure before it becomes district failure.
        </h1>

        <p className="mt-8 max-w-2xl text-xl leading-8 text-neutral-600">
          LeadSharper helps districts identify leadership risk, prescribe targeted intervention, and build succession pipelines before vacancies and student outcomes suffer.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link href="/district-audit" className="rounded-full bg-black px-7 py-4 text-sm font-semibold text-white hover:bg-neutral-800">
            Upload District Data
          </Link>

          <Link href="/executive-intelligence" className="rounded-full border border-neutral-300 px-7 py-4 text-sm font-semibold hover:border-black">
            View Executive Intelligence
          </Link>
        </div>

        <div className="mt-20 grid gap-4 md:grid-cols-3">
          {[
            ["01", "Risk", "Identify leaders most likely to underperform before the system reacts too late."],
            ["02", "Prescription", "Convert leadership risk into specific intervention plans leaders can execute."],
            ["03", "Succession", "Know who is ready now, who needs development, and where vacancies create exposure."]
          ].map(([number, title, body]) => (
            <div key={title} className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-neutral-500">{number}</p>
              <h2 className="mt-4 text-xl font-semibold">{title}</h2>
              <p className="mt-3 text-neutral-600">{body}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
