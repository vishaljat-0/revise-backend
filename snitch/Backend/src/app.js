import express from "express";
import morgan from "morgan";
import authRouter from './routes/authRoute.js'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/auth", authRouter)


export default app;
