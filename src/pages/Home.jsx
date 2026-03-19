import React from "react";
import BottomNav from "../components/BottomNav.jsx";

export default function Home() {
  const activities = [
    {
      id: 1,
      title: "Atividade 1 – 14/03",
      description: "A atividade 1 apresenta o básico do inglês, ensinando saudações simples e como se apresentar. O aluno pratica frases iniciais com ajuda do AI Tutor para começar a se comunicar no idioma."
    },
    {
      id: 2,
      title: "Atividade 2 – 21/03",
      description: "A atividade 2 inicia o aprendizado das palavras mais utilizadas em inglês, ajudando o aluno a ampliar o vocabulário básico e praticar o uso dessas palavras em interações simples com o AI Tutor."
    }
  ];

  return (
    <div style={{ paddingBottom: "100px", minHeight: "100vh", position: "relative" }}>
      {/* Header Area with Robot and Speech Bubble */}
      <div style={{ display: "flex", padding: "20px", paddingTop: "50px", alignItems: "center", justifyContent: "space-between" }}>
        
        {/* Robot */}
        <div style={{ width: "120px", height: "120px", borderRadius: "50%", overflow: "hidden", zIndex: 10, position: "relative", boxShadow: "0 5px 15px rgba(0,0,0,0.3)" }}>
          <img src="/robot_tutor.png" alt="Robot Tutor" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>

        {/* Speech Bubble AI Tutor */}
        <div style={{ position: "relative", flex: 1, marginLeft: "-25px", marginTop: "-30px", zIndex: 5 }}>
          {/* Custom drawn bubble with SVG */}
          <svg viewBox="0 0 200 120" style={{ width: "100%", filter: "drop-shadow(0 5px 5px rgba(0,0,0,0.2))" }}>
            <path d="M40,20 Q100,5 160,20 Q190,30 190,60 Q190,90 160,100 Q120,110 80,115 L40,115 L60,95 Q30,85 20,60 Q10,35 40,20 Z" fill="#fff" stroke="#000" strokeWidth="4" />
            <text x="110" y="65" fontFamily="var(--font-family-base)" fontSize="34" fontWeight="600" textAnchor="middle" fill="none" stroke="#000" strokeWidth="1.5" strokeLinejoin="round">AiTutor</text>
            <text x="110" y="65" fontFamily="var(--font-family-base)" fontSize="34" fontWeight="600" textAnchor="middle" fill="#fff">AiTutor</text>
          </svg>
        </div>
      </div>

      {/* Activities List Area */}
      <div style={{ 
        padding: "20px", 
        margin: "15px 20px", 
        background: "#363636", // dark gray background behind cards
        borderRadius: "20px", 
        border: "1px solid #4a4a4a",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
        position: "relative",
        zIndex: 5
      }}>
        {activities.map((activity) => (
          <div key={activity.id} style={{ 
            background: "#fff", 
            borderRadius: "15px", 
            padding: "25px 20px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
            position: "relative"
          }}>
            <h2 style={{ fontSize: "22px", fontWeight: "700", marginBottom: "15px", color: "#000", fontFamily: "var(--font-family-base)" }}>
              {activity.title}
            </h2>
            <p style={{ fontSize: "14px", lineHeight: "1.5", color: "#222", fontWeight: "400", fontFamily: "var(--font-family-base)" }}>
              {activity.description}
            </p>
          </div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
