import { Server } from "socket.io";

let io

 export const initServer=(httpserver)=>{
     io= new Server(httpserver,{
        cors:{
            origin:"http://localhost:5173",
            credentials:true
        }
    })
        console.log("Socket.io server is RUNNING")


    io.on("connection",(socket)=>{
        console.log("a user connected"+socket.id);
    })
 }
 
 export  const getIo=()=>{
    if(!io){
        throw new Error("Socket.io is not initialized")
    }
    return io
 }