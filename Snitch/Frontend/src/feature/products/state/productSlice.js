import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],

},
    reducers: {
      setProducts: (state, action) => {
        state.setProducts = action.payload;
      },
    },
});



export const {setProducts}=productSlice.actions
 export default productSlice.reducer