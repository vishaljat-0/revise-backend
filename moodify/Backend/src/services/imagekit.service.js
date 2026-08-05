const ImageKit = require("imagekit");
//   configure

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,   
});
const uploadfun = async ({ buffer, filename, folder }) => {
  const file = await imagekit.upload({
    file: buffer,
    fileName: filename,
    folder: folder,
  });
  return file;
};
 module.exports = { uploadfun };