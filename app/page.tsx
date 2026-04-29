import Link from "next/link";

const metrics = [
  { label: "Leadership Risk Exposure", value: "12 Principals" },
  { label: "Urgent Intervention Needed", value: "4 Leaders" },
  { label: "Succession Ready", value: "7 APs" },
  { label: "Vacancy Risk", value: "3 Schools" }
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f8f7f4] text-[#111111]">
      <section className="mx-auto grid min-h-screen max-w-7xl items-center gap-16 px-6 py-16 sm:px-10 lg:grid-cols-2">
        
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-neutral-500">
            District Leadership Intelligence
          </p>

          <h1 className="mt-6 max-w-3xl text-5xl font-semibold tracking-[-0.055em] sm:text-6xl lg:text-7xl">
            Predict principal failure before it becomes district failure.
          </h1>

          <p className="mt-6 max-w-2xl text-xl leading-8 text-neutral-600">
            The first leadership intelligence platform built to predict principal risk, prescribe intervention, and protect succession pipelines.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link href="/data-intake" className="inline-flex items-center justify-center rounded-full bg-black px-7 py-4 text-sm font-bold text-white hover:bg-neutral-800">
              Upload District Data
            </Link>

            <Link href="/executive-intelligence" className="inline-flex items-center justify-center rounded-full border border-neutral-300 bg-white px-7 py-4 text-sm font-bold hover:border-black">
              View Executive Intelligence
            </Link>
          </div>
        </div>

        <div className="rounded-[2rem] border border-black/10 bg-white p-8 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-neutral-500">
            District Executive Dashboard
          </p>

          <div className="mt-8 space-y-4">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="flex items-center justify-between rounded-2xl bg-[#f8f7f4] px-6 py-5"
              >
                <p className="text-sm font-medium text-black/60">
                  {metric.label}
                </p>

                <p className="text-2xl font-semibold tracking-tight">
                  {metric.value}
                </p>
              </div>
            ))}
          </div>
        </div>

      </section>
    </main>
  );
}
