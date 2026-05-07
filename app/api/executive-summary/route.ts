import { NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";

type SignalRow = {
  id: string;
  created_at: string;
  school_name: string | null;
  leader_name: string | null;
  severity: string | null;
  summary: string | null;
  owner: string | null;
  evidence_status: string | null;
  recommended_action: string | null;
  recommendedAction: string | null;
};

const themeKeywords: Array<{ theme: string; keywords: string[] }> = [
  { theme: "staffing instability", keywords: ["vacancy", "vacancies", "turnover", "attrition", "staffing"] },
  { theme: "instructional leadership", keywords: ["instruction", "coaching", "observation", "curriculum", "teaching"] },
  { theme: "climate and culture", keywords: ["climate", "culture", "discipline", "attendance", "morale"] },
  { theme: "performance decline", keywords: ["achievement", "growth", "proficiency", "decline", "performance"] },
  { theme: "compliance risk", keywords: ["compliance", "audit", "deadline", "reporting", "policy"] }
];

function normalizeSeverity(value: string | null | undefined) {
  const level = (value ?? "").toLowerCase();
  if (level === "high" || level === "medium" || level === "low") return level;
  return "low";
}

function findTopTheme(rows: SignalRow[]) {
  const counts = new Map<string, number>();

  for (const row of rows) {
    const text = (row.summary ?? "").toLowerCase();
    let matched = false;

    for (const group of themeKeywords) {
      if (group.keywords.some((keyword) => text.includes(keyword))) {
        counts.set(group.theme, (counts.get(group.theme) ?? 0) + 1);
        matched = true;
      }
    }

    if (!matched && text.trim()) {
      counts.set("leadership execution risk", (counts.get("leadership execution risk") ?? 0) + 1);
    }
  }

  if (counts.size === 0) {
    return "leadership execution risk";
  }

  return [...counts.entries()].sort((a, b) => b[1] - a[1])[0][0];
}

function generateExecutiveNarrative(rows: SignalRow[]) {
  if (rows.length === 0) {
    return "No leadership risk signals have been captured yet. Superintendent directive: initiate district evidence intake immediately to establish baseline risk, ownership, and follow-through expectations.";
  }

  const highRiskRows = rows.filter((row) => normalizeSeverity(row.severity) === "high");
  const mediumRiskRows = rows.filter((row) => normalizeSeverity(row.severity) === "medium");

  const concentratedRows = highRiskRows.length > 0 ? highRiskRows : mediumRiskRows.length > 0 ? mediumRiskRows : rows;
  const concentratedSchools = new Set(concentratedRows.map((row) => row.school_name?.trim() || "Unknown school"));

  const topTheme = findTopTheme(rows);

  const missingActionCount = rows.filter((row) => {
    const recommended = (row.recommended_action ?? row.recommendedAction ?? "").trim();
    return recommended.length === 0;
  }).length;

  const missingOwnerCount = rows.filter((row) => !(row.owner ?? "").trim()).length;

  const missingEvidenceCount = rows.filter((row) => {
    const status = (row.evidence_status ?? "").trim().toLowerCase();
    return status === "" || status === "not started" || status === "missing";
  }).length;

  const primaryGap = missingOwnerCount >= missingActionCount ? "assigned follow-through" : "recommended action plans";
  const actionRole = highRiskRows.length > 0 ? "network superintendent and cabinet chiefs" : "cabinet principals' supervisors";
  const timeframe = highRiskRows.length > 0 ? "48 hours" : "5 business days";

  return `High-risk signals are concentrated in ${concentratedSchools.size} schools, primarily driven by ${topTheme}. ${missingOwnerCount > 0 || missingActionCount > 0 ? `Most signals lack ${primaryGap}, indicating a breakdown in execution (${missingOwnerCount} without owners, ${missingActionCount} without recommended action).` : "Execution assignments are in place, but require close monitoring for completion."} ${missingEvidenceCount > 0 ? `Evidence submission is not being documented on ${missingEvidenceCount} signals.` : "Evidence documentation is currently being maintained across active signals."} Immediate superintendent action: assign ownership to ${actionRole} and require evidence submission within ${timeframe}.`;
}

export async function GET() {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return NextResponse.json({
      ok: false,
      source: "configuration-missing",
      totalSignals: 0,
      highRisk: 0,
      mediumRisk: 0,
      lowRisk: 0,
      recentSignals: [],
      executiveNarrative:
        "Supabase is not configured. Superintendent directive: restore data connection to enable leadership risk, execution, and evidence oversight."
    });
  }

  const { data, error } = await supabase
    .from("leadership_signals")
    .select("id, created_at, school_name, leader_name, severity, summary, owner, evidence_status, recommended_action, recommendedAction")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({
      ok: false,
      source: "supabase-error",
      totalSignals: 0,
      highRisk: 0,
      mediumRisk: 0,
      lowRisk: 0,
      recentSignals: [],
      executiveNarrative:
        "Leadership signals could not be retrieved. Superintendent directive: resolve data access immediately and re-run executive review.",
      error: error.message
    });
  }

  const rows = (data ?? []) as SignalRow[];
  const highRisk = rows.filter((row) => normalizeSeverity(row.severity) === "high").length;
  const mediumRisk = rows.filter((row) => normalizeSeverity(row.severity) === "medium").length;
  const lowRisk = rows.filter((row) => normalizeSeverity(row.severity) === "low").length;

  return NextResponse.json({
    ok: true,
    source: "supabase",
    totalSignals: rows.length,
    highRisk,
    mediumRisk,
    lowRisk,
    recentSignals: rows.slice(0, 5),
    executiveNarrative: generateExecutiveNarrative(rows)
  });
}
