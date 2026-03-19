import React from "react";
import { useUser } from "../../context/UserContext.jsx";
import BottomNavBar from "../../components/layout/BottomNavBar.jsx";
import ProgressRow from "../../components/cards/ProgressRow.jsx";
import goldStarImg from "../../assets/images/gold_star.png";

export default function ProgressScreen() {
  const { user } = useUser();

  const pct = user.totalPossible > 0 ? Math.round((user.totalScore / user.totalPossible) * 100) : 0;

  const getGrade = (p) => {
    if (p >= 80) return "Excelente! 🌟";
    if (p >= 60) return "Muito bom! ⭐";
    if (p >= 40) return "Bom trabalho! 👍";
    if (p > 0) return "Continue praticando! 💪";
    return "Comece uma lição! 📚";
  };

  return (
    <div style={{ paddingBottom: "100px", minHeight: "100vh", animation: "fadeIn 0.4s ease" }}>
      <div style={{ padding: "50px 20px 10px" }}>
        <h1 style={{ color: "var(--text-primary)", fontSize: "28px", fontWeight: "600", fontStyle: "italic", margin: 0 }}>Progresso</h1>
      </div>

      {/* Star + Grade */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "15px", marginBottom: "15px" }}>
        <img
          src={goldStarImg}
          alt="Estrela"
          style={{
            width: "130px", height: "auto",
            filter: "drop-shadow(0 5px 10px rgba(255,193,7,0.45))",
            animation: "pulse 2s infinite",
          }}
        />
        <h2 style={{ fontSize: "26px", fontWeight: "700", color: "var(--text-primary)", marginTop: "8px" }}>{getGrade(pct)}</h2>
        {user.totalPossible > 0 && (
          <p style={{ color: "var(--text-secondary)", fontSize: "14px", marginTop: "4px" }}>{pct}% de acerto geral</p>
        )}
      </div>

      {/* Results List */}
      <div style={{ padding: "10px 25px", display: "flex", flexDirection: "column", gap: "10px" }}>
        {user.progress.length === 0 ? (
          <div style={{
            textAlign: "center", padding: "30px 20px",
            background: "var(--bg-surface)", borderRadius: "14px",
            backdropFilter: "blur(12px)", border: "1px solid var(--border-glass)",
            boxShadow: "var(--shadow-glass)"
          }}>
            <p style={{ fontSize: "16px", color: "var(--text-secondary)" }}>Nenhuma atividade concluída ainda.</p>
            <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginTop: "5px", opacity: 0.7 }}>Vá para as Lições e comece a praticar!</p>
          </div>
        ) : (
          user.progress.map((r, i) => (
            <ProgressRow key={i} name={`${r.name} • ${r.date}`} score={r.score} total={r.total} />
          ))
        )}
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.04); } }
      `}</style>
      <BottomNavBar />
    </div>
  );
}
