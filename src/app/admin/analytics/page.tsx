"use client";

import { useEffect, useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import StatsCard from "@/components/admin/StatsCard";
import styles from "../dashboard.module.css";

interface Analytics {
  totalRevenue: number; totalOrders: number; totalCustomers: number; lowStockProducts: number;
  ordersByStatus: Record<string, number>;
  monthlyRevenue: { month: string; revenue: number }[];
  recentOrders: { id: string; order_number: number; total: number; status: string; created_at: string }[];
}

export default function AdminAnalyticsPage() {
  const [data, setData] = useState<Analytics | null>(null);

  useEffect(() => {
    fetch("/api/admin/analytics").then(r => r.json()).then(setData);
  }, []);

  if (!data) return <div style={{ padding: "2rem", color: "#888" }}>Loading analytics...</div>;

  const maxRevenue = Math.max(...data.monthlyRevenue.map(m => m.revenue), 1);
  const statusColors: Record<string, string> = { pending: "#f59e0b", confirmed: "#3b82f6", shipped: "#8b5cf6", delivered: "#16a34a", cancelled: "#dc2626", returned: "#6b7280" };

  const cardStyle: React.CSSProperties = { background: "#fff", border: "1px solid #e5e7eb", borderRadius: "10px", padding: "1.25rem" };

  return (
    <>
      <AdminHeader title="Analytics" />
      <div className={styles.content}>
        <div className={styles.statsGrid}>
          <StatsCard label="Total Revenue" value={`Rs. ${data.totalRevenue.toLocaleString("en-IN")}`} />
          <StatsCard label="Total Orders" value={String(data.totalOrders)} />
          <StatsCard label="Total Customers" value={String(data.totalCustomers)} />
          <StatsCard label="Avg Order Value" value={data.totalOrders ? `Rs. ${Math.round(data.totalRevenue / data.totalOrders)}` : "Rs. 0"} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "1.5rem" }}>
          <div style={cardStyle}>
            <h3 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "1.25rem" }}>Monthly Revenue</h3>
            {data.monthlyRevenue.length === 0 ? (
              <p style={{ color: "#999", fontSize: "0.9rem" }}>No revenue data yet</p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {data.monthlyRevenue.map(m => (
                  <div key={m.month} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <span style={{ fontSize: "0.78rem", color: "#666", width: "60px", textAlign: "right" }}>{m.month}</span>
                    <div style={{ flex: 1, background: "#f3f4f6", borderRadius: "4px", height: "24px", overflow: "hidden" }}>
                      <div style={{ width: `${(m.revenue / maxRevenue) * 100}%`, background: "linear-gradient(90deg, #e8830c, #f59e0b)", height: "100%", borderRadius: "4px", minWidth: m.revenue > 0 ? "2px" : "0", transition: "width 0.5s ease" }} />
                    </div>
                    <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "#333", width: "80px" }}>Rs. {m.revenue.toLocaleString("en-IN")}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={cardStyle}>
              <h3 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "1rem" }}>Orders by Status</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {Object.entries(data.ordersByStatus).map(([status, count]) => (
                  <div key={status} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: statusColors[status] || "#999" }} />
                      <span style={{ fontSize: "0.85rem", textTransform: "capitalize" }}>{status}</span>
                    </div>
                    <strong style={{ fontSize: "0.9rem" }}>{count}</strong>
                  </div>
                ))}
              </div>
            </div>

            <div style={cardStyle}>
              <h3 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "0.75rem" }}>Quick Stats</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.85rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "#666" }}>Low Stock Items</span>
                  <strong style={{ color: data.lowStockProducts > 0 ? "#dc2626" : "#16a34a" }}>{data.lowStockProducts}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "#666" }}>Pending Orders</span>
                  <strong>{data.ordersByStatus.pending || 0}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "#666" }}>Delivered Orders</span>
                  <strong style={{ color: "#16a34a" }}>{data.ordersByStatus.delivered || 0}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
