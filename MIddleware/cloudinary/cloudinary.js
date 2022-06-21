require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'qoben354',
  api_key: '243394727826349',
  api_secret: 'Nu4mXgECjWPY5x6Ah4koNWc4LSU',
});

//upload image
const uploadImages = async (files) => {
  const dt = await cloudinary.uploader.upload(files);
  return dt;
};

const deleteImages = async (files) => {
  const deleteIamge = await cloudinary.uploader.destroy(files);
};

module.exports = {
  uploadImages,
};
