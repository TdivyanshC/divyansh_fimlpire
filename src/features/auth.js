import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {},
    isAuthenticated: false,
    sessionId: '',
};

const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = !!action.payload;
            state.sessionId = localStorage.getItem('session_id');
            localStorage.setItem('accountId', action.payload.id);  
        },
    },
});

export const {setUser} = authSlice.actions;
export const userSelector = (state) => state.user;
export default authSlice.reducer;