import { Commit } from "../models/Commit.js";

// Create commit
export const createCommit = async (req, res) => {
  try {
    const commit = new Commit({
      ...req.body,
      author: req.user.userId,
    });

    const savedCommit = await commit.save();

    res.status(201).json({
      message: "Commit created",
      commit: savedCommit,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Get commits for repo
export const getCommits = async (req, res) => {
  try {
    const commits = await Commit.find({
      repoId: req.params.repoId,
    }).populate("author", "username");

    res.json(commits);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};