import Link from "next/link";

const failurePoints = [
  {
    title: "Leadership risk is identified too late",
    body: "Districts often wait until achievement, staff morale, or retention has already declined before naming principal support needs."
  },
  {
    title: "Succession planning lives in disconnected files",
    body: "Potential successors are tracked through informal conversations, spreadsheets, and memory instead of a clear readiness system."
  },
  {
    title: "Intervention plans lack urgency",
    body: "Leaders may receive feedback, but the system often lacks a clear timeline, owner, and measurable intervention plan."
  }
];

export default function LeadershipRiskReportPage() {
  return (
    <main className="min-h-screen bg-[#f6f9ff] px-6 py-10 text-[#071a3d] sm:px-10">
      <section className="mx-auto max-w-6xl">
        <header className="flex items-center justify-between border-b border-[#0b63ff]/10 pb-6">
          <Link href="/" className="text-sm font-bold text-[#0b63ff]">
            LeadSharper
          </Link>

          <Link href="/demo" className="rounded-full bg-[#0057FF] px-6 py-3 text-sm font-bold text-white">
            Request Demo
          </Link>
        </header>

        <section className="py-14">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#0b63ff]">
            Leadership Risk Report
          </p>

          <h1 className="mt-5 max-w-4xl text-5xl font-semibold tracking-[-0.05em]">
            Why districts miss principal risk until it becomes a system problem.
          </h1>

          <p className="mt-6 max-w-3xl text-xl leading-8 text-[#34476b]">
            Principal instability rarely appears all at once. It shows up first in execution gaps, staffing pressure, culture drift, and missed instructional follow-through. LeadSharper gives district teams an earlier signal.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {failurePoints.map((point) => (
            <article key={point.title} className="rounded-3xl bg-white p-7 shadow-sm">
              <h2 className="text-xl font-semibold">{point.title}</h2>
              <p className="mt-4 leading-7 text-[#34476b]">{point.body}</p>
            </article>
          ))}
        </section>

        <section className="mt-10 rounded-[2rem] bg-[#071a3d] p-8 text-white shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-blue-300">
            LeadSharper Point of View
          </p>

          <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight">
            Districts need a leadership intelligence layer, not another disconnected evaluation file.
          </h2>

          <p className="mt-5 max-w-3xl leading-8 text-blue-100">
            The next generation of school improvement will require district teams to connect leadership performance, talent risk, school outcomes, and succession readiness in one executive view.
          </p>
        </section>
      </section>
    </main>
  );
}
