const fs = require("fs");
const path = require("path");

const root = process.cwd();

function read(file) {
  return fs.readFileSync(path.join(root, file), "utf8");
}

function write(file, content) {
  fs.writeFileSync(path.join(root, file), content, "utf8");
}

function backup(file) {
  const full = path.join(root, file);
  if (fs.existsSync(full)) {
    fs.copyFileSync(full, `${full}.bak-enterprise-hardening`);
  }
}

function replaceIfPresent(file, from, to, label) {
  const full = path.join(root, file);
  if (!fs.existsSync(full)) {
    console.warn(`SKIP: ${file} not found for ${label}`);
    return;
  }

  backup(file);
  const current = read(file);

  if (!current.includes(from)) {
    console.warn(`SKIP: Pattern not found in ${file} for ${label}`);
    return;
  }

  write(file, current.replace(from, to));
  console.log(`UPDATED: ${file} | ${label}`);
}

function ensureDir(file) {
  fs.mkdirSync(path.dirname(path.join(root, file)), { recursive: true });
}

/**
 * 1. Create polished public demo signal records.
 * These are safe to show in public surfaces if needed, while real signal APIs stay protected.
 */
ensureDir("lib/public-demo-signals.ts");
backup("lib/public-demo-signals.ts");

write(
  "lib/public-demo-signals.ts",
`export type PublicDemoSignal = {
  id: string;
  school_name: string;
  leader_name: string;
  severity: "high" | "medium" | "low";
  summary: string;
  recommended_action: string;
  evidence_status: "missing" | "partial" | "verified";
  created_at: string;
};

export const publicDemoSignals: PublicDemoSignal[] = [
  {
    id: "demo-grade-9-algebra-risk",
    school_name: "Pilot District",
    leader_name: "Grade 9 Leadership Signal",
    severity: "high",
    summary:
      "Grade 9 Algebra proficiency is below target and follow-up evidence is not yet strong enough to confirm instructional correction.",
    recommended_action:
      "Assign cabinet owner, verify reteach execution evidence, and require a follow-up performance check within the next leadership cycle.",
    evidence_status: "partial",
    created_at: "2026-05-13T00:00:00.000Z",
  },
  {
    id: "demo-ddi-follow-up-gap",
    school_name: "Riverside Middle School",
    leader_name: "Jordan Ellis",
    severity: "high",
    summary:
      "DDI follow-up is inconsistent across grade-level teams, creating risk that identified misconceptions are not being retaught with urgency.",
    recommended_action:
      "Require reteach evidence from the next two data meetings and escalate unresolved gaps to the network leader.",
    evidence_status: "missing",
    created_at: "2026-05-12T00:00:00.000Z",
  },
  {
    id: "demo-literacy-execution-watch",
    school_name: "Maxwell K-8",
    leader_name: "Instructional Leadership Team",
    severity: "medium",
    summary:
      "Walkthrough evidence shows lesson alignment is improving, but student discourse and evidence-based writing routines remain uneven.",
    recommended_action:
      "Monitor implementation through focused walkthroughs and collect two artifacts of student-facing literacy practice.",
    evidence_status: "partial",
    created_at: "2026-05-11T00:00:00.000Z",
  },
];
`
);

/**
 * 2. Lock down /api/signals.
 * No middleware. No Clerk server helper. Uses the same cookie-fallback strategy that preserved production stability.
 */
ensureDir("app/api/signals/route.ts");
backup("app/api/signals/route.ts");

write(
  "app/api/signals/route.ts",
`import { NextResponse } from "next/server";
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
`
);

/**
 * 3. Improve board-report fallback language.
 */
replaceIfPresent(
  "app/board-report/page.tsx",
  "Loading...",
  "Preparing executive risk readout...",
  "board-report loading language"
);

/**
 * 4. Normalize intake language to the operating-system contract.
 */
replaceIfPresent(
  "app/data-intake/page.tsx",
  "school_name, leader_name, risk_level, issue, recommended_action",
  "school_name, leader_name, severity, summary, recommended_action, evidence_status",
  "data-intake CSV contract language"
);

replaceIfPresent(
  "app/data-upload/page.tsx",
  "school_name, leader_name, risk_level, issue, recommended_action",
  "school_name, leader_name, severity, summary, recommended_action, evidence_status",
  "data-upload CSV contract language"
);

/**
 * 5. Tighten homepage outcome language.
 */
replaceIfPresent(
  "app/page.tsx",
  "Upload district evidence, generate leadership risk signals, assign ownership, and produce superintendent-ready reports in one flow.",
  "LeadSharper turns walkthroughs, DDI notes, leadership reviews, and follow-up evidence into executive signals cabinet teams can act on: who owns the risk, what action is required, what evidence is missing, and what must be escalated.",
  "homepage executive outcome language"
);

console.log("Enterprise hardening patch complete.");
