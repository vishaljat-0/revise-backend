import { Router } from "express";
import { authUser } from "../middleware/auth.middleware.js";
import { getMessageRes,getChats, getMessages, deleteChat } from "../controllers/chat.controller.js";

const ChatRouter= Router()



ChatRouter.post('/message',authUser,getMessageRes)
ChatRouter.get("/", authUser, getChats)

ChatRouter.get("/:chatId/messages", authUser, getMessages)

ChatRouter.delete("/delete/:chatId", authUser, deleteChat)
export default ChatRouter