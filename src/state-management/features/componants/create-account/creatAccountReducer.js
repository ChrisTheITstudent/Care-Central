import { createAction, createReducer } from "@reduxjs/toolkit";

export const createAccountSetUsername = createAction("createAccount/setUsername");
export const createAccountSetPassword = createAction("createAccount/setPassword");
export const createAccountSetChildren = createAction("createAccount/setChildren");
export const createAcoountSetRole = createAction("createAccount/setRole");

const initialState = {
    username: null,
    password: null,
    children: [],
    role: null,
};

const createAccountReducer = createReducer(initialState, (builder) => {
    builder
        // Set username case
        .addCase(createAccountSetUsername, (state, action) => {
            state.username = action.payload;
        })
        // Set password case
        .addCase(createAccountSetPassword, (state, action) => {
            state.password = action.payload;
        })
        // Set children case
        .addCase(createAccountSetChildren, (state, action) => {
            state.children = action.payload;
        })
        // Set role case
        .addCase(createAcoountSetRole, (state, action) => {
            state.role = action.payload;
        })
        // Default case
        .addDefaultCase((state) => {
            return state;
        });
}
);

export default createAccountReducer;
