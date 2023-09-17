import { createAction, createReducer } from "@reduxjs/toolkit";

export const roomSelectorToggle = createAction("roomSelector/roomSelectorToggle");
export const setSelectedRoom = createAction("roomSelector/setSelectedRoom");
export const setCapacity = createAction("roomSelector/setCapacity");
export const setEducatorCount = createAction("roomSelector/setEducatorCount");
export const setEducatorList = createAction("roomSelector/setEducatorList");
export const setChildrenCount = createAction("roomSelector/setChildrenCount");
export const setChildrenList = createAction("roomSelector/setChildrenList");

const initialState = {
    selectedRoom: null,
    capacity: null,
    educatorCount: null,
    educatorList: null,
    childrenCount: null,
    childrenList: null,
    roomSelectorOn: false,
};

const roomSelectorReducer = createReducer(initialState, (builder) => {
    builder
        // Toggle case
        .addCase(roomSelectorToggle, (state, action) => {
            state.roomSelectorOn = !action.payload;
        })
        // Set selected room case
        .addCase("roomSelector/setSelectedRoom", (state, action) => {
            state.selectedRoom = action.payload;
        })
        // Set capacity case
        .addCase("roomSelector/setCapacity", (state, action) => {
            // TODO: Set capacity based on selected room
            state.capacity = action.payload;
        })
        // Set educator count case
        .addCase("roomSelector/setEducatorCount", (state, action) => {
            state.educatorCount = action.payload;
        })
        // Set educator list case
        .addCase("roomSelector/setEducatorList", (state, action) => {
            state.educatorList = action.payload;
        })
        // Set children count case
        .addCase("roomSelector/setChildrenCount", (state, action) => {
            state.childrenCount = action.payload;
        })
        // Set children list case
        .addCase("roomSelector/setChildrenList", (state, action) => {
            state.childrenList = action.payload;
        })
        // Reset case
        .addCase("roomSelector/reset", (state) => {
            state.selectedRoom = null;
            state.capacity = null;
            state.educatorCount = null;
            state.educatorList = null;
            state.childrenCount = null;
            state.childrenList = null;
            state.roomSelectorOn = false;
        })
        // Default case
        .addDefaultCase((state) => {
            return state;
        });
});

export default roomSelectorReducer;