import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import { env } from './config/env.js';
import { activityRouter } from './routes/activityRoutes.js';
import { authRouter } from './routes/authRoutes.js';
import { contactRouter } from './routes/contactRoutes.js';
import { sosRouter } from './routes/sosRoutes.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';

export const app = express();

app.use(helmet());
app.use(cors({ origin: env.clientOrigin, credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(morgan('dev'));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 300 }));

app.get('/health', (_req, res) => res.json({ success: true, service: 'OnePulse API', status: 'healthy' }));
// REST resources are intentionally small and modular for final-year project evaluation and scaling.
app.use('/api/auth', authRouter);
app.use('/api/contacts', contactRouter);
app.use('/api/sos', sosRouter);
app.use('/api/activities', activityRouter);

app.use(notFound);
app.use(errorHandler);
