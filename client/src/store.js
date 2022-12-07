import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import logger from "redux-logger";
import userSlice from "./reducersSlice/userSlice";
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import productSlice from "./reducersSlice/productSlice";
import cartSlice from "./reducersSlice/cartSlice";


// const reducer = combineReducers({
//   users: userSlice,
// });

// const store = configureStore({
//   reducer,
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
// });


const persistConfig = {
  key: 'root',
  storage,
}

const reducer = combineReducers({
  users: userSlice,
  product: productSlice,
  cart: cartSlice
});

const persistedReducer = persistReducer(persistConfig, reducer);


export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
export const persistor = persistStore(store)