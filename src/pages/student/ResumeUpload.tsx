"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  FileText,
  CheckCircle2,
  AlertCircle,
  Target,
  Award,
  Lightbulb,
  Sparkles,
  Eye,
  RefreshCw,
  ArrowRight,
  FileDown,
} from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { useResume } from "@/contexts/ResumeContext";
import { useToast } from "@/contexts/ToastContext";
import { useResumeUpload } from "@/hooks/useResumeUpload";
import { CircularProgress } from "@/components/dashboard/CircularProgress";
import { useNavigate } from "react-router-dom";
import type { AnalysisResult } from "@/hooks/useResumeUpload";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function ResumeUpload() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { uploadedFile, setResumeData, resetResume } = useResume();
  const {
    dragActive,
    error,
    analyzing,
    analysisStep,
    result,
    uploadedFile: hookUploadedFile,
    fileInputRef,
    handleDrag,
    handleDrop,
    handleFileChange,
    reset,
  } = useResumeUpload();

  const [showPreview, setShowPreview] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (result && !analyzing) {
      addToast("Resume analysis completed successfully!", "success");
      setResumeData({
        careerObjective: "Passionate software engineer with expertise in full-stack development and a strong foundation in modern web technologies.",
        education: {
          university: "IIT Bombay",
          degree: "B.Tech",
          department: "Computer Science and Engineering",
          currentYear: "3rd Year",
          cgpa: "8.5",
          graduationYear: "2026",
        },
        skills: [
          { id: "1", name: "React", category: "Technical", level: "Expert", lastUpdated: "2025-06-01", source: "Self Learning" },
          { id: "2", name: "TypeScript", category: "Technical", level: "Advanced", lastUpdated: "2025-05-15", source: "Course" },
          { id: "3", name: "Firebase", category: "Technical", level: "Intermediate", lastUpdated: "2025-04-20", source: "Project" },
          { id: "4", name: "Tailwind CSS", category: "Technical", level: "Advanced", lastUpdated: "2025-05-01", source: "Self Learning" },
          { id: "5", name: "Git", category: "Tools", level: "Advanced", lastUpdated: "2025-03-10", source: "Self Learning" },
        ],
        projects: [
          {
            id: "1",
            projectName: "E-Commerce Platform",
            description: "Built a full-stack e-commerce platform with React, Node.js, and MongoDB.",
            technologies: ["React", "Node.js", "MongoDB"],
            github: "https://github.com/example/ecommerce",
            liveDemo: "https://ecommerce-demo.vercel.app",
            skillsUsed: ["React", "Node.js", "MongoDB"],
            projectDuration: "3 months",
          },
        ],
        experience: [],
        internships: [],
        certificates: [],
        achievements: [],
        languages: [
          { id: "1", name: "English", proficiency: "Fluent" },
          { id: "2", name: "Hindi", proficiency: "Native" },
        ],
        contact: {
          fullName: "Alex Johnson",
          email: "alex.johnson@example.com",
          phone: "+91 98765 43210",
          linkedin: "https://linkedin.com/in/alexjohnson",
          github: "https://github.com/alexjohnson",
          portfolio: "https://alexjohnson.dev",
          location: "Bangalore, India",
        },
        template: "modern",
        lastUpdated: new Date().toISOString().split("T")[0],
      });
    }
  }, [result, analyzing, addToast, setResumeData]);

  const handleContinue = () => {
    addToast("Navigating to Resume Builder...", "info");
    navigate("/resume-builder");
  };

  const handleReplaceResume = () => {
    reset();
    resetResume();
    addToast("Ready to upload a new resume", "info");
  };

  const handlePreview = () => {
    setShowPreview(!showPreview);
  };

  const activeFile = hookUploadedFile || uploadedFile;

  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-navy-200 border-t-orange-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Resume Upload</h1>
          <p className="text-sm text-navy-400 mt-1">Upload your resume and get AI-powered insights</p>
        </div>
        {(analyzing || result) && (
          <Button variant="secondary" size="sm" onClick={handleReplaceResume} leftIcon={<RefreshCw size={14} />}>
            Upload New Resume
          </Button>
        )}
      </motion.div>

      <AnimatePresence mode="wait">
        {!analyzing && !result && (
          <motion.div
            key="upload"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card
              padding="lg"
              className={`relative overflow-hidden border-2 border-dashed transition-all duration-300 ${
                dragActive
                  ? "border-orange-500 bg-orange-50/50 shadow-[0_0_30px_rgba(255,107,53,0.15)]"
                  : "border-gray-200 hover:border-orange-300 hover:shadow-lg"
              }`}
            >
              {dragActive && (
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-orange-400/5" />
                </motion.div>
              )}
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className="flex flex-col items-center justify-center py-16 text-center relative z-10"
              >
                <motion.div
                  className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-100 to-orange-50"
                  animate={dragActive ? { scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] } : { scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Upload size={32} className={dragActive ? "text-orange-600" : "text-gray-500"} />
                </motion.div>
                <h3 className="text-xl font-semibold text-navy-900 mb-2">Drop your resume here</h3>
                <p className="mt-2 max-w-md text-sm text-navy-400">
                  Drag and drop your PDF or DOCX file here, or click to browse from your device.
                </p>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 flex items-center gap-2 text-sm text-red-600 bg-red-50 px-4 py-2 rounded-lg"
                  >
                    <AlertCircle size={16} />
                    {error}
                  </motion.div>
                )}
                <div className="mt-8 flex items-center gap-4">
                  <label htmlFor="file-upload-resume">
                    <Button size="md" leftIcon={<FileText size={16} />}>
                      Browse Files
                    </Button>
                  </label>
                  <input
                    ref={fileInputRef}
                    id="file-upload-resume"
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

        {analyzing && (
          <motion.div
            key="analyzing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card padding="lg" className="flex flex-col items-center justify-center py-20 relative overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-orange-400/5"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="relative z-10 mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-orange-100 to-orange-50"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <FileText size={40} className="text-orange-600" />
                </motion.div>
              </motion.div>
              <motion.h3
                className="text-xl font-semibold text-navy-900 relative z-10"
                key={analysisStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {analysisStep || "Analyzing your resume..."}
              </motion.h3>
              <p className="mt-2 text-sm text-navy-400 relative z-10">
                {activeFile?.name || "Uploading and parsing document..."}
              </p>
              <div className="mt-8 w-80 h-3 overflow-hidden rounded-full bg-gray-100 relative z-10">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-orange-500 to-orange-400"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2.2, ease: "easeInOut" }}
                />
              </div>
              <motion.div
                className="mt-4 flex gap-2 relative z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="h-2 w-2 rounded-full bg-orange-500"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
                  />
                ))}
              </motion.div>
            </Card>
          </motion.div>
        )}

        {result && !analyzing && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            {activeFile && (
              <motion.div variants={item}>
                <Card padding="md" className="bg-gradient-to-br from-orange-50/80 to-white border border-orange-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-400 flex items-center justify-center text-white">
                        <FileText size={24} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-navy-900">{activeFile.name}</p>
                        <p className="text-xs text-navy-400">
                          {(activeFile.size / 1024).toFixed(1)} KB • {activeFile.type || "application/octet-stream"} • Uploaded {activeFile.uploadedAt}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="success" size="sm">
                        <CheckCircle2 size={12} className="mr-1" />
                        Uploaded
                      </Badge>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}

            <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6" variants={container} initial="hidden" animate="show">
              <motion.div variants={item}>
                <Card padding="md" className="flex flex-col items-center hover:shadow-lg transition-shadow">
                  <CircularProgress value={result.resumeScore} label="Resume Score" sublabel="Overall quality" trend="+4%" />
                </Card>
              </motion.div>
              <motion.div variants={item}>
                <Card padding="md" className="flex flex-col items-center hover:shadow-lg transition-shadow">
                  <CircularProgress value={result.atsScore} label="ATS Score" sublabel="Applicant Tracking" trend="+3%" />
                </Card>
              </motion.div>
              <motion.div variants={item}>
                <Card padding="md" className="flex flex-col items-center hover:shadow-lg transition-shadow">
                  <CircularProgress value={result.industryMatch} label="Industry Match" sublabel={result.topIndustry} trend="+7%" />
                </Card>
              </motion.div>
              <motion.div variants={item}>
                <Card padding="md" className="flex flex-col items-center hover:shadow-lg transition-shadow">
                  <div className="flex flex-col items-center">
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-orange-100 to-orange-50 text-orange-600">
                      <Target size={24} />
                    </div>
                    <div className="text-3xl font-bold text-navy-900">{result.skillsDetected.length}</div>
                    <div className="text-xs text-navy-400 mt-1">Skills Detected</div>
                  </div>
                </Card>
              </motion.div>
            </motion.div>

            <motion.div variants={item}>
              <Card padding="md" className="hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-8 w-8 rounded-lg bg-green-100 flex items-center justify-center text-green-600">
                    <CheckCircle2 size={18} />
                  </div>
                  <h3 className="text-base font-semibold text-navy-900">Skills Detected</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {result.skillsDetected.map((skill: AnalysisResult["skillsDetected"][number]) => (
                    <Badge
                      key={skill.name}
                      variant={skill.level === "Expert" ? "success" : skill.level === "Intermediate" ? "warning" : "info"}
                      size="md"
                    >
                      {skill.name}
                      <span className="ml-1.5 opacity-75">({skill.level})</span>
                    </Badge>
                  ))}
                </div>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card padding="md" className="hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-8 w-8 rounded-lg bg-red-100 flex items-center justify-center text-red-600">
                    <AlertCircle size={18} />
                  </div>
                  <h3 className="text-base font-semibold text-navy-900">Missing Skills</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {result.missingSkills.map((skill: string) => (
                    <Badge key={skill} variant="danger" size="md">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Card>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              <motion.div variants={item}>
                <Card padding="md" className="hover:shadow-lg transition-shadow h-full">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-8 w-8 rounded-lg bg-green-100 flex items-center justify-center text-green-600">
                      <Award size={18} />
                    </div>
                    <h3 className="text-base font-semibold text-navy-900">Strengths</h3>
                  </div>
                  <ul className="space-y-3">
                    {result.strengths.map((item: AnalysisResult["strengths"][number], idx: number) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-100">
                          <CheckCircle2 size={14} className="text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-navy-800">{item.title}</p>
                          <p className="text-xs text-navy-400 mt-0.5 leading-relaxed">{item.detail}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>

              <motion.div variants={item}>
                <Card padding="md" className="hover:shadow-lg transition-shadow h-full">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-8 w-8 rounded-lg bg-red-100 flex items-center justify-center text-red-600">
                      <AlertCircle size={18} />
                    </div>
                    <h3 className="text-base font-semibold text-navy-900">Weaknesses</h3>
                  </div>
                  <ul className="space-y-3">
                    {result.weaknesses.map((item: AnalysisResult["weaknesses"][number], idx: number) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100">
                          <AlertCircle size={14} className="text-red-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-navy-800">{item.title}</p>
                          <p className="text-xs text-navy-400 mt-0.5 leading-relaxed">{item.detail}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>

              <motion.div variants={item}>
                <Card padding="md" className="hover:shadow-lg transition-shadow h-full">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-8 w-8 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600">
                      <Lightbulb size={18} />
                    </div>
                    <h3 className="text-base font-semibold text-navy-900">Improvements</h3>
                  </div>
                  <ul className="space-y-3">
                    {result.improvements.map((item: AnalysisResult["improvements"][number], idx: number) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-100">
                          <Lightbulb size={14} className="text-orange-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-navy-800">{item.title}</p>
                          <p className="text-xs text-navy-400 mt-0.5 leading-relaxed">{item.detail}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            </div>

            <motion.div variants={item}>
              <Card padding="md" className="hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-100 to-orange-50 text-orange-600">
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-navy-900">AI Summary</h3>
                    <p className="mt-1 text-sm text-navy-500 leading-relaxed">{result.summary}</p>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card padding="md" className="bg-gradient-to-br from-navy-900 to-navy-800 text-white border-0">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Ready to build your resume?</h3>
                    <p className="text-sm text-navy-200">Create a professional, ATS-optimized resume from your profile.</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button variant="ghost" size="md" onClick={handlePreview} leftIcon={<Eye size={16} />}>
                      {showPreview ? "Hide Preview" : "Preview"}
                    </Button>
                    <Button variant="secondary" size="md" onClick={handleReplaceResume} leftIcon={<RefreshCw size={16} />}>
                      Replace Resume
                    </Button>
                    <Button variant="primary" size="md" onClick={handleContinue} rightIcon={<ArrowRight size={16} />}>
                      Continue
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>

            <AnimatePresence>
              {showPreview && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Card padding="lg" className="border-2 border-dashed border-gray-200">
                    <div className="max-w-2xl mx-auto">
                      <div className="text-center mb-8 pb-6 border-b border-gray-100">
                        <h1 className="text-3xl font-bold text-navy-900 mb-2">Alex Johnson</h1>
                        <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-navy-500">
                          <span className="flex items-center gap-1"><Eye size={14} /> Preview</span>
                          <span className="flex items-center gap-1"><FileDown size={14} /> PDF Ready</span>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <h2 className="text-lg font-semibold text-navy-900 mb-2">Education</h2>
                          <p className="text-sm text-navy-600">B.Tech in Computer Science and Engineering from IIT Bombay</p>
                          <p className="text-xs text-navy-400">CGPA: 8.5 | Graduation: 2026</p>
                        </div>
                        <div>
                          <h2 className="text-lg font-semibold text-navy-900 mb-2">Skills</h2>
                          <div className="flex flex-wrap gap-2">
                            {result.skillsDetected.slice(0, 5).map((skill: AnalysisResult["skillsDetected"][number]) => (
                              <Badge key={skill.name} variant="outline" size="sm">{skill.name}</Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h2 className="text-lg font-semibold text-navy-900 mb-2">Missing Skills to Add</h2>
                          <div className="flex flex-wrap gap-2">
                            {result.missingSkills.slice(0, 3).map((skill: string) => (
                              <Badge key={skill} variant="outline" size="sm">{skill}</Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h2 className="text-lg font-semibold text-navy-900 mb-2">Key Improvements</h2>
                          <ul className="space-y-1">
                            {result.improvements.slice(0, 3).map((imp: AnalysisResult["improvements"][number], idx: number) => (
                              <li key={idx} className="text-sm text-navy-600 flex items-start gap-2">
                                <span className="text-orange-500 mt-1">•</span>
                                {imp.title}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
