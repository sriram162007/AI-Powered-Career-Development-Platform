export type SkillLevel = "Beginner" | "Intermediate" | "Advanced" | "Expert";
export type SkillSource = "Course" | "Internship" | "Project" | "Certificate" | "Self Learning";
export type CourseStatus = "In Progress" | "Completed" | "Dropped";
export type InternshipStatus = "Ongoing" | "Completed" | "Offer Extended";
export type ResumeTemplate = "modern" | "classic" | "minimal" | "creative";

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  portfolio: string;
  location: string;
}

export interface AcademicInfo {
  university: string;
  degree: string;
  department: string;
  currentYear: string;
  cgpa: string;
  graduationYear: string;
}

export interface CareerGoal {
  targetRole: string;
  preferredIndustry: string;
  preferredLocation: string;
}

export interface CareerPreference {
  selectedCareerId: string | null;
  interests: string[];
  careerDiscoveryCompleted: boolean;
}

export interface Skill {
  id?: string;
  name: string;
  category: string;
  level: SkillLevel;
  lastUpdated: string;
  source: SkillSource;
}

export interface Course {
  id?: string;
  courseName: string;
  provider: string;
  duration: string;
  completionDate: string;
  certificate: string;
  skillsLearned: string[];
  status: CourseStatus;
}

export interface Certificate {
  id?: string;
  certificateName: string;
  provider: string;
  issueDate: string;
  credentialId: string;
  verificationLink: string;
  relatedSkills: string[];
}

export interface Project {
  id?: string;
  projectName: string;
  description: string;
  technologies: string[];
  github: string;
  liveDemo: string;
  skillsUsed: string[];
  projectDuration: string;
}

export interface Internship {
  id?: string;
  company: string;
  role: string;
  duration: string;
  responsibilities: string[];
  skillsLearned: string[];
  supervisorFeedback: string;
  completionStatus: InternshipStatus;
}

export interface Language {
  id?: string;
  name: string;
  proficiency: string;
}

export interface Achievement {
  id?: string;
  title: string;
  description: string;
  date: string;
  issuer: string;
}

export interface VolunteerExperience {
  id?: string;
  organization: string;
  role: string;
  duration: string;
  description: string;
}

export interface Hackathon {
  id?: string;
  name: string;
  date: string;
  location: string;
  position: string;
  project: string;
}

export interface Award {
  id?: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
}

export interface Publication {
  id?: string;
  title: string;
  publisher: string;
  date: string;
  link: string;
  description: string;
}

export interface ResumeData {
  id?: string;
  careerObjective: string;
  education: AcademicInfo;
  skills: Skill[];
  projects: Project[];
  experience: Internship[];
  internships: Internship[];
  certificates: Certificate[];
  achievements: Achievement[];
  languages: Language[];
  contact: PersonalInfo;
  template: ResumeTemplate;
  lastUpdated: string;
}

export interface CareerAnalytics {
  resumeScore: number;
  atsScore: number;
  skillScore: number;
  cgpaScore: number;
  projectScore: number;
  internshipScore: number;
  certificateScore: number;
  interviewScore: number;
  placementReadiness: number;
  jobReadiness: number;
  profileCompleteness: number;
}

export interface UserProfile {
  id?: string;
  uid: string;
  personalInfo: PersonalInfo;
  academicInfo: AcademicInfo;
  careerGoal: CareerGoal;
  skills: Skill[];
  courses: Course[];
  certificates: Certificate[];
  projects: Project[];
  internships: Internship[];
  languages: Language[];
  achievements: Achievement[];
  volunteerExperience: VolunteerExperience[];
  hackathons: Hackathon[];
  awards: Award[];
  publications: Publication[];
  resume: ResumeData;
  analytics: CareerAnalytics;
  careerPreferences: CareerPreference;
  createdAt?: string;
  updatedAt?: string;
}

export const emptyPersonalInfo: PersonalInfo = {
  fullName: "",
  email: "",
  phone: "",
  linkedin: "",
  github: "",
  portfolio: "",
  location: "",
};

export const emptyAcademicInfo: AcademicInfo = {
  university: "",
  degree: "",
  department: "",
  currentYear: "",
  cgpa: "",
  graduationYear: "",
};

export const emptyCareerGoal: CareerGoal = {
  targetRole: "",
  preferredIndustry: "",
  preferredLocation: "",
};

export const emptySkill: Omit<Skill, "id"> = {
  name: "",
  category: "",
  level: "Beginner",
  lastUpdated: new Date().toISOString().split("T")[0],
  source: "Self Learning",
};

export const emptyCourse: Omit<Course, "id"> = {
  courseName: "",
  provider: "",
  duration: "",
  completionDate: "",
  certificate: "",
  skillsLearned: [],
  status: "In Progress",
};

export const emptyCertificate: Omit<Certificate, "id"> = {
  certificateName: "",
  provider: "",
  issueDate: "",
  credentialId: "",
  verificationLink: "",
  relatedSkills: [],
};

export const emptyProject: Omit<Project, "id"> = {
  projectName: "",
  description: "",
  technologies: [],
  github: "",
  liveDemo: "",
  skillsUsed: [],
  projectDuration: "",
};

export const emptyInternship: Omit<Internship, "id"> = {
  company: "",
  role: "",
  duration: "",
  responsibilities: [],
  skillsLearned: [],
  supervisorFeedback: "",
  completionStatus: "Ongoing",
};

export const emptyLanguage: Omit<Language, "id"> = {
  name: "",
  proficiency: "",
};

export const emptyAchievement: Omit<Achievement, "id"> = {
  title: "",
  description: "",
  date: "",
  issuer: "",
};

export const emptyVolunteerExperience: Omit<VolunteerExperience, "id"> = {
  organization: "",
  role: "",
  duration: "",
  description: "",
};

export const emptyHackathon: Omit<Hackathon, "id"> = {
  name: "",
  date: "",
  location: "",
  position: "",
  project: "",
};

export const emptyAward: Omit<Award, "id"> = {
  title: "",
  issuer: "",
  date: "",
  description: "",
};

export const emptyPublication: Omit<Publication, "id"> = {
  title: "",
  publisher: "",
  date: "",
  link: "",
  description: "",
};

export const emptyResumeData: Omit<ResumeData, "id"> = {
  careerObjective: "",
  education: emptyAcademicInfo,
  skills: [],
  projects: [],
  experience: [],
  internships: [],
  certificates: [],
  achievements: [],
  languages: [],
  contact: emptyPersonalInfo,
  template: "modern",
  lastUpdated: new Date().toISOString().split("T")[0],
};

export const emptyCareerAnalytics: CareerAnalytics = {
  resumeScore: 0,
  atsScore: 0,
  skillScore: 0,
  cgpaScore: 0,
  projectScore: 0,
  internshipScore: 0,
  certificateScore: 0,
  interviewScore: 0,
  placementReadiness: 0,
  jobReadiness: 0,
  profileCompleteness: 0,
};

export const emptyUserProfile: Omit<UserProfile, "id"> = {
  uid: "",
  personalInfo: { ...emptyPersonalInfo },
  academicInfo: { ...emptyAcademicInfo },
  careerGoal: { ...emptyCareerGoal },
  skills: [],
  courses: [],
  certificates: [],
  projects: [],
  internships: [],
  languages: [],
  achievements: [],
  volunteerExperience: [],
  hackathons: [],
  awards: [],
  publications: [],
   resume: { ...emptyResumeData },
  analytics: { ...emptyCareerAnalytics },
  careerPreferences: {
    selectedCareerId: null,
    interests: [],
    careerDiscoveryCompleted: false,
  },
};
