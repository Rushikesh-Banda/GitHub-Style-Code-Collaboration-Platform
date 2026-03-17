import {Server} from "socket.io";

export const startSocket=(server)=>{

const io=new Server(server,{
cors:{origin:"*"}
});

io.on("connection",(socket)=>{

console.log("User connected");

socket.on("disconnect",()=>{
console.log("User disconnected");
});

});

return io;

};

// Emit notification when new pull request created
export const notifyNewPR = (io, data) => {

try{

io.emit("newPR",{
message:"New Pull Request Created",
data
});

}catch(err){
console.error(err);
}

};


// Emit notification when PR merged
export const notifyPRMerged = (io, data) => {

try{

io.emit("prMerged",{
message:"Pull Request Merged",
data
});

}catch(err){
console.error(err);
}

};


// Emit notification when issue created
export const notifyNewIssue = (io, data) => {

try{

io.emit("newIssue",{
message:"New Issue Created",
data
});

}catch(err){
console.error(err);
}

};


// Emit notification when comment added
export const notifyNewComment = (io, data) => {

try{

io.emit("newComment",{
message:"New Comment Added",
data
});

}catch(err){
console.error(err);
}

};


// Emit repository activity event
export const notifyRepoActivity = (io, data) => {

try{

io.emit("repoActivity",{
message:"Repository Updated",
data
});

}catch(err){
console.error(err);
}

};