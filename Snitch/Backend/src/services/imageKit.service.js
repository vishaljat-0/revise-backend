import ImageKit from "@imagekit/nodejs";
import configkeys from "../config/config.js";

const imagekit = new ImageKit({
  privateKey: configkeys.IMAGEKIT_PRIVATE_KEY,
});

const imageKitUpload = async (files) => {
  const result = await Promise.all(
    files.map((file) => {
      return imagekit.files.upload({
        file: file.buffer.toString("base64"),
        fileName: file.originalname,
      });
    })
  );

  return result.map((item) => item.url);
};

export default imageKitUpload;