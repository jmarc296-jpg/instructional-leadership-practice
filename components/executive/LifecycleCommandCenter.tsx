type LifecycleCommandCenterProps = {
  currentStage: string;
  nextStage?: string | null;
  lifecycleStatus: string;
  agingRisk: string;
  executiveSummary: string;
  requiredAction: string;
};

function getRiskStyles(risk: string) {
  switch (risk) {
    case "critical":
      return "border-red-200 bg-red-50 text-red-800";
    case "elevated":
      return "border-amber-200 bg-amber-50 text-amber-800";
    default:
      return "border-emerald-200 bg-emerald-50 text-emerald-800";
  }
}

export default function LifecycleCommandCenter({
  currentStage,
  nextStage,
  lifecycleStatus,
  agingRisk,
  executiveSummary,
  requiredAction,
}: LifecycleCommandCenterProps) {
  return (
    <section className="rounded-[2rem] border border-[#D8E3F7] bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#0D6EFD]">
              Lifecycle Orchestration
            </p>

            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-[#071B4D]">
              Executive Containment Workflow
            </h2>
          </div>

          <div
            className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] ${getRiskStyles(
              agingRisk
            )}`}
          >
            {agingRisk} aging risk
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-[#E2E8F0] bg-[#F8FAFC] p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#64748B]">
              Current Stage
            </p>

            <p className="mt-3 text-lg font-bold capitalize text-[#071B4D]">
              {currentStage.replace("-", " ")}
            </p>
          </div>

          <div className="rounded-3xl border border-[#E2E8F0] bg-[#F8FAFC] p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#64748B]">
              Next Stage
            </p>

            <p className="mt-3 text-lg font-bold capitalize text-[#071B4D]">
              {nextStage ? nextStage.replace("-", " ") : "Closed"}
            </p>
          </div>

          <div className="rounded-3xl border border-[#E2E8F0] bg-[#F8FAFC] p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#64748B]">
              Lifecycle Status
            </p>

            <p className="mt-3 text-lg font-bold capitalize text-[#071B4D]">
              {lifecycleStatus}
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-[#D8E3F7] bg-[#F7FAFF] p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#64748B]">
            Executive Summary
          </p>

          <p className="mt-3 text-sm leading-6 text-[#071B4D]">
            {executiveSummary}
          </p>
        </div>

        <div className="rounded-3xl bg-[#071B4D] p-6 text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#CBD5E1]">
            Required Action
          </p>

          <p className="mt-3 text-sm leading-6">
            {requiredAction}
          </p>
        </div>
      </div>
    </section>
  );
}
