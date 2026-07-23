import { type ReactNode } from "react";

interface WelcomeBannerProps {
  name: string;
  subtitle: string;
  cta?: ReactNode;
}

export function WelcomeBanner({ name, subtitle, cta }: WelcomeBannerProps) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl"
      style={{
        background: "linear-gradient(135deg, #0b1020 0%, #1e2844 100%)",
      }}
    >
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div
          className="absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-20"
          style={{
            background: "linear-gradient(135deg, #ff6b35 0%, #f5b942 100%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full opacity-10"
          style={{
            background: "linear-gradient(135deg, #ff6b35 0%, #f5b942 100%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 sm:p-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-lg"
              style={{
                background: "linear-gradient(135deg, #ff6b35 0%, #f5b942 100%)",
              }}
            >
              <span className="text-lg">👋</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Welcome back, {name}!
            </h1>
          </div>
          <p className="text-navy-200 text-sm sm:text-base max-w-xl">
            {subtitle}
          </p>
        </div>
        {cta && <div className="shrink-0">{cta}</div>}
      </div>
    </div>
  );
}
