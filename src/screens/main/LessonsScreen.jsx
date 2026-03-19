import React, { useState, useEffect } from "react";
import { useUser } from "../../context/UserContext.jsx";
import BottomNavBar from "../../components/layout/BottomNavBar.jsx";
import OptionButton from "../../components/buttons/OptionButton.jsx";
import PrimaryButton from "../../components/buttons/PrimaryButton.jsx";
import { generateQuizBatch } from "../../services/geminiService.js";
import booksImg from "../../assets/images/books_icon.png";

export default function LessonsScreen() {
  const { user, addProgress } = useUser();
  const lang = user.targetLanguage || "Inglês";

  const [quizzes, setQuizzes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null); // null | "correct" | "wrong"
  const [score, setScore] = useState(0);

  const loadQuizzes = async () => {
    setLoading(true);
    setQuizzes([]);
    setSelected(null);
    setFeedback(null);
    setCurrentIndex(0);
    setScore(0);
    
    // Batch sizing: 5 questions per session
    const data = await generateQuizBatch(lang, "Português", 5);
    setQuizzes(data);
    setLoading(false);
  };

  useEffect(() => { loadQuizzes(); }, [lang]);

  const currentQuiz = quizzes[currentIndex];

  const playSound = (type) => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === "correct") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.1); // A5
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      } else {
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(150, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      }
    } catch (e) {
      console.error("Audio API not supported");
    }
  };

  const handleSelect = (key) => {
    if (feedback || !currentQuiz) return; // Already answered
    setSelected(key);
    const isCorrect = key === currentQuiz.correctKey;
    setFeedback(isCorrect ? "correct" : "wrong");
    playSound(isCorrect ? "correct" : "wrong");
    if (isCorrect) setScore((s) => s + 1);
  };

  const handleNext = () => {
    setSelected(null);
    setFeedback(null);
    setCurrentIndex((c) => c + 1);
  };

  const handleFinish = () => {
    if (quizzes.length > 0) {
      addProgress(`Lição de ${lang}`, score, quizzes.length);
    }
    loadQuizzes(); // restart a new session
  };

  return (
    <div style={{ paddingBottom: "100px", minHeight: "100vh", animation: "fadeIn 0.4s ease" }}>
      {/* Header */}
      <div style={{ padding: "50px 20px 15px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ color: "var(--text-primary)", fontSize: "28px", fontWeight: "600", fontStyle: "italic", margin: 0 }}>
          Lições
        </h1>
        {!loading && quizzes.length > 0 && (
          <span style={{
            background: "var(--bg-surface)",
            backdropFilter: "blur(4px)",
            border: "1px solid var(--border-glass)",
            color: "var(--text-primary)",
            padding: "6px 14px",
            borderRadius: "20px",
            fontSize: "13px",
            fontWeight: "600",
          }}>
            Pergunta {currentIndex + 1}/{quizzes.length}
          </span>
        )}
      </div>

      {/* Books Image */}
      <div style={{ display: "flex", justifyContent: "center", margin: "8px 0 18px" }}>
        <img src={booksImg} alt="Books" style={{ width: "110px", height: "auto", filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.15))" }} />
      </div>

      {loading ? (
        /* Loading skeleton */
        <div style={{ padding: "0 25px" }}>
          <div style={{ textAlign: "center", marginBottom: "20px", color: "var(--text-secondary)" }}>
            <p>Gerando sua lição personalizada...</p>
          </div>
          <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border-glass)", borderRadius: "15px", padding: "25px", marginBottom: "20px" }}>
            <div style={{ height: "18px", background: "var(--bg-input)", borderRadius: "8px", marginBottom: "12px", width: "80%", animation: "shimmer 1.5s infinite" }} />
            <div style={{ height: "18px", background: "var(--bg-input)", borderRadius: "8px", width: "60%", animation: "shimmer 1.5s infinite" }} />
          </div>
          {[1,2,3,4].map((i) => (
            <div key={i} style={{ height: "50px", background: "var(--bg-surface)", border: "1px solid var(--border-glass)", borderRadius: "12px", marginBottom: "10px", animation: "shimmer 1.5s infinite" }} />
          ))}
        </div>
      ) : currentQuiz && (
        <>
          {/* Progress Bar Mini */}
          <div style={{ margin: "0 25px 15px", height: "6px", background: "var(--bg-input)", borderRadius: "3px", overflow: "hidden" }}>
            <div style={{
              width: `${(currentIndex / quizzes.length) * 100}%`,
              height: "100%",
              background: "var(--accent-primary)",
              transition: "width 0.3s ease",
            }} />
          </div>

          {/* Question Card */}
          <div style={{
            margin: "0 25px 20px",
            background: "var(--bg-surface)",
            backdropFilter: "blur(12px)",
            border: "1px solid var(--border-glass)",
            borderRadius: "16px",
            padding: "20px 22px",
            boxShadow: "var(--shadow-glass)",
          }}>
            <p style={{ fontSize: "15px", lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "10px" }}>
              {currentQuiz.question}
            </p>
            <p style={{ fontSize: "17px", fontWeight: "700", color: "var(--text-primary)" }}>
              {currentQuiz.phrase}
            </p>
          </div>

          {/* Options */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", padding: "0 25px" }}>
            {currentQuiz.options.map((opt) => {
              let correct = null;
              if (feedback && selected === opt.key) {
                correct = opt.key === currentQuiz.correctKey;
              } else if (feedback && opt.key === currentQuiz.correctKey) {
                correct = true; // Show correct answer
              }
              return (
                <OptionButton
                  key={opt.key}
                  onClick={() => handleSelect(opt.key)}
                  correct={correct}
                >
                  {opt.key}) {opt.text}
                </OptionButton>
              );
            })}
          </div>

          {/* Feedback + Next */}
          {feedback && (
            <div style={{ padding: "20px 25px", textAlign: "center", animation: "fadeIn 0.3s ease" }}>
              <p style={{
                fontSize: "17px", fontWeight: "600",
                color: feedback === "correct" ? "var(--accent-success)" : "var(--accent-danger)",
                marginBottom: "15px",
              }}>
                {feedback === "correct" ? "✅ Correto! Muito bem!" : "❌ Incorreto. A resposta certa está destacada em verde."}
              </p>
              
              <div style={{ display: "flex", justifyContent: "center" }}>
                {currentIndex < quizzes.length - 1 ? (
                  <PrimaryButton onClick={handleNext} style={{ maxWidth: "200px" }}>
                    Próxima →
                  </PrimaryButton>
                ) : (
                  <div style={{ width: "100%" }}>
                    <p style={{ fontSize: "15px", color: "var(--text-secondary)", marginBottom: "15px" }}>
                      Lição concluída! Você acertou {score} de {quizzes.length}.
                    </p>
                    <PrimaryButton onClick={handleFinish} variant="gradient" style={{ maxWidth: "200px", margin: "0 auto" }}>
                      Finalizar Lição
                    </PrimaryButton>
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}

      <BottomNavBar />
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes shimmer { 0%,100% { opacity: 0.6; } 50% { opacity: 1; } }
      `}</style>
    </div>
  );
}
