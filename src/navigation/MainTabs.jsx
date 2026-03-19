import React from "react";
import { Routes, Route } from "react-router-dom";
import HomeScreen from "../screens/main/HomeScreen.jsx";
import LessonsScreen from "../screens/main/LessonsScreen.jsx";
import ProgressScreen from "../screens/main/ProgressScreen.jsx";
import ClassScreen from "../screens/main/ClassScreen.jsx";
import ProfileScreen from "../screens/main/ProfileScreen.jsx";

export default function MainTabs() {
  return (
    <Routes>
      <Route path="/home" element={<HomeScreen />} />
      <Route path="/lessons" element={<LessonsScreen />} />
      <Route path="/progress" element={<ProgressScreen />} />
      <Route path="/class" element={<ClassScreen />} />
      <Route path="/profile" element={<ProfileScreen />} />
    </Routes>
  );
}
