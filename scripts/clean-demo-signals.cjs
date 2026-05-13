const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

function loadEnvLocal() {
  const envPath = path.join(process.cwd(), ".env.local");

  if (!fs.existsSync(envPath)) {
    return;
  }

  const lines = fs.readFileSync(envPath, "utf8").split(/\r?\n/);

  for (const line of lines) {
    if (!line || line.trim().startsWith("#") || !line.includes("=")) continue;

    const index = line.indexOf("=");
    const key = line.slice(0, index).trim();
    const value = line.slice(index + 1).trim().replace(/^["']|["']$/g, "");

    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

loadEnvLocal();

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceRoleKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const supabase = createClient(url, serviceRoleKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

const testSchoolNames = [
  "Audit Test School",
  "Demo School",
];

async function main() {
  const { data, error } = await supabase
    .from("leadership_signals")
    .select("id, school_name, leader_name, severity, summary, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Unable to load leadership_signals:", error);
    process.exit(1);
  }

  const records = data ?? [];
  const deleteIds = new Set();

  for (const record of records) {
    if (testSchoolNames.includes(record.school_name)) {
      deleteIds.add(record.id);
    }
  }

  const seen = new Set();

  for (const record of records) {
    const key = [
      record.school_name,
      record.leader_name,
      record.severity,
      record.summary,
    ].join("||");

    if (seen.has(key)) {
      deleteIds.add(record.id);
    } else {
      seen.add(key);
    }
  }

  const ids = Array.from(deleteIds);

  if (ids.length === 0) {
    console.log("No test or duplicate signal records found.");
    return;
  }

  const { error: deleteError } = await supabase
    .from("leadership_signals")
    .delete()
    .in("id", ids);

  if (deleteError) {
    console.error("Unable to delete cleanup records:", deleteError);
    process.exit(1);
  }

  console.log(`Deleted ${ids.length} test/duplicate signal record(s).`);
}

main();
