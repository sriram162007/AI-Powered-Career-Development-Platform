import { getCareerById, type CareerRole } from "@/data/careers";
import { normalizeSkillName, getSkillDependencies } from "@/lib/skillNormalization";
import {
  type SkillGapResult,
  type SkillGapItem,
  type SkillRequirement,
  type StudentSkill,
  type ProficiencyLevel,
  type SkillCategory,
  type SkillStatus,
  type SkillPriority,
  type CoverageBreakdown,
  EXPECTED_PROFICIENCY,
  WEIGHTS,
  proficiencyToNumber,
  skillLevelToProficiency,
} from "@/types/skillGap";
import type { SkillLevel } from "@/types/profile";

function buildRequirements(career: CareerRole): SkillRequirement[] {
  const requirements: SkillRequirement[] = [];

  career.prerequisites.forEach((skill) => {
    requirements.push({
      skillName: skill,
      normalizedName: normalizeSkillName(skill),
      category: "Prerequisite",
      expectedLevel: EXPECTED_PROFICIENCY.Prerequisite,
      dependsOn: getSkillDependencies(normalizeSkillName(skill)),
    });
  });

  career.foundationSkills.forEach((skill) => {
    requirements.push({
      skillName: skill,
      normalizedName: normalizeSkillName(skill),
      category: "Foundation",
      expectedLevel: EXPECTED_PROFICIENCY.Foundation,
      dependsOn: getSkillDependencies(normalizeSkillName(skill)),
    });
  });

  career.coreSkills.forEach((skill) => {
    requirements.push({
      skillName: skill,
      normalizedName: normalizeSkillName(skill),
      category: "Core",
      expectedLevel: EXPECTED_PROFICIENCY.Core,
      dependsOn: getSkillDependencies(normalizeSkillName(skill)),
    });
  });

  career.advancedSkills.forEach((skill) => {
    requirements.push({
      skillName: skill,
      normalizedName: normalizeSkillName(skill),
      category: "Advanced",
      expectedLevel: EXPECTED_PROFICIENCY.Advanced,
      dependsOn: getSkillDependencies(normalizeSkillName(skill)),
    });
  });

  career.tools.forEach((skill) => {
    requirements.push({
      skillName: skill,
      normalizedName: normalizeSkillName(skill),
      category: "Tool",
      expectedLevel: EXPECTED_PROFICIENCY.Tool,
      dependsOn: getSkillDependencies(normalizeSkillName(skill)),
    });
  });

  return requirements;
}

function buildStudentSkills(
  studentSkills: { name: string; level: SkillLevel | ProficiencyLevel }[]
): StudentSkill[] {
  return studentSkills.map((s) => ({
    name: s.name,
    normalizedName: normalizeSkillName(s.name),
    level: s.level === "None" || !s.level
      ? "None"
      : skillLevelToProficiency(s.level as SkillLevel),
  }));
}

function findStudentSkill(
  normalizedSkill: string,
  studentSkills: StudentSkill[]
): StudentSkill | undefined {
  return studentSkills.find((s) => s.normalizedName === normalizedSkill);
}

function classifyStatus(
  studentLevel: ProficiencyLevel,
  expectedLevel: ProficiencyLevel
): SkillStatus {
  const studentNum = proficiencyToNumber(studentLevel);
  const expectedNum = proficiencyToNumber(expectedLevel);

  if (studentNum === 0) return "MISSING";
  if (studentNum >= expectedNum) return "STRONG";
  return "DEVELOPING";
}

function calculatePriority(
  status: SkillStatus,
  category: SkillCategory,
  dependencies: string[],
  studentSkills: StudentSkill[]
): SkillPriority {
  if (status === "STRONG") return "LOW";

  if (category === "Prerequisite" || category === "Core") {
    return "HIGH";
  }

  if (category === "Foundation") {
    const hasAllDeps = dependencies.every((dep) => {
      const depSkill = findStudentSkill(dep, studentSkills);
      return depSkill !== undefined && depSkill.level !== "None";
    });
    return hasAllDeps ? "MEDIUM" : "LOW";
  }

  if (category === "Advanced") {
    const hasAllDeps = dependencies.every((dep) => {
      const depSkill = findStudentSkill(dep, studentSkills);
      return depSkill !== undefined && depSkill.level !== "None";
    });
    return hasAllDeps ? "MEDIUM" : "LOW";
  }

  return "LOW";
}

function generateReason(
  status: SkillStatus,
  category: SkillCategory,
  skillName: string,
  expectedLevel: ProficiencyLevel,
  studentLevel: ProficiencyLevel
): string {
  if (status === "MISSING") {
    if (category === "Prerequisite") {
      return `${skillName} is a prerequisite for this career. Building this foundation first will make advanced topics easier to learn.`;
    }
    if (category === "Core") {
      return `${skillName} is a core skill for this career. It is essential for day-to-day work.`;
    }
    if (category === "Foundation") {
      return `${skillName} is a foundational skill. It supports multiple other skills in this career path.`;
    }
    if (category === "Advanced") {
      return `${skillName} is an advanced skill. You will need it as you progress to senior roles.`;
    }
    return `${skillName} is a tool used in this career. Familiarity is needed for practical work.`;
  }

  if (status === "DEVELOPING") {
    return `${skillName} is ${studentLevel} but ${expectedLevel} is expected for this career. Developing this skill will close the gap.`;
  }

  return `${skillName} meets the expected proficiency level for this career.`;
}

export function calculateSkillGap(
  career: CareerRole,
  studentSkills: StudentSkill[]
): SkillGapResult {
  const requirements = buildRequirements(career);
  const studentSkillMap = new Map<string, StudentSkill>();
  studentSkills.forEach((s) => {
    if (!studentSkillMap.has(s.normalizedName)) {
      studentSkillMap.set(s.normalizedName, s);
    }
  });

  const allSkills: SkillGapItem[] = [];
  const currentSkills: SkillGapItem[] = [];

  for (const req of requirements) {
    const studentSkill = findStudentSkill(req.normalizedName, studentSkills);
    const studentLevel: ProficiencyLevel = studentSkill?.level ?? "None";
    const status = classifyStatus(studentLevel, req.expectedLevel);
    const priority = calculatePriority(status, req.category, req.dependsOn, studentSkills);
    const reason = generateReason(status, req.category, req.skillName, req.expectedLevel, studentLevel);

    const gapItem: SkillGapItem = {
      skillName: req.skillName,
      normalizedName: req.normalizedName,
      category: req.category,
      studentLevel,
      expectedLevel: req.expectedLevel,
      status,
      priority,
      reason,
      dependsOn: req.dependsOn,
    };

    allSkills.push(gapItem);

    if (status === "STRONG" || status === "DEVELOPING") {
      currentSkills.push(gapItem);
    }
  }

  const gaps = allSkills.filter((s) => s.status === "MISSING" || s.status === "DEVELOPING");

  const deduplicateSkills = (items: SkillGapItem[]): SkillGapItem[] => {
    const seen = new Map<string, SkillGapItem>();
    const priorityRank = { HIGH: 0, MEDIUM: 1, LOW: 2 };
    const proficiencyRank = { None: 0, Beginner: 1, Intermediate: 2, Advanced: 3 };

    for (const item of items) {
      const key = item.normalizedName;
      const existing = seen.get(key);
      if (!existing) {
        seen.set(key, item);
      } else {
        if (proficiencyRank[item.studentLevel] > proficiencyRank[existing.studentLevel]) {
          seen.set(key, item);
        } else if (
          proficiencyRank[item.studentLevel] === proficiencyRank[existing.studentLevel] &&
          priorityRank[item.priority] < priorityRank[existing.priority]
        ) {
          seen.set(key, item);
        }
      }
    }

    return Array.from(seen.values());
  };

  const uniqueCurrentSkills = deduplicateSkills(currentSkills);
  const uniqueGaps = deduplicateSkills(gaps);

  const highPriorityGaps = uniqueGaps.filter((g) => g.priority === "HIGH");
  const mediumPriorityGaps = uniqueGaps.filter((g) => g.priority === "MEDIUM");
  const lowPriorityGaps = uniqueGaps.filter((g) => g.priority === "LOW");

  const totalRequirements = requirements.length;
  const coveredRequirements = allSkills.filter((s) => s.status === "STRONG").length;
  const coverageScore = totalRequirements > 0
    ? Math.round((coveredRequirements / totalRequirements) * 100)
    : 0;

const coverageBreakdown: CoverageBreakdown = {
  Foundation: 0,
  Core: 0,
  Advanced: 0,
  Prerequisite: 0,
  Tool: 0,
};
(Object.keys(WEIGHTS) as SkillCategory[]).forEach((category) => {
    const categoryReqs = requirements.filter((r) => r.category === category);
    if (categoryReqs.length === 0) {
      coverageBreakdown[category] = 0;
      return;
    }
    const categoryCovered = allSkills.filter(
      (s) => s.category === category && s.status === "STRONG"
    ).length;
    coverageBreakdown[category] = Math.round((categoryCovered / categoryReqs.length) * 100);
  });

  let nextRecommended: SkillGapItem | null = null;
  const highPriorityWithDeps = [...highPriorityGaps].sort((a, b) => {
    const catOrder = { Prerequisite: 0, Foundation: 1, Core: 2, Advanced: 3, Tool: 4 };
    const catDiff = catOrder[a.category] - catOrder[b.category];
    if (catDiff !== 0) return catDiff;
    return a.skillName.localeCompare(b.skillName);
  });

  if (highPriorityWithDeps.length > 0) {
    nextRecommended =
      highPriorityWithDeps.find((g) => g.dependsOn.length === 0) || highPriorityWithDeps[0];
  }

  if (!nextRecommended && mediumPriorityGaps.length > 0) {
    const sorted = [...mediumPriorityGaps].sort((a, b) => {
      const catOrder = { Prerequisite: 0, Foundation: 1, Core: 2, Advanced: 3, Tool: 4 };
      const catDiff = catOrder[a.category] - catOrder[b.category];
      if (catDiff !== 0) return catDiff;
      return a.skillName.localeCompare(b.skillName);
    });
    nextRecommended =
      sorted.find((g) => g.dependsOn.length === 0) || sorted[0];
  }

  return {
    careerId: career.id,
    careerName: career.name,
    coverageScore,
    coverageBreakdown: coverageBreakdown,
    currentSkills: uniqueCurrentSkills,
    gaps: uniqueGaps,
    highPriorityGaps,
    mediumPriorityGaps,
    lowPriorityGaps,
    nextRecommendedSkill: nextRecommended,
  };
}

export function calculateSkillGapForStudent(
  careerId: string,
  studentSkills: StudentSkill[]
): SkillGapResult | null {
  const career = getCareerById(careerId);
  if (!career) return null;
  return calculateSkillGap(career, studentSkills);
}

export function calculateSkillGapFromProfile(
  careerId: string,
  profileSkills: { name: string; level: SkillLevel | ProficiencyLevel }[]
): SkillGapResult | null {
  const career = getCareerById(careerId);
  if (!career) return null;

  const studentSkills = buildStudentSkills(profileSkills);
  return calculateSkillGap(career, studentSkills);
}
