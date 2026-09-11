import { Router } from "express";
import {
    googleCallbackController,
  loginController,
  registerController,
} from "../contollers/authController.js";
import validate, { loginValidate } from "../validation/authValidator.js";
import passport from "passport";
const router = Router();

router.post("/register", validate, registerController);
router.post("/login", loginValidate, loginController);
// /api/auth/google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "http://localhost:5173/login",

  }),
  googleCallbackController

);
export default router;
