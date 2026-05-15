type InterpretationTransparencyProps = {
  moduleTitle: string;
  operationalDomain: string;
  executiveQuestion: string;
  governanceConcern: string;
  operationalIndicators: string[];
  escalationTriggers: string[];
  auditExposure: string;
  recommendedExecutiveAction: string;
  accountabilityWindow: string;
  confidencePosture?: string;
  pressureLevel?: string;
  evidenceConfidence?: string;
  interventionTiming?: string;
  pressureScore?: number;
  escalationRationale?: string;
};

export default function InterpretationTransparency({
  moduleTitle,
  operationalDomain,
  executiveQuestion,
  governanceConcern,
  operationalIndicators,
  escalationTriggers,
  auditExposure,
  recommendedExecutiveAction,
  accountabilityWindow,
  confidencePosture,
  pressureLevel,
  evidenceConfidence,
  interventionTiming,
  pressureScore,
  escalationRationale,
}: InterpretationTransparencyProps) {
  return (
    <section className="rounded-[2rem] border border-[#D8E3F7] bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#0D6EFD]">
            Interpretation Transparency
          </p>

          <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-[#071B4D]">
            {moduleTitle}
          </h2>

          <p className="mt-3 text-sm leading-6 text-[#475569]">
            Operational Domain: {operationalDomain}
          </p>

          {pressureLevel && (
            <div className="mt-5 grid gap-3 md:grid-cols-4">
              <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#64748B]">Pressure</p>
                <p className="mt-2 text-lg font-bold capitalize text-[#071B4D]">{pressureLevel}</p>
              </div>
              <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#64748B]">Evidence</p>
                <p className="mt-2 text-lg font-bold capitalize text-[#071B4D]">{evidenceConfidence}</p>
              </div>
              <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#64748B]">Timing</p>
                <p className="mt-2 text-lg font-bold capitalize text-[#071B4D]">{interventionTiming}</p>
              </div>
              <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#64748B]">Score</p>
                <p className="mt-2 text-lg font-bold text-[#071B4D]">{pressureScore ?? 0}/100</p>
              </div>
            </div>
          )}

          {escalationRationale && (
            <div className="mt-4 rounded-2xl border border-[#FACC15]/40 bg-[#FEFCE8] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#854D0E]">
                Escalation Rationale
              </p>
              <p className="mt-2 text-sm leading-6 text-[#713F12]">
                {escalationRationale}
              </p>
            </div>
          )}
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-3xl border border-[#E2E8F0] bg-[#F8FAFC] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#64748B]">
              Executive Question
            </p>

            <p className="mt-3 text-sm leading-6 text-[#071B4D]">
              {executiveQuestion}
            </p>
          </div>

          <div className="rounded-3xl border border-[#E2E8F0] bg-[#F8FAFC] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#64748B]">
              Governance Concern
            </p>

            <p className="mt-3 text-sm leading-6 text-[#071B4D]">
              {governanceConcern}
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#64748B]">
              Operational Indicators
            </p>

            <ul className="mt-3 space-y-2 text-sm leading-6 text-[#475569]">
              {operationalIndicators.map((indicator) => (
                <li key={indicator}>• {indicator}</li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#64748B]">
              Escalation Triggers
            </p>

            <ul className="mt-3 space-y-2 text-sm leading-6 text-[#475569]">
              {escalationTriggers.map((trigger) => (
                <li key={trigger}>• {trigger}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rounded-3xl border border-[#D8E3F7] bg-[#F7FAFF] p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#64748B]">
            Audit Exposure
          </p>

          <p className="mt-3 text-sm leading-6 text-[#071B4D]">
            {auditExposure}
          </p>
        </div>

        <div className="rounded-3xl bg-[#071B4D] p-6 text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#CBD5E1]">
            Recommended Executive Action
          </p>

          <p className="mt-3 text-sm leading-6">
            {recommendedExecutiveAction}
          </p>

          <p className="mt-4 text-xs uppercase tracking-[0.18em] text-[#CBD5E1]">
            Accountability Window: {accountabilityWindow}
          </p>
        </div>
      </div>
    </section>
  );
}



