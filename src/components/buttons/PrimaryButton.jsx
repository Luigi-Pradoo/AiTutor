import React from "react";

export default function PrimaryButton({ children, onClick, variant = "dark", style = {}, ...props }) {
  const variants = {
    dark: { background: "var(--text-primary)", color: "var(--text-inverse)" },
    gradient: { background: "var(--accent-primary)", color: "#fff", border: "1px solid var(--border-glass)" },
    social: { background: "var(--bg-input)", color: "var(--text-primary)", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" },
  };

  const v = variants[variant] || variants.dark;

  return (
    <button
      onClick={onClick}
      style={{
        padding: "14px 24px",
        borderRadius: "25px",
        border: "none",
        fontSize: "16px",
        fontWeight: "600",
        cursor: "pointer",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        fontFamily: "inherit",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        transition: "transform 0.12s, box-shadow 0.12s",
        ...v,
        ...style,
      }}
      onMouseDown={(e) => { e.currentTarget.style.transform = "scale(0.97)"; }}
      onMouseUp={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
      {...props}
    >
      {children}
    </button>
  );
}
