import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { createClient } from "@supabase/supabase-js"
import {
  getCabinetReviewRequired,
  getEscalationLevel,
  getSignalPressureNarrative,
  getUnresolvedDays,
} from "@/lib/signals/signal-lifecycle"

export const dynamic = "force-dynamic"

function hasSessionCookie(cookieNames: string[]) {
  return cookieNames.some((name) => {
    const lower = name.toLowerCase()

    return (
      lower === "__session" ||
      lower === "__client_uat" ||
      lower.includes("clerk") ||
      lower.includes("session")
    )
  })
}

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceRoleKey) {
    throw new Error("Missing Supabase server configuration.")
  }

  return createClient(url, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })
}

export async function GET() {
  const cookieStore = await cookies()
  const authenticated = hasSessionCookie(cookieStore.getAll().map((cookie) => cookie.name))

  if (!authenticated) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 })
  }

  try {
    const supabase = getSupabaseAdmin()

    const { data, error } = await supabase
      .from("leadership_signals")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100)

    if (error) {
      return NextResponse.json(
        { ok: false, error: "Unable to load executive snapshot." },
        { status: 500 }
      )
    }

    const signals = data ?? []

    const enrichedSignals = signals.map((signal) => ({
      ...signal,
      unresolved_days: getUnresolvedDays(signal.created_at),
      escalation_level: getEscalationLevel(signal),
      cabinet_review_required: getCabinetReviewRequired(signal),
      pressure_narrative: getSignalPressureNarrative(signal),
    }))

    const severityCounts = enrichedSignals.reduce(
      (acc, signal) => {
        const severity = String(signal.severity ?? "medium").toLowerCase()

        if (severity === "high") acc.high += 1
        else if (severity === "low") acc.low += 1
        else acc.medium += 1

        return acc
      },
      { high: 0, medium: 0, low: 0 }
    )

    const escalationCounts = enrichedSignals.reduce<Record<string, number>>((acc, signal) => {
      const level = signal.escalation_level
      acc[level] = (acc[level] ?? 0) + 1
      return acc
    }, {})

    const cabinetReviewCount = enrichedSignals.filter(
      (signal) => signal.cabinet_review_required
    ).length

    const boardExposureCount = enrichedSignals.filter(
      (signal) => signal.escalation_level === "Board Exposure"
    ).length

    const superintendentNarrative =
      boardExposureCount > 0
        ? "Board exposure risk is active. Superintendent review is required to contain unresolved leadership instability."
        : cabinetReviewCount > 0
          ? "Cabinet attention is required. Several leadership signals have crossed escalation thresholds and need evidence-backed follow-up."
          : "Current signal posture is monitored. No board exposure threshold has been crossed."

    return NextResponse.json({
      ok: true,
      snapshot: {
        generated_at: new Date().toISOString(),
        total_signals: enrichedSignals.length,
        severity_counts: severityCounts,
        escalation_counts: escalationCounts,
        cabinet_review_required: cabinetReviewCount,
        board_exposure_count: boardExposureCount,
        superintendent_narrative: superintendentNarrative,
        signals: enrichedSignals.slice(0, 25),
      },
    })
  } catch {
    return NextResponse.json(
      { ok: false, error: "Executive snapshot route failed." },
      { status: 500 }
    )
  }
}
