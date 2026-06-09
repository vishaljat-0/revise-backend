const express = require("express");
const multer = require("multer");
const { postController, getPostController, getDetailedPostController } = require("../controllers/post.controller");
const authMiddleware = require("../middleware/auth.middleware");
const postRouter = express.Router();
const upload = multer({ storage: multer.memoryStorage() });


postRouter.post("/",authMiddleware, upload.single("imageUrl"), postController);
postRouter.get("/",authMiddleware, getPostController);
postRouter.get("/details/:postId",authMiddleware, getDetailedPostController);

module.exports = postRouter;
