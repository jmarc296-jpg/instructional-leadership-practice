type ExecutiveSurfaceProps = {
  eyebrow: string;
  title: string;
  status?: string;
  children: React.ReactNode;
};

export default function ExecutiveSurface({
  eyebrow,
  title,
  status,
  children,
}: ExecutiveSurfaceProps) {
  return (
    <section className="rounded-[2rem] border border-[#D8E3F7] bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#0D6EFD]">
            {eyebrow}
          </p>

          <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-[#071B4D]">
            {title}
          </h2>
        </div>

        {status && (
          <div className="rounded-full border border-[#D8E3F7] bg-[#F8FAFC] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#071B4D]">
            {status}
          </div>
        )}
      </div>

      {children}
    </section>
  );
}
