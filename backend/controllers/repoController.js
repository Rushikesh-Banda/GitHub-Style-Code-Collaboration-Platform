import { Repository } from "../models/Repository.js";

// Create repository
export const createRepo = async (req, res) => {
  try {
    const repo = new Repository({
      ...req.body,
      owner: req.user.userId,
    });

    const createdRepo = await repo.save();

    res.status(201).json({
      message: "Repository created",
      repo: createdRepo,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Get all repositories
export const getRepos = async (req, res) => {
  try {
    const repos = await Repository.find().populate(
      "owner",
      "username email"
    );

    res.json(repos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Get single repository
export const getRepoById = async (req, res) => {
  try {
    const repo = await Repository.findById(req.params.id)
      .populate("owner", "username");

    if (!repo)
      return res.status(404).json({ message: "Repository not found" });

    res.json(repo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Delete repository
export const deleteRepo = async (req, res) => {
  try {
    await Repository.findByIdAndDelete(req.params.id);

    res.json({ message: "Repository deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};