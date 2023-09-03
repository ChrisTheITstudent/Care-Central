import { createAction, createReducer } from "@reduxjs/toolkit";

export const switchToggle = createAction("switch/switchToggle");

const initialState = {
    on: false,
};

const switchReducer = createReducer(initialState, (builder) => {
    builder
        // Toggle case
        .addCase(switchToggle, (state, action) => {
            state.on = action.payload;
        })
        // Default case
        .addDefaultCase((state) => {
            return state;
        });
});

export default switchReducer;
