const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const { followController, unFollowController } = require("../controllers/user.controller");

const userRouter = express.Router();


userRouter.post("/follow/:userId",authMiddleware,followController)
userRouter.post("/unFollow/:userId",authMiddleware,unFollowController)






module.exports = userRouter;