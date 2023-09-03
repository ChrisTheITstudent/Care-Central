import { createSlice } from "@reduxjs/toolkit";
import pagesReducer from "./pagesReducer";

const initialState = {
    current: null,
    loading: false,
    error: null
};

const pagesSlice = createSlice({
    name: "pages",
    initialState,
    reducers: pagesReducer
});

export const { pageCurrent } = pagesSlice.actions;
export default pagesSlice.reducer;