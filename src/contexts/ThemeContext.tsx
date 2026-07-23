"use client";

import { type ReactNode, createContext, useContext, useState } from "react";
import { darkTheme, lightTheme, type AppTheme } from "@/types";

interface ThemeContextValue {
  theme: AppTheme;
  toggle: () => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<AppTheme>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("career-platform-theme");
      if (stored === "light") return lightTheme;
      if (stored === "dark") return darkTheme;
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) return darkTheme;
    }
    return darkTheme;
  });

  const toggle = () => {
    setTheme((prev) => (prev.mode === "dark" ? lightTheme : darkTheme));
  };

  const isDark = theme.mode === "dark";

  return (
    <ThemeContext.Provider value={{ theme, toggle, isDark }}>
      <div
        style={{
          background: theme.colors.background,
          color: theme.colors.textPrimary,
          minHeight: "100vh",
          transition: "background-color 0.3s ease, color 0.3s ease",
        }}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
}
