import { type ReactNode } from "react";
import { cn } from "@/utils/cn";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
  padding?: "none" | "sm" | "md" | "lg";
}

const paddingClasses = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export default function Card({
  children,
  className,
  hover = false,
  onClick,
  padding = "md",
}: CardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "rounded-2xl border transition-all",
        hover && "cursor-pointer hover:shadow-lg hover:-translate-y-0.5",
        paddingClasses[padding],
        className
      )}
      style={{
        background: "var(--surface, #fff)",
        borderColor: "var(--border, #e2e8f0)",
      }}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

Card.Header = function CardHeader({ title, description, action, className }: CardHeaderProps) {
  return (
    <div className={cn("flex items-start justify-between", className)}>
      <div>
        <h3
          className="text-base font-semibold"
          style={{ color: "var(--textPrimary, #0b1020)" }}
        >
          {title}
        </h3>
        {description && (
          <p className="mt-1 text-sm" style={{ color: "var(--textSecondary, #64748b)" }}>
            {description}
          </p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
};

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

Card.Content = function CardContent({ children, className }: CardContentProps) {
  return <div className={cn("mt-4", className)}>{children}</div>;
};

interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

Card.Footer = function CardFooter({ children, className }: CardFooterProps) {
  return (
    <div
      className={cn("mt-4 flex items-center justify-between border-t pt-4", className)}
      style={{ borderColor: "var(--border, #e2e8f0)" }}
    >
      {children}
    </div>
  );
};
