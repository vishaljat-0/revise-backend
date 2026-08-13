import express from "express";
import authRouter from "./routes/authRoute.js";
const app = express();

app.use("/auth", authRouter);

export default app;
