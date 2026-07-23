import { type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/utils/cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export default function Input({
  label,
  hint,
  error,
  leftIcon,
  rightIcon,
  className,
  ...props
}: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="mb-1.5 block text-sm font-medium" style={{ color: "var(--textPrimary, #0b1020)" }}>
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--textSecondary, #64748b)" }}>
            {leftIcon}
          </div>
        )}
        <input
          className={cn(
            "h-10 w-full rounded-lg border px-3 py-2 text-sm outline-none transition-colors",
            "focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20",
            leftIcon && "pl-10",
            rightIcon && "pr-10",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
            className
          )}
          style={{
            background: "var(--background, #fff)",
            color: "var(--textPrimary, #0b1020)",
            borderColor: error ? "#ef4444" : "var(--border, #e2e8f0)",
          }}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "var(--textSecondary, #64748b)" }}>
            {rightIcon}
          </div>
        )}
      </div>
      {(hint || error) && (
        <p className="mt-1.5 text-xs" style={{ color: error ? "#ef4444" : "var(--textSecondary, #64748b)" }}>
          {error || hint}
        </p>
      )}
    </div>
  );
}
