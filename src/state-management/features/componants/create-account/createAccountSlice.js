import { createSlice } from "@reduxjs/toolkit";
import createAccountReducer from "./creatAccountReducer";

const initialState = {
    username: null,
    password: null,
    children: [],
    role: null,
};

const createAccountSlice = createSlice({
    name: "createAccount",
    initialState: initialState,
    reducers: createAccountReducer
});

export const { createAccountSetUsername, createAccountSetPassword, createAccountSetChildren, createAcoountSetRole } = createAccountSlice.actions;
export default createAccountSlice.reducer;