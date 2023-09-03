import { createSlice } from "@reduxjs/toolkit";
import switchReducer from "./switchReducer";

const initialState = {
    on: false,
};
const switchSlice = createSlice({
    name: "switch",
    initialState: initialState,
    reducers: switchReducer
});

export const { switchToggle } = switchSlice.actions;
export default switchSlice.reducer;