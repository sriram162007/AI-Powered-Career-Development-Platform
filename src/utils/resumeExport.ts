import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle } from "docx";import type { ResumeData } from "@/types/profile";

export async function exportResumeAsPDF(elementId: string): Promise<Blob> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error("Resume preview element not found");
  }

  const canvas = await html2canvas(element, {
    scale: 2,
    allowTaint: true,
    logging: false,
  });

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "pt",
    format: "a4",
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const imgWidth = canvas.width;
  const imgHeight = canvas.height;
  const ratio = imgWidth / imgHeight;
  const pdfWidth = pageWidth;
  const pdfHeight = pageWidth / ratio;

  let heightLeft = pdfHeight;
  let position = 0;

  pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
  heightLeft -= pdf.internal.pageSize.getHeight();

  while (heightLeft > 20) {
    position = heightLeft - pdf.internal.pageSize.getHeight();
    pdf.addPage();
    pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
    heightLeft -= pdf.internal.pageSize.getHeight();
  }

  return pdf.output("blob");
}

export async function downloadResumeAsPDF(elementId: string, filename: string): Promise<void> {
  try {
    const blob = await exportResumeAsPDF(elementId);
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${filename || "resume"}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (error) {
    throw new Error(`Failed to export PDF: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}

function sectionTitle(text: string): Paragraph {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    text,
    spacing: { before: 240, after: 60 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 1 } },
  });
}

function bullet(text: string): Paragraph {
  return new Paragraph({
    text,
    bullet: { level: 0 },
    spacing: { after: 60 },
  });
}

function subHeading(text: string): Paragraph {
  return new Paragraph({
    text,
    heading: HeadingLevel.HEADING_3,
    spacing: { after: 40 },
  });
}

export async function buildResumeDocument(resume: ResumeData): Promise<Document> {
  const children: Paragraph[] = [];

  children.push(
    new Paragraph({
      heading: HeadingLevel.HEADING_1,
      text: resume.contact.fullName || "Resume",
      spacing: { after: 120 },
      alignment: AlignmentType.CENTER,
    })
  );

  const contactParts: string[] = [];
  if (resume.contact.email) contactParts.push(resume.contact.email);
  if (resume.contact.phone) contactParts.push(resume.contact.phone);
  if (resume.contact.location) contactParts.push(resume.contact.location);
  if (resume.contact.linkedin) contactParts.push(resume.contact.linkedin);
  if (resume.contact.github) contactParts.push(resume.contact.github);
  if (resume.contact.portfolio) contactParts.push(resume.contact.portfolio);

  if (contactParts.length > 0) {
    children.push(
      new Paragraph({
        children: contactParts.map((part, i) => new TextRun({ text: part, break: i > 0 ? 1 : undefined })),
        alignment: AlignmentType.CENTER,
        spacing: { after: 240 },
      })
    );
  }

  if (resume.careerObjective) {
    children.push(sectionTitle("Professional Summary"));
    children.push(new Paragraph({ text: resume.careerObjective, spacing: { after: 120 } }));
  }

  if (resume.education.university) {
    children.push(sectionTitle("Education"));
    const eduParts: string[] = [];
    if (resume.education.degree) eduParts.push(resume.education.degree);
    if (resume.education.department) eduParts.push(`in ${resume.education.department}`);
    children.push(subHeading(eduParts.join(" ")));
    children.push(new Paragraph({ text: resume.education.university, spacing: { after: 40 } }));
    const eduMeta: string[] = [];
    if (resume.education.cgpa) eduMeta.push(`CGPA: ${resume.education.cgpa}`);
    if (resume.education.graduationYear) eduMeta.push(`Graduation: ${resume.education.graduationYear}`);
    if (resume.education.currentYear) eduMeta.push(`Year: ${resume.education.currentYear}`);
    if (eduMeta.length > 0) {
      children.push(new Paragraph({ text: eduMeta.join(" | "), spacing: { after: 120 } }));
    } else {
      children.push(new Paragraph({ spacing: { after: 120 } }));
    }
  }

  if (resume.skills.length > 0) {
    children.push(sectionTitle("Skills"));
    resume.skills.forEach((skill) => {
      let skillText = skill.name;
      if (skill.level) skillText += ` (${skill.level})`;
      children.push(bullet(skillText));
    });
  }

  if (resume.projects.length > 0) {
    children.push(sectionTitle("Projects"));
    resume.projects.forEach((project) => {
      children.push(subHeading(project.projectName));
      if (project.technologies.length > 0) {
        children.push(new Paragraph({ text: `Technologies: ${project.technologies.join(", ")}`, spacing: { after: 40 } }));
      }
      if (project.description) {
        children.push(new Paragraph({ text: project.description, spacing: { after: 80 } }));
      }
      if (project.liveDemo) {
        children.push(new Paragraph({ text: `Demo: ${project.liveDemo}`, spacing: { after: 120 } }));
      } else {
        children.push(new Paragraph({ spacing: { after: 120 } }));
      }
    });
  }

  if (resume.internships.length > 0) {
    children.push(sectionTitle("Experience"));
    resume.internships.forEach((internship) => {
      const expLine = `${internship.role} at ${internship.company}`;
      children.push(subHeading(expLine));
      if (internship.duration) {
        children.push(new Paragraph({ text: internship.duration, spacing: { after: 40 } }));
      }
      if (internship.supervisorFeedback) {
        internship.supervisorFeedback.split("\n").forEach((line) => {
          if (line.trim()) children.push(bullet(line.trim()));
        });
      }
      if (internship.skillsLearned && internship.skillsLearned.length > 0) {
        children.push(new Paragraph({ text: `Skills: ${internship.skillsLearned.join(", ")}`, spacing: { after: 120 } }));
      } else {
        children.push(new Paragraph({ spacing: { after: 120 } }));
      }
    });
  }

  if (resume.certificates.length > 0) {
    children.push(sectionTitle("Certificates"));
    resume.certificates.forEach((cert) => {
      const certLine: string[] = [];
      if (cert.certificateName) certLine.push(cert.certificateName);
      if (cert.provider) certLine.push(cert.provider);
      children.push(bullet(certLine.join(" - ")));
    });
  }

  if (resume.achievements.length > 0) {
    children.push(sectionTitle("Achievements"));
    resume.achievements.forEach((ach) => {
      children.push(subHeading(ach.title));
      if (ach.issuer) {
        const metaParts: string[] = [];
        if (ach.issuer) metaParts.push(ach.issuer);
        if (ach.date) metaParts.push(ach.date);
        if (metaParts.length > 0) {
          children.push(new Paragraph({ text: metaParts.join(" • "), spacing: { after: 40 } }));
        }
      }
      if (ach.description) {
        children.push(new Paragraph({ text: ach.description, spacing: { after: 120 } }));
      } else {
        children.push(new Paragraph({ spacing: { after: 80 } }));
      }
    });
  }

  if (resume.languages.length > 0) {
    children.push(sectionTitle("Languages"));
    resume.languages.forEach((lang) => {
      let langText = lang.name;
      if (lang.proficiency) langText += ` (${lang.proficiency})`;
      children.push(bullet(langText));
    });
  }

  return new Document({
    sections: [{
      properties: {
        page: {
          size: {
            width: 11906,
            height: 16838,
          },
          margin: { top: 720, right: 720, bottom: 720, left: 720 },
        },
      },
      children,
    }],
  });
}

export async function downloadResumeAsDOCX(resume: ResumeData, filename: string): Promise<void> {
  try {
    const doc = await buildResumeDocument(resume);
    const blob = await Packer.toBlob(doc);
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${filename || "resume"}.docx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (error) {
    throw new Error(`Failed to export DOCX: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}
