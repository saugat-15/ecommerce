import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    setCartItems: (state, actions) => {
        // if(state.cart === []){
            state.cart.push(actions.payload)
        // }else{
            // state.cart[actions.payload] = actions.payload
    },
    resetCartItems: (state, actions) => {
        // if(state.cart === []){
            state.cart = []
        // }else{
            // state.cart[actions.payload] = actions.payload
    },
  },
});

export const { setCartItems, resetCartItems } = cartSlice.actions;
export default cartSlice.reducer;
