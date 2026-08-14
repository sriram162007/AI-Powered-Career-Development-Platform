import { type ReactNode } from "react";
import { ThemeProvider } from "./ThemeContext";
import { ResumeProvider } from "./ResumeContext";
import { ToastProvider } from "./ToastContext";

export default function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <ResumeProvider>
        <ToastProvider>{children}</ToastProvider>
      </ResumeProvider>
    </ThemeProvider>
  );
}
