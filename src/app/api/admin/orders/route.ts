import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET(request: NextRequest) {
  const supabase = createAdminClient();
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const search = searchParams.get("search");

  let query = supabase.from("orders").select("*, customers(name, email)").order("created_at", { ascending: false });

  if (status) query = query.eq("status", status);
  if (search) query = query.or(`tracking_number.ilike.%${search}%,order_number.eq.${parseInt(search) || 0}`);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
