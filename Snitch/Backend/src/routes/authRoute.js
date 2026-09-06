import { Router } from "express";
import { registerController } from "../contollers/authController.js";
import validate from "../validation/authValidator.js";
const router = Router();

router.post("/register", validate, registerController);
export default router;
