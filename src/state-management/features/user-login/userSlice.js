import { createSlice } from "@reduxjs/toolkit";
import userReducer from "./userReducer";

const initialState = {
    user: null,
    users: [],
    password: null,
    role: null,
    children: null,
    loading: false,
    room: null,
    error: null
};
const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: userReducer
});

export const { userCurrent } = userSlice.actions;
export default userSlice.reducer;