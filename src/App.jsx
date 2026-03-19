import React from "react";
import { Routes, Route } from "react-router-dom";
import BackgroundOverlay from "./components/BackgroundOverlay.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";
import Activity from "./pages/Activity.jsx";
import Aula from "./pages/Aula.jsx";
import Progress from "./pages/Progress.jsx";
import Profile from "./pages/Profile.jsx";

export default function App(){
  return (
    <BackgroundOverlay>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/activity/:id" element={<Activity />} />
        <Route path="/aula" element={<Aula />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BackgroundOverlay>
  );
}
