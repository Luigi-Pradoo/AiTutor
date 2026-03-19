import React from "react";
import { Link, useNavigate } from "react-router-dom";
import TextInput from "../components/TextInput.jsx";
import Button from "../components/Button.jsx";

export default function Register() {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    navigate("/home");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", padding: "20px" }}>
      {/* Header */}
      <div style={{ width: "100%", paddingTop: "50px", paddingBottom: "30px", paddingLeft: "10px" }}>
        <h1 style={{ color: "var(--color-text-light)", fontSize: "32px", fontWeight: "400", paddingLeft: "10px" }}>
          Cadastro
        </h1>
      </div>

      {/* Form Area matching the Figma Design */}
      <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: "25px", marginTop: "20px" }}>
        
        <div style={{ display: "flex", justifyContent: "center" }}>
          <TextInput 
            type="text" 
            placeholder="Nome Completo" 
            required 
            style={{ maxWidth: "300px", background: "#fff" }} 
          />
        </div>
        
        <div style={{ display: "flex", justifyContent: "center", gap: "10px", maxWidth: "300px", margin: "0 auto", width: "100%" }}>
          <TextInput 
            type="number" 
            placeholder="Idade" 
            style={{ flex: 1, minWidth: "0", background: "#fff" }} 
            required 
          />
          <TextInput 
            type="text" 
            placeholder="Idioma a ser aprendido" 
            style={{ flex: 2, minWidth: "0", background: "#fff" }} 
            required 
          />
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <TextInput 
            type="email" 
            placeholder="Informe seu Email" 
            required 
            style={{ maxWidth: "300px", background: "#fff" }} 
          />
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <TextInput 
            type="password" 
            placeholder="Digite uma senha" 
            required 
            style={{ maxWidth: "300px", background: "#fff" }} 
          />
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <TextInput 
            type="password" 
            placeholder="Confirme a senha" 
            required 
            style={{ maxWidth: "300px", background: "#fff" }} 
          />
        </div>

        <div style={{ display: "flex", justifyContent: "center", marginTop: "30px", marginBottom: "30px" }}>
          <Button type="submit" variant="gradient" style={{ maxWidth: "200px" }}>
            Confirmar
          </Button>
        </div>
        
      </form>
    </div>
  );
}
