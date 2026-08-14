const SKILL_ALIASES: Record<string, string> = {
  reactjs: "React",
  "react.js": "React",
  "react js": "React",
  js: "JavaScript",
  javascript: "JavaScript",
  typescript: "TypeScript",
  ts: "TypeScript",
  "typescript.js": "TypeScript",
  "ts.js": "JavaScript",
  ml: "Machine Learning",
  "machine learning": "Machine Learning",
  "deep learning": "Deep Learning",
  "data science": "Data Science",
  "data analysis": "Data Analysis",
  "data analytics": "Data Analysis",
  "data engineering": "Data Engineering",
  "data engineer": "Data Engineering",
  "data scientist": "Data Scientist",
  numpy: "NumPy",
  pandas: "Pandas",
  pytorch: "PyTorch",
  tensorflow: "TensorFlow",
  "scikit-learn": "scikit-learn",
  scikitlearn: "scikit-learn",
  sklearn: "scikit-learn",
  "node.js": "Node.js",
  "nodejs": "Node.js",
  "node js": "Node.js",
  docker: "Docker",
  kubernetes: "Kubernetes",
  k8s: "Kubernetes",
  aws: "AWS",
  gcp: "GCP",
  azure: "Azure",
  "gke": "Kubernetes",
  "ecs": "AWS",
  sql: "SQL",
  nosql: "NoSQL",
  postgresql: "PostgreSQL",
  "postgre sql": "PostgreSQL",
  mysql: "MySQL",
  mongodb: "MongoDB",
  firebase: "Firebase",
  "rest api": "REST API",
  rest: "REST API",
  "ci/cd": "CI/CD",
  cicd: "CI/CD",
  devops: "DevOps",
  "mlops": "MLOps",
  nlp: "NLP",
  "natural language processing": "NLP",
  "a/b testing": "A/B Testing",
  ab: "A/B Testing",
  api: "API",
  "api development": "API Development",
  "html5": "HTML",
  css3: "CSS",
  "c++": "C++",
  "c#": "C#",
  "f#": "F#",
  "go lang": "Go",
  golang: "Go",
  "framer motion": "Framer Motion",
  "next.js": "Next.js",
  "nextjs": "Next.js",
  tailwind: "Tailwind CSS",
  "tailwindcss": "Tailwind CSS",
  "figma": "Figma",
  linux: "Linux",
  ubuntu: "Linux",
  bash: "Bash",
  shell: "Bash",
  "aws lambda": "AWS Lambda",
  lambda: "AWS Lambda",
  "google cloud": "GCP",
  "google cloud platform": "GCP",
  "amazon web services": "AWS",
  "microsoft azure": "Azure",
  "azure devops": "Azure DevOps",
};

const SKILL_CANONICAL_ORDER = [
  "React",
  "JavaScript",
  "TypeScript",
  "Machine Learning",
  "Deep Learning",
  "Python",
  "Statistics",
  "Mathematics",
  "Data Analysis",
  "Data Science",
  "Data Engineering",
  "Node.js",
  "Docker",
  "Kubernetes",
  "AWS",
  "GCP",
  "Azure",
  "SQL",
  "NoSQL",
  "PostgreSQL",
  "MongoDB",
  "Firebase",
  "CI/CD",
  "DevOps",
  "MLOps",
  "NLP",
  "A/B Testing",
  "API",
  "API Development",
  "HTML",
  "CSS",
  "Git",
  "NumPy",
  "Pandas",
  "PyTorch",
  "TensorFlow",
  "scikit-learn",
  "REST API",
];

export function normalizeSkillName(name: string): string {
  if (!name || typeof name !== "string") return "";

  const lower = name.toLowerCase().trim();

  if (SKILL_ALIASES[lower]) {
    return SKILL_ALIASES[lower];
  }

  const cleaned = lower.replace(/[./]/g, " ").replace(/\s+/g, " ").trim();

  if (SKILL_ALIASES[cleaned]) {
    return SKILL_ALIASES[cleaned];
  }

  const words = cleaned.split(" ");
  if (words.length === 1 && SKILL_ALIASES[words[0]]) {
    return SKILL_ALIASES[words[0]];
  }

  if (SKILL_ALIASES[lower]) {
    return SKILL_ALIASES[lower];
  }

  return name.trim();
}

const SKILL_DEPENDENCIES: Record<string, string[]> = {
  "Machine Learning": ["Python", "Mathematics", "Statistics"],
  "Deep Learning": ["Machine Learning", "Python", "Mathematics"],
  "TensorFlow": ["Machine Learning", "Python"],
  "PyTorch": ["Machine Learning", "Python"],
  "NumPy": ["Python"],
  "Pandas": ["Python", "Statistics"],
  "scikit-learn": ["Python", "Statistics"],
  "Feature Engineering": ["Statistics", "Python", "Mathematics"],
  "Data Analysis": ["Python", "Statistics"],
  "Statistical Inference": ["Statistics", "Mathematics"],
  "Data Visualization": ["Data Analysis", "Python"],
  "NLP": ["Machine Learning", "Mathematics", "Statistics"],
  "Transformer Models": ["Deep Learning", "Mathematics"],
  "Reinforcement Learning": ["Machine Learning", "Mathematics", "Statistics"],
  "Neural Architecture Search": ["Deep Learning", "Machine Learning"],
  "LLM Fine-tuning": ["Machine Learning", "Python"],
  "RAG": ["Machine Learning", "Vector Databases"],
  "Agent Frameworks": ["Machine Learning", "Python"],
  "MLOps": ["Machine Learning", "Docker"],
  "A/B Testing": ["Statistics"],
  "System Design": ["Programming", "Data Structures", "Algorithms"],
  "Distributed Systems": ["System Design", "Networking"],
  "Kubernetes": ["Docker"],
  "CI/CD": ["Docker"],
  "Serverless": ["Cloud Platforms", "AWS"],
  "Cloud Architecture": ["Cloud Platforms", "System Design"],
  "Vector Databases": ["Machine Learning", "Data Engineering"],
  "Data Warehousing": ["SQL", "Data Engineering"],
  "Big Data": ["Data Engineering", "Distributed Systems"],
  "Stream Processing": ["Data Engineering", "Kafka"],
  "Threat Modeling": ["Security", "System Design"],
  "Digital Forensics": ["Cybersecurity"],
  "Penetration Testing": ["Cybersecurity", "Linux"],
  "React": ["JavaScript"],
  "Vue.js": ["JavaScript"],
  "Angular": ["TypeScript"],
  "Next.js": ["React", "Node.js"],
  "Node.js": ["JavaScript"],
  "API Development": ["Programming"],
};

export function getSkillDependencies(normalizedName: string): string[] {
  return SKILL_DEPENDENCIES[normalizedName] ?? [];
}

export function getAllNormalizedSkills(): string[] {
  return SKILL_CANONICAL_ORDER;
}

export function isSkillNameMatch(a: string, b: string): boolean {
  return normalizeSkillName(a) === normalizeSkillName(b);
}

export function normalizeSkillList(skills: string[]): string[] {
  return Array.from(new Set(skills.map((s) => normalizeSkillName(s)).filter(Boolean)));
}
