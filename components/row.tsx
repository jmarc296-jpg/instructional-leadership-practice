export default function Row({
  campus,
  action,
  owner,
  risk,
  status,
}: {
  campus: string;
  action: string;
  owner: string;
  risk: string;
  status: "Not Started" | "In Progress" | "At Risk";
}) {
  return (
    <div className="py-4 border-b flex justify-between items-start">
      
      <div>
        <div className="flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full ${
              risk === "Immediate"
                ? "bg-red-600"
                : risk === "High"
                ? "bg-orange-500"
                : "bg-yellow-400"
            }`}
          />

          <p className="text-xs uppercase tracking-widest text-neutral-400">
            {campus}
          </p>
        </div>

        <p className="text-base font-semibold mt-1">
          {action}
        </p>

        <p className="text-sm text-neutral-500 mt-1">
          {owner}
        </p>
      </div>

      <div className="text-right">
        <p className="text-xs text-neutral-400">Status</p>
        <p className="text-sm font-medium mt-1">{status}</p>
      </div>
    </div>
  );
}
