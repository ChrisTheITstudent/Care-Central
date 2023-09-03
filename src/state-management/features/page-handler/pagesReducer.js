import { createAction, createReducer } from "@reduxjs/toolkit";

const pageCurrent = createAction("page/Current");
const pageChangeRequest = createAction("page/ChangeRequest");
const pageError = createAction("page/Error");

const initialState = {
    current: null,
    loading: false,
    error: null
};

const pagesReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(pageCurrent, (state, action) => {
            state.current = action.payload;
            state.loading = false;
        })
        .addCase(pageChangeRequest, (state, action) => {
            state.loading = true;
        })
        .addCase(pageError, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        })
}
);

export default pagesReducer;