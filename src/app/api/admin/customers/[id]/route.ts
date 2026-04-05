import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = createAdminClient();

  const [customerResult, ordersResult] = await Promise.all([
    supabase.from("customers").select("*").eq("id", id).single(),
    supabase.from("orders").select("*, order_items(*)").eq("customer_id", id).order("created_at", { ascending: false }),
  ]);

  if (customerResult.error) return NextResponse.json({ error: customerResult.error.message }, { status: 404 });

  return NextResponse.json({
    ...customerResult.data,
    orders: ordersResult.data || [],
  });
}
