import Image from "next/image";
import Link from "next/link";

export default function TopNav() {
  return (
    <header className="flex items-center justify-between">
      <Link href="/" className="flex items-center gap-4">
        <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-[#D6E2F5] bg-white shadow-[0_10px_30px_rgba(7,27,77,0.08)]">
          <Image
            src="/logo.png"
            alt="LeadSharper logo"
            width={96}
            height={96}
            priority
            className="h-20 w-20 scale-[1.75] object-contain"
          />
        </div>

        <div className="leading-none">
          <p className="text-base font-semibold tracking-[0.24em] text-[#0D6EFD]">
            LEADSHARPER
          </p>
          <p className="mt-2 text-sm font-medium text-[#5D6B85]">
            Leadership Intelligence Platform
          </p>
        </div>
      </Link>

      <nav className="hidden items-center gap-7 text-sm font-medium text-[#5D6B85] md:flex">
        <a href="#workflow" className="hover:text-[#071B4D]">System</a>
        <a href="#pilot" className="hover:text-[#071B4D]">Pilot</a>
        <Link href="/demo/run" className="rounded-full bg-[#071B4D] px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#0D6EFD]">
          Enter Demo
        </Link>
      </nav>
    </header>
  );
}
