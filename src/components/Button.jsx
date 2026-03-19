import React from "react";

export default function Button({ children, onClick, variant = "primary", style = {}, ...props }) {
  const baseStyle = {
    padding: "14px 20px",
    borderRadius: "25px",
    border: "none",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    width: "100%",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    transition: "transform 0.1s ease, box-shadow 0.1s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    ...style
  };

  let variantStyle = {};
  if (variant === "primary") {
    variantStyle = {
      background: "var(--color-bg-dark)", 
      color: "var(--color-text-light)",
    };
  } else if (variant === "gradient") {
    // Like the 'Confirmar' button which has a darker purple background
    variantStyle = {
      background: "linear-gradient(135deg, #3a2c4d, #1a0f2e)",
      color: "var(--color-text-light)",
      border: "1px solid rgba(255,255,255,0.2)",
    };
  } else if (variant === "social") {
    variantStyle = {
      background: "var(--color-input-bg)",
      color: "var(--color-text-dark)",
      boxShadow: "inset 2px 2px 5px rgba(255,255,255,0.5), inset -3px -3px 7px rgba(0,0,0,0.05), 0 5px 10px rgba(0,0,0,0.05)",
    };
  } else if (variant === "outline") {
    variantStyle = {
      background: "transparent",
      color: "var(--color-text-dark)",
      border: "1px solid var(--color-border)",
      boxShadow: "none",
    };
  } else if (variant === "gray-card") {
    // Buttons like in the "Aula" matching game or "Atividade 3" alternative buttons
    variantStyle = {
      background: "#dcdbd9", // light gray matching figma
      color: "#000",
      borderRadius: "0",
      border: "1px solid #777",
      boxShadow: "none",
      fontWeight: "500",
    }
  }

  return (
    <button 
      onClick={onClick} 
      style={{...baseStyle, ...variantStyle}} 
      onMouseDown={(e) => {
        e.currentTarget.style.transform = "scale(0.98)";
        e.currentTarget.style.boxShadow = "0 2px 5px rgba(0,0,0,0.1)";
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = baseStyle.boxShadow;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = baseStyle.boxShadow;
      }}
      {...props}
    >
      {children}
    </button>
  );
}
