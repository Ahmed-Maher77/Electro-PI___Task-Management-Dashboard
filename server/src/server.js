import app from './app.js';
import { connectDB } from './config/db.js';
import { env } from './config/env.js';

const startServer = async () => {
  try {
    await connectDB();
    const PORT = parseInt(env.PORT, 10) || 5000;
    const server = app.listen(PORT, () => {
      console.log(`الخادم يعمل في وضع ${env.NODE_ENV} على المنفذ ${PORT}`);
    });

    server.on('error', (err) => {
      console.error('Server error:', err);
    });
  } catch (error) {
    console.error('فشل بدء الخادم:', error);
  }
};

startServer();
