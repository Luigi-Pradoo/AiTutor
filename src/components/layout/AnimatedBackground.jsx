import React from "react";

export default function AnimatedBackground() {
  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: -1,
      overflow: "hidden",
      backgroundColor: "var(--bg-canvas)",
      transition: "background-color 0.5s ease",
    }}>
      {/* Dynamic Glowing Orbs */}
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <div className="orb orb-3"></div>

      <style>{`
        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.5;
          animation: float 20s infinite ease-in-out alternate;
        }

        .orb-1 {
          width: 300px;
          height: 300px;
          background: #8B5CF6;
          top: -10%;
          left: -10%;
          animation-duration: 25s;
        }

        .orb-2 {
          width: 400px;
          height: 400px;
          background: #06B6D4;
          bottom: -20%;
          right: -10%;
          animation-duration: 28s;
          animation-delay: -5s;
        }

        .orb-3 {
          width: 250px;
          height: 250px;
          background: #3B82F6;
          top: 40%;
          left: 60%;
          animation-duration: 22s;
          animation-delay: -10s;
          opacity: 0.3;
        }

        @keyframes float {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, 50px) scale(1.1); }
          100% { transform: translate(-20px, -30px) scale(0.9); }
        }

        /* Adjust opacity in dark mode to avoid overwhelming */
        html.dark .orb {
          opacity: 0.3;
        }
      `}</style>
    </div>
  );
}
