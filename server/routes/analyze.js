import { detectFileType, extractTextFromPDF, extractTextFromDOCX } from '../services/parser.js';
import { analyzeResume } from '../services/gemini.js';

export default async function analyzeRoute(req, res) {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded. Please select a file first.' });
    }

    console.log(`Received file: ${file.originalname}, size: ${file.size} bytes, mimetype: ${file.mimetype}`);

    const fileType = detectFileType(file.originalname);

    if (!fileType) {
      return res.status(400).json({ error: 'Unsupported file format. Please upload PDF or DOCX.' });
    }

    const allowedMimes = {
      pdf: ['application/pdf'],
      docx: ['application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    };

    const hasValidMime = allowedMimes[fileType].some((mime) =>
      file.mimetype === mime || file.mimetype === 'application/octet-stream'
    );

    if (!hasValidMime) {
      return res.status(400).json({ error: `Invalid file type for ${file.originalname}. Expected ${fileType.toUpperCase()} but got ${file.mimetype || 'unknown format'}.` });
    }

    let text = '';
    try {
      if (fileType === 'pdf') {
        text = await extractTextFromPDF(file.buffer);
      } else if (fileType === 'docx') {
        text = await extractTextFromDOCX(file.buffer);
      }
    } catch (parseError) {
      console.error('Text extraction failed:', parseError);
      return res.status(400).json({ error: parseError.message || 'Failed to extract text from file.' });
    }

    if (!text.trim() || text.trim().length < 50) {
      return res.status(400).json({ error: 'Could not extract meaningful text from resume. Please upload a valid resume with readable content.' });
    }

    console.log(`Extracted ${text.length} characters of text. Sending to Gemini for analysis...`);

    const analysis = await analyzeResume(text);
    console.log('Analysis complete.');
    res.json(analysis);
  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ error: error.message || 'Failed to analyze resume. Please try again.' });
  }
}
