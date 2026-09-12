import { configureStore } from "@reduxjs/toolkit";
import auth from '../feature/auth/state/authSlice.js'
import product from '../feature/products/state/productSlice.js'

const store = configureStore({
    reducer:{
        auth: auth,
        product: product
    }
})

export default store