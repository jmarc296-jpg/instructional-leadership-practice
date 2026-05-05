import { NextResponse } from "next/server"
import { getSupabaseAdminClient } from "@/lib/supabase/admin"

export async function GET() {
  try {
    const supabase = getSupabaseAdminClient()

    if (!supabase) {
      return NextResponse.json({
        ok: true,
        source: "demo",
        summary: { totalSignals: 0 }
      })
    }

    const { data, error } = await supabase
      .from("leadership_signals")
      .select("*")

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({
      ok: true,
      source: "supabase",
      count: data.length
    })

  } catch {
    return NextResponse.json({ ok: false, error: "failed" }, { status: 500 })
  }
}
