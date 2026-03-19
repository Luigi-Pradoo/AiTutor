import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext(null);

const STORAGE_KEY = "aiTutor_userData";

const DEFAULT_USER = {
  name: "",
  age: "",
  targetLanguage: "",
  email: "",
  progress: [],
  totalScore: 0,
  totalPossible: 0,
  xp: 0,
  level: 1,
  streak: 0,
  lastActiveDate: null,
};

export function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...DEFAULT_USER, ...parsed };
      }
    } catch (e) {
      console.error("Failed to load user state", e);
    }
    return DEFAULT_USER;
  });

  // Calculate streak on load
  useEffect(() => {
    const today = new Date().toLocaleDateString("pt-BR");
    if (user.lastActiveDate !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toLocaleDateString("pt-BR");

      let newStreak = user.streak;
      if (user.lastActiveDate === yesterdayStr) {
        newStreak += 1; // Continued streak
      } else if (user.lastActiveDate !== null) {
        newStreak = 1; // Broken streak, reset to 1 for today
      } else {
        newStreak = 1; // First time playing
      }

      setUser((prev) => ({ ...prev, streak: newStreak, lastActiveDate: today }));
    }
  }, []); // Run once on mount

  // Save to localStorage whenever user changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  }, [user]);

  const updateUser = (fields) => {
    setUser((prev) => ({ ...prev, ...fields }));
  };

  const addProgress = (activityName, score, total) => {
    // 10 XP per correct answer
    const earnedXp = score * 10;
    
    setUser((prev) => {
      const newXp = prev.xp + earnedXp;
      const newLevel = Math.floor(newXp / 100) + 1; // Every 100 XP = 1 Level

      return {
        ...prev,
        progress: [...prev.progress, { name: activityName, score, total, date: new Date().toLocaleDateString("pt-BR"), earnedXp }],
        totalScore: prev.totalScore + score,
        totalPossible: prev.totalPossible + total,
        xp: newXp,
        level: newLevel,
      };
    });
  };

  return (
    <UserContext.Provider value={{ user, updateUser, addProgress }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be inside UserProvider");
  return ctx;
}
