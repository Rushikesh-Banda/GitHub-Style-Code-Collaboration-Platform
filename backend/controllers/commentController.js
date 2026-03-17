// commentController.js
import { Comment } from "../models/Comment.js";

export const addComment = async (req, res) => {
  try {
    const { text, issue, pullRequest } = req.body;

    const comment = await Comment.create({
      text,
      issue,
      pullRequest,
      user: req.user.userId
    });

    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({
      issue: req.params.issueId
    }).populate("user", "username");

    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getCommentById = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id)
      .populate("user", "username");

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

export const updateComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found"
      });
    }

    if (comment.user.toString() !== req.user.userId) {
      return res.status(403).json({
        message: "You can only edit your comments"
      });
    }

    comment.text = req.body.text || comment.text;

    await comment.save();

    res.json(comment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found"
      });
    }

    if (comment.user.toString() !== req.user.userId) {
      return res.status(403).json({
        message: "You can only delete your comments"
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