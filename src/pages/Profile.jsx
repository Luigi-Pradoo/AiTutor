import React, { useState } from "react";
import BottomNav from "../components/BottomNav.jsx";

const ChevronDown = ({ open }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ transition: "transform 0.3s ease", transform: open ? "rotate(180deg)" : "rotate(0)" }}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

// Simple SVG icons for each menu item
const icons = {
  "Editar Perfil": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  "Segurança": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  "Notificações": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  ),
  "Pagamentos": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  ),
  "Configurações": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
};

export default function Profile() {
  const [openSection, setOpenSection] = useState(null);

  const menuItems = [
    "Editar Perfil",
    "Segurança",
    "Notificações",
    "Pagamentos",
    "Configurações",
  ];

  const toggleSection = (item) => {
    setOpenSection(openSection === item ? null : item);
  };

  return (
    <div style={{ paddingBottom: "100px", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ padding: "50px 20px 10px 20px" }}>
        <h1 style={{ color: "#fff", fontSize: "32px", fontWeight: "600", fontStyle: "italic" }}>
          Perfil
        </h1>
      </div>

      {/* Avatar + Name */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "15px", marginBottom: "25px" }}>
        {/* Avatar circle with purple ring */}
        <div style={{
          width: "120px",
          height: "120px",
          borderRadius: "50%",
          border: "4px solid #8b5cf6",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#fff",
          boxShadow: "0 5px 20px rgba(139,92,246,0.3)",
        }}>
          {/* Default user icon */}
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>

        <h2 style={{ fontSize: "24px", fontWeight: "600", color: "#000", marginTop: "15px" }}>
          Luigi Prado
        </h2>
      </div>

      {/* Accordion Menu */}
      <div style={{ padding: "0 20px", display: "flex", flexDirection: "column", gap: "0px" }}>
        {menuItems.map((item, i) => (
          <div key={item}>
            <button
              onClick={() => toggleSection(item)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                padding: "18px 20px",
                background: "#eceae8",
                border: "none",
                borderBottom: i < menuItems.length - 1 ? "1px solid #d5d3d1" : "none",
                borderRadius: i === 0 ? "12px 12px 0 0" : i === menuItems.length - 1 && openSection !== item ? "0 0 12px 12px" : "0",
                cursor: "pointer",
                fontFamily: "inherit",
                fontSize: "15px",
                fontWeight: "500",
                color: "#000",
                transition: "background 0.2s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#e0dedc"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#eceae8"; }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                {icons[item]}
                {item}
              </span>
              <ChevronDown open={openSection === item} />
            </button>

            {/* Expandable content */}
            <div style={{
              maxHeight: openSection === item ? "200px" : "0",
              overflow: "hidden",
              transition: "max-height 0.3s ease",
              background: "#f5f4f2",
              borderRadius: i === menuItems.length - 1 ? "0 0 12px 12px" : "0",
            }}>
              <div style={{ padding: "15px 20px", fontSize: "14px", color: "#555" }}>
                {item === "Editar Perfil" && "Altere seu nome, foto de perfil e informações pessoais."}
                {item === "Segurança" && "Gerencie sua senha e configurações de autenticação."}
                {item === "Notificações" && "Configure como e quando deseja receber notificações do app."}
                {item === "Pagamentos" && "Gerencie seus métodos de pagamento e histórico de transações."}
                {item === "Configurações" && "Ajuste idioma, tema e preferências gerais do aplicativo."}
              </div>
            </div>
          </div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
