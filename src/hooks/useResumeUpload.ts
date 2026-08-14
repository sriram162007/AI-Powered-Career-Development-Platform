import { useState, useCallback, useRef } from "react";

interface SkillItem {
  name: string;
  level: "Expert" | "Intermediate" | "Beginner";
  category: string;
}

interface Strength {
  title: string;
  detail: string;
}

interface Weakness {
  title: string;
  detail: string;
}

interface Improvement {
  title: string;
  detail: string;
}

export interface AnalysisResult {
  resumeScore: number;
  atsScore: number;
  industryMatch: number;
  topIndustry: string;
  skillsDetected: SkillItem[];
  missingSkills: string[];
  strengths: Strength[];
  weaknesses: Weakness[];
  improvements: Improvement[];
  summary: string;
}

const ALLOWED_EXTENSIONS = [".pdf", ".docx"];
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export function useResumeUpload() {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: number; type: string; uploadedAt: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = useCallback((file: File): string | null => {
    if (!file) return "No file selected.";
    const name = file.name.toLowerCase();
    const hasValidExtension = ALLOWED_EXTENSIONS.some((ext) => name.endsWith(ext));
    if (!hasValidExtension) {
      return "Only PDF and DOCX files are supported.";
    }
    if (file.size > MAX_FILE_SIZE) {
      return "File size exceeds 5MB limit.";
    }
    return null;
  }, []);

  const analyzeResumeViaBackend = useCallback(async (file: File): Promise<AnalysisResult> => {
    const steps = [
      "Uploading resume...",
      "Reading document...",
      "Extracting information...",
      "Analyzing skills...",
      "Calculating ATS score...",
      "Generating suggestions...",
      "Preparing dashboard...",
    ];

    let stepIndex = 0;
    const stepInterval = setInterval(() => {
      setAnalysisStep(steps[stepIndex % steps.length]);
      stepIndex++;
    }, 400);

    try {
      const formData = new FormData();
      formData.append("resume", file);

      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "Failed to analyze resume" }));
        throw new Error(errorData.error || `Server error: ${response.status}`);
      }

      const data: AnalysisResult = await response.json();
      return data;
    } finally {
      clearInterval(stepInterval);
      setAnalysisStep("");
    }
  }, []);

  const handleDrop = useCallback(
    async (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      setError(null);

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        const file = e.dataTransfer.files[0];
        const validationError = validateFile(file);
        if (validationError) {
          setError(validationError);
          return;
        }
        setUploadedFile({
          name: file.name,
          size: file.size,
          type: file.type,
          uploadedAt: new Date().toLocaleString(),
        });
        setAnalyzing(true);
        setResult(null);
        try {
          const analysis = await analyzeResumeViaBackend(file);
          setResult(analysis);
        } catch {
          setError("Analysis failed. Please try again.");
        } finally {
          setAnalyzing(false);
          setAnalysisStep("");
        }
      }
    },
    [validateFile, analyzeResumeViaBackend]
  );

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      setError(null);
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        const validationError = validateFile(file);
        if (validationError) {
          setError(validationError);
          return;
        }
        setUploadedFile({
          name: file.name,
          size: file.size,
          type: file.type,
          uploadedAt: new Date().toLocaleString(),
        });
        setAnalyzing(true);
        setResult(null);
        try {
          const analysis = await analyzeResumeViaBackend(file);
          setResult(analysis);
        } catch {
          setError("Analysis failed. Please try again.");
        } finally {
          setAnalyzing(false);
          setAnalysisStep("");
        }
      }
    },
    [validateFile, analyzeResumeViaBackend]
  );

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const reset = useCallback(() => {
    setDragActive(false);
    setError(null);
    setAnalyzing(false);
    setAnalysisStep("");
    setResult(null);
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, []);

  return {
    dragActive,
    error,
    analyzing,
    analysisStep,
    result,
    uploadedFile,
    fileInputRef,
    handleDrag,
    handleDrop,
    handleFileChange,
    reset,
  };
}
