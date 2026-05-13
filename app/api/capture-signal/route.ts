import { NextResponse } from "next/server"
import { getSupabaseAdminClient } from "@/lib/supabase/admin"
import { writeAuditEvent } from "@/lib/audit/write-audit-event"

export async function POST(req: Request) {
  try {
    const supabase = getSupabaseAdminClient()

    if (!supabase) {
      return NextResponse.json(
        { ok: false, error: "Supabase is not configured." },
        { status: 500 }
      )
    }

    const body = await req.json()

    const schoolName = body.schoolName?.trim()
    const leaderName = body.leaderName?.trim()
    const severity = body.severity?.trim()
    const summary = body.summary?.trim()

    if (!schoolName || !leaderName || !severity || !summary) {
      return NextResponse.json(
        { ok: false, error: "schoolName, leaderName, severity, and summary are required." },
        { status: 400 }
      )
    }

    if (!["low", "medium", "high"].includes(severity)) {
      return NextResponse.json(
        { ok: false, error: "severity must be low, medium, or high." },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from("leadership_signals")
      .insert({
        school_name: schoolName,
        leader_name: leaderName,
        severity,
        summary,
        status: "new",
      })
      .select("id")

    if (error) {
      return NextResponse.json(
        { ok: false, error: error.message, details: error.details, hint: error.hint },
        { status: 500 }
      )
    }

    const insertedSignalId = data?.[0]?.id ?? "unknown"

    await writeAuditEvent({
      eventType: "signal_captured",
      entityType: "leadership_signal",
      entityId: insertedSignalId,
      payload: {
        schoolName,
        leaderName,
        severity,
        summary,
        status: "new",
      },
    })

    return NextResponse.json({ ok: true, inserted: data?.length || 0 })
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Failed to capture signal." },
      { status: 500 }
    )
  }
}
