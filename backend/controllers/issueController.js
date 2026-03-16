import { Issue } from "../models/Issue.js";

// Create issue
export const createIssue = async (req, res) => {
  try {
    const issue = new Issue(req.body);

    const createdIssue = await issue.save();

    res.status(201).json({
      message: "Issue created",
      issue: createdIssue,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Get issues
export const getIssues = async (req, res) => {
  try {
    const issues = await Issue.find({
      repoId: req.params.repoId,
    });

    res.json(issues);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Close issue
export const closeIssue = async (req, res) => {
  try {
    const issue = await Issue.findByIdAndUpdate(
      req.params.id,
      { status: "closed" },
      { new: true }
    );

    res.json(issue);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};