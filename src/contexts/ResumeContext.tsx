"use client";

import { createContext, type ReactNode, useContext, useState, useCallback } from "react";
import type { ResumeData } from "@/types/profile";

interface UploadedFile {
  file: File;
  name: string;
  size: number;
  type: string;
  uploadedAt: string;
  status: "uploading" | "processing" | "done" | "error";
}

interface ResumeContextValue {
  uploadedFile: UploadedFile | null;
  analysisResult: any | null;
  resumeData: ResumeData | null;
  setUploadedFile: (file: UploadedFile | null) => void;
  setAnalysisResult: (result: any | null) => void;
  setResumeData: (data: ResumeData | null) => void;
  resetResume: () => void;
}

const ResumeContext = createContext<ResumeContextValue | undefined>(undefined);

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [analysisResult, setAnalysisResult] = useState<any | null>(null);
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);

  const resetResume = useCallback(() => {
    setUploadedFile(null);
    setAnalysisResult(null);
    setResumeData(null);
  }, []);

  return (
    <ResumeContext.Provider
      value={{
        uploadedFile,
        analysisResult,
        resumeData,
        setUploadedFile,
        setAnalysisResult,
        setResumeData,
        resetResume,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error("useResume must be used within a ResumeProvider");
  }
  return context;
}
