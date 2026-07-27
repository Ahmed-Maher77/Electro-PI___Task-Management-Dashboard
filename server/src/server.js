import app from './app.js';
import { connectDB } from './config/db.js';
import { env } from './config/env.js';

const startServer = async () => {
  try {
    await connectDB();
    const PORT = parseInt(env.PORT, 10) || 5000;
    app.listen(PORT, () => {
      console.log(`الخادم يعمل في وضع ${env.NODE_ENV} على المنفذ ${PORT}`);
    });
  } catch (error) {
    console.error('فشل بدء الخادم:', error);
    process.exit(1);
  }
};

startServer();
