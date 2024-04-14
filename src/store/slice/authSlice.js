import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: true,
        authToken: null,
        authTokenType: null,
        userId: null,
        username: null
    },
    reducers: {
        TOGGLE_AUTH: (state) => {
            state.isLoggedIn = !state.isLoggedIn;
        },
        TOGGLE_AUTH_TOKEN: (state, action) => {
            if(action.payload){
                state.authToken = action.payload
                window.localStorage.setItem("authToken", state.authToken)
            }
            else{
                window.localStorage.removeItem("authToken")
            }
            
        },
        TOGGLE_TOKEN_TYPE: (state, action) => {
            if(action.payload){
                state.authTokenType = action.payload
                window.localStorage.setItem("authTokenType", state.authTokenType)
            }
            else{
                window.localStorage.removeItem("authTokenType")
            }
        },
        TOGGLE_USER_ID: (state, action) => {
            if(action.payload){
                state.userId = action.payload
                window.localStorage.setItem("userId", state.userId)
            }
            else{
                window.localStorage.removeItem("userId")
            }
        },
        TOGGLE_USERNAME: (state, action) => {
            if(action.payload){
                state.username = action.payload
                window.localStorage.setItem("username", state.username)
            }
            else{
                window.localStorage.removeItem("username")
            }
        },
        
    }
})

export const { TOGGLE_AUTH, TOGGLE_AUTH_TOKEN, TOGGLE_TOKEN_TYPE, TOGGLE_USER_ID, TOGGLE_USERNAME} = authSlice.actions;

export default authSlice.reducer;
