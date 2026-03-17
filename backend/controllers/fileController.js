// fileController.js
import cloudinary from "../config/cloudinary.js";

// Upload file
export const uploadFile = async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded"
      });
    }

    const result = await cloudinary.uploader.upload(req.file.path);

    res.status(200).json({
      message: "File uploaded successfully",
      fileUrl: result.secure_url
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Upload multiple files
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


// Delete file
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


// Update file
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

// Get single file by ID
export const getFileById = async (req, res) => {
  try {
    const file = await File.findById(req.params.id).populate("uploadedBy", "username email");

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    res.json(file);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};