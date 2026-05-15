import { type GovernanceReplayTimeline } from "@/lib/interpretation/governance-replay";
import ExecutiveSurface from "@/components/executive/ExecutiveSurface";

type GovernanceReplayTimelineProps = {
  timeline: GovernanceReplayTimeline;
};

export default function GovernanceReplayTimeline({
  timeline,
}: GovernanceReplayTimelineProps) {
  return (
    <ExecutiveSurface
      eyebrow="Executive Governance Replay"
      title="Operational Decision Chronology"
      status={timeline.unresolved ? "open" : "contained"}
    >
      <div className="flex flex-col gap-6">

        <div className="grid gap-4 md:grid-cols-3">
          <Metric label="Replay Events" value={String(timeline.totalEvents)} />
          <Metric label="Current Stage" value={timeline.currentStage} />
          <Metric label="Highest Escalation" value={timeline.highestEscalation} />
        </div>

        <div className="rounded-3xl border border-[#D8E3F7] bg-[#F7FAFF] p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#64748B]">
            Replay Narrative
          </p>

          <p className="mt-3 text-sm leading-6 text-[#071B4D]">
            {timeline.replayNarrative}
          </p>
        </div>

        <div className="space-y-4">
          {timeline.events.map((event) => (
            <article
              key={event.id}
              className="rounded-[1.75rem] border border-[#E2E8F0] bg-[#F8FAFC] p-6 transition-all duration-200 hover:border-[#BFD3F2]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#64748B]">
                    Sequence {event.sequence}
                  </p>

                  <h3 className="mt-2 text-lg font-bold capitalize text-[#071B4D]">
                    {event.stage.replace("-", " ")}
                  </h3>
                </div>

                <span className="rounded-full border border-[#D8E3F7] bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#071B4D]">
                  {event.escalationLevel}
                </span>
              </div>

              <p className="mt-3 text-sm leading-6 text-[#475569]">
                {event.rationale}
              </p>

              <div className="mt-4 grid gap-3 text-xs uppercase tracking-[0.14em] text-[#64748B] md:grid-cols-2">
                <span>Owner: {event.executiveOwner}</span>
                <span>Timestamp: {event.timestamp}</span>
              </div>

              <p className="mt-4 break-all rounded-2xl bg-white p-3 font-mono text-xs text-[#071B4D]">
                {event.immutableHash}
              </p>
            </article>
          ))}
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

      <p className="mt-2 text-base font-semibold tracking-[-0.02em] capitalize text-[#071B4D]">
        {value}
      </p>
    </div>
  );
}

