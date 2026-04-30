export type Prescription = {
  risk: "Immediate" | "High" | "Moderate" | "Low";
  action: string;
  owner: string;
};

export function prescribeFromSignal(signal: string | null, status: string | null): Prescription {
  const normalizedSignal = String(signal || "").toLowerCase();
  const normalizedStatus = String(status || "").toLowerCase();

  if (normalizedSignal.includes("cfu") || normalizedSignal.includes("checks for understanding")) {
    return {
      risk: normalizedStatus === "not started" ? "Immediate" : "High",
      action: "Conduct three focused walkthroughs this week using a CFU evidence tracker, then review teacher-level patterns in the next leadership check-in.",
      owner: "Principal"
    };
  }

  if (normalizedSignal.includes("data") || normalizedSignal.includes("ddi")) {
    return {
      risk: normalizedStatus === "not started" ? "Immediate" : "High",
      action: "Facilitate a DDI review using current student work or assessment data, identify the highest-leverage misconception, and assign one reteach action with evidence due by the next check-in.",
      owner: "Instructional Leadership Team"
    };
  }

  if (normalizedSignal.includes("attendance")) {
    return {
      risk: normalizedStatus === "not started" ? "Immediate" : "Moderate",
      action: "Identify students driving the attendance trend, assign adult follow-up ownership, and review contact evidence within five school days.",
      owner: "Attendance Team"
    };
  }

  if (normalizedSignal.includes("swd") || normalizedSignal.includes("iep")) {
    return {
      risk: normalizedStatus === "not started" ? "Immediate" : "High",
      action: "Review SWD performance evidence, confirm scaffold implementation, and assign one monitored instructional adjustment by teacher or course.",
      owner: "Principal and Intervention Team"
    };
  }

  if (normalizedStatus === "complete") {
    return {
      risk: "Low",
      action: "Continue monitoring evidence and maintain the current follow-up cycle.",
      owner: "Principal"
    };
  }

  if (normalizedStatus === "in progress") {
    return {
      risk: "High",
      action: "Clarify the next evidence-based action step, assign an owner, and review progress in the next weekly leadership check-in.",
      owner: "Principal"
    };
  }

  return {
    risk: "Immediate",
    action: "Define the leadership action, assign an owner, and document evidence of execution before the next monitoring cycle.",
    owner: "Principal"
  };
}
