export default function PilotPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 lg:px-10">
      <div className="mx-auto max-w-6xl space-y-10">

        <a
          href="/"
          className="inline-block rounded-2xl border border-slate-300 px-5 py-3 font-medium hover:bg-white"
        >
          Back to Homepage
        </a>

        {/* HERO */}
        <section className="rounded-[32px] bg-white border border-slate-200 px-8 py-10">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">
            Pilot Program
          </p>

          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-slate-900 max-w-4xl leading-tight">
            Launch a principal readiness pilot before making high-stakes leadership decisions.
          </h1>

          <p className="mt-5 text-lg text-slate-600 max-w-2xl leading-8">
            Evaluate aspiring principals, assistant principals, and current school leaders through simulations that reveal readiness gaps before promotions become expensive mistakes.
          </p>
        </section>

        {/* VALUE */}
        <section className="grid md:grid-cols-3 gap-6">
          <ValueCard
            title="Assess Readiness"
            text="Measure leadership judgment before promotions or placements."
          />

          <ValueCard
            title="Identify Gaps"
            text="Surface coaching needs before performance issues escalate."
          />

          <ValueCard
            title="Reduce Turnover"
            text="Make stronger leadership decisions with better data."
          />
        </section>

        {/* PILOT STRUCTURE */}
        <section className="rounded-[32px] bg-slate-900 text-white px-8 py-10">
          <h2 className="text-4xl font-semibold tracking-tight">
            Typical Pilot Structure
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <Metric label="Pilot Length" value="30 Days" />
            <Metric label="Recommended Cohort" value="20-50 Leaders" />
            <Metric label="Implementation Time" value="2 Weeks" />
          </div>
        </section>

        {/* FORM */}
        <section className="rounded-[32px] bg-white border border-slate-200 px-8 py-10">
          <h2 className="text-4xl font-semibold text-slate-900">
            Request Pilot Access
          </h2>

          <p className="mt-4 text-lg text-slate-600 max-w-2xl leading-8">
            Tell us about your leadership pipeline challenge and we’ll follow up directly.
          </p>

          <form className="mt-8 grid md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Full Name"
              className="rounded-2xl border border-slate-300 px-5 py-4"
            />

            <input
              type="email"
              placeholder="Work Email"
              className="rounded-2xl border border-slate-300 px-5 py-4"
            />

            <input
              type="text"
              placeholder="Organization"
              className="rounded-2xl border border-slate-300 px-5 py-4"
            />

            <select className="rounded-2xl border border-slate-300 px-5 py-4">
              <option>District</option>
              <option>Charter Network</option>
              <option>University</option>
              <option>Leadership Nonprofit</option>
            </select>

            <textarea
              placeholder="What leadership pipeline challenge are you trying to solve?"
              className="md:col-span-2 rounded-2xl border border-slate-300 px-5 py-4 min-h-[140px]"
            />

            <button
              className="rounded-2xl bg-blue-600 px-6 py-4 text-white font-semibold hover:bg-blue-700 md:w-fit"
            >
              Apply for Pilot
            </button>
          </form>
        </section>
      </div>
    </main>
  )
}

function ValueCard({
  title,
  text
}: {
  title: string
  text: string
}) {
  return (
    <div className="rounded-3xl bg-white border border-slate-200 p-7">
      <h3 className="text-2xl font-semibold text-slate-900">
        {title}
      </h3>

      <p className="mt-3 text-slate-600 leading-7">
        {text}
      </p>
    </div>
  )
}

function Metric({
  label,
  value
}: {
  label: string
  value: string
}) {
  return (
    <div className="rounded-3xl bg-slate-800 p-6">
      <p className="text-sm text-slate-400">
        {label}
      </p>

      <h3 className="mt-3 text-3xl font-bold text-white">
        {value}
      </h3>
    </div>
  )
}
