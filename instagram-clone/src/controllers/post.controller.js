const ImageKit  = require("imagekit");
const multer = require("multer");

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })


const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,

});


const postController = async (req, res) => {
  const file = await client.upload({
  file: req.file.buffer.toString("base64"),
  fileName: req.file.originalname,
  folder: "posts",
  })
  res.status(201).json({  
    success: true,
    message: "Post created successfully",
    data: file
  });
  
};

module.exports = {
  postController,
};
