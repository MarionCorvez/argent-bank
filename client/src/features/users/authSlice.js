import { createSlice } from "@reduxjs/toolkit";

// voir si ajout de "isLoggedIn: false," au state initial
const initialState = {
  user: null,
  token: null,
  isRemembered: false,
  isEditing: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Login
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.token = accessToken;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
    },
    // Set token in local or session storage
    isRemembered(state, action) {
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

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
export const selectIsRemembered = (state) => state.auth.isRemembered;
export const selectIsEditing = (state) => state.auth.isEditing;
