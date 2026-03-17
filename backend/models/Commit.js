import mongoose from "mongoose";

const commitSchema = new mongoose.Schema({

repoId:{
type:mongoose.Schema.Types.ObjectId,
ref:"Repository",
required:true
},

author:{
type:mongoose.Schema.Types.ObjectId,
ref:"User",
required:true
},

message:{
type:String,
required:true
},

files:{
type:[
{
fileName:String,
fileUrl:String
}
],
default:[]
}

},{
timestamps:true
});

export const Commit = mongoose.model("Commit",commitSchema);