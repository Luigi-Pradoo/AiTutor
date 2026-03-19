import React from "react";
import { Routes, Route } from "react-router-dom";
import AnimatedBackground from "./components/layout/AnimatedBackground.jsx";
import LoginScreen from "./screens/auth/LoginScreen.jsx";
import RegisterScreen from "./screens/auth/RegisterScreen.jsx";
import HomeScreen from "./screens/main/HomeScreen.jsx";
import LessonsScreen from "./screens/main/LessonsScreen.jsx";
import ProgressScreen from "./screens/main/ProgressScreen.jsx";
import ClassScreen from "./screens/main/ClassScreen.jsx";
import ProfileScreen from "./screens/main/ProfileScreen.jsx";

export default function App() {
  return (
    <>
      <AnimatedBackground />
      <Routes>
        {/* Auth */}
        <Route path="/" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        {/* Main */}
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/lessons" element={<LessonsScreen />} />
        <Route path="/progress" element={<ProgressScreen />} />
        <Route path="/class" element={<ClassScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
      </Routes>
    </>
  );
}
