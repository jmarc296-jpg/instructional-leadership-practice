import { NextResponse } from "next/server";

export async function GET() {
  const integrations = [
    {
      platform: "PowerSchool",
      status: "Connected",
      lastSync: "2 hours ago"
    },
    {
      platform: "NWEA",
      status: "Connected",
      lastSync: "1 day ago"
    },
    {
      platform: "Workday",
      status: "Pending",
      lastSync: "Not synced"
    },
    {
      platform: "Infinite Campus",
      status: "Connected",
      lastSync: "6 hours ago"
    }
  ];

  return NextResponse.json({
    integrations
  });
}

