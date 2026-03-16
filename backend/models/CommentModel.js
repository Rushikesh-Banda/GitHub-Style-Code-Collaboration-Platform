import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
{
user: {
type: mongoose.Schema.Types.ObjectId,
ref: "User"
},
text: String
},
{ timestamps: true }
);

export const Comment = mongoose.model("Comment", commentSchema);