import { useState, useCallback } from "react";

export interface ImproveResult {
  improvedText: string;
}

export type ImproveType = "summary" | "project" | "experience" | "achievement" | "skill" | "education";

export function useResumeImprove() {
  const [improving, setImproving] = useState(false);
  const [improveError, setImproveError] = useState<string | null>(null);

  const improveContent = useCallback(async (text: string, type: ImproveType): Promise<string> => {
    setImproving(true);
    setImproveError(null);
    try {
      const response = await fetch("/api/improve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, type }),
      });

      if (!response.ok) {
        const errorData: ImproveResult = await response.json().catch(() => ({ improvedText: "" }));
        const error = (errorData as any)?.error || `AI improvement failed (${response.status})`;
        throw new Error(error);
      }

      const data: ImproveResult = await response.json();
      return data.improvedText;
    } catch (err) {
      setImproveError(err instanceof Error ? err.message : "Failed to improve content");
      return text;
    } finally {
      setImproving(false);
    }
  }, []);

  return { improveContent, improving, improveError };
}
