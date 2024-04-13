import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: true,
        authToken: null,
        authTokenType: null,
        userId: null
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
        TOGGLE_TOKEN_TYPE: (state, action) => {},
        TOGGLE_USER_ID: (state, action) => {},
        
    }
})

export const { TOGGLE_AUTH, TOGGLE_AUTH_TOKEN, TOGGLE_TOKEN_TYPE, TOGGLE_USER_ID} = authSlice.actions;

export default authSlice.reducer;
