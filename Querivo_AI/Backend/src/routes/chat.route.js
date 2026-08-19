import { Router } from "express";
import { authUser } from "../middleware/auth.middleware.js";
import { getMessageRes } from "../controllers/chat.controller.js";

const ChatRouter= Router()



ChatRouter.post('/message',authUser,getMessageRes)
export default ChatRouter