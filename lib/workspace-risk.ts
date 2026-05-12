import { normalizeRiskLevel as normalize } from "@/lib/workspace-standards";

export function normalizeRiskLevel(value: string | null | undefined): "LOW" | "MEDIUM" | "HIGH" | "UNKNOWN" {
  const normalized = normalize(value);
  if (normalized === "LOW" || normalized === "MEDIUM" || normalized === "HIGH") return normalized;
  return "UNKNOWN";
}
