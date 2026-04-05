"use client";

import { useEffect, useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import styles from "../dashboard.module.css";

interface PageContent { id: string; page_slug: string; title: string; content: string; seo_title: string; seo_description: string; }

export default function AdminContentPage() {
  const [pages, setPages] = useState<PageContent[]>([]);
  const [editing, setEditing] = useState<PageContent | null>(null);
  const [form, setForm] = useState({ title: "", content: "", seo_title: "", seo_description: "" });
  const [saving, setSaving] = useState(false);

  const load = () => fetch("/api/admin/content").then(r => r.json()).then(setPages);
  useEffect(() => { load(); }, []);

  const startEdit = (p: PageContent) => {
    setEditing(p);
    setForm({ title: p.title || "", content: p.content || "", seo_title: p.seo_title || "", seo_description: p.seo_description || "" });
  };

  const save = async () => {
    if (!editing) return;
    setSaving(true);
    await fetch("/api/admin/content", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: editing.id, ...form }) });
    setSaving(false); setEditing(null); load();
  };

  const cardStyle: React.CSSProperties = { background: "#fff", border: "1px solid #e5e7eb", borderRadius: "10px", padding: "1.25rem" };
  const inputStyle: React.CSSProperties = { padding: "0.55rem 0.75rem", border: "1px solid #ddd", borderRadius: "6px", fontSize: "0.88rem", fontFamily: "inherit", width: "100%" };
  const fieldStyle: React.CSSProperties = { display: "flex", flexDirection: "column", gap: "0.3rem", marginBottom: "0.75rem" };
  const labelStyle: React.CSSProperties = { fontSize: "0.78rem", fontWeight: 600, color: "#555" };

  if (editing) {
    return (
      <>
        <AdminHeader title={`Edit: ${editing.page_slug}`} />
        <div className={styles.content}>
          <div style={cardStyle}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div style={fieldStyle}><label style={labelStyle}>Page Title</label><input style={inputStyle} value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} /></div>
              <div style={fieldStyle}><label style={labelStyle}>SEO Title</label><input style={inputStyle} value={form.seo_title} onChange={e => setForm(p => ({ ...p, seo_title: e.target.value }))} /></div>
            </div>
            <div style={fieldStyle}><label style={labelStyle}>SEO Description</label><textarea style={{ ...inputStyle, resize: "vertical" }} rows={2} value={form.seo_description} onChange={e => setForm(p => ({ ...p, seo_description: e.target.value }))} /></div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Content</label>
              <textarea style={{ ...inputStyle, resize: "vertical", minHeight: "300px", lineHeight: "1.6" }} value={form.content} onChange={e => setForm(p => ({ ...p, content: e.target.value }))} />
            </div>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button onClick={save} disabled={saving} style={{ padding: "0.6rem 1.5rem", background: "#e8830c", color: "#fff", border: "none", borderRadius: "6px", fontSize: "0.88rem", fontWeight: 700, cursor: "pointer", opacity: saving ? 0.7 : 1 }}>{saving ? "Saving..." : "Save Changes"}</button>
              <button onClick={() => setEditing(null)} style={{ padding: "0.6rem 1.5rem", background: "#f3f4f6", border: "1px solid #ddd", borderRadius: "6px", fontSize: "0.88rem", fontWeight: 600, cursor: "pointer" }}>Cancel</button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <AdminHeader title="Page Content" />
      <div className={styles.content}>
        <div style={{ display: "grid", gap: "1rem" }}>
          {pages.map(p => (
            <div key={p.id} style={{ ...cardStyle, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h4 style={{ fontSize: "0.95rem", fontWeight: 700, margin: 0 }}>{p.title || p.page_slug}</h4>
                <span style={{ fontSize: "0.8rem", color: "#888" }}>/{p.page_slug}</span>
                {p.seo_title && <span style={{ fontSize: "0.78rem", color: "#16a34a", marginLeft: "0.75rem" }}>SEO configured</span>}
              </div>
              <button onClick={() => startEdit(p)} style={{ color: "#e8830c", fontSize: "0.85rem", fontWeight: 600, background: "none", border: "none", cursor: "pointer" }}>Edit</button>
            </div>
          ))}
          {!pages.length && <p style={{ color: "#999", textAlign: "center", padding: "2rem" }}>No pages found. Run the seed SQL to populate page content.</p>}
        </div>
      </div>
    </>
  );
}
