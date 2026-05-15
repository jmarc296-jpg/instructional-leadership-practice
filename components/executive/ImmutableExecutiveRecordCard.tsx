import { type ImmutableExecutiveRecord } from "@/lib/interpretation/immutable-executive-records";

type ImmutableExecutiveRecordCardProps = {
  record: ImmutableExecutiveRecord;
};

export default function ImmutableExecutiveRecordCard({
  record,
}: ImmutableExecutiveRecordCardProps) {
  return (
    <section className="rounded-[2rem] border border-[#D8E3F7] bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#0D6EFD]">
              Immutable Executive Record
            </p>

            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-[#071B4D]">
              Executive Audit Lineage
            </h2>
          </div>

          <div className="rounded-full border border-[#D8E3F7] bg-[#F8FAFC] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#071B4D]">
            immutable
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Metric label="Lifecycle Stage" value={record.lifecycleStage} />
          <Metric label="Escalation Level" value={record.escalationLevel} />
          <Metric label="Executive Owner" value={record.executiveOwner} />
          <Metric label="Created" value={record.createdAt} />
        </div>

        <div className="rounded-3xl border border-[#E2E8F0] bg-[#F8FAFC] p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#64748B]">
            Executive Action Summary
          </p>

          <p className="mt-3 text-sm leading-6 text-[#071B4D]">
            {record.actionSummary}
          </p>
        </div>

        <div className="rounded-3xl border border-[#E2E8F0] bg-[#F8FAFC] p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#64748B]">
            Executive Rationale
          </p>

          <p className="mt-3 text-sm leading-6 text-[#071B4D]">
            {record.rationale}
          </p>
        </div>

        <div className="rounded-3xl bg-[#071B4D] p-5 text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#CBD5E1]">
            Immutable Audit Hash
          </p>

          <p className="mt-3 break-all font-mono text-sm">
            {record.immutableHash}
          </p>
        </div>
      </div>
    </section>
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
    <div className="rounded-3xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#64748B]">
        {label}
      </p>

      <p className="mt-2 text-sm font-semibold text-[#071B4D]">
        {value}
      </p>
    </div>
  );
}
