import { careerRoles, type CareerRole } from "@/data/careers";
import type { UserProfile } from "@/types/profile";

export interface MatchReason {
  type: "interest" | "skill" | "degree" | "prerequisite";
  text: string;
}

export interface CareerMatch {
  careerId: string;
  career: CareerRole;
  matchScore: number;
  reasons: MatchReason[];
}

export interface MatchingInputs {
  degree: string;
  department: string;
  year: string;
  interests: string[];
  currentSkills: string[];
  optionalCareerPreference?: string;
}

const WEIGHTS = {
  interest: 40,
  skill: 30,
  degree: 20,
  prerequisite: 10,
};

const SKILL_TOPICS_MAP: Record<string, string[]> = {
  "Machine Learning": ["Artificial Intelligence", "Mathematics / Data"],
  "Deep Learning": ["Artificial Intelligence", "Mathematics / Data"],
  "Large Language Models": ["Artificial Intelligence", "Building things"],
  "Transformers": ["Artificial Intelligence", "Mathematics / Data"],
  "Natural Language Processing": ["Artificial Intelligence", "Mathematics / Data"],
  Python: ["Artificial Intelligence", "Mathematics / Data", "Solving problems", "Building things"],
  Statistics: ["Mathematics / Data", "Solving problems"],
  Mathematics: ["Mathematics / Data", "Solving problems"],
  "Data Analysis": ["Mathematics / Data", "Solving problems"],
  "Data Visualization": ["Mathematics / Data", "Designing Applications"],
  SQL: ["Mathematics / Data", "Solving problems", "Building things"],
  Programming: ["Building things", "Solving problems", "Designing Applications"],
  Algorithms: ["Solving problems", "Building things"],
  "Data Structures": ["Solving problems", "Building things"],
  Docker: ["Cloud / Infrastructure", "Building things"],
  Kubernetes: ["Cloud / Infrastructure", "Building things"],
  AWS: ["Cloud / Infrastructure", "Building things"],
  "Cloud Platforms": ["Cloud / Infrastructure", "Building things"],
  "CI/CD": ["Cloud / Infrastructure", "Building things"],
  Cybersecurity: ["Security", "Solving problems"],
  "Network Security": ["Security", "Solving problems"],
  Cryptography: ["Security", "Solving problems"],
  "Threat Modeling": ["Security", "Solving problems"],
  HTML: ["Designing Applications", "Building things"],
  CSS: ["Designing Applications", "Building things"],
  JavaScript: ["Designing Applications", "Building things", "Solving problems"],
  React: ["Designing Applications", "Building things"],
  "Node.js": ["Building things", "Designing Applications"],
  "System Design": ["Solving problems", "Building things"],
};

function normalize(s: string): string {
  return s.toLowerCase().trim();
}

function skillMatchesCareer(skillName: string, career: CareerRole): boolean {
  const norm = normalize(skillName);
  const allCareerSkills = [
    ...career.foundationSkills,
    ...career.coreSkills,
    ...career.advancedSkills,
  ];
  return allCareerSkills.some((cs) => normalize(cs) === norm);
}

function getInterestMatchCount(interests: string[], career: CareerRole): number {
  return interests.filter((interest) => career.interestTags.includes(interest)).length;
}

function getSkillMatchCount(skills: string[], career: CareerRole): number {
  return skills.filter((skill) => skillMatchesCareer(skill, career)).length;
}

function getDegreeRelevance(degree: string, department: string): Record<string, number> {
  const relevance: Record<string, number> = {};
  const combined = `${degree || ""} ${department || ""}`.toLowerCase().trim();

  if (combined.includes("computer science") || combined.includes("cse") || combined.includes("cse-ai")) {
    relevance["Computer Science"] = 1.0;
    relevance["Artificial Intelligence"] = 1.0;
    relevance["Data Science"] = 0.9;
    relevance["Information Technology"] = 0.9;
  } else if (combined.includes("information technology") || combined.includes("it ")) {
    relevance["Information Technology"] = 1.0;
    relevance["Computer Science"] = 0.8;
  } else if (combined.includes("data science")) {
    relevance["Data Science"] = 1.0;
    relevance["Computer Science"] = 0.9;
    relevance["Mathematics"] = 0.8;
  } else if (combined.includes("mathematics") || combined.includes("math")) {
    relevance["Mathematics"] = 1.0;
    relevance["Statistics"] = 0.8;
    relevance["Computer Science"] = 0.5;
  } else if (combined.includes("statistics")) {
    relevance["Statistics"] = 1.0;
    relevance["Mathematics"] = 0.8;
    relevance["Computer Science"] = 0.4;
  } else if (combined.includes("electronics") || combined.includes("ece")) {
    relevance["Electronics"] = 1.0;
    relevance["Computer Science"] = 0.5;
  } else if (combined.includes("mechanical") || combined.includes("mech")) {
    relevance["Mechanical"] = 1.0;
    relevance["Computer Science"] = 0.3;
  } else if (combined.includes("economics")) {
    relevance["Economics"] = 1.0;
    relevance["Mathematics"] = 0.7;
  } else {
    relevance["Computer Science"] = 0.5;
  }

  return relevance;
}

function getPrerequisiteMatchCount(skills: string[], career: CareerRole): number {
  return career.prerequisites.filter((prereq) =>
    skills.some((skill) => normalize(skill).includes(normalize(prereq)))
  ).length;
}

function getSkillInterestOverlap(skills: string[], interestTags: string[]): number {
  const skillTopics = new Set<string>();
  skills.forEach((skill) => {
    const norm = normalize(skill);
    const mapped = SKILL_TOPICS_MAP[Object.keys(SKILL_TOPICS_MAP).find((k) => normalize(k) === norm) || ""];
    if (mapped) {
      mapped.forEach((t) => skillTopics.add(t));
    }
  });

  return interestTags.filter((t) => skillTopics.has(t)).length;
}

export function matchCareers(inputs: MatchingInputs): CareerMatch[] {
  const {
    degree,
    department,
    interests,
    currentSkills,
    optionalCareerPreference,
  } = inputs;

  const degreeRelevance = getDegreeRelevance(degree || "", department || "");

  const matches: CareerMatch[] = careerRoles.map((career) => {
    const reasons: MatchReason[] = [];

     let degreeScore = 0;
     let matchedDegreeKey = "";

     for (const [degreeKey, rel] of Object.entries(degreeRelevance)) {
       const careerRel = career.degreeRelevance[degreeKey];
       if (careerRel && rel > 0) {
         degreeScore = careerRel * WEIGHTS.degree;
         matchedDegreeKey = degreeKey;
         break;
       }
     }

    if (matchedDegreeKey) {
      reasons.push({
        type: "degree",
        text: `Your ${matchedDegreeKey} background aligns with this career's typical path`,
      });
    }

    const interestMatches = getInterestMatchCount(interests, career);
    const interestRatio = interests.length > 0 ? interestMatches / interests.length : 0;
    const interestScore = interestRatio * WEIGHTS.interest;

    if (interestMatches > 0) {
      const matchedInterests = interests.filter((i) => career.interestTags.includes(i));
      reasons.push({
        type: "interest",
        text: `You selected "${matchedInterests.join(", ")}" as an interest`,
      });
    }

    const skillMatches = getSkillMatchCount(currentSkills, career);
    const allCareerSkills = [...career.foundationSkills, ...career.coreSkills];
    const skillRatio = allCareerSkills.length > 0 ? skillMatches / allCareerSkills.length : 0;
    const skillScore = skillRatio * WEIGHTS.skill;

    if (skillMatches > 0) {
      const matchedSkillNames = currentSkills.filter((s) => skillMatchesCareer(s, career)).slice(0, 3);
      const totalMatched = currentSkills.filter((s) => skillMatchesCareer(s, career)).length;
      const suffix = totalMatched > 3 ? ` +${totalMatched - 3} more` : "";
      reasons.push({
        type: "skill",
        text: `You already know: ${matchedSkillNames.join(", ")}${suffix}`,
      });
    }

    const prereqMatches = getPrerequisiteMatchCount(currentSkills, career);
    const prereqRatio = career.prerequisites.length > 0 ? prereqMatches / career.prerequisites.length : 0;
    const prereqScore = prereqRatio * WEIGHTS.prerequisite;

    if (prereqMatches > 0) {
      const met = career.prerequisites
        .filter((p) => currentSkills.some((s) => normalize(s).includes(normalize(p))))
        .slice(0, 3);

      if (met.length > 0) {
        reasons.push({
          type: "prerequisite",
          text: `Prerequisite${met.length > 1 ? "s" : ""} already met: ${met.join(", ")}`,
        });
      }
    }

    const skillInterestOverlap = getSkillInterestOverlap(currentSkills, career.interestTags);
    if (skillInterestOverlap > 0 && interestMatches > 0) {
      reasons.push({
        type: "skill",
        text: "Your existing skills reinforce your interest in this field",
      });
    }

    const totalScore = Math.round(interestScore + skillScore + degreeScore + prereqScore);

    if (optionalCareerPreference && career.id === optionalCareerPreference) {
      return {
        careerId: career.id,
        career,
        matchScore: Math.min(100, totalScore + 15),
        reasons,
      };
    }

    return {
      careerId: career.id,
      career,
      matchScore: totalScore,
      reasons,
    };
  });

  return matches
    .sort((a, b) => b.matchScore - a.matchScore)
    .filter((m) => m.matchScore > 0);
}

export function matchCareersFromProfile(profile: UserProfile, inputs: Partial<MatchingInputs> = {}): CareerMatch[] {
  const interests =
    inputs.interests && inputs.interests.length > 0
      ? inputs.interests
      : (profile.careerPreferences?.interests ?? []);

  const currentSkills =
    inputs.currentSkills && inputs.currentSkills.length > 0
      ? inputs.currentSkills
      : (profile.skills ?? []).map((s) => s.name);

  const matchingInputs: MatchingInputs = {
    degree: inputs.degree || profile.academicInfo?.degree || "",
    department: inputs.department || profile.academicInfo?.department || "",
    year: inputs.year || profile.academicInfo?.currentYear || "",
    interests,
    currentSkills,
    optionalCareerPreference:
      inputs.optionalCareerPreference ?? profile.careerPreferences?.selectedCareerId ?? undefined,
  };

  return matchCareers(matchingInputs);
}

export function getTopCareerMatches(profile: UserProfile, inputs: Partial<MatchingInputs> = {}): CareerMatch[] {
  return matchCareersFromProfile(profile, inputs).slice(0, 6);
}
