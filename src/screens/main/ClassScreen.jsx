import React, { useState, useEffect, useRef } from "react";
import { useUser } from "../../context/UserContext.jsx";
import BottomNavBar from "../../components/layout/BottomNavBar.jsx";
import { chatWithTutor } from "../../services/geminiService.js";
import femaleTutorImg from "../../assets/images/female_tutor.png";

// Language code map for speech synthesis/recognition
const LANG_MAP = {
  "Inglês": "en-US", "Espanhol": "es-ES", "Francês": "fr-FR",
  "Alemão": "de-DE", "Italiano": "it-IT", "Japonês": "ja-JP",
  "Coreano": "ko-KR", "Mandarim": "zh-CN",
};

export default function ClassScreen() {
  const { user } = useUser();
  const lang = user.targetLanguage || "Inglês";
  const langCode = LANG_MAP[lang] || "en-US";

  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const chatEndRef = useRef(null);
  const recognitionRef = useRef(null);

  // Scroll to bottom on new message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Initialize with greeting
  useEffect(() => {
    sendInitialGreeting();
  }, [lang]);

  const sendInitialGreeting = async () => {
    setIsLoading(true);
    const history = [{ role: "user", text: "Olá! Vamos começar a aula?" }];
    const reply = await chatWithTutor(history, lang, user.name);
    setMessages([
      { role: "tutor", text: reply, id: Date.now() },
    ]);
    setIsLoading(false);
    speakText(reply);
  };

  const speakText = (text) => {
    if (!("speechSynthesis" in window)) return;
    speechSynthesis.cancel();
    // Remove parenthetical translations for speech
    const cleanText = text.replace(/\([^)]*\)/g, "").trim();
    const u = new SpeechSynthesisUtterance(cleanText);
    u.lang = langCode;
    
    // Select the most natural voice available
    const voices = speechSynthesis.getVoices();
    const langVoices = voices.filter(v => v.lang.startsWith(langCode.split('-')[0]));
    const bestVoice = langVoices.find(v => 
      v.name.includes("Google") || 
      v.name.includes("Natural") || 
      v.name.includes("Premium") || 
      v.name.includes("Online")
    );
    
    if (bestVoice) {
      u.voice = bestVoice;
    } else if (langVoices.length > 0) {
      u.voice = langVoices[0];
    }
    
    u.rate = 0.95;
    u.pitch = 1.0;
    u.onstart = () => setIsSpeaking(true);
    u.onend = () => setIsSpeaking(false);
    speechSynthesis.speak(u);
  };

  const sendMessage = async (text) => {
    if (!text.trim()) return;
    const userMsg = { role: "user", text: text.trim(), id: Date.now() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInputText("");
    setIsLoading(true);

    // Build chat history for API
    const apiHistory = newMessages.map((m) => ({
      role: m.role === "tutor" ? "model" : "user",
      text: m.text,
    }));

    const reply = await chatWithTutor(apiHistory, lang, user.name);
    const tutorMsg = { role: "tutor", text: reply, id: Date.now() + 1 };
    setMessages((prev) => [...prev, tutorMsg]);
    setIsLoading(false);
    speakText(reply);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(inputText);
  };

  // ========== Speech Recognition ==========
  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Seu navegador não suporta reconhecimento de voz. Use Chrome ou Edge.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = langCode;
    recognition.interimResults = true;
    recognition.continuous = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsListening(true);

    recognition.onresult = (event) => {
      let transcript = "";
      for (let i = 0; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setInputText(transcript);

      // If final result, auto-send
      if (event.results[event.results.length - 1].isFinal) {
        setTimeout(() => {
          sendMessage(transcript);
        }, 300);
      }
    };

    recognition.onerror = (e) => {
      console.error("Speech recognition error:", e.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ padding: "50px 20px 12px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <h1 style={{ color: "var(--text-primary)", fontSize: "28px", fontWeight: "600", fontStyle: "italic", margin: 0 }}>Aula</h1>
        <span style={{
          background: "var(--bg-surface)", color: "var(--text-primary)",
          backdropFilter: "blur(4px)", border: "1px solid var(--border-glass)",
          padding: "5px 12px", borderRadius: "15px", fontSize: "12px",
        }}>
          {lang}
        </span>
      </div>

      {/* Tutor Identity Bar */}
      <div style={{
        display: "flex", alignItems: "center", gap: "10px",
        padding: "8px 20px 12px", flexShrink: 0,
      }}>
        <div style={{
          width: "44px", height: "44px", borderRadius: "50%", overflow: "hidden",
          border: isSpeaking ? "2px solid #7c7ae6" : "2px solid transparent",
          boxShadow: isSpeaking ? "0 0 12px rgba(124,122,230,0.5)" : "none",
          transition: "all 0.3s",
        }}>
          <img src={femaleTutorImg} alt="Sofia" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <div>
          <p style={{ fontSize: "15px", fontWeight: "600", color: "var(--text-primary)", margin: 0 }}>Sofia</p>
          <p style={{ fontSize: "11px", color: "var(--text-secondary)", margin: 0 }}>
            {isSpeaking ? "🔊 Falando..." : isLoading ? "✍️ Digitando..." : "🟢 Online"}
          </p>
        </div>
      </div>

      {/* Chat Area */}
      <div style={{
        flex: 1, overflowY: "auto",
        padding: "10px 15px",
        paddingBottom: "160px",
        display: "flex", flexDirection: "column", gap: "10px",
      }}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              display: "flex",
              justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
              animation: "msgIn 0.3s ease",
            }}
          >
            {msg.role === "tutor" && (
              <div style={{
                width: "30px", height: "30px", borderRadius: "50%", overflow: "hidden",
                marginRight: "8px", flexShrink: 0, marginTop: "4px",
              }}>
                <img src={femaleTutorImg} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            )}
            <div style={{
              maxWidth: "75%",
              padding: "12px 16px",
              borderRadius: msg.role === "user"
                ? "18px 18px 4px 18px"
                : "18px 18px 18px 4px",
              background: msg.role === "user"
                ? "var(--accent-primary)"
                : "var(--bg-surface)",
              color: msg.role === "user" ? "var(--text-inverse)" : "var(--text-primary)",
              border: msg.role === "user" ? "none" : "1px solid var(--border-glass)",
              backdropFilter: "blur(12px)",
              fontSize: "14px",
              lineHeight: "1.5",
              boxShadow: "var(--shadow-glass)",
              whiteSpace: "pre-wrap",
            }}>
              {msg.text}
            </div>
            {msg.role === "tutor" && (
              <button
                onClick={() => speakText(msg.text)}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  marginLeft: "5px", padding: "4px", fontSize: "16px",
                  alignSelf: "flex-end", opacity: 0.5,
                }}
                title="Ouvir novamente"
              >
                🔊
              </button>
            )}
          </div>
        ))}

        {isLoading && (
          <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "5px 0" }}>
            <div style={{ width: "30px", height: "30px", borderRadius: "50%", overflow: "hidden" }}>
              <img src={femaleTutorImg} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{
              background: "var(--bg-surface)", borderRadius: "18px 18px 18px 4px",
              border: "1px solid var(--border-glass)", backdropFilter: "blur(12px)",
              padding: "12px 18px", boxShadow: "var(--shadow-glass)",
              display: "flex", gap: "4px",
              color: "var(--text-primary)"
            }}>
              <span style={{ animation: "dot 1.4s infinite", animationDelay: "0s" }}>●</span>
              <span style={{ animation: "dot 1.4s infinite", animationDelay: "0.2s" }}>●</span>
              <span style={{ animation: "dot 1.4s infinite", animationDelay: "0.4s" }}>●</span>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <div style={{
        position: "fixed",
        bottom: "80px", left: 0, right: 0,
        maxWidth: "480px", margin: "0 auto",
        padding: "10px 15px",
        background: "var(--color-bottom-nav-bg)",
      }}>
        <form onSubmit={handleSubmit} style={{
          display: "flex", alignItems: "center", gap: "8px",
          background: "var(--bg-surface)", borderRadius: "25px",
          backdropFilter: "blur(12px)", border: "1px solid var(--border-glass)",
          padding: "6px 8px 6px 18px",
          boxShadow: "var(--shadow-glass)",
        }}>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={isListening ? "🎤 Ouvindo..." : "Digite ou fale..."}
            style={{
              flex: 1, border: "none", outline: "none",
              fontSize: "14px", fontFamily: "inherit",
              background: "transparent", color: "var(--text-primary)",
            }}
          />

          {/* Mic Button */}
          <button
            type="button"
            onMouseDown={startListening}
            onMouseUp={stopListening}
            onTouchStart={startListening}
            onTouchEnd={stopListening}
            style={{
              width: "40px", height: "40px", borderRadius: "50%",
              border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              background: isListening ? "var(--accent-danger)" : "var(--bg-input)",
              color: isListening ? "#fff" : "var(--text-secondary)",
              transition: "all 0.2s",
              animation: isListening ? "pulseRed 1s infinite" : "none",
            }}
            title="Segure para falar"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
              <line x1="12" y1="19" x2="12" y2="23"/>
              <line x1="8" y1="23" x2="16" y2="23"/>
            </svg>
          </button>

          {/* Send Button */}
          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            style={{
              width: "40px", height: "40px", borderRadius: "50%",
              border: "none", cursor: inputText.trim() ? "pointer" : "default",
              display: "flex", alignItems: "center", justifyContent: "center",
              background: inputText.trim() ? "var(--accent-primary)" : "var(--bg-input)",
              color: inputText.trim() ? "var(--text-inverse)" : "var(--text-secondary)",
              transition: "all 0.2s",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
            </svg>
          </button>
        </form>
      </div>

      <BottomNavBar />

      <style>{`
        @keyframes msgIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes dot { 0%,100% { opacity: 0.3; } 50% { opacity: 1; } }
        @keyframes pulseRed { 0%,100% { box-shadow: 0 0 0 0 rgba(229,57,53,0.4); } 50% { box-shadow: 0 0 0 10px rgba(229,57,53,0); } }
      `}</style>
    </div>
  );
}
