import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export const env = {
  PORT: process.env.PORT || '5000',
  NODE_ENV: process.env.NODE_ENV || 'development',
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/task-dashboard',
  JWT_SECRET: process.env.JWT_SECRET || 'fallback_jwt_secret',
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
};
