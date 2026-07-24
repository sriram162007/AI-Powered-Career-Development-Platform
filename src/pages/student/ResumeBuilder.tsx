"use client";

import { useState, useEffect, useRef } from "react";
import {
  FileText,
  Download,
  Eye,
  Mail,
  Phone,
  MapPin,
  Link2,
  GraduationCap,
  Briefcase,
  Award,
  Code2,
  Globe,
  Target,
  CheckCircle2,
  RefreshCw,
} from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import {
  getOrCreateProfile,
  subscribeToProfile,
  saveResume,
  getResume,
} from "@/lib/firestore";
import { useAuth } from "@/contexts/AuthContext";
import type { ResumeData, ResumeTemplate } from "@/types/profile";

const templates: { key: ResumeTemplate; label: string; description: string }[] = [
  { key: "modern", label: "Modern", description: "Clean, professional layout with accent colors" },
  { key: "classic", label: "Classic", description: "Traditional format suitable for all industries" },
  { key: "minimal", label: "Minimal", description: "Simple, elegant design with focus on content" },
  { key: "creative", label: "Creative", description: "Bold layout for design and creative roles" },
];

export default function AIResumeBuilder() {
  const { user } = useAuth();
  const [resume, setResume] = useState<ResumeData | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<ResumeTemplate>("modern");
  const [previewMode, setPreviewMode] = useState(false);
  const [regenerating, setRegenerating] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
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

        const savedResume = await getResume(user.uid);
        if (!mountedRef.current) return;

        if (savedResume) {
          setResume(savedResume);
          setSelectedTemplate(savedResume.template || "modern");
        } else {
          setResume({
            careerObjective: "",
            contact: profile.personalInfo,
            education: profile.academicInfo,
            skills: profile.skills,
            projects: profile.projects,
            experience: profile.internships,
            internships: profile.internships,
            certificates: profile.certificates,
            achievements: profile.achievements,
            languages: profile.languages,
            template: "modern",
            lastUpdated: new Date().toISOString().split("T")[0],
          });
        }
      } catch (error) {
        console.error("Failed to initialize resume:", error);
      } finally {
        if (mountedRef.current) {
          setInitialLoading(false);
        }
      }

      unsubscribe = subscribeToProfile(user.uid, (profile) => {
        if (!mountedRef.current || !profile) return;
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
  }, [user?.uid]);

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
      await saveResume(user.uid, newResume);
    } catch (error) {
      console.error("Failed to regenerate resume:", error);
    } finally {
      setRegenerating(false);
    }
  };

  const downloadPDF = () => {
    window.print();
  };

  const downloadDOCX = () => {
    alert("DOCX export would be implemented with a library like docx.js in production.");
  };

  const updateResumeField = (field: keyof ResumeData, value: any) => {
    if (!resume) return;
    setResume({ ...resume, [field]: value });
  };

  if (initialLoading || !resume) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="h-12 w-12 rounded-full border-4 border-navy-200 border-t-orange-500 animate-spin mx-auto mb-4" />
          <p className="text-sm text-navy-400">Loading resume data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">AI Resume Builder</h1>
          <p className="text-sm text-navy-400 mt-1">Generate a professional resume from your profile</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={regenerateResume} loading={regenerating} leftIcon={<RefreshCw size={14} />}>
            Regenerate
          </Button>
          <Button variant="outline" size="sm" onClick={() => setPreviewMode(!previewMode)} leftIcon={<Eye size={14} />}>
            {previewMode ? "Edit" : "Preview"}
          </Button>
          <Button variant="primary" size="sm" onClick={downloadPDF} leftIcon={<Download size={14} />}>
            Download PDF
          </Button>
          <Button variant="outline" size="sm" onClick={downloadDOCX} leftIcon={<FileText size={14} />}>
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
                  onClick={() => { setSelectedTemplate(template.key); updateResumeField("template", template.key); }}
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

          <Card padding="md">
            <h3 className="text-base font-semibold text-navy-900 mb-3">Resume Score</h3>
            <div className="flex items-center justify-center">
              <div className="relative h-32 w-32">
                <svg className="h-32 w-32 -rotate-90" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="54" fill="none" stroke="#e2e8f0" strokeWidth="8" />
                  <circle cx="60" cy="60" r="54" fill="none" stroke="url(#resumeGradient)" strokeWidth="8" strokeDasharray={`${2 * Math.PI * 54 * 0.85} ${2 * Math.PI * 54}`} strokeLinecap="round" />
                  <defs>
                    <linearGradient id="resumeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ff6b35" />
                      <stop offset="100%" stopColor="#f5b942" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-navy-900">85</span>
                  <span className="text-xs text-navy-400">/ 100</span>
                </div>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              {[
                { label: "ATS Compatibility", score: 90 },
                { label: "Content Quality", score: 85 },
                { label: "Formatting", score: 80 },
              ].map((metric) => (
                <div key={metric.label}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-navy-500">{metric.label}</span>
                    <span className="text-xs font-medium text-navy-700">{metric.score}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${metric.score}%`, background: "linear-gradient(135deg, #ff6b35 0%, #f5b942 100%)" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card padding="md">
            <h3 className="text-base font-semibold text-navy-900 mb-3">Sections</h3>
            <div className="space-y-2">
              {["Career Objective", "Education", "Skills", "Projects", "Experience", "Internships", "Certificates", "Achievements", "Languages", "Contact"].map((section) => (
                <div key={section} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <span className="text-xs font-medium text-navy-700">{section}</span>
                  <CheckCircle2 size={14} className="text-green-500" />
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <div
            className={`rounded-2xl border p-8 ${previewMode ? "bg-white" : "bg-navy-50/50"}`}
            style={{ borderColor: "var(--border, #e2e8f0)", minHeight: "800px" }}
          >
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8 pb-6 border-b" style={{ borderColor: "var(--border, #e2e8f0)" }}>
                <h1 className="text-3xl font-bold text-navy-900 mb-2">{resume.contact.fullName || "Your Name"}</h1>
                <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-navy-500">
                  {resume.contact.email && <span className="flex items-center gap-1"><Mail size={14} />{resume.contact.email}</span>}
                  {resume.contact.phone && <span className="flex items-center gap-1"><Phone size={14} />{resume.contact.phone}</span>}
                  {resume.contact.location && <span className="flex items-center gap-1"><MapPin size={14} />{resume.contact.location}</span>}
                  {resume.contact.linkedin && <span className="flex items-center gap-1"><Link2 size={14} />LinkedIn</span>}
                  {resume.contact.github && <span className="flex items-center gap-1"><Link2 size={14} />GitHub</span>}
                  {resume.contact.portfolio && <span className="flex items-center gap-1"><Globe size={14} />Portfolio</span>}
                </div>
              </div>

              {resume.careerObjective && (
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-navy-900 mb-2 flex items-center gap-2">
                    <Target size={18} className="text-orange-500" />
                    Career Objective
                  </h2>
                  <p className="text-sm text-navy-600 leading-relaxed">{resume.careerObjective}</p>
                </div>
              )}

              <div className="mb-6">
                <h2 className="text-lg font-semibold text-navy-900 mb-2 flex items-center gap-2">
                  <GraduationCap size={18} className="text-orange-500" />
                  Education
                </h2>
                <div className="pl-6 border-l-2 border-orange-200">
                  <p className="text-sm font-medium text-navy-900">{resume.education.degree} in {resume.education.department}</p>
                  <p className="text-xs text-navy-500">{resume.education.university}</p>
                  <p className="text-xs text-navy-400">CGPA: {resume.education.cgpa} | Graduation: {resume.education.graduationYear}</p>
                </div>
              </div>

              {resume.skills.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-navy-900 mb-2 flex items-center gap-2">
                    <Code2 size={18} className="text-orange-500" />
                    Skills
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {resume.skills.map((skill) => (
                      <Badge key={skill.id || skill.name} variant="outline" size="sm">{skill.name}</Badge>
                    ))}
                  </div>
                </div>
              )}

              {resume.projects.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-navy-900 mb-2 flex items-center gap-2">
                    <Briefcase size={18} className="text-orange-500" />
                    Projects
                  </h2>
                  <div className="space-y-3">
                    {resume.projects.map((project) => (
                      <div key={project.id || project.projectName} className="pl-6 border-l-2 border-orange-200">
                        <p className="text-sm font-medium text-navy-900">{project.projectName}</p>
                        <p className="text-xs text-navy-500">{project.description}</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {project.technologies.map((tech) => (
                            <Badge key={tech} variant="outline" size="sm">{tech}</Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {resume.internships.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-navy-900 mb-2 flex items-center gap-2">
                    <Briefcase size={18} className="text-orange-500" />
                    Internships
                  </h2>
                  <div className="space-y-3">
                    {resume.internships.map((internship) => (
                      <div key={internship.id || internship.company} className="pl-6 border-l-2 border-orange-200">
                        <p className="text-sm font-medium text-navy-900">{internship.role} at {internship.company}</p>
                        <p className="text-xs text-navy-400">{internship.duration}</p>
                        <p className="text-xs text-navy-500 mt-1">{internship.supervisorFeedback}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {resume.certificates.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-navy-900 mb-2 flex items-center gap-2">
                    <Award size={18} className="text-orange-500" />
                    Certificates
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {resume.certificates.map((cert) => (
                      <div key={cert.id || cert.certificateName}>
                        <Badge variant="outline" size="sm">{cert.certificateName} - {cert.provider}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {resume.achievements.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-navy-900 mb-2 flex items-center gap-2">
                    <Award size={18} className="text-orange-500" />
                    Achievements
                  </h2>
                  <div className="space-y-2">
                    {resume.achievements.map((achievement) => (
                      <div key={achievement.id || achievement.title} className="flex items-start gap-2">
                        <span className="text-orange-500 mt-1">•</span>
                        <div>
                          <p className="text-sm font-medium text-navy-900">{achievement.title}</p>
                          <p className="text-xs text-navy-500">{achievement.issuer} - {achievement.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {resume.languages.length > 0 && (
                <div>
                  <h2 className="text-lg font-semibold text-navy-900 mb-2 flex items-center gap-2">
                    <Globe size={18} className="text-orange-500" />
                    Languages
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {resume.languages.map((lang) => (
                      <Badge key={lang.id || lang.name} variant="outline" size="sm">{lang.name} ({lang.proficiency})</Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
