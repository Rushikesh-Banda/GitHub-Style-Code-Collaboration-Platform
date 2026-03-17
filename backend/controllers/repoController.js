// repoController.js
import { Repository } from "../models/Repository.js";

export const createRepo = async (req, res) => {
  try {
    const { name, description, visibility } = req.body;

    const repo = await Repository.create({
      name,
      description,
      visibility,
      owner: req.user.userId,
      collaborators: []
    });

    res.status(201).json(repo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRepos = async (req, res) => {
  try {
    const repos = await Repository.find()
      .populate("owner", "username email")
      .populate("collaborators.user", "username email");

    res.json(repos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRepoById = async (req, res) => {
  try {
    const repo = await Repository.findById(req.params.id)
      .populate("owner", "username email")
      .populate("collaborators.user", "username email");

    if (!repo) {
      return res.status(404).json({ message: "Repository not found" });
    }

    res.json(repo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteRepo = async (req, res) => {
  try {
    const repo = await Repository.findById(req.params.id);

    if (!repo) {
      return res.status(404).json({ message: "Repository not found" });
    }

    if (repo.owner.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Only owner can delete repository" });
    }

    await repo.deleteOne();

    res.json({ message: "Repository deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateRepo = async (req, res) => {
  try {
    const repo = await Repository.findById(req.params.id);

    if (!repo) {
      return res.status(404).json({ message: "Repository not found" });
    }

    if (repo.owner.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Only owner can update repository" });
    }

    const { name, description, visibility } = req.body;

    if (name) repo.name = name;
    if (description) repo.description = description;
    if (visibility) repo.visibility = visibility;

    await repo.save();

    res.json(repo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addCollaborator = async (req, res) => {
  try {
    const repo = await Repository.findById(req.params.id);

    if (!repo) {
      return res.status(404).json({ message: "Repository not found" });
    }

    if (repo.owner.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Only owner can add collaborators" });
    }

    const exists = repo.collaborators.find(
      c => c.user.toString() === req.body.userId
    );

    if (exists) {
      return res.status(400).json({ message: "User already collaborator" });
    }

    repo.collaborators.push({
      user: req.body.userId,
      role: req.body.role || "collaborator"
    });

    await repo.save();

    res.json(repo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const removeCollaborator = async (req, res) => {
  try {
    const repo = await Repository.findById(req.params.id);

    if (!repo) {
      return res.status(404).json({ message: "Repository not found" });
    }

    if (repo.owner.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Only owner can remove collaborators" });
    }

    repo.collaborators = repo.collaborators.filter(
      c => c.user.toString() !== req.params.userId
    );

    await repo.save();

    res.json(repo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCollaboratorRole = async (req, res) => {
  try {
    const repo = await Repository.findById(req.params.id);

    if (!repo) {
      return res.status(404).json({ message: "Repository not found" });
    }

    if (repo.owner.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Only owner can update roles" });
    }

    const collaborator = repo.collaborators.find(
      c => c.user.toString() === req.params.userId
    );

    if (!collaborator) {
      return res.status(404).json({ message: "Collaborator not found" });
    }

    collaborator.role = req.body.role;

    await repo.save();

    res.json(repo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCollaborators = async (req, res) => {
  try {
    const repo = await Repository.findById(req.params.id)
      .populate("collaborators.user", "username email");

    if (!repo) {
      return res.status(404).json({ message: "Repository not found" });
    }

    res.json(repo.collaborators);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};