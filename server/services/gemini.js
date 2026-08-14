import { GoogleGenerativeAI } from '@google/generative-ai';

if (!process.env.GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY is not configured. Please add it to your .env file.');
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-3.5-flash' });

const SYSTEM_PROMPT = `You are an expert career coach and resume analyst. Analyze the provided resume text and return ONLY valid JSON matching this exact schema. Do not include markdown, code fences, or any explanatory text.

Schema:
{
  "resumeScore": number (0-100),
  "atsScore": number (0-100),
  "industryMatch": number (0-100),
  "topIndustry": string,
  "skillsDetected": [
    { "name": string, "level": "Expert" | "Intermediate" | "Beginner", "category": string }
  ],
  "missingSkills": string[],
  "strengths": [
    { "title": string, "detail": string }
  ],
  "weaknesses": [
    { "title": string, "detail": string }
  ],
  "improvements": [
    { "title": string, "detail": string }
  ],
  "summary": string
}

Rules:
- Base scores on content completeness, keyword density, and modern best practices
- Detect at least 5-8 technical and soft skills
- Identify 3-5 strengths and 3-5 weaknesses
- Provide 4-6 specific, actionable improvements
- Keep summary under 2 sentences
- Return ONLY the JSON object, no other text`;

export async function analyzeResume(resumeText) {
  const result = await model.generateContent([SYSTEM_PROMPT, resumeText]);
  const response = result.response;
  const text = response.text();

  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('Invalid response format from AI');
  }

  return JSON.parse(jsonMatch[0]);
}

const IMPROVE_SYSTEM_PROMPT = `You are a professional resume editor. The student has supplied real text from their resume. Improve the wording, clarity, and impact of the text ONLY. You may rewrite, restructure, or enhance phrasing. You may add industry-standard action verbs and formatting. 

CRITICAL RULES — DO NOT VIOLATE:
- NEVER invent, fabricate, or add any facts not present in the input text
- NEVER invent company names, job titles, degrees, institutions, dates, projects, technologies, certifications, achievements, or work experience
- NEVER add numbers, metrics, or accomplishments that are not in the input
- NEVER change technical terms (language names, framework names, tool names) unless fixing spelling
- If the input is empty, return empty string
- Return ONLY the improved text, no markdown, no code fences, no explanations

Input type: {TYPE}
Input text: {INPUT}
Improved text:`;

export async function improveContent(text, type) {
  if (!text || text.trim().length === 0) {
    return "";
  }

  const prompt = IMPROVE_SYSTEM_PROMPT
    .replace("{TYPE}", type || "general")
    .replace("{INPUT}", text);

  const result = await model.generateContent([prompt]);
  const response = result.response;
  const improvedText = response.text().trim();

  return improvedText;
}
