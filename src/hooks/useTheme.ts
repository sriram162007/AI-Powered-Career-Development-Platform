import { useCallback, useEffect, useState } from "react";
import { darkTheme, lightTheme, type AppTheme } from "@/types";

function getSystemTheme(): "light" | "dark" {
  if (typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }
  return "light";
}

export function useTheme() {
  const [theme, setTheme] = useState<AppTheme>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("career-platform-theme");
      if (stored === "light" || stored === "dark") {
        return stored === "dark" ? darkTheme : lightTheme;
      }
      return getSystemTheme() === "dark" ? darkTheme : lightTheme;
    }
    return darkTheme;
  });

  useEffect(() => {
    localStorage.setItem("career-platform-theme", theme.mode);
  }, [theme.mode]);

  const toggle = useCallback(() => {
    setTheme((prev) => (prev.mode === "dark" ? lightTheme : darkTheme));
  }, []);

  return { theme, toggle, isDark: theme.mode === "dark" };
}
