import express from 'express';
import AuthRouter from './routes/auth.route.js';
import { errorHandler } from './middleware/errorHandler.js';


const app = express();

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler);

app.use('/api/auth', AuthRouter);


export default app;

