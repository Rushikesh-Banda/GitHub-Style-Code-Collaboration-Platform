import mongoose from "mongoose";

const commitSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true
  },

  repository: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Repository"
  },

  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  files: [
    {
      fileName: String,
      fileUrl: String
    }
  ],

  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Commit = mongoose.model("Commit", commitSchema);