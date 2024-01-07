/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_DOMAIN: process.env.API_DOMAIN,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
  },
};

module.exports = nextConfig;
