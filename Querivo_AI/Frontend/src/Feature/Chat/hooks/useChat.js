import { useDispatch } from "react-redux";
import {
  addNewMessage,
  createNewChat,
  setChats,
  setChatMessages,
  setCurrentChatId,
  setLoading,
  setError,
} from "../chat.slice";
import initSocket from "../services/socket.io";
import {
  GetResponse,
  GetAllChats,
  GetMessages,
} from "../services/chat.api";

export const useChat = () => {
  const dispatch = useDispatch();

  const handlesendmessage = async ({ ChatId, message }) => {
    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      const response = await GetResponse({
        ChatId: ChatId || null,
        message,
      });

      const { chatId, title, message: aiMessage } = response;

      if (!chatId) {
        throw new Error("Server se chatId nahi mila");
      }

      dispatch(createNewChat({ ChatId: chatId, title }));
      dispatch(
        addNewMessage({ ChatId: chatId, content: message, role: "user" }),
      );
      dispatch(
        addNewMessage({ ChatId: chatId, content: aiMessage, role: "ai" }),
      );
      dispatch(setCurrentChatId(chatId));

      return { success: true, chatId };
    } catch (error) {
      console.log(error);
      dispatch(setError(error.message || "Something went wrong"));
      return { success: false };
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Sidebar ke liye — user ke saare chats fetch karo (titles only, messages nahi)
  const fetchAllChats = async () => {
    try {
      const response = await GetAllChats();
      // response.data = [{ _id, title, ... }]
      dispatch(setChats(response.data));
      return { success: true };
    } catch (error) {
      console.log(error);
      dispatch(setError("Chats load nahi ho paaye"));
      return { success: false };
    }
  };

  // Kisi purane chat pe click karne pe uske messages fetch karo
  const openChat = async (ChatId) => {
    dispatch(setLoading(true));
    try {
      const response = await GetMessages(ChatId);
      // response.data = [{ role, content, ... }]
      dispatch(setChatMessages({ ChatId, messages: response.data }));
      dispatch(setCurrentChatId(ChatId));
      return { success: true };
    } catch (error) {
      console.log(error);
      dispatch(setError("Messages load nahi ho paaye"));
      return { success: false };
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    initSocket,
    handlesendmessage,
    fetchAllChats,
    openChat,
  };
};