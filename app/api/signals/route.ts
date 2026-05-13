import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import { publicDemoSignals } from "@/lib/public-demo-signals";

export const dynamic = "force-dynamic";

function hasSessionCookie(cookieNames: string[]) {
  return cookieNames.some((name) => {
    const lower = name.toLowerCase();

    return (
      lower === "__session" ||
      lower === "__client_uat" ||
      lower.includes("clerk") ||
      lower.includes("session")
    );
  });
}

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error("Missing Supabase server configuration.");
  }

  return createClient(url, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const publicMode = searchParams.get("demo") === "public";

  if (publicMode) {
    return NextResponse.json({
      ok: true,
      mode: "public-demo",
      signals: publicDemoSignals,
    });
  }

  const cookieStore = await cookies();
  const authenticated = hasSessionCookie(cookieStore.getAll().map((cookie) => cookie.name));

  if (!authenticated) {
    return NextResponse.json(
      {
        ok: false,
        error: "Unauthorized",
      },
      { status: 401 }
    );
  }

  try {
    const supabase = getSupabaseAdmin();

    const { data, error } = await supabase
      .from("leadership_signals")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) {
      console.error("signals_fetch_error", error);
      return NextResponse.json(
        {
          ok: false,
          error: "Unable to load signals.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      signals: data ?? [],
    });
  } catch (error) {
    console.error("signals_route_error", error);
    return NextResponse.json(
      {
        ok: false,
        error: "Signals route failed.",
      },
      { status: 500 }
    );
  }
}
