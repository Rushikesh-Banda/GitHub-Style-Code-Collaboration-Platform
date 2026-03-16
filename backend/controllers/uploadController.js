import cloudinary from "../config/cloudinary.js";

// Upload file to cloud storage
export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Upload file to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    res.status(200).json({
      message: "File uploaded successfully",
      fileUrl: result.secure_url,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};