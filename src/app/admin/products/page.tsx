"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AdminHeader from "@/components/admin/AdminHeader";
import DataTable from "@/components/admin/DataTable";
import StatusBadge from "@/components/admin/StatusBadge";
import styles from "../dashboard.module.css";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Record<string, unknown>[]>([]);
  const [search, setSearch] = useState("");

  const loadProducts = () => {
    const params = search ? `?search=${encodeURIComponent(search)}` : "";
    fetch(`/api/admin/products${params}`).then(r => r.json()).then(setProducts);
  };

  useEffect(() => { loadProducts(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    loadProducts();
  };

  const columns = [
    { key: "name", label: "Product", render: (v: unknown) => <strong>{String(v)}</strong> },
    { key: "price", label: "Price", render: (v: unknown) => `Rs. ${v}` },
    { key: "stock_quantity", label: "Stock", render: (v: unknown) => String(v) },
    { key: "status", label: "Status", render: (v: unknown) => <StatusBadge status={v as string} /> },
    { key: "id", label: "Actions", render: (_v: unknown, row: Record<string, unknown>) => (
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <Link href={`/admin/products/${row.id}`} style={{ color: "#e8830c", fontSize: "0.82rem", fontWeight: 600 }}>Edit</Link>
        <button onClick={() => handleDelete(row.id as string)} style={{ color: "#dc2626", fontSize: "0.82rem", fontWeight: 600, background: "none", border: "none", cursor: "pointer" }}>Delete</button>
      </div>
    )},
  ];

  return (
    <>
      <AdminHeader title="Products">
        <Link href="/admin/products/new" style={{ background: "#e8830c", color: "#fff", padding: "0.5rem 1rem", borderRadius: "6px", fontSize: "0.85rem", fontWeight: 600, textDecoration: "none" }}>
          + Add Product
        </Link>
      </AdminHeader>
      <div className={styles.content}>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={e => e.key === "Enter" && loadProducts()}
            style={{ flex: 1, padding: "0.6rem 0.9rem", border: "1px solid #ddd", borderRadius: "6px", fontSize: "0.9rem", fontFamily: "inherit" }}
          />
          <button onClick={loadProducts} style={{ padding: "0.6rem 1.25rem", background: "#f3f4f6", border: "1px solid #ddd", borderRadius: "6px", cursor: "pointer", fontWeight: 600, fontSize: "0.85rem" }}>Search</button>
        </div>
        <DataTable columns={columns} data={products} emptyMessage="No products found" />
      </div>
    </>
  );
}
