import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import routes from './routes/index.js';
import { errorMiddleware } from './middleware/error.middleware.js';
import { ApiError } from './utils/ApiError.js';
import { env } from './config/env.js';
import { connectDB } from './config/db.js';

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
  })
);

if (env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Database connection guard middleware (ensures active DB connection in Production & Serverless)
app.use(async (_req, _res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    next(new ApiError(500, `فشل الاتصال بقاعدة البيانات: ${err.message}`));
  }
});

// Mount API routes
app.use('/api', routes);

// 404 handler
app.use((_req, _res, next) => {
  next(new ApiError(404, 'المسار غير موجود على هذا الخادم'));
});

// Global error handler
app.use(errorMiddleware);

export default app;
