"use client";

import { useEffect, useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import styles from "../dashboard.module.css";

interface Concern { id: string; name: string; slug: string; description: string; image_url: string; color: string; sort_order: number; }

export default function AdminConcernsPage() {
  const [concerns, setConcerns] = useState<Concern[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", slug: "", description: "", image_url: "", color: "#e8830c", sort_order: "0" });
  const [adding, setAdding] = useState(false);

  const load = () => fetch("/api/admin/concerns").then(r => r.json()).then(setConcerns);
  useEffect(() => { load(); }, []);

  const startEdit = (c: Concern) => {
    setEditing(c.id);
    setForm({ name: c.name, slug: c.slug, description: c.description || "", image_url: c.image_url || "", color: c.color || "#e8830c", sort_order: String(c.sort_order) });
  };

  const startAdd = () => {
    setAdding(true);
    setForm({ name: "", slug: "", description: "", image_url: "", color: "#e8830c", sort_order: "0" });
  };

  const save = async () => {
    const payload = { ...form, sort_order: parseInt(form.sort_order) };
    if (editing) {
      await fetch("/api/admin/concerns", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: editing, ...payload }) });
    } else {
      await fetch("/api/admin/concerns", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    }
    setEditing(null); setAdding(false); load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this concern?")) return;
    await fetch("/api/admin/concerns", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    load();
  };

  const cancel = () => { setEditing(null); setAdding(false); };

  const tableStyle: React.CSSProperties = { width: "100%", borderCollapse: "collapse", background: "#fff", borderRadius: "8px", overflow: "hidden", border: "1px solid #e5e7eb" };
  const thStyle: React.CSSProperties = { textAlign: "left", padding: "0.75rem 1rem", fontSize: "0.78rem", fontWeight: 700, color: "#666", borderBottom: "1px solid #e5e7eb", background: "#fafafa" };
  const tdStyle: React.CSSProperties = { padding: "0.75rem 1rem", fontSize: "0.88rem", borderBottom: "1px solid #f3f4f6" };
  const inputStyle: React.CSSProperties = { padding: "0.4rem 0.6rem", border: "1px solid #ddd", borderRadius: "4px", fontSize: "0.85rem", width: "100%" };
  const btnStyle = (bg: string): React.CSSProperties => ({ padding: "0.35rem 0.75rem", background: bg, color: "#fff", border: "none", borderRadius: "4px", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer" });

  return (
    <>
      <AdminHeader title="Concerns">
        <button onClick={startAdd} style={{ background: "#e8830c", color: "#fff", padding: "0.5rem 1rem", borderRadius: "6px", fontSize: "0.85rem", fontWeight: 600, border: "none", cursor: "pointer" }}>+ Add Concern</button>
      </AdminHeader>
      <div className={styles.content}>
        <table style={tableStyle}>
          <thead><tr>
            <th style={thStyle}>Color</th><th style={thStyle}>Name</th><th style={thStyle}>Slug</th><th style={thStyle}>Description</th><th style={thStyle}>Order</th><th style={thStyle}>Actions</th>
          </tr></thead>
          <tbody>
            {adding && (
              <tr>
                <td style={tdStyle}><input type="color" value={form.color} onChange={e => setForm(p => ({ ...p, color: e.target.value }))} style={{ width: "36px", height: "30px", border: "none", cursor: "pointer" }} /></td>
                <td style={tdStyle}><input style={inputStyle} value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "") }))} placeholder="Name" /></td>
                <td style={tdStyle}><input style={inputStyle} value={form.slug} onChange={e => setForm(p => ({ ...p, slug: e.target.value }))} placeholder="Slug" /></td>
                <td style={tdStyle}><input style={inputStyle} value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} placeholder="Description" /></td>
                <td style={tdStyle}><input style={{ ...inputStyle, width: "60px" }} type="number" value={form.sort_order} onChange={e => setForm(p => ({ ...p, sort_order: e.target.value }))} /></td>
                <td style={tdStyle}><div style={{ display: "flex", gap: "0.4rem" }}><button style={btnStyle("#16a34a")} onClick={save}>Save</button><button style={btnStyle("#6b7280")} onClick={cancel}>Cancel</button></div></td>
              </tr>
            )}
            {concerns.map(c => (
              <tr key={c.id}>
                {editing === c.id ? (
                  <>
                    <td style={tdStyle}><input type="color" value={form.color} onChange={e => setForm(p => ({ ...p, color: e.target.value }))} style={{ width: "36px", height: "30px", border: "none", cursor: "pointer" }} /></td>
                    <td style={tdStyle}><input style={inputStyle} value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} /></td>
                    <td style={tdStyle}><input style={inputStyle} value={form.slug} onChange={e => setForm(p => ({ ...p, slug: e.target.value }))} /></td>
                    <td style={tdStyle}><input style={inputStyle} value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} /></td>
                    <td style={tdStyle}><input style={{ ...inputStyle, width: "60px" }} type="number" value={form.sort_order} onChange={e => setForm(p => ({ ...p, sort_order: e.target.value }))} /></td>
                    <td style={tdStyle}><div style={{ display: "flex", gap: "0.4rem" }}><button style={btnStyle("#16a34a")} onClick={save}>Save</button><button style={btnStyle("#6b7280")} onClick={cancel}>Cancel</button></div></td>
                  </>
                ) : (
                  <>
                    <td style={tdStyle}><div style={{ width: "24px", height: "24px", borderRadius: "50%", background: c.color || "#e8830c" }} /></td>
                    <td style={tdStyle}><strong>{c.name}</strong></td>
                    <td style={tdStyle}><code style={{ fontSize: "0.8rem", color: "#666" }}>{c.slug}</code></td>
                    <td style={tdStyle}>{c.description || "—"}</td>
                    <td style={tdStyle}>{c.sort_order}</td>
                    <td style={tdStyle}>
                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        <button onClick={() => startEdit(c)} style={{ color: "#e8830c", fontSize: "0.82rem", fontWeight: 600, background: "none", border: "none", cursor: "pointer" }}>Edit</button>
                        <button onClick={() => remove(c.id)} style={{ color: "#dc2626", fontSize: "0.82rem", fontWeight: 600, background: "none", border: "none", cursor: "pointer" }}>Delete</button>
                      </div>
                    </td>
                  </>
                )}
              </tr>
            ))}
            {!concerns.length && !adding && <tr><td colSpan={6} style={{ ...tdStyle, textAlign: "center", color: "#999" }}>No concerns yet</td></tr>}
          </tbody>
        </table>
      </div>
    </>
  );
}
