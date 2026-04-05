"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminHeader from "@/components/admin/AdminHeader";
import styles from "./form.module.css";

interface Category { id: string; name: string; }

export default function NewProductPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: "", slug: "", short_description: "", description: "", price: "",
    original_price: "", badge: "", category_id: "", is_best_seller: false,
    is_new_launch: false, is_combo: false, stock_quantity: "100",
    low_stock_threshold: "10", variant_label: "", seo_title: "", seo_description: "", status: "active",
  });

  useEffect(() => {
    fetch("/api/admin/categories").then(r => r.json()).then(setCategories);
  }, []);

  const updateField = (key: string, value: string | boolean) => {
    setForm(prev => ({ ...prev, [key]: value }));
    if (key === "name" && !form.slug) {
      setForm(prev => ({ ...prev, slug: String(value).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "") }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      ...form,
      price: parseFloat(form.price),
      original_price: form.original_price ? parseFloat(form.original_price) : null,
      stock_quantity: parseInt(form.stock_quantity),
      low_stock_threshold: parseInt(form.low_stock_threshold),
      category_id: form.category_id || null,
    };

    const res = await fetch("/api/admin/products", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    if (res.ok) {
      router.push("/admin/products");
    } else {
      const err = await res.json();
      alert(err.error || "Failed to create product");
      setSaving(false);
    }
  };

  return (
    <>
      <AdminHeader title="Add New Product" />
      <div className={styles.content}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.grid}>
            <div className={styles.main}>
              <div className={styles.card}>
                <h3>Basic Info</h3>
                <div className={styles.field}>
                  <label>Product Name *</label>
                  <input value={form.name} onChange={e => updateField("name", e.target.value)} required />
                </div>
                <div className={styles.field}>
                  <label>Slug *</label>
                  <input value={form.slug} onChange={e => updateField("slug", e.target.value)} required />
                </div>
                <div className={styles.field}>
                  <label>Short Description</label>
                  <input value={form.short_description} onChange={e => updateField("short_description", e.target.value)} />
                </div>
                <div className={styles.field}>
                  <label>Full Description</label>
                  <textarea value={form.description} onChange={e => updateField("description", e.target.value)} rows={5} />
                </div>
              </div>

              <div className={styles.card}>
                <h3>Pricing & Inventory</h3>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label>Price (Rs.) *</label>
                    <input type="number" step="0.01" value={form.price} onChange={e => updateField("price", e.target.value)} required />
                  </div>
                  <div className={styles.field}>
                    <label>Original Price (Rs.)</label>
                    <input type="number" step="0.01" value={form.original_price} onChange={e => updateField("original_price", e.target.value)} />
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label>Stock Quantity</label>
                    <input type="number" value={form.stock_quantity} onChange={e => updateField("stock_quantity", e.target.value)} />
                  </div>
                  <div className={styles.field}>
                    <label>Low Stock Threshold</label>
                    <input type="number" value={form.low_stock_threshold} onChange={e => updateField("low_stock_threshold", e.target.value)} />
                  </div>
                </div>
                <div className={styles.field}>
                  <label>Variant Label</label>
                  <input value={form.variant_label} onChange={e => updateField("variant_label", e.target.value)} placeholder="e.g. Pack of 1 (9% off)" />
                </div>
              </div>

              <div className={styles.card}>
                <h3>SEO</h3>
                <div className={styles.field}>
                  <label>SEO Title</label>
                  <input value={form.seo_title} onChange={e => updateField("seo_title", e.target.value)} />
                </div>
                <div className={styles.field}>
                  <label>SEO Description</label>
                  <textarea value={form.seo_description} onChange={e => updateField("seo_description", e.target.value)} rows={3} />
                </div>
              </div>
            </div>

            <div className={styles.sidebar}>
              <div className={styles.card}>
                <h3>Status</h3>
                <select value={form.status} onChange={e => updateField("status", e.target.value)}>
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
              <div className={styles.card}>
                <h3>Organization</h3>
                <div className={styles.field}>
                  <label>Category</label>
                  <select value={form.category_id} onChange={e => updateField("category_id", e.target.value)}>
                    <option value="">No category</option>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div className={styles.field}>
                  <label>Badge</label>
                  <input value={form.badge} onChange={e => updateField("badge", e.target.value)} placeholder="e.g. Best Seller" />
                </div>
                <label className={styles.checkbox}>
                  <input type="checkbox" checked={form.is_best_seller} onChange={e => updateField("is_best_seller", e.target.checked)} />
                  Best Seller
                </label>
                <label className={styles.checkbox}>
                  <input type="checkbox" checked={form.is_new_launch} onChange={e => updateField("is_new_launch", e.target.checked)} />
                  New Launch
                </label>
                <label className={styles.checkbox}>
                  <input type="checkbox" checked={form.is_combo} onChange={e => updateField("is_combo", e.target.checked)} />
                  Combo Product
                </label>
              </div>
              <button type="submit" disabled={saving} className={styles.saveBtn}>
                {saving ? "Saving..." : "Create Product"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
