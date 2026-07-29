import dns from 'node:dns';
import mongoose from 'mongoose';
import { env } from './env.js';

// Configure Node.js to use Google & Cloudflare DNS for SRV record resolution
try {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch (err) {
  console.warn('Could not set custom DNS servers:', err.message);
}

// Cached connection for Serverless & Production environments
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export const connectDB = async () => {
  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // Fail fast if DB disconnected instead of 10s buffering timeout
      serverSelectionTimeoutMS: 5000,
    };

    cached.promise = mongoose.connect(env.MONGO_URI, opts).then((m) => {
      console.log(`MongoDB Connected successfully: ${m.connection.host}`);
      return m;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error('MongoDB Connection Error:', e.message);
    throw e;
  }

  return cached.conn;
};
