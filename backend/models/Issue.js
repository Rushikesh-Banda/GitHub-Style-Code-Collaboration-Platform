import mongoose from "mongoose";

const issueSchema = new mongoose.Schema(
{
repoId: {
type: mongoose.Schema.Types.ObjectId,
ref: "Repository"
},
title: String,
description: String,
status: {
type: String,
enum: ["open", "closed"],
default: "open"
},
comments:{
type:[{
type:mongoose.Schema.Types.ObjectId,
ref:"Comment"
}],
default:[]
}
},
{ timestamps: true }
);

export const Issue = mongoose.model("Issue", issueSchema);