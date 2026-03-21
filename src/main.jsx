import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/UserContext.jsx";
import App from "./App.jsx";
import "./index.css";

// 👇 ADICIONA ISSO
import { registerSW } from "virtual:pwa-register";

// 👇 REGISTRA O SERVICE WORKER
registerSW({ immediate: true });

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <UserProvider>
      <App />
    </UserProvider>
  </BrowserRouter>
);