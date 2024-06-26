// No middleware import is needed
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "@api/apiSlice";
import authReducer from "@users/authSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  },
  // Adding the api middleware enables caching, invalidation, polling, aso
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true, // switch to false in production
});
