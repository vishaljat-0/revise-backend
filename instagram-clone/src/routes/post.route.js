const express = require("express");
const multer = require("multer");
const { postController } = require("../controllers/post.controller");
const postRouter = express.Router();
const upload = multer({ storage: multer.memoryStorage() });


postRouter.post("/", upload.single("imageUrl"), postController);

module.exports = postRouter;
