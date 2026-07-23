import { type ReactNode } from "react";

interface QuickActionCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "default" | "primary";
}

export function QuickActionCard({
  title,
  description,
  icon,
  href,
  onClick,
  variant = "default",
}: QuickActionCardProps) {
  const content = (
    <div
      className="h-full rounded-xl border p-5 transition-all hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
      style={{
        background: variant === "primary"
          ? "linear-gradient(135deg, #ff6b35 0%, #f5b942 100%)"
          : "#fff",
        borderColor: variant === "primary" ? "transparent" : "#e2e8f0",
      }}
    >
      <div
        className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg"
        style={{
          background: variant === "primary" ? "rgba(255,255,255,0.2)" : "#f1f5f9",
        }}
      >
        <span style={{ color: variant === "primary" ? "#fff" : "#ff6b35" }}>
          {icon}
        </span>
      </div>
      <h3
        className="text-sm font-semibold"
        style={{ color: variant === "primary" ? "#fff" : "#0b1020" }}
      >
        {title}
      </h3>
      <p
        className="mt-1 text-xs leading-relaxed"
        style={{ color: variant === "primary" ? "rgba(255,255,255,0.9)" : "#64748b" }}
      >
        {description}
      </p>
    </div>
  );

  if (href) {
    return (
      <a href={href} onClick={onClick} className="block">
        {content}
      </a>
    );
  }

  return (
    <div onClick={onClick} role="button" tabIndex={0}>
      {content}
    </div>
  );
}

interface QuickActionsSectionProps {
  actions: {
    title: string;
    description: string;
    icon: ReactNode;
    action: () => void;
    variant?: "default" | "primary";
  }[];
}

export function QuickActionsSection({ actions }: QuickActionsSectionProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {actions.map((action, idx) => (
        <QuickActionCard key={idx} {...action} />
      ))}
    </div>
  );
}
