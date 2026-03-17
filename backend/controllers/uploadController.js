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

// Upload multiple project files
export const uploadMultipleFiles = async (req, res) => {
  try {

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        message: "No files uploaded"
      });
    }

    const uploadedFiles = [];

    for (const file of req.files) {

      const result = await cloudinary.uploader.upload(file.path);

      uploadedFiles.push({
        fileName: file.originalname,
        fileUrl: result.secure_url
      });
    }

    res.json({
      message: "Files uploaded successfully",
      files: uploadedFiles
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// Delete file from cloudinary
export const deleteFile = async (req, res) => {
  try {

    const { publicId } = req.body;

    if (!publicId) {
      return res.status(400).json({
        message: "publicId required"
      });
    }

    await cloudinary.uploader.destroy(publicId);

    res.json({
      message: "File deleted successfully"
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// Replace / update existing file
export const updateFile = async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded"
      });
    }

    const result = await cloudinary.uploader.upload(req.file.path);

    res.json({
      message: "File updated successfully",
      fileUrl: result.secure_url
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};