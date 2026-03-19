import React from "react";

export default function ProgressRow({ name, score, total }) {
  const pct = Math.round((score / total) * 100);
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      background: "var(--bg-surface)",
      backdropFilter: "blur(12px)",
      borderRadius: "16px",
      padding: "16px 18px",
      border: "1px solid var(--border-glass)",
      boxShadow: "var(--shadow-glass)",
    }}>
      <span style={{ flex: 1, fontSize: "15px", fontWeight: "600", color: "var(--text-primary)" }}>{name}</span>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        {/* Mini progress bar */}
        <div style={{ width: "50px", height: "6px", background: "var(--bg-input)", borderRadius: "3px", overflow: "hidden" }}>
          <div style={{
            width: `${pct}%`,
            height: "100%",
            background: pct >= 70 ? "var(--accent-success)" : "var(--accent-warning)",
            borderRadius: "3px",
            transition: "width 0.5s ease",
          }} />
        </div>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-success)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
        <span style={{ fontSize: "15px", fontWeight: "600", color: "var(--text-primary)", minWidth: "40px", textAlign: "right" }}>{score}/{total}</span>
      </div>
    </div>
  );
}
