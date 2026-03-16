import { Comment } from "../models/Comment.js";

// Add comment
export const addComment = async (req, res) => {
  try {
    const comment = new Comment({
      ...req.body,
      user: req.user.userId,
    });

    const savedComment = await comment.save();

    res.status(201).json(savedComment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Get comments
export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({
      issueId: req.params.issueId,
    }).populate("user", "username");

    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};