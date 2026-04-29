import Image from "next/image";
import Link from "next/link";

const metrics = [
  { label: "High Risk Principals", value: "12", context: "Require support" },
  { label: "Open Vacancies", value: "4", context: "Current exposure" },
  { label: "Succession Ready", value: "7", context: "Ready-now leaders" },
  { label: "Financial Exposure", value: "$2.1M", context: "Estimated annual risk" }
];

const schools = [
  { name: "Priority Campus 01", risk: "High Risk", action: "Executive coaching intervention", owner: "Chief Academic Officer" },
  { name: "Priority Campus 02", risk: "Moderate Risk", action: "Succession monitoring", owner: "Talent Team" },
  { name: "Priority Campus 03", risk: "High Risk", action: "Staff stabilization plan", owner: "Human Capital" }
];

export default function DistrictCommandCenterPage() {
  return (
    <main className="min-h-screen bg-[#EEF3FB] text-[#071B4D]">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 sm:px-10">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="LeadSharper"
            width={240}
            height={70}
            priority
            className="h-auto w-[260px]"
          />
        </Link>

        <Link
          href="/board-report"
          className="rounded-full border border-[#0D6EFD]/20 px-6 py-3 text-sm font-semibold hover:bg-white"
        >
          Board Report
        </Link>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-10 sm:px-10">
        <div className="mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#0D6EFD]">
            District Risk Snapshot
          </p>

          <h1 className="mt-6 max-w-5xl text-5xl font-semibold tracking-[-0.05em] sm:text-6xl">
            Monitor leadership risk, vacancy exposure, and succession readiness in one place.
          </h1>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-10">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-[2rem] border border-[#D8E3F7] bg-white p-6 shadow-sm"
            >
              <p className="text-sm text-[#31456E]">
                {metric.label}
              </p>

              <p className="text-5xl font-bold mt-4 text-[#071B4D]">
                {metric.value}
              </p>

              <p className="text-sm text-[#31456E] mt-3">
                {metric.context}
              </p>
            </div>
          ))}
        </div>

        <div className="rounded-[2rem] border border-[#D8E3F7] bg-white p-8 shadow-sm mb-8">
          <div className="flex items-start justify-between gap-6 mb-6">
            <div>
              <h2 className="text-3xl font-bold text-[#071B4D]">
                Immediate Intervention Schools
              </h2>

              <p className="text-[#31456E] mt-2">
                Prioritized campuses requiring executive attention this cycle.
              </p>
            </div>

            <span className="rounded-full bg-[#EEF3FB] px-4 py-2 text-sm font-semibold text-[#071B4D]">
              3 Active Signals
            </span>
          </div>

          <div className="space-y-4">
            {schools.map((school) => (
              <div
                key={school.name}
                className="grid gap-4 rounded-2xl border border-[#D8E3F7] bg-[#F7FAFF] p-5 md:grid-cols-[1.5fr_1fr_1fr]"
              >
                <div>
                  <h3 className="font-bold text-[#071B4D]">
                    {school.name}
                  </h3>

                  <p className="text-[#31456E] mt-2">
                    {school.action}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide text-[#31456E]">
                    Owner
                  </p>

                  <p className="mt-2 text-[#071B4D]">
                    {school.owner}
                  </p>
                </div>

                <div className="md:text-right">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${
                      school.risk === "High Risk"
                        ? "bg-orange-100 text-orange-600"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {school.risk}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Link
          href="/board-report"
          className="inline-block rounded-full bg-[#0057FF] px-6 py-3 text-sm font-bold text-white hover:bg-[#0046cc]"
        >
          Generate Board Report
        </Link>
      </section>
    </main>
  );
}
