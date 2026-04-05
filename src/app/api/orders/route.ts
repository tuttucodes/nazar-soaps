import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: NextRequest) {
  const supabase = createAdminClient();
  const { customer, items, payment_method } = await request.json();

  // Upsert customer
  const { data: customerData, error: custError } = await supabase
    .from("customers")
    .upsert({ ...customer }, { onConflict: "email" })
    .select()
    .single();

  if (custError) return NextResponse.json({ error: custError.message }, { status: 500 });

  // Calculate totals
  const subtotal = items.reduce((sum: number, item: { unit_price: number; quantity: number }) => sum + item.unit_price * item.quantity, 0);
  const shipping_fee = payment_method === "COD" ? 40 : 0;
  const total = subtotal + shipping_fee;

  // Create order
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      customer_id: customerData.id,
      status: "pending",
      payment_method,
      payment_status: payment_method === "COD" ? "pending" : "paid",
      subtotal,
      shipping_fee,
      total,
      shipping_address: {
        name: customer.name,
        address: customer.address_line1,
        city: customer.city,
        state: customer.state,
        pincode: customer.pincode,
      },
    })
    .select()
    .single();

  if (orderError) return NextResponse.json({ error: orderError.message }, { status: 500 });

  // Create order items
  const orderItems = items.map((item: { product_id: string; product_name: string; quantity: number; unit_price: number }) => ({
    order_id: order.id,
    product_id: item.product_id,
    product_name: item.product_name,
    quantity: item.quantity,
    unit_price: item.unit_price,
    total_price: item.unit_price * item.quantity,
  }));

  await supabase.from("order_items").insert(orderItems);

  // Update customer stats
  await supabase.from("customers").update({
    total_orders: (customerData.total_orders || 0) + 1,
    total_spent: (Number(customerData.total_spent) || 0) + total,
  }).eq("id", customerData.id);

  return NextResponse.json({ order_id: order.id, order_number: order.order_number }, { status: 201 });
}
