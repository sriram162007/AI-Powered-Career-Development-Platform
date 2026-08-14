import path from 'node:path';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';
import mammoth from 'mammoth';

const standardFontDataUrl = path.join(process.cwd(), 'node_modules', 'pdfjs-dist', 'standard_fonts');

export async function extractTextFromPDF(buffer) {
  try {
    const loadingTask = getDocument({
      data: new Uint8Array(buffer),
      useWorker: false,
      standardFontDataUrl: standardFontDataUrl + '/',
    });
    const doc = await loadingTask.promise;
    let text = '';
    for (let i = 1; i <= doc.numPages; i++) {
      const page = await doc.getPage(i);
      const content = await page.getTextContent();
      text += content.items.map((item) => item.str).join('\n');
    }
    return text || '';
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
