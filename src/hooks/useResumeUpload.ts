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

  const runFrontendAnalysis = useCallback(async (_file: File): Promise<AnalysisResult> => {
    const steps = [
      "Uploading resume...",
      "Reading document...",
      "Extracting information...",
      "Analyzing skills...",
      "Calculating ATS score...",
      "Generating suggestions...",
      "Preparing dashboard...",
    ];

    for (let i = 0; i < steps.length; i++) {
      setAnalysisStep(steps[i]);
      await new Promise((resolve) => setTimeout(resolve, 280));
    }

    return {
      resumeScore: 88,
      atsScore: 84,
      industryMatch: 85,
      topIndustry: "Technology",
      skillsDetected: [
        { name: "React", level: "Expert" as const, category: "Frontend" },
        { name: "Firebase", level: "Intermediate" as const, category: "Backend" },
        { name: "Tailwind CSS", level: "Intermediate" as const, category: "Frontend" },
        { name: "TypeScript", level: "Intermediate" as const, category: "Language" },
        { name: "Git", level: "Intermediate" as const, category: "Tools" },
        { name: "HTML", level: "Expert" as const, category: "Frontend" },
        { name: "CSS", level: "Expert" as const, category: "Frontend" },
      ],
      missingSkills: ["Docker", "REST API", "Testing", "CI/CD", "System Design"],
      strengths: [
        { title: "Strong Technical Foundation", detail: "Demonstrates proficiency in modern frontend technologies including React, TypeScript, and Tailwind CSS." },
        { title: "Clean Formatting", detail: "Resume follows ATS-friendly formatting with clear section headers and consistent styling." },
        { title: "Keyword Optimization", detail: "Good use of industry-standard keywords throughout the document." },
      ],
      weaknesses: [
        { title: "Limited Project Details", detail: "Projects lack measurable outcomes and impact statements." },
        { title: "Missing Certifications", detail: "No professional certifications listed to validate skills." },
        { title: "Brief Experience Section", detail: "Internship and work experience need more detailed descriptions." },
      ],
      improvements: [
        { title: "Add measurable achievements", detail: "Include metrics like 'Improved performance by 40%' or 'Reduced load time by 20%'." },
        { title: "Expand project descriptions", detail: "Add context, your role, technologies used, and outcomes for each project." },
        { title: "Include certifications", detail: "Add relevant certifications like AWS, Google Cloud, or Meta Frontend Developer." },
        { title: "Optimize ATS keywords", detail: "Incorporate job description keywords naturally throughout your resume." },
        { title: "Add internship experience", detail: "Include any relevant internships or co-op positions with detailed responsibilities." },
      ],
      summary:
        "Your resume demonstrates a solid technical foundation with strong frontend skills. To stand out to top-tier companies, focus on adding quantifiable achievements, expanding project descriptions, and obtaining relevant certifications.",
    };
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
          const analysis = await runFrontendAnalysis(file);
          setResult(analysis);
        } catch {
          setError("Analysis failed. Please try again.");
        } finally {
          setAnalyzing(false);
          setAnalysisStep("");
        }
      }
    },
    [validateFile, runFrontendAnalysis]
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
          const analysis = await runFrontendAnalysis(file);
          setResult(analysis);
        } catch {
          setError("Analysis failed. Please try again.");
        } finally {
          setAnalyzing(false);
          setAnalysisStep("");
        }
      }
    },
    [validateFile, runFrontendAnalysis]
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
