import { createSlice } from "@reduxjs/toolkit";


const productSlice = createSlice({
    name: 'product',
    initialState: {
        product: [],
    },
    reducers: {
        setProductDetails: (state, actions) => {
            state.product = actions.payload
        },
        resetProductDetails: (state,actions) => {
            state.product = []
        }
    }
})

export const {setProductDetails} = productSlice.actions;
export default productSlice.reducer