import React from "react";
import { Link, useLocation } from "react-router-dom";

// Simple SVG Icons
const HomeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);

const LessonIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    <line x1="9" y1="9" x2="15" y2="9"></line>
    <line x1="9" y1="13" x2="15" y2="13"></line>
  </svg>
);

const ProgressIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);

const ClassIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="23 7 16 12 23 17 23 7"></polygon>
    <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
  </svg>
);

const ProfileIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

export default function BottomNav() {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { label: "Início", path: "/home", icon: <HomeIcon /> },
    { label: "Lições", path: "/activity/3", icon: <LessonIcon /> }, /* Activity placeholder */
    { label: "Progresso", path: "/progress", icon: <ProgressIcon /> },
    { label: "Aula", path: "/aula", icon: <ClassIcon /> },
    { label: "Perfil", path: "/profile", icon: <ProfileIcon /> },
  ];

  return (
    <div style={{
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      width: "100%",
      maxWidth: "480px",
      margin: "0 auto",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 15px",
      paddingBottom: "25px", // For safe area
      background: "var(--color-bottom-nav-bg)",
      borderTop: "1px solid rgba(0,0,0,0.05)",
      zIndex: 100,
    }}>
      {navItems.map((item) => {
        const isActive = currentPath === item.path;
        return (
          <Link 
            key={item.label} 
            to={item.path} 
            style={{ 
              textDecoration: "none", 
              color: isActive ? "#000" : "#666",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "4px",
              position: "relative"
            }}
          >
            <div style={{
              width: "50px",
              height: "50px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              background: isActive ? "var(--color-glass-purple)" : "transparent",
              color: isActive ? "#fff" : "inherit",
              boxShadow: isActive ? "0 4px 10px rgba(135,134,230,0.3)" : "none",
              transition: "all 0.3s ease"
            }}>
              {item.icon}
            </div>
            <span style={{ fontSize: "11px", fontWeight: isActive ? "600" : "500" }}>{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
