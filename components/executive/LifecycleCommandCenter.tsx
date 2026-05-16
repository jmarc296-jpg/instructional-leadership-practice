import ExecutiveSurface from "@/components/executive/ExecutiveSurface";

type LifecycleCommandCenterProps = {
  currentStage: string;
  nextStage?: string | null;
  lifecycleStatus: string;
  agingRisk: string;
  executiveSummary: string;
  requiredAction: string;
};

function formatStage(value?: string | null) {
  return value ? value.replace("-", " ") : "Closed";
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
    <ExecutiveSurface
      eyebrow="Lifecycle Orchestration"
      title="Executive Containment Workflow"
      status={`${agingRisk} aging risk`}
    >
      <div className="grid gap-4 md:grid-cols-3">
        <Metric label="Current Stage" value={formatStage(currentStage)} />
        <Metric label="Next Stage" value={formatStage(nextStage)} />
        <Metric label="Lifecycle Status" value={lifecycleStatus} />
      </div>

      <div className="mt-6 rounded-[1.75rem] border border-[#D8E3F7] bg-[#F7FAFF] p-6 transition-all duration-200 hover:border-[#BFD3F2]">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#64748B]">
          Executive Summary
        </p>

        <p className="mt-3 text-sm leading-6 text-[#071B4D]">
          {executiveSummary}
        </p>
      </div>

      <div className="mt-6 rounded-[1.75rem] bg-[#071B4D] p-6 text-white">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#CBD5E1]">
          Required Action
        </p>

        <p className="mt-3 text-sm leading-6">
          {requiredAction}
        </p>
      </div>
    </ExecutiveSurface>
  );
}

function Metric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[1.5rem] border border-[#E2E8F0] bg-[#F8FAFC] p-5">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#64748B]">
        {label}
      </p>

      <p className="mt-2 text-base font-semibold tracking-[-0.02em] capitalize text-[#071B4D]">
        {value}
      </p>
    </div>
  );
}
