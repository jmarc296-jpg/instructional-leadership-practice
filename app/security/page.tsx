export default function SecurityPage() {
  const controls = [
    {
      area: "Data Privacy",
      standard: "FERPA-aligned data handling",
      status: "Implemented"
    },
    {
      area: "Access Control",
      standard: "Role-based district access",
      status: "In Progress"
    },
    {
      area: "Data Storage",
      standard: "Secure cloud-based infrastructure",
      status: "Implemented"
    },
    {
      area: "District Ownership",
      standard: "District-controlled cohort data",
      status: "Implemented"
    },
    {
      area: "Audit Readiness",
      standard: "Reporting and exportable records",
      status: "Implemented"
    }
  ]

  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-7xl space-y-8">

        <section className="rounded-3xl bg-white p-8 border shadow-sm">
          <h1 className="text-4xl font-bold text-slate-900">
            Security & Trust Center
          </h1>

          <p className="mt-3 text-lg text-slate-600">
            Built for district-level implementation with privacy, access control, and responsible data use at the center.
          </p>
        </section>

        <section className="grid md:grid-cols-4 gap-6">
          <Metric label="FERPA Alignment" value="Yes" />
          <Metric label="District Data Ownership" value="Yes" />
          <Metric label="Role-Based Access" value="Yes" />
          <Metric label="Audit Ready" value="Yes" />
        </section>

        <section className="rounded-3xl bg-white p-8 border shadow-sm">
          <h2 className="text-2xl font-bold mb-6">
            Enterprise Readiness Controls
          </h2>

          <table className="w-full">
            <thead>
              <tr className="border-b text-left">
                <th className="pb-4">Area</th>
                <th className="pb-4">Standard</th>
                <th className="pb-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {controls.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="py-4">{item.area}</td>
                  <td>{item.standard}</td>
                  <td>{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="rounded-3xl bg-slate-900 p-8 text-white">
          <h2 className="text-2xl font-bold">
            District Implementation Principle
          </h2>

          <p className="mt-4 max-w-3xl text-slate-300">
            LeadSharper is designed to support leadership development and readiness measurement without requiring student-level personally identifiable information.
          </p>
        </section>

      </div>
    </main>
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
    <div className="rounded-2xl bg-white p-6 border shadow-sm">
      <div className="text-sm text-slate-500">{label}</div>
      <div className="text-4xl font-bold text-blue-600 mt-2">{value}</div>
    </div>
  )
}
