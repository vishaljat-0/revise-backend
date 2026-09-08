import { Router } from "express";
import { loginController, registerController } from "../contollers/authController.js";
import validate, { loginValidate } from "../validation/authValidator.js";
const router = Router();

router.post("/register", validate, registerController);
router.post("/login",loginValidate, loginController );
export default router;
