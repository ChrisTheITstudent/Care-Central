import { createSlice } from "@reduxjs/toolkit";
import roomSelectorReducer from "./roomSelectorReducer";

const initialState = {
    selectedRoom: null,
    capacity: null,
    educatorCount: null,
    educatorList: null,
    childrenCount: null,
    childrenList: null,
    roomSelectorOn: false,
};
const roomSelectorSlice = createSlice({
    name: "roomSelector",
    initialState: initialState,
    reducers: roomSelectorReducer
});

export const { roomSelectorToggle } = roomSelectorSlice.actions;
export default roomSelectorSlice.reducer;
