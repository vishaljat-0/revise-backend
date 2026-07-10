const express = require("express");
const { registerController,loginController, getMeController, logoutController } = require("../contollers/Auth.controller");
const { authMiddleware } = require("../middleware/auth.middleware");
const authRouter = express.Router();

authRouter.post("/register", registerController);
authRouter.post("/login", loginController);
authRouter.get('/get-me', authMiddleware,getMeController)
authRouter.post('/logout', authMiddleware,logoutController)



module.exports = authRouter;
