export const sendNotification=(io,userId,message)=>{

io.to(userId).emit("notification",{
message
});

};