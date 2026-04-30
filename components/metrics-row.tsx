export function MetricsRow() {
  return (
    <div className="grid grid-cols-4 gap-6 mb-10">
      <div className="bg-white p-6 rounded-xl shadow">
        <p className="text-sm text-gray-500">Immediate Actions</p>
        <h2 className="text-3xl font-bold">12</h2>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <p className="text-sm text-gray-500">Leadership Risk</p>
        <h2 className="text-3xl font-bold">4</h2>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <p className="text-sm text-gray-500">Bench Ready</p>
        <h2 className="text-3xl font-bold">7</h2>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <p className="text-sm text-gray-500">Impact at Risk</p>
        <h2 className="text-3xl font-bold">$2.1M</h2>
      </div>
    </div>
  );
}
