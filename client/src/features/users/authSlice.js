import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    userName: "",
    firstName: "",
    lastName: "",
  },
  token: localStorage.getItem("tokenID")
    ? localStorage.getItem("tokenID")
    : null,
  isRemembered: false,
  isEditing: false,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // LogIn
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isLoggedIn = true;
    },
    logOut: (state) => {
      state.user = initialState;
      state.token = initialState;
      state.isRemembered = false;
      state.isEditing = false;
      state.isLoggedIn = false;
    },
    // Set token in local or session storage
    isRemembered(state, action) {
      // voir state.isRemembered = true;
      // ou state.isRemembered = !state.isRemembered;
      state.isRemembered = action.payload;
    },
    // Display editing user section
    setEditing(state) {
      state.isEditing = !state.isEditing;
    },
  },
});

export const { setCredentials, logOut, isRemembered, setEditing } =
  authSlice.actions;

export default authSlice.reducer;

// Unused for now
export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
export const selectIsRemembered = (state) => state.auth.isRemembered;
export const selectIsEditing = (state) => state.auth.isEditing;
