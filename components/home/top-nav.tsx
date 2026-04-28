import Image from "next/image"

export function TopNav() {
  return (
    <nav className="flex items-center justify-between py-6">
      <div className="flex items-center">
        <Image
          src="/logo.png"
          alt="LeadSharper"
          width={170}
          height={50}
          priority
          className="h-auto w-auto"
        />
      </div>
    </nav>
  )
}
