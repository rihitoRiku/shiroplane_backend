import { v2 as cloudinary } from 'cloudinary';
import dotenv from "dotenv";
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.REACT_APP_YOUR_CLOUD_NAME,
  api_key: process.env.REACT_APP_YOUR_API_KEY,
  api_secret: process.env.REACT_APP_YOUR_API_SECRET,
});

// Set up Multer storage using Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'ShiroPlane', // Replace with your desired folder name
  },
});
// Set up Multer middleware
const upload = multer({ storage });


export { cloudinary, upload };