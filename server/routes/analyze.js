import { detectFileType, extractTextFromPDF, extractTextFromDOCX } from '../services/parser.js';
import { analyzeResume } from '../services/gemini.js';

export default async function analyzeRoute(req, res) {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const fileType = detectFileType(file.originalname);

    if (!fileType) {
      return res.status(400).json({ error: 'Unsupported file format. Please upload PDF or DOCX.' });
    }

    let text = '';
    if (fileType === 'pdf') {
      text = await extractTextFromPDF(file.buffer);
    } else if (fileType === 'docx') {
      text = await extractTextFromDOCX(file.buffer);
    }

    if (!text.trim() || text.trim().length < 50) {
      return res.status(400).json({ error: 'Could not extract meaningful text from resume. Please upload a valid resume.' });
    }

    const analysis = await analyzeResume(text);
    res.json(analysis);
  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ error: error.message || 'Failed to analyze resume. Please try again.' });
  }
}
