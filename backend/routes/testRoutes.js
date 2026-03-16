import express from "express";
import cloudinary from "../config/cloudinary.js";

const testRouter = express.Router();

testRouter.get("/cloudinary-test", async (req, res) => {
  try {

    const result = await cloudinary.uploader.upload(
      "https://static.vecteezy.com/vite/assets/photo-masthead-375-BoK_p8LG.webp"
    );

    res.json({
      message: "Cloudinary working",
      url: result.secure_url
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default testRouter;