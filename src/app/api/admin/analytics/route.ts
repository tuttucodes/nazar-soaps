import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET() {
  const supabase = createAdminClient();

  const [ordersResult, customersResult, productsResult, recentOrdersResult] = await Promise.all([
    supabase.from("orders").select("total, status, payment_status, created_at"),
    supabase.from("customers").select("id", { count: "exact", head: true }),
    supabase.from("products").select("id, name, stock_quantity, low_stock_threshold, status").eq("status", "active"),
    supabase.from("orders").select("*, customers(name)").order("created_at", { ascending: false }).limit(10),
  ]);

  const orders = ordersResult.data || [];
  const totalRevenue = orders.filter(o => o.payment_status === "paid").reduce((sum, o) => sum + Number(o.total), 0);
  const totalOrders = orders.length;
  const totalCustomers = customersResult.count || 0;
  const products = productsResult.data || [];
  const lowStockProducts = products.filter(p => p.stock_quantity <= p.low_stock_threshold);

  // Orders by status
  const ordersByStatus: Record<string, number> = {};
  orders.forEach(o => {
    ordersByStatus[o.status] = (ordersByStatus[o.status] || 0) + 1;
  });

  // Revenue by month (last 6 months)
  const monthlyRevenue: Record<string, number> = {};
  orders.filter(o => o.payment_status === "paid").forEach(o => {
    const month = new Date(o.created_at).toISOString().slice(0, 7);
    monthlyRevenue[month] = (monthlyRevenue[month] || 0) + Number(o.total);
  });

  return NextResponse.json({
    totalRevenue,
    totalOrders,
    totalCustomers,
    totalProducts: products.length,
    lowStockCount: lowStockProducts.length,
    lowStockProducts: lowStockProducts.slice(0, 5),
    ordersByStatus,
    monthlyRevenue,
    recentOrders: recentOrdersResult.data || [],
  });
}
