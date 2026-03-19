import React from "react";
import { Link, useNavigate } from "react-router-dom";
import TextInput from "../components/TextInput.jsx";
import Button from "../components/Button.jsx";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/home");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px" }}>
      {/* Header */}
      <div style={{ width: "100%", paddingTop: "40px", paddingBottom: "20px" }}>
        <h1 style={{ color: "var(--color-text-light)", fontSize: "28px", fontWeight: "500", letterSpacing: "1px" }}>
          LOGIN
        </h1>
      </div>

      {/* Robot Avatar */}
      <div style={{ position: "relative", marginTop: "10px", marginBottom: "40px" }}>
        <div style={{
          width: "160px",
          height: "160px",
          borderRadius: "50%",
          border: "1px solid rgba(0,0,0,0.6)",
          padding: "5px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "rgba(255,255,255,0.8)",
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
          overflow: "hidden"
        }}>
          <img 
            src="/robot_tutor.png" 
            alt="AI Tutor Robot" 
            style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }}
          />
        </div>
      </div>

      {/* Form Area */}
      <form onSubmit={handleLogin} style={{ width: "100%", maxWidth: "300px", display: "flex", flexDirection: "column", gap: "20px" }}>
        <TextInput type="email" placeholder="Email" required />
        <TextInput type="password" placeholder="Password" required />

        {/* Social Logins */}
        <div style={{ display: "flex", gap: "15px", marginTop: "10px" }}>
          <Button type="button" variant="social">
            {/* Facebook Icon SVG */}
            <svg viewBox="0 0 24 24" width="24" height="24" fill="#1877F2">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </Button>
          <Button type="button" variant="social">
            {/* Google Icon SVG */}
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0112 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115z"/>
              <path fill="#34A853" d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 01-6.723-4.823l-4.04 3.067A11.965 11.965 0 0012 24c2.933 0 5.735-1.043 7.834-3l-3.793-2.987z"/>
              <path fill="#4A90E2" d="M19.834 21c2.195-2.048 3.62-5.096 3.62-9 0-.71-.109-1.473-.272-2.182H12v4.637h6.436c-.317 1.559-1.17 2.766-2.395 3.558L19.834 21z"/>
              <path fill="#FBBC05" d="M5.277 14.268A7.12 7.12 0 014.909 12c0-.782.125-1.533.357-2.235L1.24 6.65A11.934 11.934 0 000 12c0 1.92.445 3.73 1.237 5.335l4.04-3.067z"/>
            </svg>
          </Button>
        </div>

        {/* Hidden submit to handle enter key but we have social buttons and register mostly */}
        <button type="submit" style={{display:"none"}}>Submit</button>
      </form>

      {/* Register Link */}
      <div style={{ marginTop: "40px" }}>
        <Link to="/register" style={{ textDecoration: "none", color: "var(--color-text-dark)", fontSize: "18px", fontWeight: "500" }}>
          Register
        </Link>
      </div>
    </div>
  );
}
