import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("products")
    .select("id, name, slug, stock_quantity, low_stock_threshold, status")
    .eq("status", "active")
    .order("stock_quantity", { ascending: true });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const supabase = createAdminClient();
  const { product_id, change_qty, reason } = await request.json();

  // Log the inventory change
  const { error: logError } = await supabase.from("inventory_logs").insert({ product_id, change_qty, reason });
  if (logError) return NextResponse.json({ error: logError.message }, { status: 500 });

  // Update stock quantity
  const { data: product } = await supabase.from("products").select("stock_quantity").eq("id", product_id).single();
  const newQty = (product?.stock_quantity || 0) + change_qty;

  const { error: updateError } = await supabase.from("products").update({ stock_quantity: Math.max(0, newQty) }).eq("id", product_id);
  if (updateError) return NextResponse.json({ error: updateError.message }, { status: 500 });

  return NextResponse.json({ success: true, new_quantity: Math.max(0, newQty) });
}
