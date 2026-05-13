"use client";

import Link from "next/link";
import { LeadSharperLogo } from "@/components/brand/leadsharper-logo";
import { useMemo, useState } from "react";

type Stage = {
  key: string;
  label: string;
  question: string;
  title: string;
  body: string;
  decision: string;
  evidence: string[];
  next: string;
  impact?: string[];
  remaining?: string;
};

const stages: Stage[] = [
  {
    key: "detect",
    label: "Detect",
    question: "What is the system telling you right now?",
    title: "Risk is emerging before the district is forced to react.",
    body: "The signal is not one isolated data point. It is a pattern across instructional execution, follow-through, and school stability.",
    decision: "Confirm elevated leadership risk.",
    evidence: [
      "Grade 9 Algebra proficiency dropped 18% across two units.",
      "Checks for understanding are inconsistent across observed classrooms.",
      "Reteach follow-through is not showing up in weekly evidence."
    ],
    next: "Move from signal recognition to support prescription."
  },
  {
    key: "prescribe",
    label: "Prescribe",
    question: "What response matches this risk pattern?",
    title: "The leader needs targeted support, not generic coaching.",
    body: "The system translates the pattern into a precise response.",
    decision: "Launch a 3-week instructional execution support cycle.",
    evidence: [
      "Primary issue is execution consistency.",
      "Focus on CFU quality and reteach planning.",
      "Weekly monitoring required."
    ],
    next: "Move from recommendation to ownership."
  },
  {
    key: "execute",
    label: "Execute",
    question: "Who owns the next move?",
    title: "Every decision needs an owner and timeline.",
    body: "LeadSharper converts decision into accountable execution.",
    decision: "Assign principal supervisor + math instructional coach.",
    evidence: [
      "Supervisor owns coaching cycle.",
      "IC owns evidence collection.",
      "Principal owns implementation."
    ],
    next: "Move from action to record."
  },
  {
    key: "report",
    label: "Report",
    question: "What should cabinet know next?",
    title: "Cabinet receives a concise decision record.",
    body: "System shows what changed and whatÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¾ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢s next.",
    decision: "Review stability after 3 weeks.",
    evidence: [
      "Risk documented.",
      "Action assigned.",
      "Evidence defined."
    ],
    impact: [
      "+ CFU consistency increased",
      "+ Exit ticket mastery improved 42% ? 68%",
      "+ Reteach execution observed"
    ],
    remaining: "Moderate ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â continue support cycle.",
    next: "Decision cycle complete."
  }
];

export default function DemoRunPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [captureStatus, setCaptureStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  const active = stages[activeIndex];
  const isFinal = activeIndex === stages.length - 1;
  const progress = useMemo(() => `${activeIndex + 1} of ${stages.length}`, [activeIndex]);

  async function captureSignal() {
    setCaptureStatus("saving");

    const response = await fetch("/api/capture-signal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        schoolName: "Pilot District",
        leaderName: "Grade 9 Leadership Signal",
        severity: "high",
        summary: `${stages[0].evidence[0]} ${active.decision} Evidence: ${active.evidence.join(" | ")}`
      })
    });

    setCaptureStatus(response.ok ? "saved" : "error");
  }

  return (
    <main className="min-h-screen bg-[#050B18] text-white">
      <header className="border-b border-white/10 bg-[#071B4D]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-4 rounded-2xl bg-white px-6 py-4 shadow-[0_18px_45px_rgba(0,0,0,0.18)] ring-1 ring-white/20">
            <LeadSharperLogo
              size="lg"
              imageClassName="h-14 w-auto object-contain"
            />
            <div className="hidden h-12 w-px bg-slate-200 sm:block" />
            <div className="hidden sm:block">
              <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[#071B4D]">
                LeadSharper
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-600">
                Instructional leadership intelligence for district teams
              </p>
            </div>
          </div>

          <span className="text-xs text-[#C9D8F2]">{progress}</span>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8DB7FF]">
          Guided Executive Flow
        </p>

        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em]">
          {active.question}
        </h1>

        <div className="mt-8 grid gap-6 rounded-[2rem] border border-white/10 bg-white p-7 text-[#071B4D] lg:grid-cols-[1fr_0.75fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#0D6EFD]">
              {active.label}
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.045em]">
              {active.title}
            </h2>

            <p className="mt-4 text-base leading-7 text-[#4E5D78]">
              {active.body}
            </p>

            <div className="mt-6 space-y-3">
              {active.evidence.map((item) => (
                <div key={item} className="rounded-2xl border border-[#E6EDF8] bg-[#F7FAFF] p-4 text-sm text-[#4E5D78]">
                  {item}
                </div>
              ))}
            </div>

            {active.impact && (
              <div className="mt-6 rounded-2xl border border-[#0D6EFD] bg-[#EAF1FF] p-5">
                <p className="font-semibold text-[#071B4D]">What changed</p>
                <div className="mt-3 space-y-2">
                  {active.impact.map((item) => (
                    <p key={item} className="text-sm font-semibold text-[#0D6EFD]">{item}</p>
                  ))}
                </div>
                <p className="mt-4 text-sm font-semibold text-[#071B4D]">
                  Remaining Risk: <span className="text-[#B35C00]">{active.remaining}</span>
                </p>
              </div>
            )}
          </div>

          <div className="rounded-3xl bg-[#071B4D] p-6 text-white">
            <p className="text-sm font-semibold text-[#8DB7FF]">Executive decision</p>
            <p className="mt-4 text-2xl font-semibold tracking-[-0.03em]">
              {active.decision}
            </p>
            <p className="mt-5 text-sm leading-6 text-[#C9D8F2]">
              {active.next}
            </p>

            <button
              type="button"
              onClick={captureSignal}
              disabled={captureStatus === "saving"}
              className="mt-8 w-full rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#071B4D] hover:bg-[#EAF1FF] disabled:opacity-50"
            >
              {captureStatus === "saving"
                ? "Capturing Signal..."
                : captureStatus === "saved"
                  ? "Signal Captured"
                  : "Capture Signal"}
            </button>

            {captureStatus === "saved" && (
              <p className="mt-4 text-sm font-semibold text-[#7EE2A8]">
                Live capture confirmed.
              </p>
            )}

            {captureStatus === "error" && (
              <p className="mt-4 text-sm font-semibold text-[#F7B955]">
                Capture failed. Check endpoint.
              </p>
            )}
          </div>
        </div>

        <div className="mt-8 flex justify-between">
          <button
            onClick={() => setActiveIndex(Math.max(0, activeIndex - 1))}
            disabled={activeIndex === 0}
            className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold disabled:opacity-35"
          >
            Back
          </button>

          <button
            onClick={() => setActiveIndex(Math.min(stages.length - 1, activeIndex + 1))}
            disabled={isFinal}
            className="rounded-full bg-white px-7 py-3 text-sm font-semibold text-[#071B4D] disabled:opacity-45"
          >
            {isFinal ? "Decision Cycle Complete" : "Continue"}
          </button>
        </div>
      </section>
    </main>
  );
}


