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