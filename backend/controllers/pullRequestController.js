// pullRequestController.js
import { PullRequest } from "../models/PullRequest.js";

export const createPR = async (req, res) => {
  try {
    const { repository, title, description, commits } = req.body;

    const pr = await PullRequest.create({
      repository,
      title,
      description,
      commits,
      author: req.user.userId
    });

    res.status(201).json({
      message: "Pull request created",
      pr
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getPRs = async (req, res) => {
  try {
    const prs = await PullRequest.find({
      repository: req.params.repoId
    }).populate("author", "username");

    res.json(prs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const mergePR = async (req, res) => {
  try {
    const pr = await PullRequest.findById(req.params.id);

    if (!pr) {
      return res.status(404).json({ message: "Pull request not found" });
    }

    pr.status = "merged";
    await pr.save();

    res.json(pr);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getPRById = async (req, res) => {
  try {
    const pr = await PullRequest.findById(req.params.id)
      .populate("author", "username");

    if (!pr) {
      return res.status(404).json({ message: "Pull request not found" });
    }

    res.json(pr);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const closePR = async (req, res) => {
  try {
    const pr = await PullRequest.findById(req.params.id);

    if (!pr) {
      return res.status(404).json({ message: "Pull request not found" });
    }

    pr.status = "closed";
    await pr.save();

    res.json(pr);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const reopenPR = async (req, res) => {
  try {
    const pr = await PullRequest.findById(req.params.id);

    if (!pr) {
      return res.status(404).json({ message: "Pull request not found" });
    }

    pr.status = "open";
    await pr.save();

    res.json(pr);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updatePR = async (req, res) => {
  try {
    const pr = await PullRequest.findById(req.params.id);

    if (!pr) {
      return res.status(404).json({ message: "Pull request not found" });
    }

    const { title, description } = req.body;

    if (title) pr.title = title;
    if (description) pr.description = description;

    await pr.save();

    res.json(pr);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deletePR = async (req, res) => {
  try {
    const pr = await PullRequest.findById(req.params.id);

    if (!pr) {
      return res.status(404).json({ message: "Pull request not found" });
    }

    await pr.deleteOne();

    res.json({
      message: "Pull request deleted"
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};