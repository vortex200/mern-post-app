const { config, uploader } = require("cloudinary");
const { formatFile } = require("../utils/dataParser");
require("dotenv").config();

const cloudinaryConfig = (req, res, next) => {
  config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  next();
};

const uploadImage = async (file) => {
  return new Promise((resolve, reject) => {
    const image = formatFile(file);

    uploader
      .upload(image.content)
      .then((result) => {
        resolve(result);
      })
      .catch((err) => reject(err));
  });
};

module.exports = { cloudinaryConfig, uploadImage };
