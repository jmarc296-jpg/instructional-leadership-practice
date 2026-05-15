export type ExecutiveQueueItem = {
  id: string;
  queueType:
    | "verification"
    | "escalation"
    | "containment"
    | "superintendent-review"
    | "aging-risk";
  priority: "low" | "moderate" | "high" | "critical";
  title: string;
  operationalSummary: string;
  owner: string;
};

export type ExecutiveQueueSummary = {
  totalItems: number;
  criticalItems: number;
  escalationItems: number;
  verificationItems: number;
  superintendentReviewItems: number;
  queueHealth: "stable" | "elevated" | "critical";
};

type QueueInput = {
  signalId: string;
  schoolName?: string | null;
  moduleTitle?: string | null;
  pressureLevel?: string | null;
  lifecycleStage?: string | null;
  agingRisk?: string | null;
};

function normalize(value?: string | null) {
  return (value ?? "").trim().toLowerCase();
}

export function buildExecutiveQueues(inputs: QueueInput[]) {
  const queueItems: ExecutiveQueueItem[] = [];

  for (const input of inputs) {
    const pressureLevel = normalize(input.pressureLevel);
    const lifecycleStage = normalize(input.lifecycleStage);
    const agingRisk = normalize(input.agingRisk);

    const highRisk =
      pressureLevel === "critical" ||
      agingRisk === "critical";

    const elevatedRisk =
      pressureLevel === "elevated" ||
      agingRisk === "elevated";

    if (
      lifecycleStage.includes("verification") ||
      lifecycleStage.includes("evidence")
    ) {
      queueItems.push({
        id: `${input.signalId}-verification`,
        queueType: "verification",
        priority: elevatedRisk ? "high" : "moderate",
        title: `${input.moduleTitle} verification pending`,
        operationalSummary:
          "Evidence verification remains unresolved within the containment workflow.",
        owner: "District Verification Owner",
      });
    }

    if (highRisk) {
      queueItems.push({
        id: `${input.signalId}-superintendent`,
        queueType: "superintendent-review",
        priority: "critical",
        title: `${input.schoolName} requires superintendent review`,
        operationalSummary:
          "Governance exposure has exceeded normal containment thresholds.",
        owner: "Superintendent",
      });
    }

    if (pressureLevel === "critical") {
      queueItems.push({
        id: `${input.signalId}-escalation`,
        queueType: "escalation",
        priority: "critical",
        title: `${input.moduleTitle} escalation active`,
        operationalSummary:
          "Escalation pressure remains unresolved and requires executive intervention.",
        owner: "Cabinet Designee",
      });
    }

    if (agingRisk === "critical") {
      queueItems.push({
        id: `${input.signalId}-aging`,
        queueType: "aging-risk",
        priority: "high",
        title: `${input.moduleTitle} aging containment risk`,
        operationalSummary:
          "Containment workflow aging is increasing institutional exposure.",
        owner: "Executive Operations",
      });
    }
  }

  const summary: ExecutiveQueueSummary = {
    totalItems: queueItems.length,
    criticalItems: queueItems.filter(
      (item) => item.priority === "critical"
    ).length,
    escalationItems: queueItems.filter(
      (item) => item.queueType === "escalation"
    ).length,
    verificationItems: queueItems.filter(
      (item) => item.queueType === "verification"
    ).length,
    superintendentReviewItems: queueItems.filter(
      (item) => item.queueType === "superintendent-review"
    ).length,
    queueHealth:
      queueItems.filter((item) => item.priority === "critical").length >= 3
        ? "critical"
        : queueItems.length >= 5
          ? "elevated"
          : "stable",
  };

  return {
    queueItems,
    summary,
  };
}
