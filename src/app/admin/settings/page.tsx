"use client";

import { useEffect, useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import styles from "../dashboard.module.css";

interface Setting { id: string; key: string; value: string; }

const SETTING_LABELS: Record<string, { label: string; type: "text" | "textarea"; help?: string }> = {
  announcement_text: { label: "Announcement Bar Text", type: "text", help: "Shown at the top of the site" },
  announcement_active: { label: "Announcement Bar Active", type: "text", help: "true or false" },
  store_name: { label: "Store Name", type: "text" },
  store_email: { label: "Store Email", type: "text" },
  store_phone: { label: "Store Phone", type: "text" },
  store_address: { label: "Store Address", type: "textarea" },
  default_seo_title: { label: "Default SEO Title", type: "text" },
  default_seo_description: { label: "Default SEO Description", type: "textarea" },
  social_instagram: { label: "Instagram URL", type: "text" },
  social_facebook: { label: "Facebook URL", type: "text" },
  shipping_free_above: { label: "Free Shipping Above (Rs.)", type: "text", help: "Orders above this amount get free shipping" },
};

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Setting[]>([]);
  const [values, setValues] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/settings").then(r => r.json()).then((data: Setting[]) => {
      setSettings(data);
      const v: Record<string, string> = {};
      data.forEach(s => { v[s.key] = s.value; });
      setValues(v);
    });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    const payload = Object.entries(values).map(([key, value]) => ({ key, value }));
    await fetch("/api/admin/settings", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ settings: payload }) });
    setSaving(false); setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const cardStyle: React.CSSProperties = { background: "#fff", border: "1px solid #e5e7eb", borderRadius: "10px", padding: "1.25rem" };
  const fieldStyle: React.CSSProperties = { display: "flex", flexDirection: "column", gap: "0.3rem", marginBottom: "1rem" };
  const labelStyle: React.CSSProperties = { fontSize: "0.78rem", fontWeight: 600, color: "#555" };
  const helpStyle: React.CSSProperties = { fontSize: "0.72rem", color: "#999" };
  const inputStyle: React.CSSProperties = { padding: "0.55rem 0.75rem", border: "1px solid #ddd", borderRadius: "6px", fontSize: "0.88rem", fontFamily: "inherit", width: "100%" };

  const groups = [
    { title: "Store Info", keys: ["store_name", "store_email", "store_phone", "store_address"] },
    { title: "Announcement Bar", keys: ["announcement_text", "announcement_active"] },
    { title: "SEO Defaults", keys: ["default_seo_title", "default_seo_description"] },
    { title: "Social Media", keys: ["social_instagram", "social_facebook"] },
    { title: "Shipping", keys: ["shipping_free_above"] },
  ];

  return (
    <>
      <AdminHeader title="Settings">
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          {saved && <span style={{ color: "#16a34a", fontSize: "0.85rem", fontWeight: 600 }}>Saved!</span>}
          <button onClick={handleSave} disabled={saving} style={{ background: "#e8830c", color: "#fff", padding: "0.5rem 1.25rem", borderRadius: "6px", fontSize: "0.85rem", fontWeight: 600, border: "none", cursor: "pointer", opacity: saving ? 0.7 : 1 }}>
            {saving ? "Saving..." : "Save Settings"}
          </button>
        </div>
      </AdminHeader>
      <div className={styles.content}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
          {groups.map(g => (
            <div key={g.title} style={cardStyle}>
              <h3 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "1rem", color: "#333" }}>{g.title}</h3>
              {g.keys.map(key => {
                const config = SETTING_LABELS[key] || { label: key, type: "text" };
                return (
                  <div key={key} style={fieldStyle}>
                    <label style={labelStyle}>{config.label}</label>
                    {config.help && <span style={helpStyle}>{config.help}</span>}
                    {config.type === "textarea" ? (
                      <textarea style={{ ...inputStyle, resize: "vertical" }} rows={3} value={values[key] || ""} onChange={e => setValues(p => ({ ...p, [key]: e.target.value }))} />
                    ) : (
                      <input style={inputStyle} value={values[key] || ""} onChange={e => setValues(p => ({ ...p, [key]: e.target.value }))} />
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {settings.filter(s => !Object.keys(SETTING_LABELS).includes(s.key)).length > 0 && (
          <div style={cardStyle}>
            <h3 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "1rem", color: "#333" }}>Other Settings</h3>
            {settings.filter(s => !Object.keys(SETTING_LABELS).includes(s.key)).map(s => (
              <div key={s.key} style={fieldStyle}>
                <label style={labelStyle}>{s.key}</label>
                <input style={inputStyle} value={values[s.key] || ""} onChange={e => setValues(p => ({ ...p, [s.key]: e.target.value }))} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
