import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const profileId = String(body.profile_id || "");
    if (!profileId) return NextResponse.json({ ok: false }, { status: 400 });

    const referrer = request.headers.get("referer")?.slice(0, 300) || null;
    const userAgent = request.headers.get("user-agent")?.slice(0, 220) || null;

    const { error } = await supabaseAdmin.from("analytics_events").insert({
      profile_id: profileId,
      type: "view",
      referrer,
      user_agent: userAgent
    });

    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ ok: false, error: "Failed to track view" }, { status: 500 });
  }
}
