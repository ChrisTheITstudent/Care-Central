import { createAction, createReducer } from "@reduxjs/toolkit";

// User login actions
export const userLoginRequest = createAction("user/LoginRequest");
export const userLoginSuccess = createAction("user/LoginSuccess");
export const userLoginFailure = createAction("user/LoginFailure");
// User logout actions
export const userLogout = createAction("user/Logout");
// User register actions
export const userRegisterRequest = createAction("user/RegisterRequest");
export const userRegisterSuccess = createAction("user/RegisterSuccess");
export const userRegisterFailure = createAction("user/RegisterFailure");
export const userClockIn = createAction("user/ClockIn");
export const userClockOut = createAction("user/ClockOut");
// User update actions
export const userUpdateRequest = createAction("user/UpdateRequest");
export const userUpdateSuccess = createAction("user/UpdateSuccess");
export const userUpdateFailure = createAction("user/UpdateFailure");
// User delete actions
export const userDeleteRequest = createAction("user/DeleteRequest");
export const userDeleteSuccess = createAction("user/DeleteSuccess");
export const userDeleteFailure = createAction("user/DeleteFailure");
// User get actions
export const userGetRequest = createAction("user/GetRequest");
export const userGetSuccess = createAction("user/GetSuccess");
export const userGetFailure = createAction("user/GetFailure");
// User get all actions
export const userGetAllRequest = createAction("user/GetAllRequest");
export const userGetAllSuccess = createAction("user/GetAllSuccess");
export const userGetAllFailure = createAction("user/GetAllFailure");
// User get all by role actions
export const userGetAllByRoleRequest = createAction("user/GetAllByRoleRequest");
export const userGetAllByRoleSuccess = createAction("user/GetAllByRoleSuccess");
export const userGetAllByRoleFailure = createAction("user/GetAllByRoleFailure");
// User get all by name actions
export const userGetAllByNameRequest = createAction("user/GetAllByNameRequest");
export const userGetAllByNameSuccess = createAction("user/GetAllByNameSuccess");
export const userGetAllByNameFailure = createAction("user/GetAllByNameFailure");
// Set loading state
export const userSetLoading = createAction("user/SetLoading");
// Children actions
export const userAddChild = createAction("user/AddChild");
export const userRemoveChild = createAction("user/RemoveChild");
export const userSetChildren = createAction("user/SetChildren");
export const userUpdateChild = createAction("user/UpdateChild");
// Selection actions
export const userSetSelection = createAction("user/SetSelection");
export const userResetSelection = createAction("user/ResetSelection");

const initialState = {
    id: null,
    user: null,
    users: [],
    password: null,
    role: null,
    children: null,
    loading: false,
    room: null,
    selection: null,
    error: null,
    clockedIn: false
};

const userReducer = createReducer(initialState, (builder) => {
    builder
        // Login cases
        .addCase(userLoginRequest, (state, action) => {
            state.loading = true;
            state.error = null;
            state.user = action.payload.username;
        })
        .addCase(userLoginSuccess, (state, action) => {
            state.id = action.payload.id;
            state.user = action.payload.username;
            state.password = action.payload.password;
            state.role = action.payload.role;
            state.children = action.payload.children;
            state.room = action.payload.room;
            state.clockedIn = action.payload.clockedIn;

            state.loading = false;
        })
        .addCase(userLoginFailure, (state, action) => {
            state.error = action.payload;
            state.loading = false;
            console.error("Login Failed: " + action.payload);
        })
        .addCase(userLogout, (state, action) => {
            state.user = null;
            state.loading = false;
        })
        // Register cases
        .addCase(userRegisterRequest, (state, action) => {
            state.loading = true;
            // Password validation
            if (action.payload.password !== action.payload.confirmPassword) {
                state.error = "Passwords do not match";
                state.loading = false;
                return;
            } else if (action.payload.password.length < 8) {
                state.error = "Password must be at least 8 characters long";
                state.loading = false;
                return;
            // Username validation
            } else if (!action.payload.username) {
                state.error = "Username cannot be empty";
                state.loading = false;
                return;
            } else {
                state.error = null;
            }
        })
        .addCase(userRegisterSuccess, (state, action) => {
            // TODO: Add user to database
            if (state.error) {
                return "Error: State set as: " + state.error;
            } else {
                state.user = action.payload.username;
                state.password = action.payload.password;
                console.log("Account created successfully!");
            }
        })
        .addCase(userRegisterFailure, (state, action) => {
            state.error = action.payload;
            state.loading = false;
            alert("Account creation failed.");
            console.error("Account creation failed: " + action.payload);
        })
        // Update cases
        .addCase(userUpdateRequest, (state, action) => {
            state.loading = true;
            if (action.payload.user) {
                state.user = action.payload.user;
            }
            if (action.payload.password) {
                state.password = action.payload.password;
            }
            if (action.payload.role) {
                state.role = action.payload.role;
            }
            if (action.payload.children) {
                state.children = action.payload.children;
            }
            if (action.payload.room || action.payload.room === null) {
                state.room = action.payload.room;
            }
            console.log("User updated successfully!", state.user, state.room);
        })
        .addCase(userUpdateSuccess, (state, action) => {
            state.error = null;
            state.loading = false;
        })
        .addCase(userUpdateFailure, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        })
        // Delete cases
        .addCase(userDeleteRequest, (state, action) => {
            state.loading = true;
        })
        .addCase(userDeleteSuccess, (state, action) => {
            state.user = action.payload;
            state.loading = false;
        })
        .addCase(userDeleteFailure, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        })
        // Get cases
        .addCase(userGetRequest, (state, action) => {
            state.loading = true;
        })
        .addCase(userGetSuccess, (state, action) => {
            state.user = action.payload;
            state.loading = false;
        })
        .addCase(userGetFailure, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        })
        // Get all cases
        .addCase(userGetAllRequest, (state, action) => {
            state.loading = true;
        })
        .addCase(userGetAllSuccess, (state, action) => {
            state.users = action.payload;
            state.loading = false;
        })
        .addCase(userGetAllFailure, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        })
        // Get all by role cases
        .addCase(userGetAllByRoleRequest, (state, action) => {
            state.loading = true;
        })
        .addCase(userGetAllByRoleSuccess, (state, action) => {
            state.users = action.payload;
            state.loading = false;
        })
        .addCase(userGetAllByRoleFailure, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        })
        // Get all by name cases
        .addCase(userGetAllByNameRequest, (state, action) => {
            state.loading = true;
        })
        .addCase(userGetAllByNameSuccess, (state, action) => {
            state.users = action.payload;
            state.loading = false;
        })
        .addCase(userGetAllByNameFailure, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        })
        // Set loading state
        .addCase(userSetLoading, (state, action) => {
            state.loading = action.payload;
        })
        // Children cases
        .addCase(userAddChild, (state, action) => {
            action.payload.forEach(child => {
                state.children.push(child);
            });
        })
        .addCase(userRemoveChild, (state, action) => {
            state.children = state.children.filter(child => child.id !== action.payload);
        })
        .addCase(userSetChildren, (state, action) => {
            state.children = action.payload;
        })
        .addCase(userUpdateChild, (state, action) => {
            state.children = state.children.map(child => {
                if (child.name === action.payload.name) {
                    return action.payload;
                } else {
                    return child;
                }
            });
        })
        // Selection cases
        .addCase(userSetSelection, (state, action) => {
            state.selection = action.payload;
        })
        .addCase(userResetSelection, (state, action) => {
            state.selection = null;
        })
        // Clock in cases
        .addCase(userClockIn, (state, action) => {
            state.clockedIn = true;
        })
        .addCase(userClockOut, (state, action) => {
            state.clockedIn = false;
        })
        // Default case
        .addDefaultCase((state, action) => {
            return state;
        })
});

export default userReducer;