import { improveContent } from '../services/gemini.js';

export default async function improveRoute(req, res) {
  try {
    const { text, type } = req.body;

    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Text content is required.' });
    }

    if (text.trim().length === 0) {
      return res.status(400).json({ error: 'Text content cannot be empty.' });
    }

    const improvedText = await improveContent(text, type || 'general');
    res.json({ improvedText });
  } catch (error) {
    console.error('AI improvement error:', error);
    res.status(500).json({ error: error.message || 'Failed to improve content.' });
  }
}
