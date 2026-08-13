import { Router } from "express";
import { emailVerificationController, getMeController, loginController, registerController } from "../controllers/auth.controller.js";
import { registerValidation } from "../validation/auth.validation.js";
import { authUser } from "../middleware/auth.middleware.js";
const AuthRouter= Router()



 AuthRouter.post("/register",registerValidation,registerController);
 AuthRouter.get("/email-verify", emailVerificationController);
 AuthRouter.post("/login", loginController);
 AuthRouter.get("/getMe",authUser,getMeController)





export default AuthRouter;