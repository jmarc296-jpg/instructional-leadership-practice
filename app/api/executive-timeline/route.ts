import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { createClient } from "@supabase/supabase-js"

import {
  buildTimeline,
} from "@/lib/timeline/executive-timeline"

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
  const serviceRoleKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceRoleKey) {
    throw new Error("Missing Supabase configuration.")
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

  const authenticated = hasSessionCookie(
    cookieStore.getAll().map((cookie) => cookie.name)
  )

  if (!authenticated) {
    return NextResponse.json(
      {
        ok: false,
        error: "Unauthorized",
      },
      {
        status: 401,
      }
    )
  }

  try {
    const supabase = getSupabaseAdmin()

    const { data, error } = await supabase
      .from("leadership_signals")
      .select("*")
      .order("created_at", {
        ascending: false,
      })
      .limit(50)

    if (error) {
      return NextResponse.json(
        {
          ok: false,
          error: "Unable to load executive timeline.",
        },
        {
          status: 500,
        }
      )
    }

    const timelines = (data ?? []).map((signal) =>
      buildTimeline(signal)
    )

    return NextResponse.json({
      ok: true,
      timeline: {
        generated_at: new Date().toISOString(),
        timelines,
      },
    })
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error: "Executive timeline engine failed.",
      },
      {
        status: 500,
      }
    )
  }
}
