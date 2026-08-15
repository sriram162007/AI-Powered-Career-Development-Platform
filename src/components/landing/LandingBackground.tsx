import { cn } from "@/utils/cn";
import type { ReactNode } from "react";

interface LandingBackgroundProps {
  children?: ReactNode;
  className?: string;
}

export function LandingBackground({ children, className }: LandingBackgroundProps) {
  return (
    <div
      className={cn(
        "relative min-h-screen font-sans antialiased",
        "before:content-[''] before:absolute before:inset-0 before:z-0",
        "before:bg-[radial-gradient(circle_at_85%_15%,rgba(255,107,53,0.04),transparent_28%),radial-gradient(circle_at_8%_85%,rgba(80,120,255,0.03),transparent_30%)]",
        className
      )}
      style={{
        backgroundColor: "#f8fafc",
        color: "#0f172a",
      }}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
}
