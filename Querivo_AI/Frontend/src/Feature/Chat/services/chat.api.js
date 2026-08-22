import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

// Send a message (new chat if ChatId is null/undefined, else continues existing chat)
export const GetResponse = async ({ message, ChatId }) => {
  const response = await api.post("/api/chats/message", {
    message,
    chat: ChatId || null, // 👈 backend expects "chat", not "ChatId"
  });
  return response.data;
};

// Get ALL chats for the logged-in user (for sidebar list)
export const GetAllChats = async () => {
  const response = await api.get("/api/chats");
  return response.data; // { success, data: [...chats] }
};

// Get all messages for one specific chat
export const GetMessages = async (ChatId) => {
  const response = await api.get(`/api/chats/${ChatId}/messages`); // 👈 slash fix
  return response.data; // { success, data: [...messages] }
};

export const DeleteChat = async (ChatId) => {
  const response = await api.delete(`/api/chats/delete/${ChatId}`);
  return response.data;
};