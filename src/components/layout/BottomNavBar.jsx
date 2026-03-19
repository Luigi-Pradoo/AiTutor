import React from "react";
import { Link, useLocation } from "react-router-dom";

const icons = {
  home: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  lessons: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  ),
  progress: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  class: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="23" />
      <line x1="8" y1="23" x2="16" y2="23" />
    </svg>
  ),
  profile: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
};

const navItems = [
  { label: "Início", path: "/home", icon: icons.home },
  { label: "Lições", path: "/lessons", icon: icons.lessons },
  { label: "Progresso", path: "/progress", icon: icons.progress },
  { label: "Aula", path: "/class", icon: icons.class },
  { label: "Perfil", path: "/profile", icon: icons.profile },
];

export default function BottomNavBar() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav style={{
      position: "fixed",
      bottom: 0, left: 0, right: 0,
      maxWidth: "480px",
      margin: "0 auto",
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      padding: "8px 10px 22px",
      background: "var(--color-bottom-nav-bg)",
      borderTop: "1px solid var(--border-glass)",
      zIndex: 100,
    }}>
      {navItems.map((item) => {
        const isActive = currentPath === item.path || currentPath.startsWith(item.path + "/");
        return (
          <Link
            key={item.label}
            to={item.path}
            style={{
              textDecoration: "none",
              color: isActive ? "var(--text-inverse)" : "var(--text-secondary)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "3px",
              transition: "color 0.2s",
            }}
          >
            <div style={{
              width: "46px", height: "46px",
              display: "flex", alignItems: "center", justifyContent: "center",
              borderRadius: "50%",
              background: isActive ? "var(--accent-primary)" : "transparent",
              color: isActive ? "var(--text-inverse)" : "var(--text-secondary)",
              boxShadow: isActive ? "var(--shadow-glow)" : "none",
              transition: "all 0.3s ease",
            }}>
              {item.icon}
            </div>
            <span style={{
              fontSize: "10px",
              fontWeight: isActive ? "700" : "500",
              color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
            }}>
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
