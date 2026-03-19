import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginScreen from "../screens/auth/LoginScreen.jsx";
import RegisterScreen from "../screens/auth/RegisterScreen.jsx";

export default function AuthStack() {
  return (
    <Routes>
      <Route path="/" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
    </Routes>
  );
}
