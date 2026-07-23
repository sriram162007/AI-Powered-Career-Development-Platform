import { type ReactNode } from "react";
import { cn } from "@/utils/cn";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "success" | "warning" | "danger" | "info" | "outline";
  size?: "sm" | "md";
  className?: string;
}

const variantStyles = {
  default: "bg-gray-100 text-gray-700 dark:bg-navy-700 dark:text-navy-200",
  success: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  warning: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  danger: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  info: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  outline: "border border-current bg-transparent text-orange-600 dark:text-orange-400",
};

const sizeStyles = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-1 text-sm",
};

export default function Badge({
  children,
  variant = "default",
  size = "md",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-medium",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {children}
    </span>
  );
}
