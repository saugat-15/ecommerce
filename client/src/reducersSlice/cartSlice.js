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
    decreaseCartCount: (state, actions, id) => {
        // if(state.cart === []){
            state.cart.map((item) => {
              if(item.productId === actions.payload){
                item.productCount = item.productCount - 2;
              }
            })
        // }else{
            // state.cart[actions.payload] = actions.payload
    },
    increaseCartCount: (state, actions, id) => {
      // if(state.cart === []){
          state.cart.map((item) => {
            if(item.productId === actions.payload){
              item.productCount = item.productCount + 1;
            }
          })
  
  },
}
});

export const { decreaseCartCount, increaseCartCount, setCartItems, resetCartItems } = cartSlice.actions;
export default cartSlice.reducer;
