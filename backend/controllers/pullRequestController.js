import { PullRequest } from "../models/PullRequest.js";

// Create pull request
export const createPR = async (req, res) => {
  try {
    const pr = new PullRequest({
      ...req.body,
      author: req.user.userId,
    });

    const createdPR = await pr.save();

    res.status(201).json({
      message: "Pull request created",
      pr: createdPR,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Get pull requests
export const getPRs = async (req, res) => {
  try {
    const prs = await PullRequest.find({
      repoId: req.params.repoId,
    }).populate("author", "username");

    res.json(prs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Merge pull request
export const mergePR = async (req, res) => {
  try {
    const pr = await PullRequest.findByIdAndUpdate(
      req.params.id,
      { status: "merged" },
      { new: true }
    );

    res.json(pr);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};