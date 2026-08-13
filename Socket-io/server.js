import app from "./src/app.js";
import { createServer } from "http";
import { Server } from "socket.io";
const httpServer = createServer(app);
const io = new Server(httpServer);

io.on("connection", (socket)=>{
    console.log("new user connected")
    

    io.on("message", (data)=>{
        io.emit("message", data)
    })
})


httpServer.listen(3000, ()=>{
    console.log(" socket.io is listening on port 3000")
})