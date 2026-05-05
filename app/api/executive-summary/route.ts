import { NextResponse } from "next/server"
import { getSupabaseAdminClient } from "@/lib/supabase/admin"

export async function GET() {
  try {
    const supabase = getSupabaseAdminClient()

    if (!supabase) {
      return NextResponse.json({
        ok: true,
        source: "demo",
        count: 0,
        highRisk: 0,
        mediumRisk: 0,
        lowRisk: 0,
        executiveNarrative: "No data available. Upload district evidence to begin."
      })
    }

    const { data, error } = await supabase
      .from("leadership_signals")
      .select("*")

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
    }

    const signals = data || []

    const highRisk = signals.filter(s => s.severity === "high").length
    const mediumRisk = signals.filter(s => s.severity === "medium").length
    const lowRisk = signals.filter(s => s.severity === "low").length

    const schools = [...new Set(signals.map(s => s.school_name))]

    const missingActions = signals.filter(s =>
      !s.recommended_action && !s.recommendedAction
    ).length

    const missingEvidence = signals.filter(s =>
      !s.evidence || s.evidence === "not_started"
    ).length

    let narrative = ""

    if (signals.length === 0) {
      narrative = "No leadership risk signals have been captured yet. Upload district evidence to begin."
    } else {
      const dominantRisk =
        highRisk > mediumRisk && highRisk > lowRisk
          ? "high"
          : mediumRisk > lowRisk
          ? "medium"
          : "low"

      narrative = `Risk is currently concentrated at the ${dominantRisk} level across ${schools.length} schools. 
Execution breakdown is evident, with ${missingActions} signals lacking defined follow-through. 
Evidence gap remains significant, with ${missingEvidence} signals missing documented progress. 
Immediate action: assign ownership to appropriate leaders within 48 hours and require evidence submission within the next reporting cycle.`
    }

    return NextResponse.json({
      ok: true,
      source: "supabase",
      count: signals.length,
      highRisk,
      mediumRisk,
      lowRisk,
      executiveNarrative: narrative
    })

  } catch {
    return NextResponse.json({ ok: false, error: "failed" }, { status: 500 })
  }
}
