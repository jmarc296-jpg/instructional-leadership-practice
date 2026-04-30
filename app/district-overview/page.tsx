import { districtPortfolio } from "@/lib/district-data";

export default function DistrictOverviewPage() {
  const highRiskSchools = districtPortfolio.filter(
    (school) =>
      school.riskLevel === "High" ||
      school.riskLevel === "Critical"
  );

  return (
    <main className="min-h-screen bg-[#f8f7f4] p-10">
      <h1 className="text-4xl font-bold mb-8 text-black">
        District Portfolio Overview
      </h1>

      <div className="grid grid-cols-4 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-sm text-gray-500">Schools Monitored</p>
          <h2 className="text-3xl font-bold">
            {districtPortfolio.length}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-sm text-gray-500">High Risk Schools</p>
          <h2 className="text-3xl font-bold">
            {highRiskSchools.length}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-sm text-gray-500">Principal Vacancies</p>
          <h2 className="text-3xl font-bold">2</h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-sm text-gray-500">Retention Risks</p>
          <h2 className="text-3xl font-bold">4</h2>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-semibold mb-4">
          School Risk Rankings
        </h2>

        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="pb-3">School</th>
              <th className="pb-3">Risk Score</th>
              <th className="pb-3">Primary Issue</th>
              <th className="pb-3">Principal Status</th>
            </tr>
          </thead>

          <tbody>
            {districtPortfolio.map((school) => (
              <tr key={school.id} className="border-b">
                <td className="py-4">{school.schoolName}</td>
                <td>{school.riskScore}</td>
                <td>{school.primaryIssue}</td>
                <td>{school.principalStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
