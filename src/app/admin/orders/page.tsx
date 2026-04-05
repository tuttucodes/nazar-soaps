"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AdminHeader from "@/components/admin/AdminHeader";
import DataTable from "@/components/admin/DataTable";
import StatusBadge from "@/components/admin/StatusBadge";
import styles from "../dashboard.module.css";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Record<string, unknown>[]>([]);
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");

  const load = () => {
    const params = new URLSearchParams();
    if (status) params.set("status", status);
    if (search) params.set("search", search);
    const qs = params.toString();
    fetch(`/api/admin/orders${qs ? `?${qs}` : ""}`).then(r => r.json()).then(setOrders);
  };

  useEffect(() => { load(); }, [status]);

  const statuses = ["", "pending", "confirmed", "shipped", "delivered", "cancelled", "returned"];

  const columns = [
    { key: "order_number", label: "Order #", render: (v: unknown) => <strong>#{String(v)}</strong> },
    { key: "customers", label: "Customer", render: (v: unknown) => {
      const c = v as Record<string, unknown> | null;
      return c ? String(c.name || c.email) : "—";
    }},
    { key: "total", label: "Total", render: (v: unknown) => `Rs. ${v}` },
    { key: "payment_status", label: "Payment", render: (v: unknown) => <StatusBadge status={v as string} /> },
    { key: "status", label: "Status", render: (v: unknown) => <StatusBadge status={v as string} /> },
    { key: "created_at", label: "Date", render: (v: unknown) => new Date(v as string).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) },
    { key: "id", label: "", render: (_v: unknown, row: Record<string, unknown>) => (
      <Link href={`/admin/orders/${row.id}`} style={{ color: "#e8830c", fontSize: "0.82rem", fontWeight: 600 }}>View</Link>
    )},
  ];

  return (
    <>
      <AdminHeader title="Orders" />
      <div className={styles.content}>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <input type="text" placeholder="Search by order # or tracking..." value={search} onChange={e => setSearch(e.target.value)} onKeyDown={e => e.key === "Enter" && load()} style={{ flex: 1, minWidth: "200px", padding: "0.6rem 0.9rem", border: "1px solid #ddd", borderRadius: "6px", fontSize: "0.9rem", fontFamily: "inherit" }} />
          <select value={status} onChange={e => setStatus(e.target.value)} style={{ padding: "0.6rem 0.9rem", border: "1px solid #ddd", borderRadius: "6px", fontSize: "0.88rem", fontFamily: "inherit", background: "#fff" }}>
            {statuses.map(s => <option key={s} value={s}>{s ? s.charAt(0).toUpperCase() + s.slice(1) : "All Statuses"}</option>)}
          </select>
          <button onClick={load} style={{ padding: "0.6rem 1.25rem", background: "#f3f4f6", border: "1px solid #ddd", borderRadius: "6px", cursor: "pointer", fontWeight: 600, fontSize: "0.85rem" }}>Search</button>
        </div>
        <DataTable columns={columns} data={orders} emptyMessage="No orders found" />
      </div>
    </>
  );
}
