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
};  