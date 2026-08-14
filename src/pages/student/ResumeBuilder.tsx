"use client";

import { useState, useEffect, useRef } from "react";
import {
  Eye,
  Download,
  FileText,
  RefreshCw,
  Award,
} from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { CircularProgress } from "@/components/dashboard/CircularProgress";
import { useResume } from "@/contexts/ResumeContext";
import { useAuth } from "@/contexts/AuthContext";
import {
  getOrCreateProfile,
  subscribeToProfile,
  saveResume,
  getResume,
} from "@/lib/firestore";
import { ResumePreview } from "@/components/resume/ResumePreview";
import { ResumeEditPanel } from "@/components/resume/ResumeEditPanel";
import { downloadResumeAsPDF, downloadResumeAsDOCX } from "@/utils/resumeExport";
import { useToast } from "@/contexts/ToastContext";
import type { ResumeData, ResumeTemplate, CareerAnalytics, UserProfile } from "@/types/profile";
import { emptyCareerAnalytics, emptyResumeData } from "@/types/profile";

const templates: { key: ResumeTemplate; label: string; description: string }[] = [
  { key: "modern", label: "Modern", description: "Clean professional layout with orange accent sidebar" },
  { key: "classic", label: "Classic", description: "Traditional serif format suitable for all industries" },
  { key: "minimal", label: "Minimal", description: "Simple, elegant design with focus on content and whitespace" },
  { key: "creative", label: "Creative", description: "Bold gradient header with modern two-column layout" },
];

function ResumeCompletenessScore({ resume }: { resume: ResumeData }) {
  const score = calculateCompleteness(resume);
  return (
    <Card padding="md" className="flex flex-col items-center">
      <CircularProgress value={score} label="Completeness" sublabel={`${score}% complete`} />
    </Card>
  );
}

function calculateCompleteness(resume: ResumeData): number {
  const fields: { weight: number; hasValue: boolean }[] = [
    { weight: 20, hasValue: !!resume.contact.fullName },
    { weight: 15, hasValue: !!resume.contact.email },
    { weight: 10, hasValue: !!resume.contact.phone },
    { weight: 10, hasValue: !!resume.education.university },
    { weight: 10, hasValue: !!resume.careerObjective },
    { weight: 10, hasValue: resume.skills.length > 0 },
    { weight: 10, hasValue: resume.projects.length > 0 },
    { weight: 10, hasValue: resume.internships.length > 0 },
    { weight: 5, hasValue: resume.certificates.length > 0 },
  ];

  const total = fields.reduce((sum, f) => sum + f.weight, 0);
  const completed = fields.filter((f) => f.hasValue).reduce((sum, f) => sum + f.weight, 0);
  return Math.round((completed / total) * 100);
}

export default function AIResumeBuilder() {
  const { user } = useAuth();
  const { addToast } = useToast();
  const { resumeData: contextResumeData, setResumeData: setContextResumeData } = useResume();
  const [resume, setResume] = useState<ResumeData | null>(null);
  const [careerAnalytics, setCareerAnalytics] = useState<CareerAnalytics>(emptyCareerAnalytics);
  const [selectedTemplate, setSelectedTemplate] = useState<ResumeTemplate>("modern");
  const [previewMode, setPreviewMode] = useState(false);
  const [regenerating, setRegenerating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [exportLoading, setExportLoading] = useState<"pdf" | "docx" | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (!user?.uid) return;

    let unsubscribe: (() => void) | null = null;

    const init = async () => {
      try {
        const profile = await getOrCreateProfile(user.uid, user?.email ?? undefined);
        if (!mountedRef.current) return;
        setCareerAnalytics(profile.analytics || emptyCareerAnalytics);

        const savedResume = await getResume(user.uid);
        if (!mountedRef.current) return;

        if (savedResume) {
          const resumeData: ResumeData = {
            ...savedResume,
            contact: savedResume.contact || profile.personalInfo,
            education: savedResume.education || profile.academicInfo,
            skills: savedResume.skills || profile.skills,
            projects: savedResume.projects || profile.projects,
            experience: savedResume.experience || profile.internships,
            internships: savedResume.internships || profile.internships,
            certificates: savedResume.certificates || profile.certificates,
            achievements: savedResume.achievements || profile.achievements,
            languages: savedResume.languages || profile.languages,
            template: savedResume.template || "modern",
          };
          setResume(resumeData);
          setSelectedTemplate(savedResume.template || "modern");
          setContextResumeData(resumeData);
        } else {
          const resumeData: ResumeData = {
            ...emptyResumeData,
            contact: profile.personalInfo,
            education: profile.academicInfo,
            skills: profile.skills,
            projects: profile.projects,
            experience: profile.internships,
            internships: profile.internships,
            certificates: profile.certificates,
            achievements: profile.achievements,
            languages: profile.languages,
            template: "modern" as ResumeTemplate,
          };
          setResume(resumeData);
          setContextResumeData(resumeData);
        }
      } catch (error) {
        console.error("Failed to initialize resume:", error);
        addToast("Failed to load resume data. Please try again.", "error");
      } finally {
        if (mountedRef.current) {
          setInitialLoading(false);
        }
      }

      unsubscribe = subscribeToProfile(user.uid, (profile: UserProfile | null) => {
        if (!mountedRef.current || !profile) return;
        setCareerAnalytics(profile.analytics || emptyCareerAnalytics);
        setResume((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            contact: profile.personalInfo,
            education: profile.academicInfo,
            skills: profile.skills,
            projects: profile.projects,
            experience: profile.internships,
            internships: profile.internships,
            certificates: profile.certificates,
            achievements: profile.achievements,
            languages: profile.languages,
          };
        });
      });
    };

    init();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [user?.uid, user?.email]);

  useEffect(() => {
    if (!contextResumeData || !resume) return;
    const hasChanged =
      contextResumeData.contact?.fullName !== resume.contact?.fullName ||
      contextResumeData.skills?.length !== resume.skills?.length ||
      contextResumeData.projects?.length !== resume.projects?.length;
    if (hasChanged) {
      setResume(contextResumeData);
    }
  }, [contextResumeData, resume]);

  const updateResume = (newResume: ResumeData) => {
    setResume(newResume);
    setContextResumeData(newResume);
  };

  const handleSave = async () => {
    if (!user?.uid || !resume) return;
    setSaving(true);
    try {
      const toSave = { ...resume, template: selectedTemplate };
      await saveResume(user.uid, toSave);
      setResume(toSave);
      setContextResumeData(toSave);
      addToast("Resume saved successfully", "success");
    } catch (error) {
      console.error("Failed to save resume:", error);
      addToast("Failed to save resume. Please try again.", "error");
    } finally {
      setSaving(false);
    }
  };

  const regenerateResume = async () => {
    if (!user?.uid || !resume) return;
    setRegenerating(true);
    try {
      const profile = await getOrCreateProfile(user.uid, user?.email ?? undefined);
      const newResume: ResumeData = {
        ...resume,
        careerObjective: resume.careerObjective || "",
        contact: profile.personalInfo,
        education: profile.academicInfo,
        skills: profile.skills,
        projects: profile.projects,
        experience: profile.internships,
        internships: profile.internships,
        certificates: profile.certificates,
        achievements: profile.achievements,
        languages: profile.languages,
        template: selectedTemplate,
        lastUpdated: new Date().toISOString().split("T")[0],
      };
      setResume(newResume);
      setContextResumeData(newResume);
      await saveResume(user.uid, { ...newResume, template: selectedTemplate });
      addToast("Resume regenerated from your latest profile data", "success");
    } catch (error) {
      console.error("Failed to regenerate resume:", error);
      addToast("Failed to regenerate resume. Please try again.", "error");
    } finally {
      setRegenerating(false);
    }
  };

  const handleExportPDF = async () => {
    if (!resume) return;
    setExportLoading("pdf");
    try {
      await downloadResumeAsPDF("resume-preview-content", resume.contact.fullName || "resume");
      addToast("PDF downloaded successfully", "success");
    } catch (error) {
      console.error("PDF export error:", error);
      addToast("Failed to export PDF. Please try again.", "error");
    } finally {
      setExportLoading(null);
    }
  };

  const handleExportDOCX = async () => {
    if (!resume) return;
    setExportLoading("docx");
    try {
      await downloadResumeAsDOCX(resume, resume.contact.fullName || "resume");
      addToast("DOCX downloaded successfully", "success");
    } catch (error) {
      console.error("DOCX export error:", error);
      addToast("Failed to export DOCX. Please try again.", "error");
    } finally {
      setExportLoading(null);
    }
  };

  const handleTemplateChange = (template: ResumeTemplate) => {
    setSelectedTemplate(template);
    if (resume) {
      updateResume({ ...resume, template });
    }
  };

  if (initialLoading || !resume) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="h-12 w-12 rounded-full border-4 border-navy-200 border-t-orange-500 animate-spin mx-auto mb-4" />
          <p className="text-sm text-navy-400">Loading resume builder...</p>
        </div>
      </div>
    );
  }

  const completenessScore = calculateCompleteness(resume);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">AI Resume Builder</h1>
          <p className="text-sm text-navy-400 mt-1">Generate a professional resume from your profile</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<RefreshCw size={14} />}
            onClick={regenerateResume}
            loading={regenerating}
          >
            Regenerate
          </Button>
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Eye size={14} />}
            onClick={() => setPreviewMode(!previewMode)}
          >
            {previewMode ? "Edit" : "Preview"}
          </Button>
          <Button
            variant="primary"
            size="sm"
            leftIcon={<Download size={14} />}
            onClick={handleExportPDF}
            loading={exportLoading === "pdf"}
          >
            Download PDF
          </Button>
          <Button
            variant="outline"
            size="sm"
            leftIcon={<FileText size={14} />}
            onClick={handleExportDOCX}
            loading={exportLoading === "docx"}
          >
            DOCX
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="lg:col-span-1 space-y-4">
          <Card padding="md">
            <h3 className="text-base font-semibold text-navy-900 mb-3">Template</h3>
            <div className="space-y-2">
              {templates.map((template) => (
                <button
                  key={template.key}
                  onClick={() => handleTemplateChange(template.key)}
                  className={`w-full p-3 rounded-xl border text-left transition-all ${
                    selectedTemplate === template.key
                      ? "border-orange-400 bg-orange-50/50"
                      : "border-gray-100 hover:border-gray-200"
                  }`}
                >
                  <p className="text-sm font-medium text-navy-900">{template.label}</p>
                  <p className="text-xs text-navy-400 mt-0.5">{template.description}</p>
                </button>
              ))}
            </div>
          </Card>

          <ResumeCompletenessScore resume={resume} />

          <Card padding="md">
            <h3 className="text-base font-semibold text-navy-900 mb-3">Resume Analytics</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-navy-500">Resume Score</span>
                <span className="text-sm font-medium text-navy-900">{careerAnalytics.resumeScore || 0}/100</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-navy-500">ATS Compatibility</span>
                <span className="text-sm font-medium text-navy-900">{careerAnalytics.atsScore || 0}/100</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-navy-500">Profile Completeness</span>
                <span className="text-sm font-medium text-navy-900">{completenessScore}%</span>
              </div>
            </div>
            {careerAnalytics.resumeScore === 0 && (
              <p className="text-xs text-navy-400 mt-3">
                Upload your resume for AI analysis to get detailed scores.
              </p>
            )}
          </Card>

          <Card padding="md">
            <h3 className="text-base font-semibold text-navy-900 mb-3">Sections</h3>
            <div className="space-y-2">
              {[
                { label: "Contact Info", has: !!(resume.contact.fullName || resume.contact.email), icon: <Award size={12} /> },
                { label: "Professional Summary", has: !!resume.careerObjective, icon: <FileText size={12} /> },
                { label: "Education", has: !!resume.education.university, icon: <Award size={12} /> },
                { label: "Skills", has: resume.skills.length > 0, count: resume.skills.length },
                { label: "Projects", has: resume.projects.length > 0, count: resume.projects.length },
                { label: "Experience", has: resume.internships.length > 0, count: resume.internships.length },
                { label: "Certificates", has: resume.certificates.length > 0, count: resume.certificates.length },
                { label: "Achievements", has: resume.achievements.length > 0, count: resume.achievements.length },
                { label: "Languages", has: resume.languages.length > 0, count: resume.languages.length },
              ].map((section) => (
                <div key={section.label} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <span className="text-xs font-medium text-navy-700">{section.label}</span>
                  {section.has ? (
                    <Badge variant="success" size="sm">
                      {section.count !== undefined ? section.count : "Complete"}
                    </Badge>
                  ) : (
                    <Badge variant="outline" size="sm">
                      Empty
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="lg:col-span-3">
          {previewMode ? (
            <Card padding="lg" className="h-[700px] overflow-auto">
              <ResumePreview resume={resume} />
            </Card>
          ) : (
            <ResumeEditPanel
              resume={resume}
              onChange={updateResume}
              onSave={handleSave}
              saving={saving}
            />
          )}
        </div>
      </div>
    </div>
  );
}
