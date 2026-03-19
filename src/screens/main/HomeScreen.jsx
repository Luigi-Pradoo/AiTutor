import React from "react";
import { useUser } from "../../context/UserContext.jsx";
import BottomNavBar from "../../components/layout/BottomNavBar.jsx";
import ActivityCard from "../../components/cards/ActivityCard.jsx";
import robotImg from "../../assets/images/robot_tutor.png";

export default function HomeScreen() {
  const { user } = useUser();
  const langLabel = user.targetLanguage || "Inglês";

  const activities = [
    {
      id: 1,
      title: "Lições Interativas",
      description: `Pratique ${langLabel} com quizzes gerados por IA. Perguntas de tradução e múltipla escolha adaptadas ao seu nível.`,
      to: "/lessons",
    },
    {
      id: 2,
      title: "Aula de Pronúncia",
      description: `Aprenda vocabulário novo em ${langLabel} e pratique a pronúncia com o assistente de voz. Exercícios de escuta e fala.`,
      to: "/class",
    },
    {
      id: 3,
      title: "Seu Progresso",
      description: "Acompanhe sua evolução, veja notas de atividades passadas e descubra seus pontos fortes e fracos.",
      to: "/progress",
    },
  ];

  return (
    <div style={{ paddingBottom: "100px", minHeight: "100vh", animation: "fadeIn 0.4s ease" }}>
      {/* Header */}
      <div style={{ display: "flex", padding: "20px", paddingTop: "45px", alignItems: "center", gap: "10px" }}>
        <div style={{
          width: "90px", height: "90px",
          borderRadius: "50%",
          overflow: "hidden",
          boxShadow: "0 4px 15px rgba(0,0,0,0.25)",
          flexShrink: 0,
        }}>
          <img src={robotImg} alt="Robot" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>

        {/* Speech Bubble */}
        <div style={{
          position: "relative",
          background: "var(--bg-surface)",
          backdropFilter: "blur(12px)",
          border: "1px solid var(--border-glass)",
          borderRadius: "18px",
          padding: "14px 18px",
          boxShadow: "var(--shadow-glass)",
          flex: 1,
          marginLeft: "-5px",
        }}>
          <div style={{ position: "absolute", left: "-7px", top: "18px", width: 0, height: 0, borderTop: "7px solid transparent", borderBottom: "7px solid transparent", borderRight: "7px solid var(--bg-surface)" }} />
          <p style={{ fontSize: "14px", fontWeight: "600", color: "var(--text-primary)", margin: 0 }}>
            Olá{user.name ? `, ${user.name}` : ""}! 👋
          </p>
          <p style={{ fontSize: "12px", color: "var(--text-secondary)", margin: "4px 0 0" }}>
            Vamos praticar {langLabel} hoje?
          </p>
        </div>
      </div>

      {/* Gamification Stats */}
      <div style={{
        display: "flex", gap: "10px",
        padding: "0 20px", marginBottom: "15px",
      }}>
        <div style={{
          flex: 1, background: "linear-gradient(135deg, #ff9800 0%, #f44336 100%)",
          borderRadius: "14px", padding: "14px 16px", color: "#fff", display: "flex", flexDirection: "column", justifyContent: "center"
        }}>
          <p style={{ fontSize: "22px", fontWeight: "700", margin: 0 }}>🔥 {user.streak}</p>
          <p style={{ fontSize: "11px", margin: "2px 0 0", opacity: 0.9 }}>Dias seguidos</p>
        </div>
        <div style={{
          flex: 1, background: "linear-gradient(135deg, #2196f3, #3f51b5)",
          borderRadius: "14px", padding: "14px 16px", color: "#fff", display: "flex", flexDirection: "column", justifyContent: "center"
        }}>
          <p style={{ fontSize: "22px", fontWeight: "700", margin: 0 }}>⭐ Nível {user.level}</p>
          <p style={{ fontSize: "11px", margin: "2px 0 0", opacity: 0.9 }}>{user.xp % 100} / 100 XP</p>
        </div>
      </div>

      {/* Activity Cards */}
      <div style={{
        margin: "10px 20px",
        padding: "0",
        display: "flex",
        flexDirection: "column",
        gap: "14px",
      }}>
        {activities.map((a) => (
          <ActivityCard key={a.id} title={a.title} description={a.description} to={a.to} />
        ))}
      </div>

      <BottomNavBar />
      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
  );
}
