import mongoose from "mongoose";

const prSchema = new mongoose.Schema(
{
repoId: {
type: mongoose.Schema.Types.ObjectId,
ref: "Repository"
},
author: {
type: mongoose.Schema.Types.ObjectId,
ref: "User"
},
title: String,
description: String,
status: {
type: String,
enum: ["open", "merged", "closed"],
default: "open"
},
commits:{
type:[{
type:mongoose.Schema.Types.ObjectId,
ref:"Commit"
}],
default:[]
}
},
{ timestamps: true }
);

export const PullRequest = mongoose.model("PullRequest", prSchema);