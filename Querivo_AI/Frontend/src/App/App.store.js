import { configureStore } from "@reduxjs/toolkit";
import auth from "../Feature/Auth/auth.slice.js";
import chat from "../Feature/Chat/chat.slice.js";
const store = configureStore({
 reducer: {
    auth,
    chat
 }
});


export default store