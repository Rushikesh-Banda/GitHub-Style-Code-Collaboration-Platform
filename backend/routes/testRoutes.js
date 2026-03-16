import express from "express";
import cloudinary from "../config/cloudinary.js";

const router = express.Router();

router.get("/cloudinary-test", async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(
      "https://res.cloudinary.com/demo/image/upload/sample.jpg"
    );

    res.json({
      message: "Cloudinary working",
      url: result.secure_url
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;