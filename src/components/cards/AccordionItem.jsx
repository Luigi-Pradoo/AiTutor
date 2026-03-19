import React, { useState } from "react";

export default function AccordionItem({ icon, label, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div style={{ borderBottom: "1px solid var(--border-glass)", borderRadius: "12px", overflow: "hidden", marginBottom: "10px" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          padding: "17px 18px",
          background: "var(--bg-input)",
          border: "none",
          cursor: "pointer",
          fontFamily: "inherit",
          fontSize: "15px",
          fontWeight: "500",
          color: "var(--text-primary)",
          transition: "background 0.15s",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = "var(--bg-input-focus)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = "var(--bg-input)"; }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {icon}
          {label}
        </span>
        <svg
          width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          style={{ transition: "transform 0.3s ease", transform: open ? "rotate(180deg)" : "rotate(0)" }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <div style={{
        maxHeight: open ? "800px" : "0",
        overflow: "hidden",
        transition: "max-height 0.4s ease-in-out",
        background: "var(--bg-surface)",
        backdropFilter: "blur(12px)",
      }}>
        <div style={{ padding: "14px 18px", fontSize: "14px", color: "var(--text-secondary)", lineHeight: "1.5" }}>
          {children}
        </div>
      </div>
    </div>
  );
}
