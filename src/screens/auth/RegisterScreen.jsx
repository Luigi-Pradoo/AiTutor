import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext.jsx";
import RoundedInput from "../../components/inputs/RoundedInput.jsx";
import PrimaryButton from "../../components/buttons/PrimaryButton.jsx";

const LANGUAGES = ["Inglês", "Espanhol", "Francês", "Alemão", "Italiano", "Japonês", "Coreano", "Mandarim"];

export default function RegisterScreen() {
  const navigate = useNavigate();
  const { updateUser } = useUser();
  const [form, setForm] = useState({ name: "", age: "", language: "", email: "", password: "", confirm: "" });
  const [showLangDropdown, setShowLangDropdown] = useState(false);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      alert("As senhas não coincidem!");
      return;
    }
    updateUser({
      name: form.name,
      age: form.age,
      targetLanguage: form.language,
      email: form.email,
    });
    navigate("/home");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", padding: "20px", animation: "fadeIn 0.4s ease" }}>
      {/* Header */}
      <div style={{ paddingTop: "50px", paddingBottom: "25px", paddingLeft: "10px" }}>
        <h1 style={{ color: "var(--text-primary)", fontSize: "32px", fontWeight: "400" }}>Cadastro</h1>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "320px", margin: "0 auto", width: "100%" }}>
        <RoundedInput
          type="text"
          placeholder="Nome Completo"
          required
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />

        <div style={{ display: "flex", gap: "10px" }}>
          <RoundedInput
            type="number"
            placeholder="Idade"
            required
            value={form.age}
            onChange={(e) => handleChange("age", e.target.value)}
            style={{ flex: 1 }}
          />
          {/* Language Selector */}
          <div style={{ flex: 2, position: "relative" }}>
            <button
              type="button"
              onClick={() => setShowLangDropdown(!showLangDropdown)}
              style={{
                width: "100%",
                padding: "15px 20px",
                borderRadius: "25px",
                border: "none",
                backgroundColor: "var(--bg-input)",
                fontSize: "15px",
                color: form.language ? "var(--text-primary)" : "var(--text-secondary)",
                textAlign: "left",
                fontFamily: "inherit",
                cursor: "pointer",
                boxShadow: "inset 0 2px 4px rgba(0,0,0,0.05), var(--shadow-glass)",
              }}
            >
              {form.language || "Idioma a aprender"}
              <span style={{ float: "right" }}>▾</span>
            </button>
            {showLangDropdown && (
              <div style={{
                position: "absolute",
                top: "100%",
                left: 0, right: 0,
                background: "var(--bg-surface)",
                backdropFilter: "blur(12px)",
                border: "1px solid var(--border-glass)",
                borderRadius: "12px",
                boxShadow: "var(--shadow-glow)",
                zIndex: 50,
                maxHeight: "200px",
                overflowY: "auto",
                marginTop: "5px",
              }}>
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => { handleChange("language", lang); setShowLangDropdown(false); }}
                    style={{
                      display: "block",
                      width: "100%",
                      padding: "12px 18px",
                      border: "none",
                      background: form.language === lang ? "var(--accent-primary)" : "transparent",
                      fontSize: "14px",
                      color: form.language === lang ? "var(--text-inverse)" : "var(--text-primary)",
                      textAlign: "left",
                      cursor: "pointer",
                      fontFamily: "inherit",
                      borderBottom: "1px solid var(--border-glass)",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "var(--bg-input-focus)"; e.currentTarget.style.color = "var(--text-primary)"; }}
                    onMouseLeave={(e) => { 
                      e.currentTarget.style.background = form.language === lang ? "var(--accent-primary)" : "transparent"; 
                      e.currentTarget.style.color = form.language === lang ? "var(--text-inverse)" : "var(--text-primary)";
                    }}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <RoundedInput
          type="email"
          placeholder="Informe seu Email"
          required
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />
        <RoundedInput
          type="password"
          placeholder="Digite uma senha"
          required
          value={form.password}
          onChange={(e) => handleChange("password", e.target.value)}
        />
        <RoundedInput
          type="password"
          placeholder="Confirme a senha"
          required
          value={form.confirm}
          onChange={(e) => handleChange("confirm", e.target.value)}
        />

        <div style={{ display: "flex", justifyContent: "center", marginTop: "25px", marginBottom: "30px" }}>
          <PrimaryButton type="submit" variant="gradient" style={{ maxWidth: "200px" }}>
            Confirmar
          </PrimaryButton>
        </div>
      </form>

      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
  );
}
