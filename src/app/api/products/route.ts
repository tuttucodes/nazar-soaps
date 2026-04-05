import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET(request: NextRequest) {
  const supabase = createAdminClient();
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const concern = searchParams.get("concern");
  const bestSeller = searchParams.get("best_seller");
  const newLaunch = searchParams.get("new_launch");
  const combo = searchParams.get("combo");

  let query = supabase.from("products").select("*").eq("status", "active").order("created_at", { ascending: false });

  if (category) query = query.eq("category_id", category);
  if (bestSeller) query = query.eq("is_best_seller", true);
  if (newLaunch) query = query.eq("is_new_launch", true);
  if (combo) query = query.eq("is_combo", true);

  if (concern) {
    const { data: productIds } = await supabase
      .from("product_concerns")
      .select("product_id")
      .eq("concern_id", concern);
    if (productIds) {
      query = query.in("id", productIds.map(p => p.product_id));
    }
  }

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
