"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, CheckCircle2, AlertCircle, Lightbulb, Target, TrendingUp, Award } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { CircularProgress } from "@/components/dashboard/CircularProgress";

type AnalysisState = "idle" | "analyzing" | "done" | "error";

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

interface AnalysisResult {
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

export default function ResumeAnalysis() {
  const [state, setState] = useState<AnalysisState>("idle");
  const [fileName, setFileName] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const runAnalysis = async (file: File) => {
    setError(null);
    setState("analyzing");

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
      setResult(data);
      setState("done");
    } catch (err: any) {
      console.error("Resume analysis failed:", err);
      setError(err?.message ?? "Something went wrong while analyzing your resume.");
      setState("error");
    }
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        const file = e.dataTransfer.files[0];
        setFileName(file.name);
        runAnalysis(file);
      }
    },
    []
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFileName(file.name);
      runAnalysis(file);
    }
  };

  const reset = () => {
    setState("idle");
    setFileName(null);
    setResult(null);
    setError(null);
  };

  const getLevelColor = (level: string) => {
    if (level === "Expert") return "success";
    if (level === "Intermediate") return "warning";
    return "info";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Resume Analysis</h1>
          <p className="text-sm text-navy-400 mt-1">
            Upload your resume and get AI-powered insights to improve your chances.
          </p>
        </div>
        {(state === "done" || state === "error") && (
          <Button variant="secondary" size="sm" onClick={reset}>
            Upload New Resume
          </Button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {(state === "idle" || state === "error") && (
          <motion.div
            key="upload"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card
              padding="lg"
              className={`border-2 border-dashed transition-colors ${
                dragActive ? "border-orange-500 bg-orange-50/50" : "border-gray-200"
              }`}
            >
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <div
                  className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl"
                  style={{
                    background: dragActive
                      ? "linear-gradient(135deg, #ff6b35 0%, #f5b942 100%)"
                      : "#f1f5f9",
                  }}
                >
                  <Upload
                    size={28}
                    className={dragActive ? "text-white" : "text-orange-600"}
                  />
                </div>
                <h3 className="text-lg font-semibold text-navy-900">
                  Drop your resume here
                </h3>
                <p className="mt-2 max-w-sm text-sm text-navy-400">
                  Drag and drop your PDF or DOCX file here, or click to browse from
                  your device.
                </p>
                {error && (
                  <p className="mt-3 text-xs text-red-500 max-w-sm">{error}</p>
                )}
                <div className="mt-6 flex items-center gap-3">
                  <label htmlFor="file-upload">
                    <Button size="md" leftIcon={<FileText size={16} />}>
                      Browse Files
                    </Button>
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    accept=".pdf,.docx"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <span className="text-xs text-navy-400">PDF or DOCX (max 5MB)</span>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {state === "analyzing" && (
          <motion.div
            key="analyzing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card padding="lg" className="flex flex-col items-center justify-center py-20">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="mb-6"
              >
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-2xl"
                  style={{
                    background: "linear-gradient(135deg, #ff6b35 0%, #f5b942 100%)",
                  }}
                >
                  <FileText size={28} className="text-white" />
                </div>
              </motion.div>
              <h3 className="text-lg font-semibold text-navy-900">
                Analyzing your resume...
              </h3>
              <p className="mt-2 text-sm text-navy-400">
                {fileName || "Uploading and parsing document..."}
              </p>
              <div className="mt-6 h-2 w-64 overflow-hidden rounded-full bg-gray-100">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: "linear-gradient(90deg, #ff6b35 0%, #f5b942 100%)",
                  }}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 3, ease: "easeInOut" }}
                />
              </div>
            </Card>
          </motion.div>
        )}

        {state === "done" && result && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <Card padding="md" className="flex flex-col items-center">
                <CircularProgress value={result.resumeScore} label="Resume Score" sublabel="Overall quality" trend="+4%" />
              </Card>
              <Card padding="md" className="flex flex-col items-center">
                <CircularProgress value={result.atsScore} label="ATS Score" sublabel="Applicant Tracking" trend="+3%" />
              </Card>
              <Card padding="md" className="flex flex-col items-center">
                <CircularProgress value={result.industryMatch} label="Industry Match" sublabel={result.topIndustry} trend="+7%" />
              </Card>
              <Card padding="md" className="flex flex-col items-center">
                <div className="flex flex-col items-center">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-orange-100">
                    <Target size={20} className="text-orange-600" />
                  </div>
                  <div className="text-3xl font-bold text-navy-900">
                    {result.skillsDetected.length}
                  </div>
                  <div className="text-xs text-navy-400 mt-1">Skills Detected</div>
                </div>
              </Card>
            </div>

            <Card padding="md">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 size={18} className="text-green-600" />
                <h3 className="text-base font-semibold text-navy-900">
                  Skills Detected
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {result.skillsDetected.map((skill) => (
                  <Badge key={skill.name} variant={getLevelColor(skill.level) as any} size="md">
                    {skill.name}
                    <span className="ml-1.5 opacity-75">({skill.level})</span>
                  </Badge>
                ))}
              </div>
            </Card>

            <Card padding="md">
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle size={18} className="text-red-600" />
                <h3 className="text-base font-semibold text-navy-900">
                  Missing Skills
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {result.missingSkills.map((skill) => (
                  <Badge key={skill} variant="danger" size="md">
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              <Card padding="md" className="lg:col-span-1">
                <div className="flex items-center gap-2 mb-4">
                  <Award size={18} className="text-green-600" />
                  <h3 className="text-base font-semibold text-navy-900">
                    Resume Strengths
                  </h3>
                </div>
                <ul className="space-y-4">
                  {result.strengths.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-100">
                        <CheckCircle2 size={14} className="text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-navy-800">{item.title}</p>
                        <p className="text-xs text-navy-400 mt-0.5 leading-relaxed">
                          {item.detail}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card padding="md" className="lg:col-span-1">
                <div className="flex items-center gap-2 mb-4">
                  <AlertCircle size={18} className="text-red-600" />
                  <h3 className="text-base font-semibold text-navy-900">
                    Resume Weaknesses
                  </h3>
                </div>
                <ul className="space-y-4">
                  {result.weaknesses.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100">
                        <AlertCircle size={14} className="text-red-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-navy-800">{item.title}</p>
                        <p className="text-xs text-navy-400 mt-0.5 leading-relaxed">
                          {item.detail}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card padding="md" className="lg:col-span-1">
                <div className="flex items-center gap-2 mb-4">
                  <Lightbulb size={18} className="text-orange-600" />
                  <h3 className="text-base font-semibold text-navy-900">
                    Suggested Improvements
                  </h3>
                </div>
                <ul className="space-y-4">
                  {result.improvements.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-100">
                        <Lightbulb size={14} className="text-orange-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-navy-800">{item.title}</p>
                        <p className="text-xs text-navy-400 mt-0.5 leading-relaxed">
                          {item.detail}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            <Card padding="md">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500/20 to-orange-600/20">
                  <TrendingUp size={18} className="text-orange-600" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-navy-900">
                    AI Summary
                  </h3>
                  <p className="mt-1 text-sm text-navy-500 leading-relaxed">
                    {result.summary}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
