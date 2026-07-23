import { type ReactNode } from "react";
import { ThemeProvider } from "./ThemeContext";

export default function AppProviders({ children }: { children: ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
