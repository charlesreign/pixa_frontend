import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";

// create a store
const store = configureStore({
    reducer: {
    auth: authReducer,
},
}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;