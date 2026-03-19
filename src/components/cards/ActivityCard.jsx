import React from "react";
import { Link } from "react-router-dom";

export default function ActivityCard({ title, description, to }) {
  const content = (
    <div style={{
      background: "var(--bg-surface)",
      borderRadius: "16px",
      border: "1px solid var(--border-glass)",
      padding: "22px 20px",
      boxShadow: "var(--shadow-glass)",
      backdropFilter: "blur(12px)",
      cursor: to ? "pointer" : "default",
      transition: "transform 0.15s ease",
    }}
    onMouseEnter={(e) => { if (to) e.currentTarget.style.transform = "translateY(-2px)"; }}
    onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
    >
      <h3 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "12px", color: "var(--text-primary)" }}>
        {title}
      </h3>
      <p style={{ fontSize: "13px", lineHeight: "1.55", color: "var(--text-secondary)", fontWeight: "400" }}>
        {description}
      </p>
    </div>
  );

  if (to) {
    return <Link to={to} style={{ textDecoration: "none" }}>{content}</Link>;
  }
  return content;
}
