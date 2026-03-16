import mongoose from "mongoose";

const commitSchema = new mongoose.Schema(
{
repoId: {
type: mongoose.Schema.Types.ObjectId,
ref: "Repository"
},
author: {
type: mongoose.Schema.Types.ObjectId,
ref: "User"
},
message: String,
files: [String]
},
{ timestamps: true }
);

export const Commit = mongoose.model("Commit", commitSchema);