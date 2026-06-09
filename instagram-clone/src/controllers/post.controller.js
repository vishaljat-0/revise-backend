// const ImageKit = require("imagekit");

const cloudinary = require("cloudinary");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const postModel = require("../models/post.model");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

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
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized access ,token not found",
    });
  }
  let decoded = null;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized access ,token invalid",
    });
  }

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
    imgUrl: file.secure_url || file.url,
    user: decoded.id,
  });
  res.status(201).json({
    success: true,
    message: "Post created successfully",
    data: post,
  });
};

module.exports = {
  postController,
};
