"use client";

import { useEffect, useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import styles from "../dashboard.module.css";

interface Product { id: string; name: string; stock_quantity: number; low_stock_threshold: number; status: string; }

export default function AdminInventoryPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [adjusting, setAdjusting] = useState<string | null>(null);
  const [qty, setQty] = useState("");
  const [reason, setReason] = useState("");

  const load = () => fetch("/api/admin/inventory").then(r => r.json()).then(setProducts);
  useEffect(() => { load(); }, []);

  const handleAdjust = async (productId: string) => {
    if (!qty) return;
    await fetch("/api/admin/inventory", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product_id: productId, change_qty: parseInt(qty), reason: reason || "Manual adjustment" }),
    });
    setAdjusting(null); setQty(""); setReason(""); load();
  };

  const tableStyle: React.CSSProperties = { width: "100%", borderCollapse: "collapse", background: "#fff", borderRadius: "8px", overflow: "hidden", border: "1px solid #e5e7eb" };
  const thStyle: React.CSSProperties = { textAlign: "left", padding: "0.75rem 1rem", fontSize: "0.78rem", fontWeight: 700, color: "#666", borderBottom: "1px solid #e5e7eb", background: "#fafafa" };
  const tdStyle: React.CSSProperties = { padding: "0.75rem 1rem", fontSize: "0.88rem", borderBottom: "1px solid #f3f4f6" };

  const lowStock = products.filter(p => p.stock_quantity <= p.low_stock_threshold);
  const healthy = products.filter(p => p.stock_quantity > p.low_stock_threshold);

  return (
    <>
      <AdminHeader title="Inventory" />
      <div className={styles.content}>
        {lowStock.length > 0 && (
          <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: "8px", padding: "1rem 1.25rem" }}>
            <strong style={{ color: "#dc2626", fontSize: "0.9rem" }}>Low Stock Alert: {lowStock.length} product{lowStock.length > 1 ? "s" : ""} need restocking</strong>
          </div>
        )}

        <table style={tableStyle}>
          <thead><tr>
            <th style={thStyle}>Product</th>
            <th style={thStyle}>Stock</th>
            <th style={thStyle}>Threshold</th>
            <th style={thStyle}>Status</th>
            <th style={thStyle}>Actions</th>
          </tr></thead>
          <tbody>
            {[...lowStock, ...healthy].map(p => {
              const isLow = p.stock_quantity <= p.low_stock_threshold;
              return (
                <tr key={p.id} style={isLow ? { background: "#fef2f2" } : undefined}>
                  <td style={tdStyle}><strong>{p.name}</strong></td>
                  <td style={tdStyle}>
                    <span style={{ fontWeight: 700, color: isLow ? "#dc2626" : p.stock_quantity > 50 ? "#16a34a" : "#d97706" }}>{p.stock_quantity}</span>
                  </td>
                  <td style={tdStyle}>{p.low_stock_threshold}</td>
                  <td style={tdStyle}>
                    <span style={{ fontSize: "0.78rem", fontWeight: 600, padding: "0.2rem 0.6rem", borderRadius: "999px", background: isLow ? "#fef2f2" : "#f0fdf4", color: isLow ? "#dc2626" : "#16a34a", border: `1px solid ${isLow ? "#fca5a5" : "#bbf7d0"}` }}>
                      {isLow ? "Low Stock" : "In Stock"}
                    </span>
                  </td>
                  <td style={tdStyle}>
                    {adjusting === p.id ? (
                      <div style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}>
                        <input type="number" placeholder="+/- qty" value={qty} onChange={e => setQty(e.target.value)} style={{ width: "70px", padding: "0.35rem 0.5rem", border: "1px solid #ddd", borderRadius: "4px", fontSize: "0.85rem" }} />
                        <input placeholder="Reason" value={reason} onChange={e => setReason(e.target.value)} style={{ width: "140px", padding: "0.35rem 0.5rem", border: "1px solid #ddd", borderRadius: "4px", fontSize: "0.85rem" }} />
                        <button onClick={() => handleAdjust(p.id)} style={{ padding: "0.35rem 0.6rem", background: "#16a34a", color: "#fff", border: "none", borderRadius: "4px", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer" }}>Save</button>
                        <button onClick={() => setAdjusting(null)} style={{ padding: "0.35rem 0.6rem", background: "#6b7280", color: "#fff", border: "none", borderRadius: "4px", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer" }}>X</button>
                      </div>
                    ) : (
                      <button onClick={() => setAdjusting(p.id)} style={{ color: "#e8830c", fontSize: "0.82rem", fontWeight: 600, background: "none", border: "none", cursor: "pointer" }}>Adjust Stock</button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
