import { createSlice } from "@reduxjs/toolkit";


const productSlice = createSlice({
    name: 'product',
    initialState: {
        product: [],
        searchedProduct: [],
    },
    reducers: {
        setProductDetails: (state, actions) => {
            state.product = actions.payload
        },
        setSearchedProduct: (state, actions) => {
            state.searchedProduct = actions.payload
        },
        resetProductDetails: (state,actions) => {
            state.product = []
        }
    }
})

export const {setProductDetails, setSearchedProduct} = productSlice.actions;
export default productSlice.reducer