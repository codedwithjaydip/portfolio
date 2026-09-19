import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';

import { connectDB, isDbConnected } from './config/db.js';
import { apiLimiter } from './middleware/rateLimiters.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';
import { requireDatabase } from './middleware/requireDatabase.js';
import projectRoutes from './routes/projectRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

const app = express();

app.set('trust proxy', 1);
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));

const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error('Origin not allowed by CORS.'));
    },
    credentials: true,
  })
);

app.use(express.json({ limit: '100kb' }));
if (process.env.NODE_ENV !== 'production') app.use(morgan('dev'));
app.use('/api', apiLimiter);

app.get('/api/health', (req, res) =>
  res.json({ success: true, uptime: process.uptime(), database: isDbConnected() ? 'connected' : 'offline' })
);

app.use('/api/projects', requireDatabase, projectRoutes);
app.use('/api/contact', requireDatabase, contactRoutes);
app.use('/api/admin', requireDatabase, adminRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Bind the port first so health checks and the CORS preflight answer straight
// away, then connect in the background. A slow or unavailable database
// degrades the API instead of preventing it from starting.
app.listen(PORT, () => console.log(`API listening on http://localhost:${PORT}`));
connectDB();

export default app;
