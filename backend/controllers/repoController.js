import { Repository } from "../models/Repository.js";

export const createRepo = async (req, res) => {
  const repo = new Repository({
    ...req.body,
    owner: req.user.userId,
  });

  const created = await repo.save();

  res.status(201).json(created);
};

export const getRepos = async (req, res) => {
  const repos = await Repository.find();

  res.json(repos);
};

// Get single repository
export const getRepoById = async (req, res) => {
  try {
    const repo = await Repository.findById(req.params.id);

    if (!repo) {
      return res.status(404).json({ message: "Repository not found" });
    }

    res.json(repo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete repository
export const deleteRepo = async (req, res) => {
  try {
    const repo = await Repository.findById(req.params.id);

    if (!repo) {
      return res.status(404).json({ message: "Repository not found" });
    }

    await repo.deleteOne();

    res.json({ message: "Repository deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};