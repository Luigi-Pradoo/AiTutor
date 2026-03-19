import React from "react";

export default function OptionButton({ children, onClick, active = false, correct = null, style = {}, ...props }) {
  let bg = "var(--bg-surface)";
  let border = "1px solid var(--border-glass)";

  if (correct === true) {
    bg = "rgba(16, 185, 129, 0.15)";
    border = "2px solid var(--accent-success)";
  } else if (correct === false) {
    bg = "rgba(239, 68, 68, 0.15)";
    border = "2px solid var(--accent-danger)";
  } else if (active) {
    bg = "rgba(139, 92, 246, 0.15)";
    border = "2px solid var(--accent-primary)";
  }

  return (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        padding: "15px 18px",
        background: bg,
        border,
        borderRadius: "12px",
        fontSize: "15px",
        fontWeight: "500",
        color: "var(--text-primary)",
        cursor: "pointer",
        textAlign: "left",
        fontFamily: "inherit",
        transition: "all 0.2s ease",
        boxShadow: "0 2px 5px rgba(0,0,0,0.04)",
        ...style,
      }}
      {...props}
    >
      {children}
    </button>
  );
}
