import mongoose from "mongoose";

const repositorySchema = new mongoose.Schema({

name: String,

description: String,

visibility: {
type: String,
enum: ["public","private"],
default: "public"
},

owner: {
type: mongoose.Schema.Types.ObjectId,
ref: "User"
},

collaborators:{
type:[
{
user:{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
},
role:{
type:String,
enum:["owner","collaborator","viewer"],
default:"viewer"
}
}
],
default:[]
}

},{
timestamps:true
});

export const Repository = mongoose.model("Repository", repositorySchema);