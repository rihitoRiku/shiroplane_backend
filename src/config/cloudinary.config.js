import { v2 as cloudinary } from 'cloudinary';
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.REACT_APP_YOUR_CLOUD_NAME,
  api_key: process.env.REACT_APP_YOUR_API_KEY,
  api_secret: process.env.REACT_APP_YOUR_API_SECRET,
});

export default cloudinary;