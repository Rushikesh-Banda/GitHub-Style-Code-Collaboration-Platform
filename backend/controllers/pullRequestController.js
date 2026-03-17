import { PullRequest } from "../models/PullRequest.js";
import { sendRepoNotification } from "../services/notificationService.js";

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

// Get single PR
export const getPRById = async (req, res) => {
  try {

    const pr = await PullRequest.findById(req.params.id)
      .populate("author","username");

    if(!pr){
      return res.status(404).json({
        message:"Pull request not found"
      });
    }

    res.json(pr);

  } catch(err){
    res.status(500).json({message:err.message});
  }
};


// Close pull request
export const closePR = async (req, res) => {
  try {

    const pr = await PullRequest.findByIdAndUpdate(
      req.params.id,
      { status:"closed" },
      { new:true }
    );

    res.json(pr);

  } catch(err){
    res.status(500).json({message:err.message});
  }
};


// Reopen pull request
export const reopenPR = async (req, res) => {
  try {

    const pr = await PullRequest.findByIdAndUpdate(
      req.params.id,
      { status:"open" },
      { new:true }
    );

    res.json(pr);

  } catch(err){
    res.status(500).json({message:err.message});
  }
};


// Update pull request
export const updatePR = async (req, res) => {
  try {

    const pr = await PullRequest.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new:true }
    );

    res.json(pr);

  } catch(err){
    res.status(500).json({message:err.message});
  }
};


// Delete pull request
export const deletePR = async (req, res) => {
  try {

    const pr = await PullRequest.findById(req.params.id);

    if(!pr){
      return res.status(404).json({
        message:"Pull request not found"
      });
    }

    await pr.deleteOne();

    res.json({
      message:"Pull request deleted"
    });

  } catch(err){
    res.status(500).json({message:err.message});
  }
};