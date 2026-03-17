export const sendNotification = (io, userId, message) => {

io.to(userId).emit("notification",{
message
});

};

// Send notification to repository room
export const sendRepoNotification = (io, repoId, message) => {

io.to(repoId).emit("repoNotification",{
message
});

};


// Join repository room
export const joinRepoRoom = (socket, repoId) => {

socket.join(repoId);

};


// Leave repository room
export const leaveRepoRoom = (socket, repoId) => {

socket.leave(repoId);

};