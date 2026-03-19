import React from "react";

export default function RoundedInput({ style = {}, ...props }) {
  return (
    <input
      style={{
        width: "100%",
        padding: "15px 20px",
        borderRadius: "25px",
        border: "1px solid var(--border-glass)",
        backgroundColor: "var(--bg-input)",
        fontSize: "15px",
        color: "var(--text-primary)",
        outline: "none",
        fontFamily: "inherit",
        boxShadow: "inset 0 2px 4px rgba(0,0,0,0.05), var(--shadow-glass)",
        transition: "box-shadow 0.2s",
        ...style,
      }}
      onFocus={(e) => { e.target.style.backgroundColor = "var(--bg-input-focus)"; e.target.style.boxShadow = "var(--shadow-glow)"; }}
      onBlur={(e) => { e.target.style.backgroundColor = "var(--bg-input)"; e.target.style.boxShadow = "inset 0 2px 4px rgba(0,0,0,0.05), var(--shadow-glass)"; }}
      {...props}
    />
  );
}
