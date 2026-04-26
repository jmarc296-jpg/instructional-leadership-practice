export default function IntegrationsPage() {
  const integrations = [
    {
      platform: "PowerSchool",
      purpose: "Leadership personnel records",
      status: "Connected"
    },
    {
      platform: "Workday",
      purpose: "Hiring workflow integration",
      status: "Connected"
    },
    {
      platform: "Frontline Education",
      purpose: "Applicant tracking",
      status: "Connected"
    },
    {
      platform: "Canvas",
      purpose: "University certification pathways",
      status: "Connected"
    },
    {
      platform: "Google Workspace",
      purpose: "SSO + reporting",
      status: "Connected"
    },
    {
      platform: "Microsoft Teams",
      purpose: "District communication workflows",
      status: "Connected"
    }
  ]

  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-7xl space-y-8">

        <div className="rounded-3xl bg-white p-8 border shadow-sm">
          <h1 className="text-4xl font-bold text-slate-900">
            Integration Operating System
          </h1>

          <p className="mt-3 text-lg text-slate-600">
            Connect LeadSharper to the systems districts already rely on.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <div className="rounded-2xl bg-white p-6 border shadow-sm">
            <div className="text-sm text-slate-500">Active Integrations</div>
            <div className="text-4xl font-bold text-blue-600 mt-2">28</div>
          </div>

          <div className="rounded-2xl bg-white p-6 border shadow-sm">
            <div className="text-sm text-slate-500">District Systems Connected</div>
            <div className="text-4xl font-bold text-green-600 mt-2">412</div>
          </div>

          <div className="rounded-2xl bg-white p-6 border shadow-sm">
            <div className="text-sm text-slate-500">SSO Adoption</div>
            <div className="text-4xl font-bold text-purple-600 mt-2">94%</div>
          </div>

          <div className="rounded-2xl bg-white p-6 border shadow-sm">
            <div className="text-sm text-slate-500">Reporting Automation</div>
            <div className="text-4xl font-bold text-orange-600 mt-2">91%</div>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-8 border shadow-sm">
          <h2 className="text-2xl font-bold mb-6">
            Connected Systems
          </h2>

          <table className="w-full">
            <thead>
              <tr className="border-b text-left">
                <th className="pb-4">Platform</th>
                <th className="pb-4">Purpose</th>
                <th className="pb-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {integrations.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="py-4">{item.platform}</td>
                  <td>{item.purpose}</td>
                  <td>{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </main>
  )
}
