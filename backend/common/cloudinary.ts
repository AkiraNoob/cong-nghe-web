import cloudinary from 'cloudinary';
import config from '../config';

cloudinary.v2.config({
  cloud_name: config.cloudinary.CLOUDINARY_NAME,
  api_key: config.cloudinary.CLOUDINARY_API_KEY,
  api_secret: config.cloudinary.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (file: string) => {
  const uploadedImageResponse = await cloudinary.v2.uploader.upload(file, {
    resource_type: 'image',
  });

  return uploadedImageResponse;
};

export const uploadVideo = async (file: string) => {
  const uploadedImageResponse = await cloudinary.v2.uploader.upload(file, {
    resource_type: 'video',
  });

  return uploadedImageResponse;
};
