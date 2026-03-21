import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext.jsx";
import BottomNavBar from "../../components/layout/BottomNavBar.jsx";
import AccordionItem from "../../components/cards/AccordionItem.jsx";
import RoundedInput from "../../components/inputs/RoundedInput.jsx";
import PrimaryButton from "../../components/buttons/PrimaryButton.jsx";

// Icons
const UserIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const LockIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;
const BellIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>;
const CreditCardIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>;
const GearIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>;
const LogOutIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>;

const LANGUAGES = ["Inglês", "Espanhol", "Francês", "Alemão", "Italiano", "Japonês", "Coreano", "Mandarim"];

export default function ProfileScreen() {
  const { user, updateUser, darkMode, toggleDarkMode } = useUser();
  const navigate = useNavigate();

  // Editable profile fields
  const [editName, setEditName] = useState(user.name || "");
  const [editAge, setEditAge] = useState(user.age || "");
  const [editEmail, setEditEmail] = useState(user.email || "");
  const [editLang, setEditLang] = useState(user.targetLanguage || "");
  const [profileSaved, setProfileSaved] = useState(false);

  // Security fields
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  // Notification toggles
  const [notifLessons, setNotifLessons] = useState(true);
  const [notifProgress, setNotifProgress] = useState(true);
  const [notifPromo, setNotifPromo] = useState(false);

  const handleSaveProfile = () => {
    updateUser({
      name: editName,
      age: editAge,
      email: editEmail,
      targetLanguage: editLang,
    });
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2000);
  };

  const handleChangePassword = () => {
    if (newPass !== confirmPass) {
      alert("As senhas não coincidem!");
      return;
    }
    alert("Senha alterada com sucesso!");
    setCurrentPass(""); setNewPass(""); setConfirmPass("");
  };

  return (
    <div style={{ paddingBottom: "100px", minHeight: "100vh", animation: "fadeIn 0.4s ease" }}>
      <div style={{ padding: "50px 20px 10px" }}>
        <h1 style={{ color: "var(--text-primary)", fontSize: "28px", fontWeight: "600", fontStyle: "italic", margin: 0 }}>Perfil</h1>
      </div>

      {/* Avatar + Name */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "10px", marginBottom: "25px" }}>
        <div style={{
          width: "110px", height: "110px", borderRadius: "50%",
          border: "4px solid rgba(139, 92, 246, 0.6)",
          display: "flex", alignItems: "center", justifyContent: "center",
          background: "var(--bg-surface)",
          backdropFilter: "blur(12px)",
          boxShadow: "var(--shadow-glow)",
        }}>
          <svg width="55" height="55" viewBox="0 0 24 24" fill="none" stroke="var(--text-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        </div>
        <h2 style={{ fontSize: "22px", fontWeight: "600", color: "var(--text-primary)", marginTop: "12px" }}>
          {user.name || "Novo Usuário"}
        </h2>
        {user.email && (
          <p style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "2px" }}>{user.email}</p>
        )}
        {user.targetLanguage && (
          <p style={{ fontSize: "13px", color: "#7c7ae6", marginTop: "3px", fontWeight: "500" }}>
            📚 Aprendendo {user.targetLanguage}
          </p>
        )}
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "14px", marginTop: "14px", background: "var(--bg-surface)", padding: "12px 20px", borderRadius: "16px", border: "1px solid var(--border-glass)", boxShadow: "var(--shadow-glass)", backdropFilter: "blur(12px)" }}>
          <div style={{ textAlign: "center", width: "70px" }}>
            <span style={{ fontSize: "16px", fontWeight: "700", color: "#f44336" }}>🔥 {user.streak || 0}</span>
            <span style={{ fontSize: "11px", color: "var(--text-secondary)", display: "block", marginTop: "2px" }}>Dias</span>
          </div>
          <div style={{ width: "1px", background: "var(--border-glass)", margin: "4px 0" }} />
          <div style={{ textAlign: "center", width: "70px" }}>
            <span style={{ fontSize: "16px", fontWeight: "700", color: "#3f51b5" }}>⭐ {user.level || 1}</span>
            <span style={{ fontSize: "11px", color: "var(--text-secondary)", display: "block", marginTop: "2px" }}>Nível</span>
          </div>
          <div style={{ width: "1px", background: "var(--border-glass)", margin: "4px 0" }} />
          <div style={{ textAlign: "center", width: "70px" }}>
            <span style={{ fontSize: "16px", fontWeight: "700", color: "#4caf50" }}>🎯 {user.xp || 0}</span>
            <span style={{ fontSize: "11px", color: "var(--text-secondary)", display: "block", marginTop: "2px" }}>XP Total</span>
          </div>
        </div>
      </div>

      {/* Accordion Menu */}
      <div style={{ padding: "0 20px", borderRadius: "14px", overflow: "hidden" }}>

        {/* EDITAR PERFIL */}
        <AccordionItem icon={<UserIcon />} label="Editar Perfil" defaultOpen={!user.name}>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div>
              <label style={{ fontSize: "12px", color: "var(--text-secondary)", marginBottom: "4px", display: "block" }}>Nome</label>
              <RoundedInput value={editName} onChange={(e) => setEditName(e.target.value)} placeholder="Seu nome" />
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: "12px", color: "var(--text-secondary)", marginBottom: "4px", display: "block" }}>Idade</label>
                <RoundedInput type="number" value={editAge} onChange={(e) => setEditAge(e.target.value)} placeholder="25" />
              </div>
              <div style={{ flex: 2 }}>
                <label style={{ fontSize: "12px", color: "var(--text-secondary)", marginBottom: "4px", display: "block" }}>Idioma</label>
                <select
                  value={editLang}
                  onChange={(e) => setEditLang(e.target.value)}
                  style={{
                    width: "100%", padding: "15px 20px", borderRadius: "25px", border: "1px solid var(--border-glass)",
                    backgroundColor: "var(--bg-input)", fontSize: "15px", color: "var(--text-primary)",
                    fontFamily: "inherit", outline: "none",
                    boxShadow: "inset 0 2px 4px rgba(0,0,0,0.05), var(--shadow-glass)",
                  }}
                >
                  <option value="">Selecionar...</option>
                  {LANGUAGES.map((l) => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label style={{ fontSize: "12px", color: "var(--text-secondary)", marginBottom: "4px", display: "block" }}>Email</label>
              <RoundedInput type="email" value={editEmail} onChange={(e) => setEditEmail(e.target.value)} placeholder="email@exemplo.com" />
            </div>
            <PrimaryButton onClick={handleSaveProfile} style={{ maxWidth: "150px", alignSelf: "center", fontSize: "14px" }}>
              {profileSaved ? "✅ Salvo!" : "Salvar Perfil"}
            </PrimaryButton>
          </div>
        </AccordionItem>

        {/* SEGURANÇA */}
        <AccordionItem icon={<LockIcon />} label="Segurança">
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <RoundedInput type="password" placeholder="Senha atual" value={currentPass} onChange={(e) => setCurrentPass(e.target.value)} />
            <RoundedInput type="password" placeholder="Nova senha" value={newPass} onChange={(e) => setNewPass(e.target.value)} />
            <RoundedInput type="password" placeholder="Confirmar nova senha" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} />
            <PrimaryButton onClick={handleChangePassword} style={{ maxWidth: "160px", alignSelf: "center", fontSize: "14px" }}>
              Alterar Senha
            </PrimaryButton>
          </div>
        </AccordionItem>

        {/* NOTIFICAÇÕES */}
        <AccordionItem icon={<BellIcon />} label="Notificações">
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {[
              { label: "Lembretes de lição", value: notifLessons, set: setNotifLessons },
              { label: "Relatórios de progresso", value: notifProgress, set: setNotifProgress },
              { label: "Promoções e novidades", value: notifPromo, set: setNotifPromo },
            ].map((item) => (
              <div key={item.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "var(--text-primary)" }}>
                <span style={{ fontSize: "14px" }}>{item.label}</span>
                <button
                  onClick={() => item.set(!item.value)}
                  style={{
                    width: "44px", height: "24px", borderRadius: "12px",
                    border: "none", cursor: "pointer",
                    background: item.value ? "#7c7ae6" : "#ccc",
                    position: "relative", transition: "background 0.3s",
                  }}
                >
                  <div style={{
                    width: "18px", height: "18px", borderRadius: "50%",
                    background: "#fff", position: "absolute", top: "3px",
                    left: item.value ? "23px" : "3px",
                    transition: "left 0.3s",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                  }} />
                </button>
              </div>
            ))}
          </div>
        </AccordionItem>

        {/* PAGAMENTOS */}
        <AccordionItem icon={<CreditCardIcon />} label="Pagamentos">
          <div style={{ textAlign: "center", padding: "10px 0" }}>
            <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "8px" }}>Nenhum método de pagamento cadastrado.</p>
            <PrimaryButton variant="gradient" style={{ maxWidth: "200px", margin: "0 auto", fontSize: "13px" }}>
              + Adicionar Cartão
            </PrimaryButton>
          </div>
        </AccordionItem>

          {/* CONFIGURAÇÕES */}
        <AccordionItem icon={<GearIcon />} label="Configurações">
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "var(--text-primary)" }}>
              <span style={{ fontSize: "14px" }}>Tema Escuro</span>
              <button
                onClick={toggleDarkMode}
                style={{
                  width: "44px", height: "24px", borderRadius: "12px",
                  border: "none", cursor: "pointer",
                  background: darkMode ? "#7c7ae6" : "#ccc",
                  position: "relative", transition: "background 0.3s",
                }}
              >
                <div style={{
                  width: "18px", height: "18px", borderRadius: "50%",
                  background: "#fff", position: "absolute", top: "3px",
                  left: darkMode ? "23px" : "3px",
                  transition: "left 0.3s",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                }} />
              </button>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "var(--text-primary)" }}>
              <span style={{ fontSize: "14px" }}>Velocidade da fala</span>
              <span style={{ fontSize: "12px", color: "#7c7ae6", fontWeight: "600" }}>Normal</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "14px" }}>Versão do App</span>
              <span style={{ fontSize: "12px", color: "#999" }}>2.0.0</span>
            </div>
          </div>
        </AccordionItem>
      </div>

      {/* Logout */}
      <div style={{ padding: "20px 20px 0", display: "flex", justifyContent: "center" }}>
        <button
          onClick={() => navigate("/")}
          style={{
            display: "flex", alignItems: "center", gap: "8px",
            background: "var(--bg-surface)", border: "1px solid var(--border-glass)",
            backdropFilter: "blur(4px)",
            borderRadius: "25px", padding: "12px 28px",
            color: "var(--accent-danger)", fontSize: "14px", fontWeight: "600",
            cursor: "pointer", fontFamily: "inherit",
            transition: "all 0.2s",
            boxShadow: "var(--shadow-glass)"
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "var(--accent-danger)"; e.currentTarget.style.color = "#fff"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "var(--bg-surface)"; e.currentTarget.style.color = "var(--accent-danger)"; }}
        >
          <LogOutIcon /> Sair
        </button>
      </div>

      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      <BottomNavBar />
    </div>
  );
}
