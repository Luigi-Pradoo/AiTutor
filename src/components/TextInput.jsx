import React from "react";

export default function TextInput({ style = {}, ...props }) {
  return (
    <input 
      style={{
        width: "100%",
        padding: "16px 20px",
        borderRadius: "25px",
        border: "none",
        background: "var(--color-input-bg)",
        fontSize: "15px",
        color: "var(--color-text-dark)",
        outline: "none",
        boxShadow: "inset 2px 2px 5px rgba(255,255,255,0.7), inset -3px -3px 7px rgba(0,0,0,0.05), 0 5px 10px rgba(0,0,0,0.05)", // Soft neumorphism
        fontFamily: "inherit",
        ...style
      }}
      {...props}
    />
  );
}
