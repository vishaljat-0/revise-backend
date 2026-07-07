const express = require("express");
const multer = require("multer");
const { postController, getPostController, getDetailedPostController, likeController, unLikeController, getFeedController } = require("../controllers/post.controller");
const authMiddleware = require("../middleware/auth.middleware");
const postRouter = express.Router();
const upload = multer({ storage: multer.memoryStorage() });


postRouter.post("/",authMiddleware, upload.single("imageUrl"), postController);
postRouter.get("/",authMiddleware, getPostController);
postRouter.get("/details/:postId",authMiddleware, getDetailedPostController);
postRouter.get('/like/:postId',authMiddleware,likeController)
postRouter.get('/unLike/:postId',authMiddleware,unLikeController)
postRouter.get('/get-feed',authMiddleware,getFeedController)

module.exports = postRouter;
