import { type ButtonHTMLAttributes, type ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/utils/cn";

const variantStyles = {
  primary: "text-white",
  secondary: "",
  outline: "bg-transparent",
  ghost: "bg-transparent hover:bg-gray-100 dark:hover:bg-navy-700",
  danger: "text-white",
};

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-orange-500/50 disabled:opacity-50 disabled:cursor-not-allowed";

const sizeStyles = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-base",
  lg: "h-12 px-6 text-lg",
};

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  children: ReactNode;
  variant?: keyof typeof variantStyles;
  size?: keyof typeof sizeStyles;
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  loading = false,
  leftIcon,
  rightIcon,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const isGradientVariant = variant === "primary" || variant === "danger";
  const gradientBg = "linear-gradient(135deg, #ff6b35 0%, #f5b942 100%)";

  return (
    <button
      className={cn(
        baseStyles,
        sizeStyles[size],
        variantStyles[variant],
        fullWidth && "w-full",
        className
      )}
      disabled={disabled || loading}
      style={
        isGradientVariant
          ? { background: gradientBg }
          : variant === "secondary"
            ? { background: "#f1f5f9", color: "#0b1020" }
            : variant === "outline"
              ? { border: "1px solid #e2e8f0" }
              : undefined
      }
      {...props}
    >
      {loading && <Loader2 size={16} className="animate-spin" />}
      {!loading && leftIcon}
      {children}
      {!loading && rightIcon}
    </button>
  );
}
