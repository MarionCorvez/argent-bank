import { createSlice } from "@reduxjs/toolkit";

const hasToken =
  localStorage.getItem("token") || sessionStorage.getItem("token");

const initialState = {
  user: {
    userName: "",
    firstName: "",
    lastName: "",
  },
  token: hasToken ? hasToken : null,
  isRemembered: false,
  isEditing: false,
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
    },
    logOut: (state) => {
      state.user = initialState;
      state.token =
        localStorage.removeItem("token") || sessionStorage.removeItem("token");
      state.isRemembered = false;
      state.isEditing = false;
    },
    // Set token in local or session storage
    setRemember: (state) => {
      state.isRemembered = !state.isRemembered;
    },
    // Display editing user section
    setEditing: (state) => {
      state.isEditing = !state.isEditing;
    },
    // Patch new username
    updateUsername: (state, action) => {
      state.user.userName = action.payload;
    },
  },
});

export const {
  setCredentials,
  logOut,
  setRemember,
  setEditing,
  updateUsername,
} = authSlice.actions;

export default authSlice.reducer;
