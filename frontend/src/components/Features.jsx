import { useState } from "react";

const FEATURES = [
  {
    icon: "🔲",
    title: "Role-gated QR codes",
    sub: "One QR, different data per role",
    tag: "Core Technology",
    desc: "The same QR on every box — what it reveals depends on who scans it. Warehouse sees package ID. Hub sees route. Rider sees address. No one sees more than they need.",
    chip: "Zero PII on the label",
    visual: (
      <div style={{ marginTop: 20 }}>
        {[
          { label: "Warehouse", val: "Package ID only", dim: false },
          { label: "Sorting Hub", val: "Route only", dim: false },
          { label: "Delivery Rider", val: "Address only", dim: false },
          { label: "After delivery", val: "• • • • • • •", dim: true },
        ].map((r) => (
          <div key={r.label} style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            background: "#161616", border: "1px solid #1c1c1c", borderRadius: 4,
            padding: "8px 11px", marginBottom: 4, fontSize: 11,
          }}>
            <span style={{ color: "#444", fontWeight: 500 }}>{r.label}</span>
            <span style={{ fontWeight: 600, color: r.dim ? "#222" : "#bbb", letterSpacing: r.dim ? ".1em" : 0 }}>
              {r.val}
            </span>
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: "🗑",
    title: "Auto data wipe",
    sub: "Delivered = deleted",
    tag: "Privacy",
    desc: "The moment delivery is confirmed, all personal data is wiped automatically. No stale records on rider devices. No breach risk after the job is done.",
    chip: "Post-delivery auto-purge",
    visual: (
      <div style={{ marginTop: 20 }}>
        <div style={{ fontSize: 11, color: "#333", marginBottom: 5 }}>Wiping customer data…</div>
        <div style={{ height: 4, background: "#1a1a1a", borderRadius: 100, overflow: "hidden", marginBottom: 8 }}>
          <div style={{
            height: "100%", borderRadius: 100, background: "#E53935",
            animation: "wipe 2.2s ease-in-out infinite",
          }} />
        </div>
        <div style={{ fontSize: 11, color: "#2a2a2a" }}>Name · Phone · Address · Payment</div>
        <div style={{
          marginTop: 14, display: "inline-flex", alignItems: "center", gap: 6,
          background: "rgba(34,197,94,.08)", border: "1px solid rgba(34,197,94,.18)",
          borderRadius: 100, padding: "5px 12px", fontSize: 11, fontWeight: 600, color: "#22c55e",
        }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
          Data wiped — delivery complete
        </div>
        <style>{`@keyframes wipe{0%{width:0}70%{width:100%}100%{width:0}}`}</style>
      </div>
    ),
  },
  {
    icon: "🛡",
    title: "Tamper-proof logs",
    sub: "Full chain of custody",
    tag: "Compliance",
    desc: "Every scan is timestamped against the rider's ID and role. When a complaint comes in, you have a complete verifiable trail — not guesswork.",
    chip: "Audit-ready",
    visual: (
      <div style={{ marginTop: 20 }}>
        {[
          { time: "09:14 AM", text: "Warehouse — PKG-20416 scanned", green: false },
          { time: "11:32 AM", text: "Hub — Route assigned", green: false },
          { time: "02:55 PM", text: "Rider #R-09 — Address revealed", green: false },
          { time: "03:41 PM", text: "Delivered — data purge triggered", green: true },
        ].map((l) => (
          <div key={l.time} style={{ display: "flex", gap: 8, marginBottom: 8, fontSize: 11 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: l.green ? "#22c55e" : "#E53935", marginTop: 3, flexShrink: 0 }} />
            <span style={{ color: "#333", minWidth: 50 }}>{l.time}</span>
            <span style={{ color: l.green ? "#22c55e" : "#444" }}>{l.text}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: "📊",
    title: "Merchant dashboard",
    sub: "Track every shipment",
    tag: "Operations",
    desc: "Generate QR codes in bulk, monitor live delivery stages, review access logs, and confirm data wipe — all from one clean dashboard.",
    chip: "Bulk QR generation",
    visual: (
      <div style={{ marginTop: 20 }}>
        {[
          { id: "PKG-20416", stage: "Rider stage", live: true },
          { id: "PKG-20417", stage: "Hub stage", live: true },
          { id: "PKG-20418", stage: "Delivered", live: false },
        ].map((r) => (
          <div key={r.id} style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "7px 11px", background: "#161616", border: "1px solid #1c1c1c",
            borderRadius: 4, marginBottom: 4, fontSize: 11,
          }}>
            <span style={{ color: "#444", fontFamily: "monospace" }}>{r.id}</span>
            <span style={{ color: "#E53935", fontWeight: 600 }}>{r.stage}</span>
            <span style={{
              background: r.live ? "rgba(34,197,94,.1)" : "rgba(229,57,53,.1)",
              color: r.live ? "#22c55e" : "#E53935",
              borderRadius: 100, padding: "2px 8px", fontSize: 10, fontWeight: 600,
            }}>{r.live ? "Live" : "Wiped"}</span>
          </div>
        ))}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginTop: 8 }}>
          {[{ v: "142", l: "Active shipments" }, { v: "38", l: "Delivered today" }].map((s) => (
            <div key={s.l} style={{ background: "#161616", border: "1px solid #1c1c1c", borderRadius: 5, padding: "12px 14px" }}>
              <span style={{ fontSize: 22, fontWeight: 900, color: "#E53935", letterSpacing: "-.04em", display: "block" }}>{s.v}</span>
              <span style={{ fontSize: 10, color: "#2e2e2e", marginTop: 2, display: "block" }}>{s.l}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    icon: "📱",
    title: "No app needed",
    sub: "Riders scan via browser",
    tag: "Field Ready",
    desc: "Riders open a lightweight mobile-optimized view — no app install needed. Scan the QR, see the address, confirm delivery. Built for speed on the road.",
    chip: "Works on any phone",
    visual: (
      <div style={{ marginTop: 20 }}>
        <div style={{ background: "#1a1a1a", borderRadius: 10, border: "1px solid #1e1e1e", padding: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, fontSize: 11, color: "#444" }}>
            <span>RevealQR Scan</span>
            <span style={{ background: "rgba(229,57,53,.1)", border: "1px solid rgba(229,57,53,.22)", borderRadius: 100, padding: "2px 9px", fontSize: 10, fontWeight: 600, color: "#E53935" }}>Authorized</span>
          </div>
          {[
            { k: "Customer", v: "Hidden", hide: true },
            { k: "Phone", v: "Hidden", hide: true },
            { k: "Address", v: "LPU, Punjab", hide: false },
            { k: "Payment", v: "· · · · ·", hide: false },
          ].map((f) => (
            <div key={f.k} style={{ display: "flex", justifyContent: "space-between", fontSize: 11, padding: "6px 0", borderBottom: "1px solid #1a1a1a" }}>
              <span style={{ color: "#333" }}>{f.k}</span>
              <span style={{ color: f.hide ? "#2a2a2a" : "#bbb", fontWeight: 500 }}>{f.v}</span>
            </div>
          ))}
          <div style={{ marginTop: 10, background: "#E53935", borderRadius: 5, padding: 7, textAlign: "center", fontSize: 11, fontWeight: 700, color: "#fff" }}>
            ✓ Access granted — Delivery stage
          </div>
        </div>
      </div>
    ),
  },
];

export default function Features() {
  const [active, setActive] = useState(0);
  const f = FEATURES[active];

  return (
    <section id="features" style={{ background: "#0c0c0c", padding: "72px 32px", fontFamily: "'Inter','Helvetica Neue',sans-serif" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>

        {/* Eyebrow */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 10, fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: "#E53935", marginBottom: 14 }}>
          <span style={{ width: 18, height: 1.5, background: "#E53935", display: "inline-block" }} />
          What RevealQR Does
        </div>

        {/* Headline */}
        <h2 style={{ fontSize: "clamp(28px,4vw,36px)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-.03em", color: "#fff", margin: "0 0 40px" }}>
          Privacy isn't a setting.<br />
          <span style={{ color: "#E53935" }}>It's the structure.</span>
        </h2>

        {/* Body */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 3 }}>

          {/* Left — feature list */}
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {FEATURES.map((item, i) => (
              <div
                key={i}
                onClick={() => setActive(i)}
                style={{
                  display: "flex", alignItems: "center", gap: 14, padding: "16px",
                  borderRadius: 3, cursor: "pointer",
                  border: `1px solid ${i === active ? "#2e0808" : "transparent"}`,
                  background: i === active ? "#140404" : "#111",
                  transition: "all .18s",
                }}
              >
                <div style={{
                  width: 34, height: 34, borderRadius: 8, flexShrink: 0,
                  background: i === active ? "rgba(229,57,53,.14)" : "#1a1a1a",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 16, transition: "background .18s",
                }}>
                  {item.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: i === active ? "#fff" : "#444", margin: "0 0 2px", transition: "color .18s" }}>{item.title}</p>
                  <p style={{ fontSize: 11, color: i === active ? "#555" : "#2a2a2a", margin: 0, transition: "color .18s" }}>{item.sub}</p>
                </div>
                <span style={{ fontSize: 13, color: i === active ? "#E53935" : "#1e1e1e", transform: i === active ? "translateX(3px)" : "none", transition: "all .18s" }}>→</span>
              </div>
            ))}
          </div>

          {/* Right — preview panel */}
          <div style={{ background: "#111", borderRadius: 3, border: "1px solid #1a1a1a", padding: "28px 24px", display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: "#E53935", marginBottom: 16 }}>{f.tag}</span>
            <h3 style={{ fontSize: 19, fontWeight: 800, color: "#fff", letterSpacing: "-.02em", lineHeight: 1.2, margin: "0 0 8px" }}>{f.title}</h3>
            <div style={{ width: 32, height: 1.5, background: "#E53935", margin: "14px 0", opacity: .55 }} />
            <p style={{ fontSize: 12, color: "#4a4a4a", lineHeight: 1.8, margin: 0 }}>{f.desc}</p>
            {f.visual}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              border: "1px solid #1e1e1e", borderRadius: 100, padding: "5px 12px",
              fontSize: 10, fontWeight: 600, color: "#444", marginTop: 18,
            }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#E53935", flexShrink: 0 }} />
              {f.chip}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}