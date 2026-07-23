import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';

export async function extractTextFromPDF(buffer) {
  const data = await pdfParse(buffer);
  return data.text || '';
}

export async function extractTextFromDOCX(buffer) {
  const result = await mammoth.extractRawText({ buffer });
  return result.value || '';
}

export function detectFileType(filename) {
  const lower = filename.toLowerCase();
  if (lower.endsWith('.pdf')) return 'pdf';
  if (lower.endsWith('.docx')) return 'docx';
  return null;
}
