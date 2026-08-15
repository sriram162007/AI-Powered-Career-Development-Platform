import { careerRoles } from "@/data/careers";

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  detail: string;
  icon: string;
  category: "career" | "resume" | "learning" | "preparation";
}

export const landingFeatures: FeatureItem[] = [
  {
    id: "career-discovery",
    title: "Career Discovery",
    description: "Explore career roles based on your interests, skills, degree, and prerequisites.",
    detail:
      "Browse real career paths and see which ones align with your background.",
    icon: "target",
    category: "career",
  },
  {
    id: "skill-gap",
    title: "Skill Gap Analysis",
    description: "Compare your current skills against your target career and identify what's missing.",
    detail:
      "See which skills you have, which are developing, and what to learn next.",
    icon: "gap",
    category: "career",
  },
  {
    id: "career-roadmap",
    title: "Career Roadmap",
    description: "Turn your target career into a practical, semester-by-semester learning plan.",
    detail:
      "Each roadmap breaks the journey into courses, projects, and milestones.",
    icon: "roadmap",
    category: "learning",
  },
  {
    id: "resume-analysis",
    title: "Resume Analysis",
    description: "Upload your resume (PDF/DOCX) and receive structured feedback.",
    detail:
      "Get a resume score, ATS check, skills detected, and specific improvement suggestions.",
    icon: "resume-analysis",
    category: "resume",
  },
  {
    id: "resume-builder",
    title: "AI Resume Builder",
    description: "Create and improve a professional resume from your actual profile data.",
    detail:
      "Use multiple templates, edit any section, improve wording with AI, and export to PDF or DOCX.",
    icon: "resume-builder",
    category: "resume",
  },
  {
    id: "career-readiness",
    title: "Career Readiness",
    description: "Track your overall preparedness for internships and campus placements.",
    detail:
      "See a readiness score built from your resume, skills, projects, and interview prep.",
    icon: "readiness",
    category: "preparation",
  },
  {
    id: "skills-management",
    title: "Skills Management",
    description: "Track every skill you learn, its proficiency level, and where it came from.",
    detail:
      "Skills are auto-detected from your resume, courses, projects, internships, and certificates.",
    icon: "skills",
    category: "learning",
  },
  {
    id: "project-tracking",
    title: "Project Portfolio",
    description: "Track all your projects and see how they map to your target skill set.",
    detail:
      "Each project records technologies used, skills demonstrated, and duration — ready for your resume.",
    icon: "projects",
    category: "learning",
  },
];

export const journeySteps = [
  {
    step: "01",
    title: "Tell Us About Yourself",
    description:
      "Add your skills, education, and interests. Upload a resume to auto-detect skills.",
    detail: "What you provide: your background. What you get: a structured profile.",
  },
  {
    step: "02",
    title: "Discover Careers That Fit",
    description:
      "Get career suggestions based on your interests, skills, degree, and prerequisites.",
    detail: "What you provide: your answers. What you get: a shortlist of matched careers.",
  },
  {
    step: "03",
    title: "See Your Skill Gaps",
    description:
      "Compare your current skills against your target career and find what to learn.",
    detail: "What you get: a clear, prioritized list of skills to build.",
  },
  {
    step: "04",
    title: "Follow Your Roadmap",
    description:
      "Get a semester-by-semester plan with courses, projects, and milestones.",
    detail: "What you get: an actionable plan that fits your academic calendar.",
  },
  {
    step: "05",
    title: "Build Your Resume",
    description:
      "Create a professional resume from your profile data and improve it with AI.",
    detail: "What you get: a resume that passes ATS and reflects your abilities.",
  },
  {
    step: "06",
    title: "Track Career Readiness",
    description:
      "Monitor your readiness score as you prepare for internships and placements.",
    detail: "What you get: a clear readiness score and the next actions to take.",
  },
];

export const studentProblems = [
  {
    problem: "I don't know which career actually fits me.",
    solution:
      "Career Discovery compares your interests, skills, and degree against real career roles and gives you a shortlist to explore.",
  },
  {
    problem: "I have learned some skills, but I don't know what I'm missing.",
    solution:
      "Skill Gap analysis shows exactly which skills you have, which need improvement, and what to learn next — prioritized.",
  },
  {
    problem: "I keep learning random things without a clear roadmap.",
    solution:
      "Your personalized roadmap turns your target career into a semester-by-semester plan of courses, projects, and milestones.",
  },
  {
    problem: "My resume doesn't show what I can actually do.",
    solution:
      "Resume Analysis scores your resume and ATS compatibility, detects your skills, and suggests specific improvements.",
  },
  {
    problem: "I have placements coming up and don't know how ready I am.",
    solution:
      "Career Readiness tracks your overall preparedness from your resume, skills, projects, and interview practice.",
  },
];

export interface PreviewState {
  key: "career" | "skills" | "roadmap" | "resume";
  title: string;
  subtitle: string;
}

export const previewStates: PreviewState[] = [
  {
    key: "career",
    title: "Career Match",
    subtitle: "AI / ML Engineer — 82% match",
  },
  {
    key: "skills",
    title: "Skill Gap",
    subtitle: "5 of 12 skills covered",
  },
  {
    key: "roadmap",
    title: "90-Day Roadmap",
    subtitle: "3 milestones · 12 skills",
  },
  {
    key: "resume",
    title: "Resume Readiness",
    subtitle: "72 of 100 — 3 improvements",
  },
];

export const collegeBenefits = [
  "Student career profiles",
  "Career discovery guidance",
  "Skill-gap visibility per student",
  "Career readiness tracking",
  "Resume readiness feedback",
  "Internship preparation modules",
  "Mock interview preparation",
  "Student progress visibility",
  "Batch-level insights",
  "Career-path guidance for placement cells",
];

export const studentBenefits = [
  "Personalized career discovery",
  "Skill gap analysis",
  "Career roadmap",
  "Resume analysis (PDF/DOCX)",
  "AI resume builder with templates",
  "Career readiness tracking",
  "Internship preparation",
];

export const faqItems = [
  {
    question: "Who is this platform for?",
    answer:
      "College students, engineering students, fresh graduates, and early-career professionals who want a clear direction for their career journey.",
  },
  {
    question: "Is this only for engineering students?",
    answer:
      "No. The platform supports students from Computer Science, IT, Data Science, Electronics, Mathematics, and other degrees. Career paths and skill recommendations adapt to your background.",
  },
  {
    question: "How does Career Discovery work?",
    answer:
      "You tell us your interests, current skills, and degree. The platform then matches you against a knowledge base of career roles and shows you the best-fitting paths.",
  },
  {
    question: "How is Skill Gap calculated?",
    answer:
      "Your current skills are compared against the requirements of your target career. The engine normalizes skill names, respects dependencies, and shows you what to learn first.",
  },
  {
    question: "Can I upload and analyze my resume?",
    answer:
      "Yes. Upload a PDF or DOCX resume and the platform extracts your skills, education, and experience. You get a resume score, ATS compatibility score, and specific suggestions.",
  },
  {
    question: "Can I build my resume here?",
    answer:
      "Yes. The AI Resume Builder creates a professional resume from your profile data. You can choose from multiple templates, edit any section, and export to PDF or DOCX.",
  },
  {
    question: "Can I use this before campus placements?",
    answer:
      "Yes. The Career Readiness score tracks your overall preparedness, combining your resume, skills, projects, and interview practice into one easy-to-follow indicator.",
  },
  {
    question: "Is there a free plan?",
    answer:
      "Yes. The Free plan includes profile building, career discovery, skill gap analysis, and resume building with monthly limits on resume analyses.",
  },
  {
    question: "What is included in Starter and Pro?",
    answer:
      "Starter (₹399/month) removes most limits and adds AI resume improvement. Pro (₹899/month) adds mock interviews, interview feedback, and advanced analytics. See the full pricing page for details.",
  },
  {
    question: "Do colleges get a separate plan?",
    answer:
      "Yes. College and institution plans are designed for training and placement cells. Contact the team for a custom demo.",
  },
  {
    question: "Can colleges track student progress?",
    answer:
      "Institution plans include batch-level insights, student progress visibility, and career readiness dashboards for placement teams.",
  },
  {
    question: "Does the platform guarantee a job?",
    answer:
      "No. The platform provides career guidance, skill analysis, and preparation tools. Employment outcomes depend on your effort and market conditions.",
  },
];

export const featuredCareers = careerRoles.map((career) => ({
  id: career.id,
  name: career.name,
  shortDescription: career.shortDescription,
  difficulty: career.difficulty,
  foundationSkills: career.foundationSkills.slice(0, 4),
  related: career.relatedCareers.slice(0, 3),
}));

export interface StudentJourneyStep {
  label: string;
  description: string;
}

export const studentJourney: StudentJourneyStep[] = [
  {
    label: "Knows Python, built a few projects",
    description: "Has some coding experience but is unsure which career path to take.",
  },
  {
    label: "Completes Career Discovery",
    description: "Platform suggests AI/ML Engineer based on interests and degree.",
  },
  {
    label: "Sees Skill Gaps",
    description: "Missing Statistics, Git, and Machine Learning fundamentals.",
  },
  {
    label: "Follows the Roadmap",
    description: "Learns Mathematics and Git, builds a mini ML project.",
  },
  {
    label: "Improves Resume",
    description: "Resume score improves and ATS compatibility is verified.",
  },
  {
    label: "Checks Career Readiness",
    description: "Readiness score reaches a confident level — ready to apply.",
  },
];
