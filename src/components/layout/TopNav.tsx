"use client";

import { useState } from "react";
import { type ReactNode } from "react";
import { Bell, Search, Sun, Moon } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export default function TopNav({ children }: { children?: ReactNode }) {
  const { theme, toggle, isDark } = useTheme();
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <header
      className="flex h-16 items-center justify-between border-b px-6"
      style={{
        background: theme.colors.surface,
        borderColor: theme.colors.border,
      }}
    >
      <div className="flex items-center gap-4">
        {/* Mobile menu button would go here */}
        <h2
          className="text-lg font-semibold"
          style={{ color: theme.colors.textPrimary }}
        >
          {children}
        </h2>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative hidden md:block">
          <Search
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2"
            style={{ color: theme.colors.textSecondary }}
          />
          <input
            type="text"
            placeholder="Search jobs, skills..."
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className="h-9 rounded-lg border pl-9 pr-4 text-sm outline-none transition-colors"
            style={{
              width: searchFocused ? "320px" : "240px",
              background: theme.colors.background,
              borderColor: theme.colors.border,
              color: theme.colors.textPrimary,
            }}
          />
        </div>

        <button
          onClick={toggle}
          className="flex h-9 w-9 items-center justify-center rounded-lg border transition-colors hover:bg-gray-100 dark:hover:bg-navy-700"
          style={{ borderColor: theme.colors.border }}
          title="Toggle theme"
        >
          {isDark ? (
            <Sun size={18} style={{ color: theme.colors.textSecondary }} />
          ) : (
            <Moon size={18} style={{ color: theme.colors.textSecondary }} />
          )}
        </button>

        <button
          className="relative flex h-9 w-9 items-center justify-center rounded-lg border transition-colors hover:bg-gray-100 dark:hover:bg-navy-700"
          style={{ borderColor: theme.colors.border }}
        >
          <Bell size={18} style={{ color: theme.colors.textSecondary }} />
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold text-white">
            3
          </span>
        </button>

        <div className="ml-2 flex items-center gap-3">
          <div
            className="h-8 w-8 rounded-full flex items-center justify-center text-sm font-semibold text-white"
            style={{ background: "linear-gradient(135deg, #ff6b35 0%, #f5b942 100%)" }}
          >
            JD
          </div>
          <div className="hidden lg:block">
            <p className="text-sm font-medium" style={{ color: theme.colors.textPrimary }}>
              John Doe
            </p>
            <p className="text-xs" style={{ color: theme.colors.textSecondary }}>
              Premium Plan
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
