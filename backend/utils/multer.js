import multer from "multer";

// Storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

// File filter (optional but recommended)
const fileFilter = (req, file, cb) => {
  cb(null, true);
};

export const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 100 // 10MB limit
  },
  fileFilter
});