// issueController.js
import { Issue } from "../models/Issue.js";

export const createIssue = async (req, res) => {
  try {
    const { repository, title, description } = req.body;

    const issue = await Issue.create({
      repository,
      title,
      description,
      author: req.user.userId
    });

    res.status(201).json({
      message: "Issue created",
      issue
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getIssues = async (req, res) => {
  try {
    const issues = await Issue.find({
      repository: req.params.repoId
    }).populate("author", "username");

    res.json(issues);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const closeIssue = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    issue.status = "closed";
    await issue.save();

    res.json(issue);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getIssueById = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({
        message: "Issue not found"
      });
    }

    res.json(issue);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const reopenIssue = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    issue.status = "open";
    await issue.save();

    res.json(issue);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateIssue = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    const { title, description } = req.body;

    if (title) issue.title = title;
    if (description) issue.description = description;

    await issue.save();

    res.json(issue);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteIssue = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({
        message: "Issue not found"
      });
    }

    await issue.deleteOne();

    res.json({
      message: "Issue deleted"
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};