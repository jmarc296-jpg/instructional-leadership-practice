export default function ActionEngine() {
  const items = [
    {
      campus: "Campus 01",
      action: "Enforce weekly walkthrough minimums",
      owner: "Principal Supervisor",
      risk: "Immediate",
    },
    {
      campus: "Campus 02",
      action: "Launch retention intervention cycle",
      owner: "CAO + Talent",
      risk: "High",
    },
    {
      campus: "Campus 03",
      action: "Activate assistant principal pipeline",
      owner: "Human Capital",
      risk: "Moderate",
    },
  ];

  return (
    <div className="mt-6 divide-y">
      {items.map((i, idx) => (
        <div key={idx} className="py-4 flex justify-between items-start">
          
          <div>
            <div className="flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full ${
                  i.risk === "Immediate"
                    ? "bg-red-600"
                    : i.risk === "High"
                    ? "bg-orange-500"
                    : "bg-yellow-400"
                }`}
              />
              <p className="text-xs text-neutral-400 uppercase tracking-widest">
                {i.campus}
              </p>
            </div>

            <p className="text-base font-semibold mt-1">
              {i.action}
            </p>

            <p className="text-sm text-neutral-500 mt-1">
              {i.owner}
            </p>
          </div>

          <div className="text-right">
            <p className="text-xs text-neutral-400 uppercase">
              Risk
            </p>
            <p className="text-sm font-semibold mt-1">
              {i.risk}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
