import { type ReactNode, useState } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import Button from "@/components/ui/Button";

interface Props {
  fallback?: ReactNode;
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default function ErrorBoundary({ fallback, children }: Props) {
  const [state, setState] = useState<State>({ hasError: false, error: null });

  if (state.hasError) {
    if (fallback) return fallback as React.ReactElement;
    return (
      <div className="flex min-h-[400px] items-center justify-center p-6">
        <div className="max-w-md text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
            <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
          </div>
          <h2 className="mb-2 text-xl font-semibold text-navy-800 dark:text-white">
            Something went wrong
          </h2>
          <p className="mb-4 text-sm text-navy-500 dark:text-navy-300">
            {state.error?.message || "An unexpected error occurred"}
          </p>
          <Button
            variant="primary"
            onClick={() => setState({ hasError: false, error: null })}
            leftIcon={<RefreshCw size={16} />}
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <ErrorCatcher onError={(error) => setState({ hasError: true, error })}>
      {children}
    </ErrorCatcher>
  );
}

function ErrorCatcher({ onError, children }: { onError: (error: Error) => void; children: ReactNode }) {
  const [didCatch, setDidCatch] = useState(false);

  if (didCatch) return null;

  return (
    <>
      {children}
      <ErrorOverlay
        onError={(error) => {
          setDidCatch(true);
          onError(error);
        }}
      />
    </>
  );
}

function ErrorOverlay({ onError }: { onError: (error: Error) => void }) {
  // eslint-disable-next-line react/no-children-prop
  const handler = () => {
    window.addEventListener("error", (event) => onError(event.error || new Error(String(event.message))), true);
    window.addEventListener("unhandledrejection", (event) => onError(event.reason instanceof Error ? event.reason : new Error(String(event.reason))));
  };

  handler();

  return null;
}
