import React from "react";
import BottomNav from "../components/BottomNav.jsx";

export default function Progress() {
  const results = [
    { name: "Atividade 1", score: "8/10" },
    { name: "Atividade 2", score: "7/14" },
    { name: "Prova 1", score: "9/10" },
    { name: "Atividade 3", score: "13/20" },
  ];

  // Calculate overall percentage
  const totalCorrect = 8 + 7 + 9 + 13;
  const totalPossible = 10 + 14 + 10 + 20;
  const percentage = Math.round((totalCorrect / totalPossible) * 100);

  const getGrade = (pct) => {
    if (pct >= 80) return "Excelente";
    if (pct >= 60) return "Muito bom";
    if (pct >= 40) return "Bom";
    return "Continue praticando";
  };

  return (
    <div style={{ paddingBottom: "100px", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ padding: "50px 20px 10px 20px" }}>
        <h1 style={{ color: "#fff", fontSize: "32px", fontWeight: "600", fontStyle: "italic" }}>
          Progresso
        </h1>
      </div>

      {/* Star */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "20px", marginBottom: "10px" }}>
        <img
          src="/gold_star.png"
          alt="Estrela"
          style={{
            width: "150px",
            height: "auto",
            filter: "drop-shadow(0 6px 12px rgba(255,193,7,0.5))",
            animation: "pulse 2s infinite",
          }}
        />
        <h2 style={{ fontSize: "28px", fontWeight: "700", color: "#000", marginTop: "10px" }}>
          {getGrade(percentage)}
        </h2>
        <p style={{ color: "#666", fontSize: "14px", marginTop: "5px" }}>
          {percentage}% de acerto geral
        </p>
      </div>

      {/* Results List */}
      <div style={{ padding: "15px 25px", display: "flex", flexDirection: "column", gap: "12px" }}>
        {results.map((r, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "#eceae8",
              borderRadius: "10px",
              padding: "18px 20px",
              border: "1px solid #ccc",
              boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
            }}
          >
            <span style={{ fontSize: "16px", fontWeight: "500", color: "#000" }}>{r.name}</span>
            <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "16px", fontWeight: "600", color: "#333" }}>
              {/* Checkmark */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4caf50" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {r.score}
            </span>
          </div>
        ))}
      </div>

      {/* Pulse animation via style tag */}
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>

      <BottomNav />
    </div>
  );
}
