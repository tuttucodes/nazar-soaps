"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import AdminHeader from "@/components/admin/AdminHeader";
import styles from "../new/form.module.css";

interface Category { id: string; name: string; }

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [categories, setCategories] = useState<Category[]>([]);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<Record<string, string | boolean>>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch(`/api/admin/products/${id}`).then(r => r.json()),
      fetch("/api/admin/categories").then(r => r.json()),
    ]).then(([product, cats]) => {
      setForm({
        name: product.name || "", slug: product.slug || "",
        short_description: product.short_description || "", description: product.description || "",
        price: String(product.price), original_price: String(product.original_price || ""),
        badge: product.badge || "", category_id: product.category_id || "",
        is_best_seller: product.is_best_seller, is_new_launch: product.is_new_launch,
        is_combo: product.is_combo, stock_quantity: String(product.stock_quantity),
        low_stock_threshold: String(product.low_stock_threshold),
        variant_label: product.variant_label || "", seo_title: product.seo_title || "",
        seo_description: product.seo_description || "", status: product.status,
      });
      setCategories(cats);
      setLoaded(true);
    });
  }, [id]);

  const updateField = (key: string, value: string | boolean) => setForm(prev => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      name: form.name, slug: form.slug, short_description: form.short_description,
      description: form.description, price: parseFloat(form.price as string),
      original_price: form.original_price ? parseFloat(form.original_price as string) : null,
      badge: form.badge || null, category_id: form.category_id || null,
      is_best_seller: form.is_best_seller, is_new_launch: form.is_new_launch,
      is_combo: form.is_combo, stock_quantity: parseInt(form.stock_quantity as string),
      low_stock_threshold: parseInt(form.low_stock_threshold as string),
      variant_label: form.variant_label || null, seo_title: form.seo_title || null,
      seo_description: form.seo_description || null, status: form.status,
    };

    const res = await fetch(`/api/admin/products/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    if (res.ok) router.push("/admin/products");
    else { const err = await res.json(); alert(err.error); setSaving(false); }
  };

  if (!loaded) return <div className={styles.content}>Loading...</div>;

  return (
    <>
      <AdminHeader title="Edit Product" />
      <div className={styles.content}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.grid}>
            <div className={styles.main}>
              <div className={styles.card}>
                <h3>Basic Info</h3>
                <div className={styles.field}><label>Product Name *</label><input value={form.name as string} onChange={e => updateField("name", e.target.value)} required /></div>
                <div className={styles.field}><label>Slug *</label><input value={form.slug as string} onChange={e => updateField("slug", e.target.value)} required /></div>
                <div className={styles.field}><label>Short Description</label><input value={form.short_description as string} onChange={e => updateField("short_description", e.target.value)} /></div>
                <div className={styles.field}><label>Full Description</label><textarea value={form.description as string} onChange={e => updateField("description", e.target.value)} rows={5} /></div>
              </div>
              <div className={styles.card}>
                <h3>Pricing & Inventory</h3>
                <div className={styles.row}>
                  <div className={styles.field}><label>Price *</label><input type="number" step="0.01" value={form.price as string} onChange={e => updateField("price", e.target.value)} required /></div>
                  <div className={styles.field}><label>Original Price</label><input type="number" step="0.01" value={form.original_price as string} onChange={e => updateField("original_price", e.target.value)} /></div>
                </div>
                <div className={styles.row}>
                  <div className={styles.field}><label>Stock</label><input type="number" value={form.stock_quantity as string} onChange={e => updateField("stock_quantity", e.target.value)} /></div>
                  <div className={styles.field}><label>Low Stock Threshold</label><input type="number" value={form.low_stock_threshold as string} onChange={e => updateField("low_stock_threshold", e.target.value)} /></div>
                </div>
                <div className={styles.field}><label>Variant Label</label><input value={form.variant_label as string} onChange={e => updateField("variant_label", e.target.value)} /></div>
              </div>
              <div className={styles.card}>
                <h3>SEO</h3>
                <div className={styles.field}><label>SEO Title</label><input value={form.seo_title as string} onChange={e => updateField("seo_title", e.target.value)} /></div>
                <div className={styles.field}><label>SEO Description</label><textarea value={form.seo_description as string} onChange={e => updateField("seo_description", e.target.value)} rows={3} /></div>
              </div>
            </div>
            <div className={styles.sidebar}>
              <div className={styles.card}>
                <h3>Status</h3>
                <select value={form.status as string} onChange={e => updateField("status", e.target.value)}>
                  <option value="active">Active</option><option value="draft">Draft</option><option value="archived">Archived</option>
                </select>
              </div>
              <div className={styles.card}>
                <h3>Organization</h3>
                <div className={styles.field}><label>Category</label>
                  <select value={form.category_id as string} onChange={e => updateField("category_id", e.target.value)}>
                    <option value="">No category</option>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div className={styles.field}><label>Badge</label><input value={form.badge as string} onChange={e => updateField("badge", e.target.value)} /></div>
                <label className={styles.checkbox}><input type="checkbox" checked={form.is_best_seller as boolean} onChange={e => updateField("is_best_seller", e.target.checked)} />Best Seller</label>
                <label className={styles.checkbox}><input type="checkbox" checked={form.is_new_launch as boolean} onChange={e => updateField("is_new_launch", e.target.checked)} />New Launch</label>
                <label className={styles.checkbox}><input type="checkbox" checked={form.is_combo as boolean} onChange={e => updateField("is_combo", e.target.checked)} />Combo</label>
              </div>
              <button type="submit" disabled={saving} className={styles.saveBtn}>{saving ? "Saving..." : "Save Changes"}</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
