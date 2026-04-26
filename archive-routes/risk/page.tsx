export default function DistrictRiskPage() {
  const leaders = [
    {
      leader: "Principal A",
      district: "Urban District",
      risk: "High",
      weakness: "Instructional Feedback",
      trend: "Declining",
      action: "Executive coaching intervention"
    },
    {
      leader: "Principal B",
      district: "Suburban District",
      risk: "Medium",
      weakness: "Staff Conflict Management",
      trend: "Stable",
      action: "Targeted simulation practice"
    },
    {
      leader: "Principal C",
      district: "Charter Network",
      risk: "Low",
      weakness: "Delegation",
      trend: "Improving",
      action: "Leadership pipeline development"
    }
  ]

  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-7xl space-y-8">

        <div>
          <p className="text-sm font-semibold text-red-600 uppercase tracking-wider">
            District Risk Intelligence
          </p>

          <h1 className="text-4xl font-bold text-slate-900 mt-2">
            Identify leadership risks before school performance declines
          </h1>

          <p className="text-slate-600 mt-4 max-w-3xl">
            Surface leadership blind spots across your district before they impact teacher retention, school culture, and student achievement.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <p className="text-sm text-slate-500">High Risk Leaders</p>
            <h2 className="text-4xl font-bold text-red-600 mt-2">8</h2>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <p className="text-sm text-slate-500">Moderate Risk Leaders</p>
            <h2 className="text-4xl font-bold text-yellow-500 mt-2">24</h2>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <p className="text-sm text-slate-500">Low Risk Leaders</p>
            <h2 className="text-4xl font-bold text-green-600 mt-2">67</h2>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <p className="text-sm text-slate-500">District Leadership Health</p>
            <h2 className="text-4xl font-bold text-blue-600 mt-2">89%</h2>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold mb-6">
            Leadership Risk Radar
          </h2>

          <div className="overflow-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b">
                  <th className="pb-4">Leader</th>
                  <th className="pb-4">Organization Type</th>
                  <th className="pb-4">Risk Level</th>
                  <th className="pb-4">Primary Weakness</th>
                  <th className="pb-4">Trend</th>
                  <th className="pb-4">Recommended Action</th>
                </tr>
              </thead>

              <tbody>
                {leaders.map((leader, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-4">{leader.leader}</td>
                    <td>{leader.district}</td>
                    <td>{leader.risk}</td>
                    <td>{leader.weakness}</td>
                    <td>{leader.trend}</td>
                    <td>{leader.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </main>
  )
}
