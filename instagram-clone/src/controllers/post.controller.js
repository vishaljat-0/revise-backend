// const ImageKit = require("imagekit");

const cloudinary = require("cloudinary");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const postModel = require("../models/post.model");



// const client = new ImageKit({
//   privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
//   publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
//   urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
// });

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const postController = async (req, res) => {


  const userId = req.user.id;
  console.log(userId);


  // const file = await client.upload({
  //   file: req.file.buffer.toString("base64"),
  //   fileName: req.file.originalname,
  //   folder: "posts",
  // });
  const fileStr = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

  const file = await cloudinary.v2.uploader.upload(fileStr, {
    resource_type: "image",
    public_id: `post_${Date.now()}`,
    overwrite: true,
  });

  const post = await postModel.create({
    caption: req.body.caption,
    imgUrl: file.secure_url,
    user: userId,
  });
  res.status(201).json({
    success: true,
    message: "Post created successfully",
    data: post,
  });
};

const getPostController = async (req, res) => {
  const user = req.user.id;
  const posts = await postModel.find({ user: user });

  res.status(200).json({
    success: true,
    message: "Posts fetched successfully",
    data: posts,
  });
};
const getDetailedPostController = async (req, res) => {
  const userId = req.user.id;
  const postId = req.params.postId;

  const post = await postModel.findById(postId);
  if (!post) {
    return res.status(404).json({
      success: false,
      message: "Post not found",
    });
  }
  const isvaliduser = post.user.toString() === userId;
  if (!isvaliduser) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized access",
    });
  }

  res.status(200).json({
    success: true,
    message: "Post fetched successfully",
    data: post,
  });
};

module.exports = {
  postController,
  getPostController,
  getDetailedPostController,
};
