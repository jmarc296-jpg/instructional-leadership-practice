import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { createClient } from "@supabase/supabase-js"

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
    return NextResponse.json(
      {
        ok: false,
        error: "Unauthorized",
      },
      { status: 401 }
    )
  }

  try {
    const supabase = getSupabaseAdmin()

    const { data, error } = await supabase
      .from("executive_audit_events")
      .select("id,event_type,entity_type,entity_id,actor_id,actor_email,event_payload,immutable_hash,created_at")
      .order("created_at", { ascending: false })
      .limit(100)

    if (error) {
      console.error("audit_events_fetch_error", error)

      return NextResponse.json(
        {
          ok: false,
          error: "Unable to load audit events.",
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      ok: true,
      events: data ?? [],
    })
  } catch (error) {
    console.error("audit_events_route_error", error)

    return NextResponse.json(
      {
        ok: false,
        error: "Audit events route failed.",
      },
      { status: 500 }
    )
  }
}

