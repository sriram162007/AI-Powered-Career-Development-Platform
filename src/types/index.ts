
export interface AppTheme {
  mode: "light" | "dark";
  colors: {
    background: string;
    surface: string;
    surfaceAlt: string;
    textPrimary: string;
    textSecondary: string;
    border: string;
    accent: string;
    accentHover: string;
  };
}

export const lightTheme: AppTheme = {
  mode: "light",
  colors: {
    background: "#ffffff",
    surface: "#f8fafc",
    surfaceAlt: "#f1f5f9",
    textPrimary: "#0b1020",
    textSecondary: "#64748b",
    border: "#e2e8f0",
    accent: "linear-gradient(135deg, #ff6b35 0%, #f5b942 100%)",
    accentHover: "#ff8c5a",
  },
};

export const darkTheme: AppTheme = {
  mode: "dark",
  colors: {
    background: "#0b1020",
    surface: "#111827",
    surfaceAlt: "#1f2937",
    textPrimary: "#f9fafb",
    textSecondary: "#9ca3af",
    border: "#374151",
    accent: "linear-gradient(135deg, #ff6b35 0%, #f5b942 100%)",
    accentHover: "#ff8c5a",
  },
};

