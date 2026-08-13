import { Router } from "express";
import { registerController } from "../controllers/auth.controller.js";
import { registerValidation } from "../middleware/auth.validation.js";
const AuthRouter= Router()



 AuthRouter.post("/register",registerValidation,registerController);





export default AuthRouter;