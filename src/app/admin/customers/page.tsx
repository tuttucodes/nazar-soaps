"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AdminHeader from "@/components/admin/AdminHeader";
import DataTable from "@/components/admin/DataTable";
import styles from "../dashboard.module.css";

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<Record<string, unknown>[]>([]);
  const [search, setSearch] = useState("");

  const load = () => {
    const params = search ? `?search=${encodeURIComponent(search)}` : "";
    fetch(`/api/admin/customers${params}`).then(r => r.json()).then(setCustomers);
  };

  useEffect(() => { load(); }, []);

  const columns = [
    { key: "name", label: "Name", render: (v: unknown) => <strong>{String(v || "—")}</strong> },
    { key: "email", label: "Email", render: (v: unknown) => String(v) },
    { key: "phone", label: "Phone", render: (v: unknown) => String(v || "—") },
    { key: "total_orders", label: "Orders", render: (v: unknown) => String(v || 0) },
    { key: "total_spent", label: "Spent", render: (v: unknown) => `Rs. ${v || 0}` },
    { key: "created_at", label: "Joined", render: (v: unknown) => new Date(v as string).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) },
    { key: "id", label: "", render: (_v: unknown, row: Record<string, unknown>) => (
      <Link href={`/admin/customers/${row.id}`} style={{ color: "#e8830c", fontSize: "0.82rem", fontWeight: 600 }}>View</Link>
    )},
  ];

  return (
    <>
      <AdminHeader title="Customers" />
      <div className={styles.content}>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <input type="text" placeholder="Search by name, email, or phone..." value={search} onChange={e => setSearch(e.target.value)} onKeyDown={e => e.key === "Enter" && load()} style={{ flex: 1, padding: "0.6rem 0.9rem", border: "1px solid #ddd", borderRadius: "6px", fontSize: "0.9rem", fontFamily: "inherit" }} />
          <button onClick={load} style={{ padding: "0.6rem 1.25rem", background: "#f3f4f6", border: "1px solid #ddd", borderRadius: "6px", cursor: "pointer", fontWeight: 600, fontSize: "0.85rem" }}>Search</button>
        </div>
        <DataTable columns={columns} data={customers} emptyMessage="No customers found" />
      </div>
    </>
  );
}
