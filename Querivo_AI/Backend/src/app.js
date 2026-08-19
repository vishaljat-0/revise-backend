import express from 'express';
import AuthRouter from './routes/auth.route.js';
import { errorHandler } from './middleware/errorHandler.js';
import { cookie } from 'express-validator';
import cookieParser from "cookie-parser";
import cors from 'cors';
import ChatRouter from './routes/chat.route.js';



const app = express();

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler);
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use('/api/auth', AuthRouter);
app.use("/api/chats", ChatRouter)


export default app;

