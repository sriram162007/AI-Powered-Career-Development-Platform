import type { ResumeData, ResumeTemplate } from "@/types/profile";
import { Mail, Phone, MapPin, Globe, GitBranch, ExternalLink, Link2 } from "lucide-react";

interface ResumePreviewProps {
  resume: ResumeData;
}

const templateClasses: Record<ResumeTemplate, string> = {
  modern: "resume-template-modern",
  classic: "resume-template-classic",
  minimal: "resume-template-minimal",
  creative: "resume-template-creative",
};

export function ResumePreview({ resume }: ResumePreviewProps) {
  const templateClass = resume.template ? templateClasses[resume.template] : templateClasses.modern;

  const renderContact = () => {
    const { contact } = resume;
    return (
      <div className="contact-info">
        {contact.fullName && <h1 className="name">{contact.fullName}</h1>}
        <div className="contact-row">
          {contact.email && (
            <span className="contact-item"><Mail size={12} /> {contact.email}</span>
          )}
          {contact.phone && (
            <span className="contact-item"><Phone size={12} /> {contact.phone}</span>
          )}
          {contact.location && (
            <span className="contact-item"><MapPin size={12} /> {contact.location}</span>
          )}
        </div>
        <div className="contact-row">
          {contact.linkedin && (
            <span className="contact-item"><ExternalLink size={12} /> {contact.linkedin}</span>
          )}
          {contact.github && (
            <span className="contact-item"><GitBranch size={12} /> {contact.github}</span>
          )}
          {contact.portfolio && (
            <span className="contact-item"><Globe size={12} /> {contact.portfolio}</span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={`resume-preview ${templateClass}`} id="resume-preview-content">
      {renderContact()}

      {resume.careerObjective && (
        <div className="resume-section">
          <h2 className="section-title">Professional Summary</h2>
          <p className="section-content">{resume.careerObjective}</p>
        </div>
      )}

      {resume.education.university && (
        <div className="resume-section">
          <h2 className="section-title">Education</h2>
          <div className="section-item">
            <h3 className="item-title">{resume.education.degree} in {resume.education.department}</h3>
            <p className="item-subtitle">{resume.education.university}</p>
            {resume.education.cgpa && <p className="item-meta">CGPA: {resume.education.cgpa} | Graduation: {resume.education.graduationYear}</p>}
          </div>
        </div>
      )}

      {resume.skills.length > 0 && (
        <div className="resume-section">
          <h2 className="section-title">Skills</h2>
          <div className="skills-grid">
            {resume.skills.map((skill, idx) => (
              <span key={skill.id || `${skill.name}-${idx}`} className="skill-badge">
                {skill.name}
                {skill.level && <span className="skill-level"> • {skill.level}</span>}
              </span>
            ))}
          </div>
        </div>
      )}

      {resume.projects.length > 0 && (
        <div className="resume-section">
          <h2 className="section-title">Projects</h2>
          {resume.projects.map((project, idx) => (
            <div key={project.id || `project-${idx}`} className="section-item">
              <h3 className="item-title">{project.projectName}</h3>
              {project.technologies.length > 0 && (
                <p className="item-meta">Technologies: {project.technologies.join(", ")}</p>
              )}
              {project.description && <p className="section-content">{project.description}</p>}
              {project.liveDemo && (
                <p className="item-meta"><Link2 size={12} /> {project.liveDemo}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {resume.internships.length > 0 && (
        <div className="resume-section">
          <h2 className="section-title">Experience</h2>
          {resume.internships.map((internship, idx) => (
            <div key={internship.id || `exp-${idx}`} className="section-item">
              <h3 className="item-title">{internship.role} at {internship.company}</h3>
              <p className="item-meta">{internship.duration}</p>
              {internship.supervisorFeedback && (
                <p className="section-content">{internship.supervisorFeedback}</p>
              )}
              {internship.skillsLearned && internship.skillsLearned.length > 0 && (
                <p className="item-meta">Skills: {internship.skillsLearned.join(", ")}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {resume.certificates.length > 0 && (
        <div className="resume-section">
          <h2 className="section-title">Certifications</h2>
          <div className="skills-grid">
            {resume.certificates.map((cert, idx) => (
              <span key={cert.id || `cert-${idx}`} className="skill-badge">
                {cert.certificateName}{cert.provider && ` - ${cert.provider}`}
              </span>
            ))}
          </div>
        </div>
      )}

      {resume.achievements.length > 0 && (
        <div className="resume-section">
          <h2 className="section-title">Achievements</h2>
          {resume.achievements.map((achievement, idx) => (
            <div key={achievement.id || `ach-${idx}`} className="section-item">
              <h3 className="item-title">{achievement.title}</h3>
              {achievement.issuer && <p className="item-meta">{achievement.issuer} • {achievement.date}</p>}
              {achievement.description && <p className="section-content">{achievement.description}</p>}
            </div>
          ))}
        </div>
      )}

      {resume.languages.length > 0 && (
        <div className="resume-section">
          <h2 className="section-title">Languages</h2>
          <div className="skills-grid">
            {resume.languages.map((lang, idx) => (
              <span key={lang.id || `lang-${idx}`} className="skill-badge">
                {lang.name} ({lang.proficiency})
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
