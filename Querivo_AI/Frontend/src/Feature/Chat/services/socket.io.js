import { io } from "socket.io-client";


  const initSocket=()=>{
    console.log("hello")
      const socket = io("http://localhost:3000",{
        withCredentials: true
     });

     socket.on("connect",(socket)=>{
        console.log("connected to socket server");
        
     })


}
export default initSocket;