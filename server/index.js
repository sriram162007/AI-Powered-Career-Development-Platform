import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import analyzeRoute from './routes/analyze.js';
import improveRoute from './routes/improve.js';

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

app.use('/api/analyze', upload.single('resume'), analyzeRoute);
app.use('/api/improve', improveRoute);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Resume analyzer backend running on http://localhost:${PORT}`);
});
