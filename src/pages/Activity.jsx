import React, { useState } from "react";
import BottomNav from "../components/BottomNav.jsx";

export default function Activity() {
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const question = {
    title: "Atividade 3",
    instruction: "Leia a frase em inglês e escolha a tradução correta em português.",
    phrase: "Good morning, how are you?",
    options: [
      { key: "A", text: "Boa noite, quem é você?" },
      { key: "B", text: "Bom dia, como você está?" },
      { key: "C", text: "Boa tarde, onde você vai?" },
      { key: "D", text: "Olá, qual é seu nome?" },
    ],
    correctKey: "B",
  };

  const handleSelect = (key) => {
    setSelected(key);
    if (key === question.correctKey) {
      setFeedback("correct");
    } else {
      setFeedback("wrong");
    }
  };

  return (
    <div style={{ paddingBottom: "100px", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ padding: "50px 20px 20px 20px" }}>
        <h1 style={{ color: "#fff", fontSize: "32px", fontWeight: "600", fontStyle: "italic" }}>
          {question.title}
        </h1>
      </div>

      {/* Books Image */}
      <div style={{ display: "flex", justifyContent: "center", margin: "10px 0 20px 0" }}>
        <img
          src="/books_icon.png"
          alt="Books"
          style={{ width: "140px", height: "auto", filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.2))" }}
        />
      </div>

      {/* Question Card */}
      <div style={{
        margin: "0 25px",
        background: "#fff",
        borderRadius: "15px",
        padding: "20px 25px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        marginBottom: "25px",
      }}>
        <p style={{ fontSize: "15px", lineHeight: "1.6", color: "#222", marginBottom: "12px" }}>
          {question.instruction}
        </p>
        <p style={{ fontSize: "16px", fontWeight: "600", color: "#000" }}>
          Frase : {question.phrase}
        </p>
      </div>

      {/* Answer Options */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px", padding: "0 25px" }}>
        {question.options.map((opt) => {
          let bg = "#e8e6e4";
          let border = "1px solid #bbb";
          if (selected === opt.key) {
            if (feedback === "correct") {
              bg = "#c8f7c5";
              border = "2px solid #4caf50";
            } else {
              bg = "#fdd";
              border = "2px solid #e53935";
            }
          }
          return (
            <button
              key={opt.key}
              onClick={() => handleSelect(opt.key)}
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                padding: "16px 20px",
                background: bg,
                border: border,
                borderRadius: "12px",
                fontSize: "15px",
                fontWeight: "500",
                color: "#000",
                cursor: "pointer",
                textAlign: "left",
                fontFamily: "inherit",
                transition: "all 0.2s ease",
                boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
              }}
            >
              {opt.key}) {opt.text}
            </button>
          );
        })}
      </div>

      {/* Feedback message */}
      {feedback && (
        <div style={{
          textAlign: "center",
          marginTop: "20px",
          fontSize: "18px",
          fontWeight: "600",
          color: feedback === "correct" ? "#2e7d32" : "#c62828",
          animation: "fadeIn 0.3s ease"
        }}>
          {feedback === "correct" ? "✅ Correto! Muito bem!" : "❌ Incorreto. Tente novamente!"}
        </div>
      )}

      <BottomNav />
    </div>
  );
}
