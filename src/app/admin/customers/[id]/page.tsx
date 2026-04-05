"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import AdminHeader from "@/components/admin/AdminHeader";
import StatusBadge from "@/components/admin/StatusBadge";
import styles from "../../dashboard.module.css";

interface Customer {
  id: string; name: string; email: string; phone: string;
  address_line1: string; address_line2: string; city: string; state: string; pincode: string;
  total_orders: number; total_spent: number; created_at: string;
}

interface Order {
  id: string; order_number: number; status: string; total: number; created_at: string;
  order_items: { product_name: string; quantity: number; total_price: number }[];
}

export default function CustomerDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetch(`/api/admin/customers/${id}`).then(r => r.json()).then(data => {
      setCustomer(data.customer);
      setOrders(data.orders || []);
    });
  }, [id]);

  if (!customer) return <div style={{ padding: "2rem", color: "#888" }}>Loading...</div>;

  const cardStyle: React.CSSProperties = { background: "#fff", border: "1px solid #e5e7eb", borderRadius: "10px", padding: "1.25rem" };
  const labelStyle: React.CSSProperties = { fontSize: "0.78rem", fontWeight: 600, color: "#888", marginBottom: "0.2rem" };
  const valStyle: React.CSSProperties = { fontSize: "0.92rem", color: "#1a1a1a", marginBottom: "0.75rem" };

  return (
    <>
      <AdminHeader title={customer.name || customer.email} />
      <div className={styles.content}>
        <div style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: "1.5rem", alignItems: "start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={cardStyle}>
              <h3 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "1rem" }}>Profile</h3>
              <div style={labelStyle}>Email</div><div style={valStyle}>{customer.email}</div>
              <div style={labelStyle}>Phone</div><div style={valStyle}>{customer.phone || "—"}</div>
              <div style={labelStyle}>Address</div>
              <div style={valStyle}>
                {customer.address_line1 ? (
                  <>{customer.address_line1}{customer.address_line2 ? `, ${customer.address_line2}` : ""}<br />{customer.city}, {customer.state} — {customer.pincode}</>
                ) : "—"}
              </div>
              <div style={labelStyle}>Joined</div><div style={{ ...valStyle, marginBottom: 0 }}>{new Date(customer.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</div>
            </div>
            <div style={cardStyle}>
              <h3 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "1rem" }}>Summary</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div><div style={labelStyle}>Total Orders</div><div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#e8830c" }}>{customer.total_orders}</div></div>
                <div><div style={labelStyle}>Total Spent</div><div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#16a34a" }}>Rs. {customer.total_spent}</div></div>
              </div>
            </div>
          </div>

          <div style={cardStyle}>
            <h3 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "1rem" }}>Order History</h3>
            {orders.length === 0 ? (
              <p style={{ color: "#999", fontSize: "0.9rem" }}>No orders yet</p>
            ) : (
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead><tr>
                  <th style={{ textAlign: "left", padding: "0.5rem 0", fontSize: "0.78rem", fontWeight: 700, color: "#666", borderBottom: "1px solid #eee" }}>Order #</th>
                  <th style={{ textAlign: "left", padding: "0.5rem 0", fontSize: "0.78rem", fontWeight: 700, color: "#666", borderBottom: "1px solid #eee" }}>Items</th>
                  <th style={{ textAlign: "right", padding: "0.5rem 0", fontSize: "0.78rem", fontWeight: 700, color: "#666", borderBottom: "1px solid #eee" }}>Total</th>
                  <th style={{ textAlign: "center", padding: "0.5rem 0", fontSize: "0.78rem", fontWeight: 700, color: "#666", borderBottom: "1px solid #eee" }}>Status</th>
                  <th style={{ textAlign: "right", padding: "0.5rem 0", fontSize: "0.78rem", fontWeight: 700, color: "#666", borderBottom: "1px solid #eee" }}>Date</th>
                </tr></thead>
                <tbody>
                  {orders.map(o => (
                    <tr key={o.id}>
                      <td style={{ padding: "0.6rem 0", fontSize: "0.88rem" }}>
                        <Link href={`/admin/orders/${o.id}`} style={{ color: "#e8830c", fontWeight: 600 }}>#{o.order_number}</Link>
                      </td>
                      <td style={{ padding: "0.6rem 0", fontSize: "0.82rem", color: "#666" }}>
                        {o.order_items.map(i => `${i.product_name} x${i.quantity}`).join(", ")}
                      </td>
                      <td style={{ padding: "0.6rem 0", fontSize: "0.88rem", textAlign: "right" }}>Rs. {o.total}</td>
                      <td style={{ padding: "0.6rem 0", textAlign: "center" }}><StatusBadge status={o.status} /></td>
                      <td style={{ padding: "0.6rem 0", fontSize: "0.82rem", textAlign: "right", color: "#666" }}>{new Date(o.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
