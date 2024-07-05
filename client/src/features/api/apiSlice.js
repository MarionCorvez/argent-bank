// Import from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { setCredentials, logOut } from "@users/authSlice";

// Change URL in production
const apiBaseUrl = "http://localhost:3001/api/v1";

// Define a service using a baseQuery to manage fetchs
export const apiSlice = createApi({
  reducerPath: "api", // optional if an "api" folder exists
  baseQuery: fetchBaseQuery({
    baseUrl: apiBaseUrl,
    headers: { "content-type": "application/json" },
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        // Depends on how it's written in API
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["User"], // Tag to invalidate the cache
  endpoints: (builder) => ({}),
});
