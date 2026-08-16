import express from 'express';
import AuthRouter from './routes/auth.route.js';
import { errorHandler } from './middleware/errorHandler.js';
import { cookie } from 'express-validator';
import cookieParser from "cookie-parser";
import testModel from './services/ai.service.js';



const app = express();
testModel()

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler);
app.use(cookieParser());

app.use('/api/auth', AuthRouter);


export default app;

