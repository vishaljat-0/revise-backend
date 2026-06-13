const express = require("express");
const {
  registerController,
  loginController,
  getMeController,
} = require("../controllers/auth.controller");
const { get } = require("mongoose");
const authMiddleware = require("../middleware/auth.middleware");
const authRouter = express.Router();

authRouter.post("/register", registerController);
authRouter.post("/login", loginController);
authRouter.get("/get-me",authMiddleware,getMeController
);

module.exports = authRouter;
