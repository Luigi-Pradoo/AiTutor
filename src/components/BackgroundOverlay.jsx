import React from "react";

export default function BackgroundOverlay({ children }) {
  return (
    <div style={{ position: "relative", minHeight: "100vh", overflow: "hidden", backgroundColor: "var(--color-bg-light)" }}>
      {/* Dark curved top background */}
      <div 
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "250px",
          backgroundColor: "var(--color-bg-dark)",
          borderBottomRightRadius: "60%",
          transform: "scaleX(1.1)",
          transformOrigin: "left bottom",
          zIndex: 0,
        }}
      />
      {/* Secondary curve for depth */}
      <div 
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "220px",
          backgroundColor: "var(--color-bg-dark)",
          borderBottomRightRadius: "80%",
          transform: "scaleX(1.3) rotate(-3deg)",
          transformOrigin: "left bottom",
          zIndex: 0,
        }}
      />
      
      {/* Abstract thin crossing lines SVG */}
      <svg 
        width="100%" 
        height="100%" 
        style={{ position: "absolute", top: 0, left: 0, zIndex: 1, pointerEvents: "none", opacity: 0.5 }}
      >
        <path d="M-50,150 Q200,50 500,600" stroke="#000" strokeWidth="0.8" fill="none" />
        <path d="M-100,500 Q200,450 600,300" stroke="#000" strokeWidth="0.8" fill="none" />
        <path d="M100,-50 Q300,400 -50,800" stroke="#000" strokeWidth="0.8" fill="none" />
        <path d="M400,-100 Q100,600 600,900" stroke="#000" strokeWidth="0.8" fill="none" />
        {/* Adds curves simulating nodes or networks */}
        <circle cx="200" cy="180" r="100" stroke="#000" strokeWidth="0.8" fill="none" />
        <path d="M50,180 L350,180" stroke="#000" strokeWidth="0.8" fill="none" />
      </svg>

      {/* Main content layer */}
      <div style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        {children}
      </div>
    </div>
  );
}
