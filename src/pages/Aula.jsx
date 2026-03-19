import React, { useState } from "react";
import BottomNav from "../components/BottomNav.jsx";

export default function Aula() {
  const [activeWord, setActiveWord] = useState(null);

  const words = ["Have", "Apple", "One", "Blue", "Study", "It"];

  const handleWordClick = (word) => {
    setActiveWord(word);
    // In a real app, this would trigger text-to-speech
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'en-US';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div style={{ paddingBottom: "100px", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ padding: "50px 20px 10px 20px" }}>
        <h1 style={{ color: "#fff", fontSize: "32px", fontWeight: "600", fontStyle: "italic" }}>
          Aula
        </h1>
      </div>

      {/* Female Tutor + Speech Bubble */}
      <div style={{ display: "flex", alignItems: "flex-start", padding: "10px 20px 20px", gap: "10px" }}>
        {/* Avatar */}
        <div style={{
          width: "140px",
          height: "180px",
          borderRadius: "20px",
          overflow: "hidden",
          flexShrink: 0,
          boxShadow: "0 5px 15px rgba(0,0,0,0.15)"
        }}>
          <img
            src="/female_tutor.png"
            alt="Tutora"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        {/* Speech Bubble */}
        <div style={{
          position: "relative",
          background: "#fff",
          borderRadius: "15px",
          padding: "15px 18px",
          fontSize: "13px",
          lineHeight: "1.5",
          color: "#333",
          boxShadow: "0 3px 12px rgba(0,0,0,0.1)",
          flex: 1,
          marginTop: "20px",
        }}>
          {/* Bubble arrow */}
          <div style={{
            position: "absolute",
            left: "-8px",
            top: "20px",
            width: 0,
            height: 0,
            borderTop: "8px solid transparent",
            borderBottom: "8px solid transparent",
            borderRight: "8px solid #fff",
          }} />
          Leia as palavras em inglês abaixo e pratique a pronúncia. Em seguida, repita cada palavra em voz alta segurando o botão do microfone e tente usá-la em uma frase simples.
        </div>
      </div>

      {/* Divider line */}
      <div style={{ margin: "10px 20px", borderBottom: "1px solid #ddd" }} />

      {/* Word Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "14px",
        padding: "25px 30px",
      }}>
        {words.map((word) => (
          <button
            key={word}
            onClick={() => handleWordClick(word)}
            style={{
              padding: "16px",
              background: activeWord === word ? "#b3b2f0" : "#dcdbd9",
              border: activeWord === word ? "2px solid #7c7ae6" : "1px solid #999",
              borderRadius: "4px",
              fontSize: "17px",
              fontWeight: "500",
              color: "#000",
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "all 0.2s ease",
              textAlign: "center",
              boxShadow: activeWord === word ? "0 0 12px rgba(148,149,239,0.4)" : "none",
            }}
          >
            {word}
          </button>
        ))}
      </div>

      {/* Microphone Button */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "15px" }}>
        <button
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            border: "none",
            background: "#fff",
            boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "transform 0.15s ease",
          }}
          onMouseDown={(e) => { e.currentTarget.style.transform = "scale(0.9)"; }}
          onMouseUp={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
          title="Segure para gravar"
        >
          {/* Mic icon */}
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
            <line x1="12" y1="19" x2="12" y2="23"/>
            <line x1="8" y1="23" x2="16" y2="23"/>
          </svg>
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
