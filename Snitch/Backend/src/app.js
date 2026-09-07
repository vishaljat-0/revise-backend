import express from "express";
import morgan from "morgan";
import authRouter from './routes/authRoute.js'
import cors from "cors";

const app = express();
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/auth", authRouter)


export default app;
