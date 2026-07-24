import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import analyzeRoute from './routes/analyze.js';

const app = express();
app.use(cors());

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

app.use('/api/analyze', upload.single('resume'), analyzeRoute);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Resume analyzer backend running on http://localhost:${PORT}`);
});
