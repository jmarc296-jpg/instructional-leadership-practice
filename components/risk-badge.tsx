export default function RiskBadge({ level }: { level: string }) {
  const map: any = {
    Immediate: "bg-red-600 text-white",
    High: "bg-orange-500 text-white",
    Moderate: "bg-yellow-400 text-black",
    Low: "bg-green-500 text-white"
  };

  return (
    <span className={`px-3 py-1 text-xs font-semibold rounded ${map[level]}`}>
      {level}
    </span>
  );
}
