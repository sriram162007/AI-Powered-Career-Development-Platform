import type { SkillLevel } from "@/types/profile";

export type ProficiencyLevel = "None" | "Beginner" | "Intermediate" | "Advanced";

export type SkillStatus = "STRONG" | "DEVELOPING" | "MISSING";

export type SkillPriority = "HIGH" | "MEDIUM" | "LOW";

export type SkillCategory = "Foundation" | "Core" | "Advanced" | "Prerequisite" | "Tool";

export interface SkillRequirement {
  skillName: string;
  normalizedName: string;
  category: SkillCategory;
  expectedLevel: ProficiencyLevel;
  dependsOn: string[];
}

export interface StudentSkill {
  name: string;
  normalizedName: string;
  level: ProficiencyLevel;
}

export interface SkillGapItem {
  skillName: string;
  normalizedName: string;
  category: SkillCategory;
  studentLevel: ProficiencyLevel;
  expectedLevel: ProficiencyLevel;
  status: SkillStatus;
  priority: SkillPriority;
  reason: string;
  dependsOn: string[];
}

export interface CoverageBreakdown {
  Foundation: number;
  Core: number;
  Advanced: number;
  Prerequisite: number;
  Tool: number;
}

export interface SkillGapResult {
  careerId: string;
  careerName: string;
  coverageScore: number;
  coverageBreakdown: CoverageBreakdown;
  currentSkills: SkillGapItem[];
  gaps: SkillGapItem[];
  highPriorityGaps: SkillGapItem[];
  mediumPriorityGaps: SkillGapItem[];
  lowPriorityGaps: SkillGapItem[];
  nextRecommendedSkill: SkillGapItem | null;
}

export interface SkillGapOptions {
  careerId: string;
  studentSkills: StudentSkill[];
  selectedSkills: string[];
}

export function skillLevelToProficiency(level: SkillLevel): ProficiencyLevel {
  if (level === "Expert") return "Advanced";
  if (level === "Advanced") return "Advanced";
  if (level === "Intermediate") return "Intermediate";
  return "Beginner";
}

export function proficiencyToNumber(level: ProficiencyLevel): number {
  switch (level) {
    case "None":
      return 0;
    case "Beginner":
      return 1;
    case "Intermediate":
      return 2;
    case "Advanced":
      return 3;
    default:
      return 0;
  }
}

export function numberToProficiency(n: number): ProficiencyLevel {
  if (n <= 0) return "None";
  if (n === 1) return "Beginner";
  if (n === 2) return "Intermediate";
  return "Advanced";
}

export const EXPECTED_PROFICIENCY: Record<SkillCategory, ProficiencyLevel> = {
  Foundation: "Intermediate",
  Core: "Intermediate",
  Advanced: "Advanced",
  Prerequisite: "Intermediate",
  Tool: "Beginner",
};

export const CAREER_DIFFICULTY_ADJUSTMENT: Record<"Beginner" | "Intermediate" | "Advanced", Record<SkillCategory, ProficiencyLevel>> =
  {
    Beginner: {
      Foundation: "Intermediate",
      Core: "Intermediate",
      Advanced: "Advanced",
      Prerequisite: "Intermediate",
      Tool: "Beginner",
    },
    Intermediate: {
      Foundation: "Intermediate",
      Core: "Intermediate",
      Advanced: "Advanced",
      Prerequisite: "Intermediate",
      Tool: "Beginner",
    },
    Advanced: {
      Foundation: "Intermediate",
      Core: "Advanced",
      Advanced: "Advanced",
      Prerequisite: "Intermediate",
      Tool: "Intermediate",
    },
  };

export const WEIGHTS: Record<SkillCategory, number> = {
  Foundation: 0.20,
  Core: 0.40,
  Advanced: 0.25,
  Prerequisite: 0.10,
  Tool: 0.05,
};
