import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { createClient } from "@supabase/supabase-js"

import {
  getPressureLevel,
  getPressureNarrative,
  getPressureScore,
} from "@/lib/pressure/pressure-engine"

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
      .limit(100)

    if (error) {
      return NextResponse.json(
        {
          ok: false,
          error: "Unable to load pressure posture.",
        },
        {
          status: 500,
        }
      )
    }

    const signals = (data ?? []).map((signal) => {
      const score = getPressureScore(signal)

      return {
        ...signal,
        pressure_score: score,
        pressure_level: getPressureLevel(score),
        pressure_narrative: getPressureNarrative(signal),
      }
    })

    const avgPressure =
      signals.length > 0
        ? Math.round(
            signals.reduce(
              (sum, signal) => sum + signal.pressure_score,
              0
            ) / signals.length
          )
        : 0

    return NextResponse.json({
      ok: true,
      posture: {
        generated_at: new Date().toISOString(),
        average_pressure: avgPressure,
        board_exposure_count: signals.filter(
          (x) => x.pressure_level === "Board Exposure"
        ).length,
        critical_count: signals.filter(
          (x) =>
            x.pressure_level === "Critical" ||
            x.pressure_level === "System Alert"
        ).length,
        signals,
      },
    })
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error: "Pressure posture engine failed.",
      },
      {
        status: 500,
      }
    )
  }
}
