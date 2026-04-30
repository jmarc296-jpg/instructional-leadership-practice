export default function SummaryBar() {
  return (
    <div className="flex gap-10 mb-6 text-sm">
      <div>
        <p className="text-neutral-400 uppercase text-xs">Critical</p>
        <p className="font-semibold">1 campus</p>
      </div>

      <div>
        <p className="text-neutral-400 uppercase text-xs">At Risk</p>
        <p className="font-semibold">2 campuses</p>
      </div>

      <div>
        <p className="text-neutral-400 uppercase text-xs">Monitoring</p>
        <p className="font-semibold">3 total</p>
      </div>
    </div>
  );
}
