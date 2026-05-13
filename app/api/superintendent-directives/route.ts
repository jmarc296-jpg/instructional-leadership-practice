import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { createClient } from "@supabase/supabase-js"

import {
  generateDirective,
  generateDistrictNarrative,
} from "@/lib/directives/directive-engine"

import {
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
          error: "Unable to generate directives.",
        },
        {
          status: 500,
        }
      )
    }

    const directives = (data ?? []).map((signal) => {
      const pressureScore = getPressureScore(signal)

      const generated = generateDirective({
        ...signal,
        pressure_score: pressureScore,
      })

      return {
        ...signal,
        pressure_score: pressureScore,
        directive_level: generated.level,
        superintendent_directive: generated.directive,
      }
    })

    return NextResponse.json({
      ok: true,
      directives: {
        generated_at: new Date().toISOString(),
        district_narrative:
          generateDistrictNarrative(directives),
        directives,
      },
    })
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error: "Directive engine failed.",
      },
      {
        status: 500,
      }
    )
  }
}
