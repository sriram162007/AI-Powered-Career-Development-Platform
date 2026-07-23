import { type ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/utils/cn";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: "sm" | "md" | "lg" | "full";
}

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
  full: "max-w-4xl",
};

export default function Modal({ isOpen, onClose, title, description, children, footer, size = "md" }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className={cn(
          "relative w-full rounded-2xl shadow-2xl",
          sizeClasses[size]
        )}
      >
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div>
            {title && (
              <h3 className="text-lg font-semibold" style={{ color: "var(--textPrimary, #0b1020)" }}>
                {title}
              </h3>
            )}
            {description && (
              <p className="mt-1 text-sm" style={{ color: "var(--textSecondary, #64748b)" }}>
                {description}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-gray-100"
          >
            <X size={18} />
          </button>
        </div>

        <div className="max-h-[calc(100vh-200px)] overflow-y-auto px-6 py-4">
          {children}
        </div>

        {footer && (
          <div className="flex items-center justify-end gap-3 border-t px-6 py-4">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
