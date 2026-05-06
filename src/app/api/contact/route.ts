import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  // Forward to Vercel email or any service you wire up
  // For now, log and return success (wire up Resend, SendGrid, etc.)
  console.log("Contact form submission:", { name, email, message });

  return NextResponse.json({ ok: true });
}
