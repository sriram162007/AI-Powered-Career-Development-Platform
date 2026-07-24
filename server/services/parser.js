import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';

export async function extractTextFromPDF(buffer) {
  try {
    const data = await pdfParse(buffer);
    return data.text || '';
  } catch (error) {
    console.error('PDF parsing error:', error);
    throw new Error('Could not parse PDF file. Please make sure it is a valid PDF document.');
  }
}

export async function extractTextFromDOCX(buffer) {
  try {
    const result = await mammoth.extractRawText({ buffer });
    return result.value || '';
  } catch (error) {
    console.error('DOCX parsing error:', error);
    throw new Error('Could not parse DOCX file. Please make sure it is a valid Word document.');
  }
}

export function detectFileType(filename) {
  const lower = filename.toLowerCase();
  if (lower.endsWith('.pdf')) return 'pdf';
  if (lower.endsWith('.docx')) return 'docx';
  return null;
}
