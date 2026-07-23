import { type ReactNode } from "react";

interface CircularProgressProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  label: string;
  sublabel?: string;
  trend?: string;
  icon?: ReactNode;
}

export function CircularProgress({
  value,
  size = 120,
  strokeWidth = 8,
  label,
  sublabel,
  trend,
  icon,
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  const center = size / 2;

  const getColor = (val: number) => {
    if (val >= 85) return "#22c55e";
    if (val >= 70) return "linear-gradient(135deg, #ff6b35 0%, #f5b942 100%)";
    if (val >= 50) return "#f59e0b";
    return "#ef4444";
  };

  const strokeColor = getColor(value);

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="#e2e8f0"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={typeof strokeColor === "string" && strokeColor.startsWith("linear") ? "url(#gradient)" : strokeColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 1s ease-out" }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff6b35" />
              <stop offset="100%" stopColor="#f5b942" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {icon && <div className="mb-1 text-navy-500">{icon}</div>}
          <span className="text-2xl font-bold text-navy-900">{value}</span>
          <span className="text-xs text-navy-400">/ 100</span>
        </div>
      </div>
      <p className="mt-3 text-sm font-medium text-navy-700">{label}</p>
      {sublabel && <p className="text-xs text-navy-400">{sublabel}</p>}
      {trend && (
        <span className="mt-1 inline-flex items-center text-xs font-medium text-green-600">
          {trend}
        </span>
      )}
    </div>
  );
}
