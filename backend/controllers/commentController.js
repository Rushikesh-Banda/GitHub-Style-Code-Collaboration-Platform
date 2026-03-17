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

// Get single comment
export const getCommentById = async (req, res) => {
  try {

    const comment = await Comment.findById(req.params.id)
      .populate("user","username");

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found"
      });
    }

    res.json(comment);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Update comment
export const updateComment = async (req, res) => {
  try {

    const comment = await Comment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(comment);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Delete comment
export const deleteComment = async (req, res) => {
  try {

    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found"
      });
    }

    await comment.deleteOne();

    res.json({
      message: "Comment deleted"
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};