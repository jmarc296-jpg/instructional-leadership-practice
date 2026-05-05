import { NextResponse } from "next/server"
import { getSupabaseAdminClient } from "@/lib/supabase/admin"

export async function GET() {
  const supabase = getSupabaseAdminClient()

  if (!supabase) {
    return NextResponse.json(
      { ok: false, error: "Supabase is not configured." },
      { status: 500 }
    )
  }

  const { data, error } = await supabase
    .from("leadership_signals")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true, signals: data || [] })
}
