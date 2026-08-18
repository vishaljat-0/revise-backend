import React, { useEffect } from "react";
import { useChat } from "../hooks/useChat.js";
function Dashboard() {
   const initSocket =useChat() 
useEffect(() => {
  initSocket();
},[])
  return <div>Dashboard</div>;
}

export default Dashboard;
