import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET() {
  const supabase = createAdminClient();
  const { data, error } = await supabase.from("site_settings").select("*").order("key");
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function PUT(request: NextRequest) {
  const supabase = createAdminClient();
  const { settings } = await request.json();

  for (const { key, value } of settings) {
    await supabase.from("site_settings").upsert({ key, value }, { onConflict: "key" });
  }

  return NextResponse.json({ success: true });
}
