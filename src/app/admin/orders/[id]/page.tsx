"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import AdminHeader from "@/components/admin/AdminHeader";
import StatusBadge from "@/components/admin/StatusBadge";
import styles from "../../dashboard.module.css";

interface OrderDetail {
  id: string; order_number: number; status: string; payment_method: string; payment_status: string;
  subtotal: number; shipping_fee: number; discount: number; total: number;
  shipping_address: Record<string, string>; tracking_number: string; notes: string; created_at: string;
  customers: { name: string; email: string; phone: string } | null;
  order_items: { id: string; product_name: string; quantity: number; unit_price: number; total_price: number }[];
}

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [status, setStatus] = useState("");
  const [tracking, setTracking] = useState("");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`/api/admin/orders/${id}`).then(r => r.json()).then((o: OrderDetail) => {
      setOrder(o);
      setStatus(o.status);
      setTracking(o.tracking_number || "");
      setNotes(o.notes || "");
    });
  }, [id]);

  const handleUpdate = async () => {
    setSaving(true);
    await fetch(`/api/admin/orders/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status, tracking_number: tracking || null, notes: notes || null }) });
    setSaving(false);
    router.push("/admin/orders");
  };

  if (!order) return <div style={{ padding: "2rem", color: "#888" }}>Loading...</div>;

  const cardStyle: React.CSSProperties = { background: "#fff", border: "1px solid #e5e7eb", borderRadius: "10px", padding: "1.25rem" };
  const labelStyle: React.CSSProperties = { fontSize: "0.78rem", fontWeight: 600, color: "#888", marginBottom: "0.2rem" };
  const valStyle: React.CSSProperties = { fontSize: "0.92rem", color: "#1a1a1a" };
  const addr = order.shipping_address || {};

  return (
    <>
      <AdminHeader title={`Order #${order.order_number}`} />
      <div className={styles.content}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "1.5rem", alignItems: "start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div style={cardStyle}>
              <h3 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "1rem" }}>Items</h3>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead><tr>
                  <th style={{ textAlign: "left", padding: "0.5rem 0", fontSize: "0.78rem", fontWeight: 700, color: "#666", borderBottom: "1px solid #eee" }}>Product</th>
                  <th style={{ textAlign: "center", padding: "0.5rem 0", fontSize: "0.78rem", fontWeight: 700, color: "#666", borderBottom: "1px solid #eee" }}>Qty</th>
                  <th style={{ textAlign: "right", padding: "0.5rem 0", fontSize: "0.78rem", fontWeight: 700, color: "#666", borderBottom: "1px solid #eee" }}>Price</th>
                  <th style={{ textAlign: "right", padding: "0.5rem 0", fontSize: "0.78rem", fontWeight: 700, color: "#666", borderBottom: "1px solid #eee" }}>Total</th>
                </tr></thead>
                <tbody>
                  {order.order_items.map(item => (
                    <tr key={item.id}>
                      <td style={{ padding: "0.6rem 0", fontSize: "0.88rem" }}>{item.product_name}</td>
                      <td style={{ padding: "0.6rem 0", fontSize: "0.88rem", textAlign: "center" }}>{item.quantity}</td>
                      <td style={{ padding: "0.6rem 0", fontSize: "0.88rem", textAlign: "right" }}>Rs. {item.unit_price}</td>
                      <td style={{ padding: "0.6rem 0", fontSize: "0.88rem", textAlign: "right" }}>Rs. {item.total_price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ borderTop: "1px solid #eee", marginTop: "0.75rem", paddingTop: "0.75rem", display: "flex", flexDirection: "column", gap: "0.3rem", alignItems: "flex-end" }}>
                <div style={{ fontSize: "0.85rem", color: "#666" }}>Subtotal: Rs. {order.subtotal}</div>
                <div style={{ fontSize: "0.85rem", color: "#666" }}>Shipping: Rs. {order.shipping_fee}</div>
                {order.discount > 0 && <div style={{ fontSize: "0.85rem", color: "#16a34a" }}>Discount: -Rs. {order.discount}</div>}
                <div style={{ fontSize: "1rem", fontWeight: 700, color: "#1a1a1a" }}>Total: Rs. {order.total}</div>
              </div>
            </div>

            <div style={cardStyle}>
              <h3 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "1rem" }}>Shipping Address</h3>
              <p style={{ fontSize: "0.9rem", lineHeight: 1.6, color: "#444" }}>
                {addr.name || order.customers?.name}<br />
                {addr.address_line1}{addr.address_line2 ? `, ${addr.address_line2}` : ""}<br />
                {addr.city}, {addr.state} — {addr.pincode}<br />
                {addr.phone || order.customers?.phone}
              </p>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={cardStyle}>
              <h3 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "1rem" }}>Details</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <div><div style={labelStyle}>Date</div><div style={valStyle}>{new Date(order.created_at).toLocaleString("en-IN")}</div></div>
                <div><div style={labelStyle}>Payment Method</div><div style={valStyle}>{order.payment_method || "—"}</div></div>
                <div><div style={labelStyle}>Payment Status</div><div><StatusBadge status={order.payment_status} /></div></div>
                <div><div style={labelStyle}>Customer</div><div style={valStyle}>{order.customers?.name || "—"}<br /><span style={{ fontSize: "0.82rem", color: "#666" }}>{order.customers?.email}</span></div></div>
              </div>
            </div>

            <div style={cardStyle}>
              <h3 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "1rem" }}>Update Order</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <div>
                  <div style={labelStyle}>Status</div>
                  <select value={status} onChange={e => setStatus(e.target.value)} style={{ width: "100%", padding: "0.5rem", border: "1px solid #ddd", borderRadius: "6px", fontSize: "0.88rem", fontFamily: "inherit" }}>
                    {["pending", "confirmed", "shipped", "delivered", "cancelled", "returned"].map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                  </select>
                </div>
                <div>
                  <div style={labelStyle}>Tracking Number</div>
                  <input value={tracking} onChange={e => setTracking(e.target.value)} style={{ width: "100%", padding: "0.5rem", border: "1px solid #ddd", borderRadius: "6px", fontSize: "0.88rem" }} placeholder="Enter tracking #" />
                </div>
                <div>
                  <div style={labelStyle}>Notes</div>
                  <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3} style={{ width: "100%", padding: "0.5rem", border: "1px solid #ddd", borderRadius: "6px", fontSize: "0.88rem", fontFamily: "inherit", resize: "vertical" }} />
                </div>
                <button onClick={handleUpdate} disabled={saving} style={{ width: "100%", padding: "0.7rem", background: "#e8830c", color: "#fff", border: "none", borderRadius: "8px", fontSize: "0.92rem", fontWeight: 700, cursor: "pointer" }}>{saving ? "Saving..." : "Update Order"}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
