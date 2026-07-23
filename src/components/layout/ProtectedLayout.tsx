"use client";

import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import TopNav from "./TopNav";
import { useTheme } from "@/contexts/ThemeContext";

export default function ProtectedLayout() {
  const { theme } = useTheme();

  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <TopNav />

        <main
          className="flex-1 overflow-y-auto"
          style={{
            background: theme.colors.surface,
          }}
        >
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
