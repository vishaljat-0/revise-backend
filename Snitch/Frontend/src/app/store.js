import { configureStore } from "@reduxjs/toolkit";
import auth from '../feature/auth/state/authSlice.js'

const store = configureStore({
    reducer:{
        auth: auth
    }
})

export default store