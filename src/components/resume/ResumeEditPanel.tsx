import { Plus, Trash2, Sparkles, Save } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useResumeImprove } from "@/hooks/useResumeImprove";
import { useToast } from "@/contexts/ToastContext";
import type { ResumeData, SkillLevel } from "@/types/profile";
import { emptySkill, emptyProject, emptyInternship, emptyCertificate, emptyAchievement } from "@/types/profile";
import { useSubscription } from "@/hooks/useSubscription";
import { useNavigate } from "react-router-dom";

interface ResumeEditPanelProps {
  resume: ResumeData;
  onChange: (resume: ResumeData) => void;
  onSave: () => void;
  saving: boolean;
}

export function ResumeEditPanel({ resume, onChange, onSave, saving }: ResumeEditPanelProps) {
  const { improveContent, improving, improveError } = useResumeImprove();
  const { addToast } = useToast();
  const { canUse, checkUsageLimit } = useSubscription();
  const navigate = useNavigate();

  const canUseAiImprovement = canUse("ai_resume_improvement");
  const usageCheck = checkUsageLimit("ai_improvements");

  const updateField = (field: keyof ResumeData, value: any) => {
    onChange({ ...resume, [field]: value });
  };

  const handleImprove = async (text: string, type: "summary" | "project" | "experience" | "achievement") => {
    if (!canUseAiImprovement) {
      navigate("/pricing");
      return;
    }

    if (!usageCheck.allowed && usageCheck.remaining !== null) {
      addToast("You've reached your AI improvement limit. Upgrade for more.", "warning");
      return;
    }

    if (!text.trim()) {
      addToast("Nothing to improve - enter some text first", "info");
      return;
    }

    const improved = await improveContent(text, type);
    if (improved && improved !== text) {
      addToast("Content improved with AI", "success");
    }
  };

  const renderContactSection = () => {
    const c = resume.contact;
    return (
      <Card padding="md">
        <h3 className="text-sm font-semibold text-navy-900 mb-3">Contact Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            value={c.fullName}
            onChange={(e) => updateField("contact", { ...c, fullName: e.target.value })}
          />
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={c.email}
            onChange={(e) => updateField("contact", { ...c, email: e.target.value })}
          />
          <Input
            label="Phone"
            placeholder="Enter your phone number"
            value={c.phone}
            onChange={(e) => updateField("contact", { ...c, phone: e.target.value })}
          />
          <Input
            label="Location"
            placeholder="City, Country"
            value={c.location}
            onChange={(e) => updateField("contact", { ...c, location: e.target.value })}
          />
          <Input
            label="LinkedIn"
            placeholder="linkedin.com/in/username"
            value={c.linkedin}
            onChange={(e) => updateField("contact", { ...c, linkedin: e.target.value })}
          />
          <Input
            label="GitHub"
            placeholder="github.com/username"
            value={c.github}
            onChange={(e) => updateField("contact", { ...c, github: e.target.value })}
          />
          <Input
            label="Portfolio"
            placeholder="your-portfolio.com"
            value={c.portfolio}
            onChange={(e) => updateField("contact", { ...c, portfolio: e.target.value })}
          />
        </div>
      </Card>
    );
  };

  const renderSummarySection = () => {
    return (
      <Card padding="md">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-navy-900">Professional Summary</h3>
          <Button
            variant="ghost"
            size="sm"
            leftIcon={<Sparkles size={14} />}
            onClick={() => handleImprove(resume.careerObjective, "summary")}
            loading={improving}
          >
            AI Improve
          </Button>
        </div>
        <div>
          <textarea
            value={resume.careerObjective}
            onChange={(e) => updateField("careerObjective", e.target.value)}
            placeholder="Write a brief professional summary highlighting your key strengths, experience, and career goals..."
            className="w-full min-h-[100px] px-3 py-2 rounded-lg border border-navy-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400/50 resize-y"
            style={{ background: "var(--background, #fff)", color: "var(--textPrimary, #0b1020)" }}
          />
        </div>
      </Card>
    );
  };

  const renderEducationSection = () => {
    const e = resume.education;
    return (
      <Card padding="md">
        <h3 className="text-sm font-semibold text-navy-900 mb-3">Education</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="University"
            placeholder="Enter university name"
            value={e.university}
            onChange={(e) => updateField("education", { ...e, university: e.target.value })}
          />
          <Input
            label="Degree"
            placeholder="e.g., Bachelor of Technology"
            value={e.degree}
            onChange={(e) => updateField("education", { ...e, degree: e.target.value })}
          />
          <Input
            label="Department/Branch"
            placeholder="e.g., Computer Science and Engineering"
            value={e.department}
            onChange={(e) => updateField("education", { ...e, department: e.target.value })}
          />
          <Input
            label="Current Year"
            placeholder="e.g., 3rd Year"
            value={e.currentYear}
            onChange={(e) => updateField("education", { ...e, currentYear: e.target.value })}
          />
          <Input
            label="CGPA"
            placeholder="e.g., 8.5"
            value={e.cgpa}
            onChange={(e) => updateField("education", { ...e, cgpa: e.target.value })}
          />
          <Input
            label="Graduation Year"
            placeholder="e.g., 2026"
            value={e.graduationYear}
            onChange={(e) => updateField("education", { ...e, graduationYear: e.target.value })}
          />
        </div>
      </Card>
    );
  };

  const renderSkillsSection = () => {
    return (
      <Card padding="md">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-navy-900">Skills</h3>
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Plus size={14} />}
            onClick={() => {
              const newSkill = { ...emptySkill };
              updateField("skills", [...resume.skills, newSkill]);
            }}
          >
            Add Skill
          </Button>
        </div>
        <div className="space-y-3">
          {resume.skills.map((skill, idx) => (
            <div key={skill.id || `skill-${idx}`} className="flex items-center gap-2">
              <input
                type="text"
                value={skill.name}
                onChange={(e) => {
                  const updated = [...resume.skills];
                  updated[idx] = { ...updated[idx], name: e.target.value };
                  updateField("skills", updated);
                }}
                placeholder="Skill name"
                className="flex-1 px-3 py-2 text-sm rounded-lg border border-navy-200 focus:outline-none focus:ring-2 focus:ring-orange-400/50"
                style={{ background: "var(--background, #fff)" }}
              />
              <select
                value={skill.level}
                onChange={(e) => {
                  const updated = [...resume.skills];
                  updated[idx] = { ...updated[idx], level: e.target.value as SkillLevel };
                  updateField("skills", updated);
                }}
                className="px-2 py-1 text-sm rounded border border-navy-200 focus:outline-none"
                style={{ background: "var(--background, #fff)" }}
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
              </select>
              <select
                value={skill.category}
                onChange={(e) => {
                  const updated = [...resume.skills];
                  updated[idx] = { ...updated[idx], category: e.target.value };
                  updateField("skills", updated);
                }}
                className="px-2 py-1 text-sm rounded border border-navy-200 focus:outline-none"
                style={{ background: "var(--background, #fff)" }}
              >
                <option value="technical">Technical</option>
                <option value="soft">Soft Skills</option>
                <option value="domain">Domain</option>
                <option value="tools">Tools</option>
              </select>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  const updated = resume.skills.filter((_, i) => i !== idx);
                  updateField("skills", updated);
                }}
              >
                <Trash2 size={14} className="text-red-500" />
              </Button>
            </div>
          ))}
        </div>
      </Card>
    );
  };

  const renderProjectsSection = () => {
    return (
      <Card padding="md">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-navy-900">Projects</h3>
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Plus size={14} />}
            onClick={() => updateField("projects", [...resume.projects, { ...emptyProject }])}
          >
            Add Project
          </Button>
        </div>
        {resume.projects.map((project, idx) => (
          <div key={project.id || `project-${idx}`} className="border border-gray-100 rounded-lg p-3 mb-3 last:mb-0">
            <Input
              label="Project Name"
              placeholder="e.g., E-commerce Web App"
              value={project.projectName}
              onChange={(e) => {
                const updated = [...resume.projects];
                updated[idx] = { ...updated[idx], projectName: e.target.value };
                updateField("projects", updated);
              }}
            />
            <div className="mt-3">
              <label className="block text-sm font-medium text-navy-700 mb-1">Description</label>
              <textarea
                value={project.description}
                onChange={(e) => {
                  const updated = [...resume.projects];
                  updated[idx] = { ...updated[idx], description: e.target.value };
                  updateField("projects", updated);
                }}
                placeholder="Describe your project, technologies used, and your role..."
                className="w-full min-h-[60px] px-3 py-2 rounded-lg border border-navy-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400/50 resize-y"
                style={{ background: "var(--background, #fff)" }}
              />
              <div className="flex items-center gap-2 mt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  leftIcon={<Sparkles size={14} />}
                  onClick={() => handleImprove(project.description, "project")}
                  loading={improving}
                >
                  AI Improve
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  leftIcon={<Trash2 size={14} />}
                  onClick={() => {
                    const updated = resume.projects.filter((_, i) => i !== idx);
                    updateField("projects", updated);
                  }}
                >
                  Remove
                </Button>
              </div>
            </div>
            <div className="mt-2">
              <label className="block text-sm font-medium text-navy-700 mb-1">Technologies</label>
              <input
                type="text"
                value={project.technologies.join(", ")}
                onChange={(e) => {
                  const updated = [...resume.projects];
                  updated[idx] = { ...updated[idx], technologies: e.target.value.split(",").map((t) => t.trim()).filter(Boolean) };
                  updateField("projects", updated);
                }}
                placeholder="React, TypeScript, Firebase"
                className="w-full px-3 py-2 text-sm rounded-lg border border-navy-200 focus:outline-none focus:ring-2 focus:ring-orange-400/50"
                style={{ background: "var(--background, #fff)" }}
              />
            </div>
            <Input
              label="Live Demo URL"
              placeholder="https://..."
              value={project.liveDemo}
              onChange={(e) => {
                const updated = [...resume.projects];
                updated[idx] = { ...updated[idx], liveDemo: e.target.value };
                updateField("projects", updated);
              }}
            />
          </div>
        ))}
      </Card>
    );
  };

  const renderExperienceSection = () => {
    return (
      <Card padding="md">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-navy-900">Experience / Internships</h3>
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Plus size={14} />}
            onClick={() => updateField("internships", [...resume.internships, { ...emptyInternship }])}
          >
            Add Experience
          </Button>
        </div>
        {resume.internships.map((internship, idx) => (
          <div key={internship.id || `exp-${idx}`} className="border border-gray-100 rounded-lg p-3 mb-3 last:mb-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Company"
                placeholder="Company name"
                value={internship.company}
                onChange={(e) => {
                  const updated = [...resume.internships];
                  updated[idx] = { ...updated[idx], company: e.target.value };
                  updateField("internships", updated);
                }}
              />
              <Input
                label="Role"
                placeholder="Job title"
                value={internship.role}
                onChange={(e) => {
                  const updated = [...resume.internships];
                  updated[idx] = { ...updated[idx], role: e.target.value };
                  updateField("internships", updated);
                }}
              />
              <Input
                label="Duration"
                placeholder="e.g., Jun 2025 - Aug 2025"
                value={internship.duration}
                onChange={(e) => {
                  const updated = [...resume.internships];
                  updated[idx] = { ...updated[idx], duration: e.target.value };
                  updateField("internships", updated);
                }}
              />
              <select
                value={internship.completionStatus}
                onChange={(e) => {
                  const updated = [...resume.internships];
                  updated[idx] = { ...updated[idx], completionStatus: e.target.value as any };
                  updateField("internships", updated);
                }}
                className="px-3 py-2 text-sm rounded-lg border border-navy-200 focus:outline-none focus:ring-2 focus:ring-orange-400/50"
                style={{ background: "var(--background, #fff)" }}
              >
                <option value="Ongoing">Ongoing</option>
                <option value="Completed">Completed</option>
                <option value="Offer Extended">Offer Extended</option>
              </select>
            </div>
            <div className="mt-2">
              <label className="block text-sm font-medium text-navy-700 mb-1">Supervisor Feedback / Responsibilities</label>
              <textarea
                value={internship.supervisorFeedback}
                onChange={(e) => {
                  const updated = [...resume.internships];
                  updated[idx] = { ...updated[idx], supervisorFeedback: e.target.value };
                  updateField("internships", updated);
                }}
                placeholder="Describe your responsibilities and accomplishments..."
                className="w-full min-h-[60px] px-3 py-2 rounded-lg border border-navy-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400/50 resize-y"
                style={{ background: "var(--background, #fff)" }}
              />
              <div className="flex gap-2 mt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  leftIcon={<Sparkles size={14} />}
                  onClick={() => handleImprove(internship.supervisorFeedback, "experience")}
                  loading={improving}
                >
                  AI Improve
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  leftIcon={<Trash2 size={14} />}
                  onClick={() => {
                    const updated = resume.internships.filter((_, i) => i !== idx);
                    updateField("internships", updated);
                  }}
                >
                  Remove
                </Button>
              </div>
            </div>
            <div className="mt-2">
              <label className="block text-sm font-medium text-navy-700 mb-1">Skills Learned</label>
              <input
                type="text"
                value={internship.skillsLearned.join(", ")}
                onChange={(e) => {
                  const updated = [...resume.internships];
                  updated[idx] = { ...updated[idx], skillsLearned: e.target.value.split(",").map((t) => t.trim()).filter(Boolean) };
                  updateField("internships", updated);
                }}
                placeholder="React, Python, AWS"
                className="w-full px-3 py-2 text-sm rounded-lg border border-navy-200 focus:outline-none focus:ring-2 focus:ring-orange-400/50"
                style={{ background: "var(--background, #fff)" }}
              />
            </div>
          </div>
        ))}
      </Card>
    );
  };

  const renderCertificatesSection = () => {
    return (
      <Card padding="md">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-navy-900">Certificates</h3>
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Plus size={14} />}
            onClick={() => updateField("certificates", [...resume.certificates, { ...emptyCertificate }])}
          >
            Add Certificate
          </Button>
        </div>
        {resume.certificates.map((cert, idx) => (
          <div key={cert.id || `cert-${idx}`} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3 last:mb-0">
            <Input
              label="Certificate Name"
              placeholder="e.g., AWS Certified Solutions Architect"
              value={cert.certificateName}
              onChange={(e) => {
                const updated = [...resume.certificates];
                updated[idx] = { ...updated[idx], certificateName: e.target.value };
                updateField("certificates", updated);
              }}
            />
            <Input
              label="Provider"
              placeholder="e.g., Amazon Web Services"
              value={cert.provider}
              onChange={(e) => {
                const updated = [...resume.certificates];
                updated[idx] = { ...updated[idx], provider: e.target.value };
                updateField("certificates", updated);
              }}
            />
            <Input
              label="Issue Date"
              placeholder="e.g., Jan 2025"
              value={cert.issueDate}
              onChange={(e) => {
                const updated = [...resume.certificates];
                updated[idx] = { ...updated[idx], issueDate: e.target.value };
                updateField("certificates", updated);
              }}
            />
            <Input
              label="Verification Link"
              placeholder="https://..."
              value={cert.verificationLink}
              onChange={(e) => {
                const updated = [...resume.certificates];
                updated[idx] = { ...updated[idx], verificationLink: e.target.value };
                updateField("certificates", updated);
              }}
            />
            <div className="sm:col-span-2">
              <Button
                variant="ghost"
                size="sm"
                leftIcon={<Trash2 size={14} />}
                onClick={() => {
                  const updated = resume.certificates.filter((_, i) => i !== idx);
                  updateField("certificates", updated);
                }}
              >
                Remove
              </Button>
            </div>
          </div>
        ))}
      </Card>
    );
  };

  const renderAchievementsSection = () => {
    return (
      <Card padding="md">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-navy-900">Achievements</h3>
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Plus size={14} />}
            onClick={() => updateField("achievements", [...resume.achievements, { ...emptyAchievement }])}
          >
            Add Achievement
          </Button>
        </div>
        {resume.achievements.map((ach, idx) => (
          <div key={ach.id || `ach-${idx}`} className="border border-gray-100 rounded-lg p-3 mb-3 last:mb-0">
            <Input
              label="Title"
              placeholder="Achievement title"
              value={ach.title}
              onChange={(e) => {
                const updated = [...resume.achievements];
                updated[idx] = { ...updated[idx], title: e.target.value };
                updateField("achievements", updated);
              }}
            />
            <div className="mt-2">
              <label className="block text-sm font-medium text-navy-700 mb-1">Description</label>
              <textarea
                value={ach.description}
                onChange={(e) => {
                  const updated = [...resume.achievements];
                  updated[idx] = { ...updated[idx], description: e.target.value };
                  updateField("achievements", updated);
                }}
                placeholder="Describe your achievement..."
                className="w-full min-h-[60px] px-3 py-2 rounded-lg border border-navy-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400/50 resize-y"
                style={{ background: "var(--background, #fff)" }}
              />
              <Button
                variant="ghost"
                size="sm"
                leftIcon={<Sparkles size={14} />}
                onClick={() => handleImprove(ach.description, "achievement")}
                loading={improving}
              >
                AI Improve
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              <Input
                label="Issuer"
                placeholder="Organization that awarded it"
                value={ach.issuer}
                onChange={(e) => {
                  const updated = [...resume.achievements];
                  updated[idx] = { ...updated[idx], issuer: e.target.value };
                  updateField("achievements", updated);
                }}
              />
              <Input
                label="Date"
                placeholder="e.g., Jun 2025"
                value={ach.date}
                onChange={(e) => {
                  const updated = [...resume.achievements];
                  updated[idx] = { ...updated[idx], date: e.target.value };
                  updateField("achievements", updated);
                }}
              />
            </div>
          </div>
        ))}
      </Card>
    );
  };

  return (
    <div className="space-y-4 pb-20">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-navy-900">Edit Resume</h2>
        <Button variant="primary" size="sm" leftIcon={<Save size={14} />} onClick={onSave} loading={saving}>
          Save Resume
        </Button>
      </div>

      {renderContactSection()}
      {renderSummarySection()}
      {renderEducationSection()}
      {renderSkillsSection()}
      {renderProjectsSection()}
      {renderExperienceSection()}
      {renderCertificatesSection()}
      {renderAchievementsSection()}

      {improveError && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-800">{improveError}</p>
        </div>
      )}
    </div>
  );
}
