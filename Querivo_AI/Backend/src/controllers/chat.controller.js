import ChatModel from "../models/Chat.js";
import MessageModel from "../models/Message.js";
import {
  generateChatTitle,
  GetMessageResponse,
} from "../services/ai.service.js";

export const getMessageRes = async (req, res, next) => {
  try {
    const { message, chat: chatId } = req.body;

    let chat;
    let title = null;

    // New Chat
    if (!chatId) {
      const generatedTitle = await generateChatTitle(message);

      title = generatedTitle.content;

      chat = await ChatModel.create({
        user: req.user.id,
        title,
      });
    }

    const currentChatId = chatId || chat._id;

    // Save User Message
    await MessageModel.create({
      chat: currentChatId,
      content: message,
      role: "user",
    });

    // Get Chat History
    const messages = await MessageModel.find({
      chat: currentChatId,
    }).sort({ createdAt: 1 });

    // Generate AI Response
    const aiResponse = await GetMessageResponse(messages);

    // Save AI Message
    await MessageModel.create({
      chat: currentChatId,
      content: aiResponse.text,
      role: "ai",
    });

    return res.status(200).json({
      success: true,
      chatId: currentChatId,
      title,
      message: aiResponse.text,
    });
  } catch (error) {
    next(error);
  }
}


    export const getChats = async (req, res, next) => {
    try {
      const chats = await ChatModel.find({ user: req.user.id });
      return res.status(200).json({ success: true, data: chats });
    } catch (error) {
      next(error);
    }
    }

     export const  getMessages=async(req,res,next)=>{
       try {
        const messages= await MessageModel.find({chat:req.params.chatId}).sort({createdAt:1})
        return res.status(200).json({success:true,data:messages })
       } catch (error) {
        next(error);
       }
     }

   export async function deleteChat(req, res,next) {

    try {
      await MessageModel.deleteMany({ chat: req.params.chatId });
      await ChatModel.findByIdAndDelete(req.params.chatId);
      return res.status(200).json({ message: "Chat deleted successfully", success: true });
    } catch (error) {
      next(error);
    }




   }
