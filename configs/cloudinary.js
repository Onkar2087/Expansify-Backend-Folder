import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// ✅ Move config OUTSIDE function (runs only once when server starts)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Upload function
const uploadOnCloudinary = async (filePath) => {
  try {
    if (!filePath) return null;

    const uploadResult = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });

    // ✅ Delete local file after upload
    fs.unlinkSync(filePath);

    return uploadResult.secure_url;

  } catch (error) {
    // ❗ Important: delete file even if upload fails
    if (filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    console.error("Cloudinary upload error:", error);
    return null;
  }
};

export default uploadOnCloudinary;