import { configureStore } from "@reduxjs/toolkit";
import auth from "../Feature/Auth/auth.slice.js";

const store = configureStore({
 reducer: {
    auth
 }
});


export default store