import { createSlice, nanoid } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",

  initialState: {
    chats: {},
    currentChatId: "",
    isLoading: false,
    error: null,
  },

  reducers: {
    createNewChat: (state, action) => {
      const { ChatId, title } = action.payload;
      if (state.chats[ChatId]) {
        if (title) state.chats[ChatId].title = title;
        return;
      }
      state.chats[ChatId] = {
        id: ChatId,
        title: title || "New chat",
        messages: [],
        lastUpdated: new Date().toISOString(),
      };
    },

    addNewMessage: (state, action) => {
      const { ChatId, content, role } = action.payload;

      if (!state.chats[ChatId]) {
        state.chats[ChatId] = {
          id: ChatId,
          title: "New chat",
          messages: [],
          lastUpdated: new Date().toISOString(),
        };
      }

      state.chats[ChatId].messages.push({
        id: nanoid(),
        role,
        content,
      });
      state.chats[ChatId].lastUpdated = new Date().toISOString();
    },

    // Sidebar list ke liye — backend se [{_id, title, ...}] milta hai
    // (messages iske andar nahi hote). Existing loaded messages ko preserve karo.
    setChats: (state, action) => {
      const chatList = action.payload || [];
      const updated = {};
      chatList.forEach((c) => {
        const id = c._id || c.id;
        updated[id] = {
          id,
          title: c.title,
          messages: state.chats[id]?.messages ?? [],
          lastUpdated: c.updatedAt || c.lastUpdated || new Date().toISOString(),
        };
      });
      state.chats = updated;
    },

    // Ek specific chat ke messages backend se load karke set karo
    setChatMessages: (state, action) => {
      const { ChatId, messages } = action.payload;
      if (!state.chats[ChatId]) {
        state.chats[ChatId] = {
          id: ChatId,
          title: "Chat",
          messages: [],
          lastUpdated: new Date().toISOString(),
        };
      }
      state.chats[ChatId].messages = (messages || []).map((m) => ({
        id: m._id || nanoid(),
        role: m.role,
        content: m.content,
      }));
    },

    setCurrentChatId: (state, action) => {
      state.currentChatId = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  createNewChat,
  addNewMessage,
  setChats,
  setChatMessages,
  setCurrentChatId,
  setLoading,
  setError,
} = chatSlice.actions;

export default chatSlice.reducer;