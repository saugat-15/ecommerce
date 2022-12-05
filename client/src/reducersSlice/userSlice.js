import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'users',
    initialState: {
        name: '',
        role: '',
        token: '',
    },
    reducers:{
        updateUsers: (state, actions) => {
            state.name = actions.payload.name;
            state.role = actions.payload.role;
            state.token = actions.payload.token;
        },
        resetUserCredentials: (state,actions) => {
            state.name = '';
            state.role = '';
            state.token = '';
        }
    }
})

export const {updateUsers, resetUserCredentials} = userSlice.actions;
export default userSlice.reducer