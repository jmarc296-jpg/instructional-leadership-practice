export default function PriorityBadge({ level }: { level: string }) {
  const map: any = {
    Immediate: "bg-black text-white",
    High: "bg-neutral-800 text-white",
    Moderate: "bg-neutral-200 text-black"
  };

  return (
    <span className={`px-3 py-1 text-xs rounded ${map[level]}`}>
      {level}
    </span>
  );
}
