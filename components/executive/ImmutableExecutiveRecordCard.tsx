import { type ImmutableExecutiveRecord } from "@/lib/interpretation/immutable-executive-records";
import ExecutiveSurface from "@/components/executive/ExecutiveSurface";

type ImmutableExecutiveRecordCardProps = {
  record: ImmutableExecutiveRecord;
};

export default function ImmutableExecutiveRecordCard({
  record,
}: ImmutableExecutiveRecordCardProps) {
  return (
    <ExecutiveSurface
      eyebrow="Immutable Executive Record"
      title="Institutional Accountability Ledger"
      status="immutable"
    >
      <div className="flex flex-col gap-6">
        <div className="grid gap-4 md:grid-cols-2">
          <Metric label="Lifecycle Stage" value={record.lifecycleStage} />
          <Metric label="Escalation Level" value={record.escalationLevel} />
          <Metric label="Executive Owner" value={record.executiveOwner} />
          <Metric label="Created" value={record.createdAt} />
        </div>

        <div className="rounded-[1.75rem] border border-[#E2E8F0] bg-[#F8FAFC] p-6 transition-all duration-200 hover:border-[#BFD3F2]">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#64748B]">
            Executive Action Summary
          </p>

          <p className="mt-3 text-sm leading-6 text-[#071B4D]">
            {record.actionSummary}
          </p>
        </div>

        <div className="rounded-[1.75rem] border border-[#E2E8F0] bg-[#F8FAFC] p-6 transition-all duration-200 hover:border-[#BFD3F2]">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#64748B]">
            Executive Rationale
          </p>

          <p className="mt-3 text-sm leading-6 text-[#071B4D]">
            {record.rationale}
          </p>
        </div>

        <div className="rounded-[1.75rem] bg-[#071B4D] p-6 text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#CBD5E1]">
            Immutable Audit Hash
          </p>

          <p className="mt-3 break-all font-mono text-sm">
            {record.immutableHash}
          </p>
        </div>
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

      <p className="mt-2 text-base font-semibold tracking-[-0.02em] text-[#071B4D]">
        {value}
      </p>
    </div>
  );
}
