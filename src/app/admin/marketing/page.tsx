"use client";

import { useEffect, useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import StatusBadge from "@/components/admin/StatusBadge";
import styles from "../dashboard.module.css";

interface Campaign {
  id: string; name: string; type: string; status: string;
  budget: number; spent: number; start_date: string; end_date: string; description: string;
}

const TYPES = ["email", "social", "ad", "influencer"];
const STATUSES = ["draft", "active", "paused", "completed"];

export default function AdminMarketingPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [editing, setEditing] = useState<Campaign | null>(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ name: "", type: "social", status: "draft", budget: "", spent: "0", start_date: "", end_date: "", description: "" });

  const load = () => fetch("/api/admin/marketing").then(r => r.json()).then(setCampaigns);
  useEffect(() => { load(); }, []);

  const openAdd = () => {
    setAdding(true); setEditing(null);
    setForm({ name: "", type: "social", status: "draft", budget: "", spent: "0", start_date: "", end_date: "", description: "" });
  };

  const openEdit = (c: Campaign) => {
    setEditing(c); setAdding(false);
    setForm({ name: c.name, type: c.type, status: c.status, budget: String(c.budget || ""), spent: String(c.spent || 0), start_date: c.start_date || "", end_date: c.end_date || "", description: c.description || "" });
  };

  const save = async () => {
    const payload = { ...form, budget: parseFloat(form.budget) || 0, spent: parseFloat(form.spent) || 0, start_date: form.start_date || null, end_date: form.end_date || null };
    if (editing) {
      await fetch("/api/admin/marketing", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: editing.id, ...payload }) });
    } else {
      await fetch("/api/admin/marketing", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    }
    setEditing(null); setAdding(false); load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this campaign?")) return;
    await fetch("/api/admin/marketing", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    load();
  };

  const showForm = adding || editing;
  const cardStyle: React.CSSProperties = { background: "#fff", border: "1px solid #e5e7eb", borderRadius: "10px", padding: "1.25rem" };
  const fieldStyle: React.CSSProperties = { display: "flex", flexDirection: "column", gap: "0.3rem", marginBottom: "0.75rem" };
  const labelStyle: React.CSSProperties = { fontSize: "0.78rem", fontWeight: 600, color: "#555" };
  const inputStyle: React.CSSProperties = { padding: "0.5rem 0.7rem", border: "1px solid #ddd", borderRadius: "6px", fontSize: "0.88rem", fontFamily: "inherit", width: "100%" };

  return (
    <>
      <AdminHeader title="Marketing Campaigns">
        {!showForm && <button onClick={openAdd} style={{ background: "#e8830c", color: "#fff", padding: "0.5rem 1rem", borderRadius: "6px", fontSize: "0.85rem", fontWeight: 600, border: "none", cursor: "pointer" }}>+ New Campaign</button>}
      </AdminHeader>
      <div className={styles.content}>
        {showForm && (
          <div style={cardStyle}>
            <h3 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "1rem" }}>{editing ? "Edit Campaign" : "New Campaign"}</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div style={fieldStyle}><label style={labelStyle}>Name *</label><input style={inputStyle} value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} /></div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                <div style={fieldStyle}><label style={labelStyle}>Type</label>
                  <select style={inputStyle} value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))}>
                    {TYPES.map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
                  </select>
                </div>
                <div style={fieldStyle}><label style={labelStyle}>Status</label>
                  <select style={inputStyle} value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))}>
                    {STATUSES.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                  </select>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                <div style={fieldStyle}><label style={labelStyle}>Budget (Rs.)</label><input style={inputStyle} type="number" value={form.budget} onChange={e => setForm(p => ({ ...p, budget: e.target.value }))} /></div>
                <div style={fieldStyle}><label style={labelStyle}>Spent (Rs.)</label><input style={inputStyle} type="number" value={form.spent} onChange={e => setForm(p => ({ ...p, spent: e.target.value }))} /></div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                <div style={fieldStyle}><label style={labelStyle}>Start Date</label><input style={inputStyle} type="date" value={form.start_date} onChange={e => setForm(p => ({ ...p, start_date: e.target.value }))} /></div>
                <div style={fieldStyle}><label style={labelStyle}>End Date</label><input style={inputStyle} type="date" value={form.end_date} onChange={e => setForm(p => ({ ...p, end_date: e.target.value }))} /></div>
              </div>
            </div>
            <div style={fieldStyle}><label style={labelStyle}>Description</label><textarea style={{ ...inputStyle, resize: "vertical" }} rows={3} value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} /></div>
            <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
              <button onClick={save} style={{ padding: "0.6rem 1.5rem", background: "#e8830c", color: "#fff", border: "none", borderRadius: "6px", fontSize: "0.88rem", fontWeight: 700, cursor: "pointer" }}>{editing ? "Update" : "Create"}</button>
              <button onClick={() => { setAdding(false); setEditing(null); }} style={{ padding: "0.6rem 1.5rem", background: "#f3f4f6", border: "1px solid #ddd", borderRadius: "6px", fontSize: "0.88rem", fontWeight: 600, cursor: "pointer" }}>Cancel</button>
            </div>
          </div>
        )}

        <div style={{ display: "grid", gap: "1rem" }}>
          {campaigns.map(c => (
            <div key={c.id} style={cardStyle}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                <div>
                  <h4 style={{ fontSize: "1rem", fontWeight: 700, margin: 0 }}>{c.name}</h4>
                  <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.4rem" }}>
                    <StatusBadge status={c.type} />
                    <StatusBadge status={c.status} />
                  </div>
                </div>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button onClick={() => openEdit(c)} style={{ color: "#e8830c", fontSize: "0.82rem", fontWeight: 600, background: "none", border: "none", cursor: "pointer" }}>Edit</button>
                  <button onClick={() => remove(c.id)} style={{ color: "#dc2626", fontSize: "0.82rem", fontWeight: 600, background: "none", border: "none", cursor: "pointer" }}>Delete</button>
                </div>
              </div>
              {c.description && <p style={{ fontSize: "0.85rem", color: "#666", marginBottom: "0.75rem" }}>{c.description}</p>}
              <div style={{ display: "flex", gap: "2rem", fontSize: "0.82rem", color: "#888" }}>
                <span>Budget: <strong style={{ color: "#333" }}>Rs. {c.budget || 0}</strong></span>
                <span>Spent: <strong style={{ color: c.spent > (c.budget || 0) ? "#dc2626" : "#333" }}>Rs. {c.spent || 0}</strong></span>
                {c.start_date && <span>{c.start_date}{c.end_date ? ` → ${c.end_date}` : ""}</span>}
              </div>
            </div>
          ))}
          {!campaigns.length && <p style={{ color: "#999", textAlign: "center", padding: "2rem" }}>No campaigns yet</p>}
        </div>
      </div>
    </>
  );
}
