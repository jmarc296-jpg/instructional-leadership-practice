import {
  type ExecutiveQueueItem,
  type ExecutiveQueueSummary,
} from "@/lib/interpretation/executive-queues";

type ExecutiveQueueCenterProps = {
  items: ExecutiveQueueItem[];
  summary: ExecutiveQueueSummary;
};

export default function ExecutiveQueueCenter({
  items,
  summary,
}: ExecutiveQueueCenterProps) {
  return (
    <section className="rounded-[2rem] border border-[#D8E3F7] bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#0D6EFD]">
              Executive Queue Orchestration
            </p>

            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-[#071B4D]">
              Unresolved Governance Exposure
            </h2>
          </div>

          <div className="rounded-full border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#071B4D]">
            {summary.queueHealth} queue health
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-5">
          <Metric label="Total" value={summary.totalItems} />
          <Metric label="Critical" value={summary.criticalItems} />
          <Metric label="Escalations" value={summary.escalationItems} />
          <Metric label="Verification" value={summary.verificationItems} />
          <Metric label="Superintendent" value={summary.superintendentReviewItems} />
        </div>

        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl border border-[#E2E8F0] bg-[#F8FAFC] p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-[#071B4D]">
                    {item.title}
                  </p>

                  <p className="mt-2 text-sm leading-6 text-[#475569]">
                    {item.operationalSummary}
                  </p>
                </div>

                <div className="rounded-full border border-[#D8E3F7] bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#071B4D]">
                  {item.priority}
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs uppercase tracking-[0.14em] text-[#64748B]">
                <span>{item.queueType.replace("-", " ")}</span>
                <span>{item.owner}</span>
              </div>
            </div>
          ))}
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
  value: number;
}) {
  return (
    <div className="rounded-3xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#64748B]">
        {label}
      </p>

      <p className="mt-2 text-2xl font-bold text-[#071B4D]">
        {value}
      </p>
    </div>
  );
}
