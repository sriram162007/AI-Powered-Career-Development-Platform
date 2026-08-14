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
