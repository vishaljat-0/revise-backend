import dotenv from 'dotenv';

dotenv.config();
import { initServer } from './src/socket.io/server.socket.js';
import app from './src/app.js';
import connectDB from './src/config/db.js';
import http from 'http';

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB();
    const httpServer =http.createServer(app);

    initServer(httpServer);

    httpServer.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
