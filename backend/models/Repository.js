import mongoose from "mongoose";

const repoSchema = new mongoose.Schema(
{
name: String,
description: String,
owner: {
type: mongoose.Schema.Types.ObjectId,
ref: "User"
},
visibility: {
type: String,
enum: ["public", "private"],
default: "public"
}
},
{ timestamps: true }
);

export const Repository = mongoose.model("Repository", repoSchema);