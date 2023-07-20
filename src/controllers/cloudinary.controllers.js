import Image from "../models/image.models.js";
import { cloudinary, upload } from "../config/cloudinary.config.js";

export const getImages = async (req, res) => {
  try {
  } catch (error) {}
};

export const deleteImage = async (req, res) => {
  const { id } = req.params;

  console.log(id);

  // const paramsToSign = {
  //   preset_name: process.env.REACT_APP_YOUR_PRESET_NAME,
  // };
  // const signature = cloudinary.utils.api_sign_request(
  //   paramsToSign,
  //   process.env.REACT_APP_YOUR_API_SECRET
  // );
  // const now = Date.now();
  //   console.log({
  //     public_id: id,
  //     api_key: process.env.REACT_APP_YOUR_API_KEY,
  //     api_secret: process.env.REACT_APP_YOUR_API_SECRET,
  //     signature: signature,
  //     timestamp: now,
  //   });

  try {
    const folder = "ShiroPlane";

    await cloudinary.uploader.destroy(id, { folder }, function (error, result) {
      if (error) {
        console.log("Failed to delete image: ", error);
      } else {
        console.log("Successfully deleted image: ", result);
      }
    });

    // await cloudinary.v2.uploader.destroy(id, options).then(callback);

    // await Axios.post(
    //   `https://api.cloudinary.com/v1_1/dqmorrdhr/image/destroy`,
    //   {
    //     public_id: id,
    //     api_key: process.env.REACT_APP_YOUR_API_KEY,
    //     api_secret: process.env.REACT_APP_YOUR_API_SECRET,
    //     signature: signature,
    //     timestamp: now,
    //   }
    // );

    const response = res.status(200).json({
      status: "success",
      message: "image in cloudinary successfuly deleted",
    });

    return response;
  } catch (error) {
    const response = res.status(500).json({
      status: "fail",
      message: error.message,
    });
    return response;
  }
};

export const insertImage = async (req, res) => {
  // Use the upload middleware to handle the image upload
  upload.single("file")(req, res, async (error) => {
    if (error) {
      console.error("Error uploading image:", error);
      return res.status(500).json({ error: "Image upload failed" });
    }

    // Upload the image to Cloudinary
    try {
      const result = await cloudinary.uploader.upload(req.file.path);
      
      // Return the result
      return res.json({
        secure_url: result.secure_url,
        public_id: result.public_id
      });

    } catch (error) {
      console.log('Cloudinary upload error:', error);
      return res.status(500).send('Upload to Cloudinary failed');
    }
  });
};
