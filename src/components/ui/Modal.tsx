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

const mobilePaddingClasses = {
  sm: "max-w-[calc(100vw-32px)]",
  md: "max-w-[calc(100vw-32px)] sm:max-w-lg",
  lg: "max-w-[calc(100vw-32px)] sm:max-w-2xl",
  full: "max-w-[calc(100vw-32px)] sm:max-w-4xl",
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
          "relative w-full rounded-2xl bg-white shadow-2xl",
          "max-h-[calc(100dvh-32px)]",
          "flex flex-col",
          mobilePaddingClasses[size],
          sizeClasses[size]
        )}
      >
        <div className="flex items-center justify-between border-b border-navy-200/30 px-6 py-4 shrink-0">
          <div>
            {title && (
              <h3 className="text-lg font-semibold text-navy-900">
                {title}
              </h3>
            )}
            {description && (
              <p className="mt-1 text-sm text-navy-500">
                {description}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-navy-400 hover:bg-navy-50 hover:text-navy-700 transition-colors"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        <div className="overflow-y-auto px-6 py-4 flex-1">
          {children}
        </div>

        {footer && (
          <div className="flex items-center justify-end gap-3 border-t border-navy-200/30 px-6 py-4 shrink-0">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
