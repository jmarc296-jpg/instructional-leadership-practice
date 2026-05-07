type LeadSharperLogoProps = {
  className?: string
  size?: "sm" | "md" | "lg"
}

export function LeadSharperLogo({ className = "", size = "md" }: LeadSharperLogoProps) {
  const boxSize = size === "lg" ? "h-11 w-11" : size === "sm" ? "h-8 w-8" : "h-9 w-9"

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={`flex ${boxSize} items-center justify-center rounded-xl bg-[#071B4D] text-sm font-bold text-white`}>
        LS
      </div>
      <div className="leading-tight">
        <div className="text-sm font-bold text-[#071B4D]">LeadSharper</div>
        <div className="text-xs text-slate-500">Leadership Intelligence</div>
      </div>
    </div>
  )
}
