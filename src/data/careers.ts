export interface CareerRole {
  id: string;
  name: string;
  shortDescription: string;
  whatTheyDo: string[];
  foundationSkills: string[];
  coreSkills: string[];
  advancedSkills: string[];
  tools: string[];
  industries: string[];
  exampleJobTitles: string[];
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  recommendedStartingYear: number;
  prerequisites: string[];
  relatedCareers: string[];
  interestTags: string[];
  degreeRelevance: Record<string, number>;
}

export const careerRoles: CareerRole[] = [
  {
    id: "ai-ml-engineer",
    name: "AI / ML Engineer",
    shortDescription:
      "Design, build, and deploy machine learning systems that solve real-world problems using data-driven models.",
    whatTheyDo: [
      "Build and train machine learning models for prediction, classification, and recommendation",
      "Preprocess and feature-engineer large datasets for model consumption",
      "Deploy ML models to production and monitor their performance in real-time",
      "Collaborate with data engineers to build scalable ML pipelines",
      "Fine-tune hyperparameters and optimize model accuracy",
    ],
    foundationSkills: ["Mathematics", "Statistics", "Linear Algebra", "Python", "Programming"],
    coreSkills: ["Machine Learning", "Deep Learning", "Data Analysis", "Feature Engineering", "Model Evaluation"],
    advancedSkills: ["Neural Architecture Search", "MLOps", "Transformer Models", "Reinforcement Learning", "A/B Testing"],
    tools: ["Python", "TensorFlow", "PyTorch", "scikit-learn", "Jupyter", "Docker", "Kubernetes", "MLflow"],
    industries: ["Technology", "Finance", "Healthcare", "Automotive", "Retail", "Aerospace"],
    exampleJobTitles: [
      "Machine Learning Engineer",
      "AI Engineer",
      "Deep Learning Engineer",
      "ML Research Scientist",
    ],
    difficulty: "Advanced",
    recommendedStartingYear: 2,
    prerequisites: ["Mathematics", "Python", "Statistics", "Programming"],
    relatedCareers: ["generative-ai-engineer", "data-scientist", "data-engineer", "software-engineer"],
    interestTags: ["Artificial Intelligence", "Mathematics / Data", "Solving problems", "Building things"],
    degreeRelevance: {
      "Computer Science": 0.9,
      "Artificial Intelligence": 1.0,
      "Data Science": 0.9,
      "Mathematics": 0.7,
      "Electronics": 0.4,
      "Mechanical": 0.2,
    },
  },
  {
    id: "generative-ai-engineer",
    name: "Generative AI Engineer",
    shortDescription:
      "Specialize in building AI systems that generate text, images, code, and other creative content using LLMs and generative models.",
    whatTheyDo: [
      "Fine-tune large language models (LLMs) for domain-specific applications",
      "Build prompt engineering frameworks and evaluation pipelines",
      "Integrate generative AI APIs into products and workflows",
      "Design retrieval-augmented generation (RAG) systems",
      "Develop multimodal AI applications combining text, image, and audio",
    ],
    foundationSkills: ["Mathematics", "Python", "Programming", "Machine Learning", "Natural Language Processing"],
    coreSkills: ["Large Language Models", "Prompt Engineering", "LLM Fine-tuning", "RAG", "API Integration"],
    advancedSkills: ["LLMOps", "Prompt Optimization", "Multi-modal Systems", "Agent Frameworks", "Model Compression"],
    tools: ["Python", "LangChain", "Hugging Face", "OpenAI API", "LangSmith", "Vector Databases", "FastAPI"],
    industries: ["Technology", "Media", "Entertainment", "Education", "Marketing", "Legal Tech"],
    exampleJobTitles: [
      "Generative AI Engineer",
      "LLM Engineer",
      "AI Solutions Architect",
      "Prompt Engineer",
    ],
    difficulty: "Advanced",
    recommendedStartingYear: 2,
    prerequisites: ["Mathematics", "Python", "Machine Learning", "Programming"],
    relatedCareers: ["ai-ml-engineer", "software-engineer", "data-engineer"],
    interestTags: ["Artificial Intelligence", "Building things", "Mathematics / Data", "Designing Applications"],
    degreeRelevance: {
      "Computer Science": 0.9,
      "Artificial Intelligence": 1.0,
      "Data Science": 0.8,
      "Electronics": 0.3,
      "Mechanical": 0.2,
    },
  },
  {
    id: "software-engineer",
    name: "Software Engineer",
    shortDescription:
      "Design, build, test, and maintain software applications that solve user problems and scale to millions of users.",
    whatTheyDo: [
      "Write clean, testable, and efficient code for applications and systems",
      "Design software architecture and system components",
      "Debug and resolve issues across the application stack",
      "Participate in code reviews and collaborate with cross-functional teams",
      "Write and maintain automated tests",
    ],
    foundationSkills: ["Programming", "Data Structures", "Algorithms", "Computer Networks", "Databases"],
    coreSkills: ["Problem Solving", "System Design", "Version Control", "Testing", "Debugging"],
    advancedSkills: ["Distributed Systems", "Performance Optimization", "Microservices", "Cloud Architecture", "Security"],
    tools: ["Git", "VS Code", "Postman", "Docker", "Jenkins", "AWS", "GCP", "Jira"],
    industries: ["Technology", "Finance", "Healthcare", "E-commerce", "Education", "Gaming"],
    exampleJobTitles: [
      "Software Engineer",
      "Backend Engineer",
      "Frontend Engineer",
      "Full-Stack Engineer",
      "Systems Engineer",
    ],
    difficulty: "Intermediate",
    recommendedStartingYear: 1,
    prerequisites: ["Programming", "Data Structures", "Algorithms", "Mathematics"],
    relatedCareers: ["full-stack-developer", "cloud-devops-engineer", "ai-ml-engineer"],
    interestTags: ["Building things", "Solving problems", "Designing Applications"],
    degreeRelevance: {
      "Computer Science": 1.0,
      "Information Technology": 0.9,
      "Electronics": 0.6,
      "Mathematics": 0.5,
      "Mechanical": 0.3,
    },
  },
  {
    id: "full-stack-developer",
    name: "Full-Stack Developer",
    shortDescription:
      "Build end-to-end web applications, working across both frontend interfaces and backend server logic.",
    whatTheyDo: [
      "Develop responsive frontend interfaces using modern web frameworks",
      "Build RESTful APIs and server-side application logic",
      "Design and manage databases for application data persistence",
      "Integrate third-party APIs and payment systems",
      "Deploy and maintain web applications in cloud environments",
    ],
    foundationSkills: ["HTML", "CSS", "JavaScript", "Programming", "Databases"],
    coreSkills: ["React", "Node.js", "API Development", "Database Design", "Web Security"],
    advancedSkills: ["State Management", "Microservices", "Cloud Deployment", "Performance Optimization", "CI/CD"],
    tools: ["React", "Next.js", "Node.js", "Express", "PostgreSQL", "MongoDB", "AWS", "Docker"],
    industries: ["Technology", "E-commerce", "Startups", "Media", "Education"],
    exampleJobTitles: [
      "Full-Stack Developer",
      "Web Application Developer",
      "Frontend Developer",
      "Backend Developer",
    ],
    difficulty: "Intermediate",
    recommendedStartingYear: 1,
    prerequisites: ["Programming", "HTML", "CSS", "JavaScript", "Databases"],
    relatedCareers: ["software-engineer", "data-analyst", "cloud-devops-engineer"],
    interestTags: ["Designing Applications", "Building things", "Solving problems"],
    degreeRelevance: {
      "Computer Science": 1.0,
      "Information Technology": 0.9,
      "Electronics": 0.4,
      "Mathematics": 0.3,
      "Mechanical": 0.2,
    },
  },
  {
    id: "data-scientist",
    name: "Data Scientist",
    shortDescription:
      "Extract insights from complex data using statistics, machine learning, and domain expertise to guide business decisions.",
    whatTheyDo: [
      "Clean, process, and analyze large datasets using statistical methods",
      "Build predictive models to solve business problems",
      "Create visualizations and dashboards to communicate findings to stakeholders",
      "Perform A/B testing to evaluate product changes",
      "Collaborate with engineering teams to deploy models into production",
    ],
    foundationSkills: ["Mathematics", "Statistics", "Python", "Data Analysis", "Programming"],
    coreSkills: ["Machine Learning", "Statistical Inference", "Data Visualization", "SQL", "Feature Engineering"],
    advancedSkills: ["Deep Learning", "Time Series Forecasting", "Causal Inference", "Bayesian Methods", "NLP"],
    tools: ["Python", "pandas", "NumPy", "matplotlib", "seaborn", "scikit-learn", "Tableau", "Power BI"],
    industries: ["Technology", "Finance", "Healthcare", "Retail", "Marketing", "Consulting"],
    exampleJobTitles: [
      "Data Scientist",
      "Applied Research Scientist",
      "Business Intelligence Analyst",
      "Quantitative Analyst",
    ],
    difficulty: "Advanced",
    recommendedStartingYear: 2,
    prerequisites: ["Statistics", "Python", "Mathematics", "Data Analysis"],
    relatedCareers: ["ai-ml-engineer", "data-analyst", "data-engineer"],
    interestTags: ["Mathematics / Data", "Solving problems", "Artificial Intelligence"],
    degreeRelevance: {
      "Computer Science": 0.9,
      "Data Science": 1.0,
      "Mathematics": 1.0,
      "Statistics": 1.0,
      "Electronics": 0.4,
      "Mechanical": 0.3,
    },
  },
  {
    id: "data-analyst",
    name: "Data Analyst",
    shortDescription:
      "Transform raw data into clear reports and dashboards that help organizations make informed decisions.",
    whatTheyDo: [
      "Collect, clean, and analyze data from various sources",
      "Create interactive dashboards and reports for stakeholders",
      "Perform trend analysis and generate actionable insights",
      "Write SQL queries to extract data from databases",
      "Validate data quality and identify inconsistencies",
    ],
    foundationSkills: ["Mathematics", "Statistics", "Excel", "Data Analysis", "Problem Solving"],
    coreSkills: ["SQL", "Data Visualization", "Pivot Tables", "Report Writing", "Statistical Analysis"],
    advancedSkills: ["Advanced SQL", "Power BI", "Tableau", "Python Scripting", "Data Modeling"],
    tools: ["Excel", "SQL", "Power BI", "Tableau", "Google Sheets", "Python", "Google Analytics"],
    industries: ["Finance", "Marketing", "Retail", "Healthcare", "E-commerce", "Consulting"],
    exampleJobTitles: [
      "Data Analyst",
      "Business Analyst",
      "Reporting Analyst",
      "Analytics Associate",
    ],
    difficulty: "Beginner",
    recommendedStartingYear: 1,
    prerequisites: ["Mathematics", "Statistics", "Problem Solving"],
    relatedCareers: ["data-scientist", "data-engineer", "full-stack-developer"],
    interestTags: ["Mathematics / Data", "Solving problems"],
    degreeRelevance: {
      "Computer Science": 0.7,
      "Mathematics": 1.0,
      "Statistics": 1.0,
      "Economics": 0.9,
      "Electronics": 0.3,
      "Mechanical": 0.3,
    },
  },
  {
    id: "data-engineer",
    name: "Data Engineer",
    shortDescription:
      "Build and maintain the infrastructure that allows data scientists and analysts to store, process, and access data efficiently.",
    whatTheyDo: [
      "Design and implement data pipelines for ingestion and transformation",
      "Build and maintain data warehouses and lakes",
      "Ensure data quality, reliability, and scalability of data systems",
      "Write efficient ETL/ELT processes using SQL and scripting",
      "Monitor and optimize data infrastructure performance",
    ],
    foundationSkills: ["Programming", "Databases", "Linux", "Data Structures", "System Design"],
    coreSkills: ["SQL", "ETL", "Apache Spark", "Kafka", "Data Warehousing", "Cloud Platforms"],
    advancedSkills: ["Big Data", "Stream Processing", "Data Modeling", "Infrastructure as Code", "MLOps Pipelines"],
    tools: ["Python", "SQL", "Apache Spark", "Apache Kafka", "Airflow", "AWS", "GCP", "Snowflake", "Databricks"],
    industries: ["Technology", "Finance", "E-commerce", "Healthcare", "Media"],
    exampleJobTitles: [
      "Data Engineer",
      "Big Data Engineer",
      "ETL Developer",
      "Data Platform Engineer",
    ],
    difficulty: "Advanced",
    recommendedStartingYear: 2,
    prerequisites: ["Programming", "Databases", "SQL", "Data Structures"],
    relatedCareers: ["ai-ml-engineer", "data-scientist", "data-analyst", "cloud-devops-engineer"],
    interestTags: ["Mathematics / Data", "Building things", "Solving problems", "Cloud / Infrastructure"],
    degreeRelevance: {
      "Computer Science": 1.0,
      "Information Technology": 0.9,
      "Data Science": 0.9,
      "Mathematics": 0.6,
      "Electronics": 0.4,
      "Mechanical": 0.3,
    },
  },
  {
    id: "cloud-devops-engineer",
    name: "Cloud / DevOps Engineer",
    shortDescription:
      "Design, implement, and maintain automated deployment pipelines and scalable cloud infrastructure.",
    whatTheyDo: [
      "Set up CI/CD pipelines for automated testing and deployment",
      "Manage cloud infrastructure using Infrastructure as Code (IaC)",
      "Monitor system performance and resolve incidents in production",
      "Automate server provisioning and configuration management",
      "Ensure security, reliability, and scalability of deployed applications",
    ],
    foundationSkills: ["Linux", "Networking", "Scripting", "Programming", "System Administration"],
    coreSkills: ["Docker", "Kubernetes", "CI/CD", "Cloud Platforms", "Infrastructure as Code"],
    advancedSkills: ["Site Reliability Engineering", "Service Mesh", "Chaos Engineering", "Security Automation", "Multi-cloud"],
    tools: ["AWS", "GCP", "Azure", "Docker", "Kubernetes", "Terraform", "Jenkins", "GitLab CI", "Ansible"],
    industries: ["Technology", "Finance", "E-commerce", "Healthcare", "Telecommunications"],
    exampleJobTitles: [
      "DevOps Engineer",
      "Cloud Engineer",
      "Site Reliability Engineer",
      "Platform Engineer",
    ],
    difficulty: "Intermediate",
    recommendedStartingYear: 2,
    prerequisites: ["Linux", "Networking", "Scripting", "Programming"],
    relatedCareers: ["software-engineer", "data-engineer", "cybersecurity-engineer"],
    interestTags: ["Cloud / Infrastructure", "Solving problems", "Building things"],
    degreeRelevance: {
      "Computer Science": 0.9,
      "Information Technology": 1.0,
      "Electronics": 0.5,
      "Mechanical": 0.4,
      "Mathematics": 0.4,
    },
  },
  {
    id: "cybersecurity-engineer",
    name: "Cybersecurity Engineer",
    shortDescription:
      "Protect systems, networks, and data from cyber threats through strategic defense, threat detection, and incident response.",
    whatTheyDo: [
      "Design and implement security controls across applications and infrastructure",
      "Conduct vulnerability assessments and penetration testing",
      "Monitor systems for security breaches and respond to incidents",
      "Develop security policies and compliance frameworks",
      "Perform security audits and risk assessments",
    ],
    foundationSkills: ["Networking", "Linux", "Programming", "Cryptography", "System Administration"],
    coreSkills: ["Threat Modeling", "Vulnerability Assessment", "Incident Response", "Security Tools", "Compliance"],
    advancedSkills: ["Penetration Testing", "Digital Forensics", "Security Architecture", "Zero Trust", "SOC Operations"],
    tools: ["Wireshark", "Nmap", "OWASP ZAP", "Metasploit", "Burp Suite", "SIEM", "Splunk", "Firewall Tools"],
    industries: ["Finance", "Government", "Healthcare", "Technology", "Defense"],
    exampleJobTitles: [
      "Cybersecurity Engineer",
      "Security Analyst",
      "Security Operations Center Analyst",
      "Security Architect",
    ],
    difficulty: "Intermediate",
    recommendedStartingYear: 2,
    prerequisites: ["Networking", "Linux", "Programming"],
    relatedCareers: ["cloud-devops-engineer", "software-engineer", "data-engineer"],
    interestTags: ["Security", "Solving problems"],
    degreeRelevance: {
      "Computer Science": 0.9,
      "Information Technology": 0.9,
      "Electronics": 0.6,
      "Mathematics": 0.5,
      "Mechanical": 0.2,
    },
  },
];

export function getCareerById(id: string): CareerRole | undefined {
  return careerRoles.find((career) => career.id === id);
}

export const allInterestTags = Array.from(
  new Set(careerRoles.flatMap((c) => c.interestTags))
).sort();
