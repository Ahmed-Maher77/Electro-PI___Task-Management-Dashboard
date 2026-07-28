import dns from 'node:dns';
import mongoose from 'mongoose';
import { env } from './env.js';

// Configure Node.js to use Google DNS & Cloudflare DNS for SRV record resolution
try {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch (err) {
  console.warn('Could not set custom DNS servers:', err.message);
}

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`MongoDB Connected successfully: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`Database connection warning: ${error.message}. Server running with local fallback mode.`);
    try {
      await mongoose.disconnect();
    } catch (_) {}
  }
};
