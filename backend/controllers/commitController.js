import { Commit } from "../models/Commit.js";
import { commitChanges } from "../services/gitService.js";

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

// Get single commit
export const getCommitById = async (req, res) => {
  try {

    const commit = await Commit.findById(req.params.id)
      .populate("author","username");

    if(!commit){
      return res.status(404).json({
        message:"Commit not found"
      });
    }

    res.json(commit);

  } catch(err){
    res.status(500).json({message:err.message});
  }
};


// Delete commit
export const deleteCommit = async (req, res) => {
  try {

    const commit = await Commit.findById(req.params.id);

    if(!commit){
      return res.status(404).json({
        message:"Commit not found"
      });
    }

    await commit.deleteOne();

    res.json({
      message:"Commit deleted successfully"
    });

  } catch(err){
    res.status(500).json({message:err.message});
  }
};


// Update commit message
export const updateCommitMessage = async (req, res) => {
  try {

    const commit = await Commit.findById(req.params.id);

    if(!commit){
      return res.status(404).json({
        message:"Commit not found"
      });
    }

    commit.message = req.body.message || commit.message;

    await commit.save();

    res.json(commit);

  } catch(err){
    res.status(500).json({message:err.message});
  }
};


// Get commits by author
export const getCommitsByAuthor = async (req, res) => {
  try {

    const commits = await Commit.find({
      author:req.params.userId
    }).populate("author","username");

    res.json(commits);

  } catch(err){
    res.status(500).json({message:err.message});
  }
};