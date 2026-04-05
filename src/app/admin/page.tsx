"use client";

import { useEffect, useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import StatsCard from "@/components/admin/StatsCard";
import DataTable from "@/components/admin/DataTable";
import StatusBadge from "@/components/admin/StatusBadge";
import Link from "next/link";
import styles from "./dashboard.module.css";

interface Analytics {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  totalProducts: number;
  lowStockCount: number;
  lowStockProducts: { id: string; name: string; stock_quantity: number }[];
  recentOrders: Record<string, unknown>[];
}

export default function AdminDashboard() {
  const [data, setData] = useState<Analytics | null>(null);

  useEffect(() => {
    fetch("/api/admin/analytics").then(r => r.json()).then(setData);
  }, []);

  if (!data) return <div className={styles.loading}>Loading dashboard...</div>;

  const orderColumns = [
    { key: "order_number", label: "#", render: (v: unknown) => `#${v}` },
    { key: "customers", label: "Customer", render: (_v: unknown, row: Record<string, unknown>) => {
      const c = row.customers as Record<string, string> | null;
      return c?.name || "Guest";
    }},
    { key: "total", label: "Total", render: (v: unknown) => `Rs. ${Number(v).toLocaleString()}` },
    { key: "status", label: "Status", render: (v: unknown) => <StatusBadge status={v as string} /> },
    { key: "created_at", label: "Date", render: (v: unknown) => new Date(v as string).toLocaleDateString("en-IN") },
  ];

  return (
    <>
      <AdminHeader title="Dashboard" />
      <div className={styles.content}>
        <div className={styles.statsGrid}>
          <StatsCard label="Total Revenue" value={`Rs. ${data.totalRevenue.toLocaleString()}`} />
          <StatsCard label="Total Orders" value={String(data.totalOrders)} />
          <StatsCard label="Customers" value={String(data.totalCustomers)} />
          <StatsCard label="Active Products" value={String(data.totalProducts)} />
        </div>

        {data.lowStockCount > 0 && (
          <div className={styles.alert}>
            <strong>Low Stock Alert:</strong> {data.lowStockCount} product(s) running low.
            {data.lowStockProducts.map(p => (
              <span key={p.id} className={styles.alertItem}>{p.name} ({p.stock_quantity} left)</span>
            ))}
            <Link href="/admin/inventory" className={styles.alertLink}>Manage Inventory &rarr;</Link>
          </div>
        )}

        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Recent Orders</h2>
            <Link href="/admin/orders" className={styles.viewAll}>View All &rarr;</Link>
          </div>
          <DataTable columns={orderColumns} data={data.recentOrders} emptyMessage="No orders yet" />
        </div>

        <div className={styles.quickActions}>
          <h2>Quick Actions</h2>
          <div className={styles.actionGrid}>
            <Link href="/admin/products/new" className={styles.actionCard}>Add Product</Link>
            <Link href="/admin/orders" className={styles.actionCard}>View Orders</Link>
            <Link href="/admin/inventory" className={styles.actionCard}>Check Inventory</Link>
            <Link href="/admin/marketing" className={styles.actionCard}>Campaigns</Link>
            <Link href="/admin/settings" className={styles.actionCard}>Site Settings</Link>
            <Link href="/admin/analytics" className={styles.actionCard}>Analytics</Link>
          </div>
        </div>
      </div>
    </>
  );
}
