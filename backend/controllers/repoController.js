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



// Update repository details
export const updateRepo = async (req, res) => {
  try {

    const repo = await Repository.findById(req.params.id);

    if (!repo)
      return res.status(404).json({ message: "Repository not found" });

    Object.assign(repo, req.body);

    await repo.save();

    res.json(repo);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Add collaborator to repository
export const addCollaborator = async (req, res) => {
  try {

    const repo = await Repository.findById(req.params.id);

    if (!repo)
      return res.status(404).json({ message: "Repository not found" });

    repo.collaborators.push({
      user: req.body.userId,
      role: req.body.role || "collaborator",
    });

    await repo.save();

    res.json(repo);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Remove collaborator
export const removeCollaborator = async (req, res) => {
  try {

    const repo = await Repository.findById(req.params.id);

    if (!repo)
      return res.status(404).json({ message: "Repository not found" });

    repo.collaborators = repo.collaborators.filter(
      (c) => c.user.toString() !== req.params.userId
    );

    await repo.save();

    res.json(repo);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Change collaborator role
export const updateCollaboratorRole = async (req, res) => {
  try {

    const repo = await Repository.findById(req.params.id);

    if (!repo)
      return res.status(404).json({ message: "Repository not found" });

    const collaborator = repo.collaborators.find(
      (c) => c.user.toString() === req.params.userId
    );

    if (!collaborator)
      return res.status(404).json({ message: "Collaborator not found" });

    collaborator.role = req.body.role;

    await repo.save();

    res.json(repo);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get repository collaborators
export const getCollaborators = async (req, res) => {
  try {

    const repo = await Repository.findById(req.params.id)
      .populate("collaborators.user", "username email");

    if (!repo)
      return res.status(404).json({ message: "Repository not found" });

    res.json(repo.collaborators);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};