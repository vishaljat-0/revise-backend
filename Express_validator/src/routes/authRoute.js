import { Router } from "express";
import { registerController } from "../controllers/authContoller.js";

const authRouter = Router();

authRouter.get("/register", registerController);
export default authRouter;
