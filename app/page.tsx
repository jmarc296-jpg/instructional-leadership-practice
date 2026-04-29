import Link from "next/link";

const metrics = [
  { label: "Leadership Risk Exposure", value: "12" },
  { label: "Urgent Intervention", value: "4" },
  { label: "Succession Ready", value: "7" },
  { label: "Vacancy Risk", value: "3" }
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f8f7f4] text-[#111111]">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 sm:px-10">
        <Link href="/" className="text-xl font-black tracking-[-0.04em]">LeadSharper</Link>

        <Link
          href="/sign-in"
          className="rounded-full border border-black/15 bg-white px-5 py-3 text-sm font-bold text-black shadow-sm transition hover:border-black"
        >
          Sign in
        </Link>
      </header>

      <section className="mx-auto grid max-w-7xl items-center gap-16 px-6 pb-20 pt-12 sm:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:pt-24">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.32em] text-black/45">
            Leadership Intelligence for Districts
          </p>

          <h1 className="mt-6 max-w-4xl text-5xl font-semibold tracking-[-0.06em] sm:text-6xl lg:text-7xl">
            Know which leaders need support before the district pays the price.
          </h1>

          <p className="mt-7 max-w-2xl text-xl leading-8 text-black/60">
            LeadSharper turns fragmented leadership, talent, and performance data into executive decisions on risk, intervention, and succession.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/data-intake"
              className="inline-flex items-center justify-center rounded-full bg-black px-7 py-4 text-sm font-bold text-white transition hover:bg-black/85"
            >
              Upload District Data
            </Link>

            <Link
              href="/executive-intelligence"
              className="inline-flex items-center justify-center rounded-full border border-black/15 bg-white px-7 py-4 text-sm font-bold transition hover:border-black"
            >
              View Executive Intelligence
            </Link>
          </div>
        </div>

        <aside className="rounded-[2rem] border border-black/10 bg-white p-8 shadow-sm">
          <div className="flex items-center justify-between border-b border-black/10 pb-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-black/45">
                Executive Snapshot
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                District leadership exposure
              </h2>
            </div>
          </div>

          <div className="mt-6 grid gap-3">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="flex items-center justify-between rounded-2xl bg-[#f8f7f4] px-5 py-5"
              >
                <p className="text-sm font-semibold text-black/55">
                  {metric.label}
                </p>
                <p className="text-3xl font-semibold tracking-[-0.04em]">
                  {metric.value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl bg-black p-5 text-white">
            <p className="text-xs font-bold uppercase tracking-[0.26em] text-white/45">
              Recommended Action
            </p>
            <p className="mt-3 text-lg font-semibold leading-7">
              Prioritize intervention for four leaders before the next performance cycle.
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}

