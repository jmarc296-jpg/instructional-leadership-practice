import Image from "next/image";
import Link from "next/link";

const metrics = [
  {
    label: "At-Risk Leaders",
    value: "12 Principals"
  },
  {
    label: "Immediate Action Required",
    value: "4 This Quarter"
  },
  {
    label: "Vacancy Exposure",
    value: "3 Schools"
  },
  {
    label: "Succession Bench",
    value: "7 Ready Now"
  }
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#EEF3FB] text-[#071B4D]">
      
      {/* HEADER */}
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 sm:px-10">
        <Image
          src="/logo.png"
          alt="LeadSharper"
          width={240}
          height={70}
          priority
          className="h-auto w-[280px]"
        />

        <div className="flex items-center gap-4">
          <Link
            href="/leadership-risk-Methodology"
            className="hidden text-sm font-semibold text-[#31456E] hover:text-[#0057FF] sm:inline-flex"
          >
            Methodology
          </Link>
          <Link
            href="/sign-in"
            className="rounded-full border border-[#0D6EFD]/20 px-6 py-3 text-sm font-semibold hover:bg-white"
          >
            Sign In
          </Link>

          <Link
            href="/district-command-center"
            className="rounded-full bg-[#0057FF] px-6 py-3 text-sm font-semibold text-white hover:bg-[#0046cc]"
          >
            Run District Risk Assessment
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="mx-auto grid max-w-7xl items-center gap-16 px-6 py-6 sm:px-10 lg:grid-cols-2">
        
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#0D6EFD]">
            Leadership Intelligence for Districts
          </p>

          <h1 className="mt-6 text-5xl font-semibold tracking-[-0.05em] sm:text-6xl lg:text-7xl">
            Predict leadership failure before schools pay the price.
          </h1>

          <p className="mt-6 max-w-2xl text-xl leading-8 text-[#31456E]">
            Identify principal risk, intervene faster, and protect your succession pipeline before turnover, vacancies, and student outcomes decline.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/district-command-center"
              className="inline-flex items-center justify-center rounded-full bg-[#0057FF] px-8 py-4 text-sm font-bold text-white hover:bg-[#0046cc]"
            >
              Run District Risk Assessment
            </Link>

            <Link
              href="/district-command-center"
              className="inline-flex items-center justify-center rounded-full border border-[#0D6EFD]/20 bg-white px-8 py-4 text-sm font-bold hover:border-[#0D6EFD]"
            >
              View Command Center
            </Link>
          </div>
        </div>

        {/* DASHBOARD */}
        <div className="rounded-[2rem] border border-[#D8E3F7] bg-white p-8 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#0D6EFD]">
            Executive Risk Snapshot
          </p>

          <div className="mt-8 space-y-4">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="flex items-center justify-between rounded-2xl bg-[#F7FAFF] px-6 py-5"
              >
                <p className="text-sm font-medium text-[#31456E]">
                  {metric.label}
                </p>

                <p className="text-2xl font-bold text-[#071B4D]">
                  {metric.value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl bg-[#071B4D] p-6 text-white">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-blue-300">
              Top Risk School
            </p>

            <h3 className="mt-4 text-2xl font-semibold">
              District Portfolio School A
            </h3>

            <div className="mt-4 space-y-2 text-sm text-blue-100">
              <p>Principal tenure: 1.2 years</p>
              <p>Teacher retention: 62%</p>
              <p>Math proficiency: -14%</p>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="border-t border-[#D8E3F7] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-10 sm:px-10">
          <p className="text-center text-sm font-medium text-[#31456E]">
            Built for superintendents, talent teams, and school boards making high-stakes leadership decisions.
          </p>
        </div>
      </section>
    </main>
  );
}


