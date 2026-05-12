import { NextResponse } from "next/server"

export async function GET() {
  const generatedAt = new Date().toISOString()

  const report = {
    product: "LeadSharper",
    reportType: "Executive Cabinet Export",
    generatedAt,
    status: "Export endpoint active",
    note: "This endpoint is ready for the next hardening pass: authenticated export, org scoping, audit logging, and immutable cabinet snapshots."
  }

  return NextResponse.json(report)
}
