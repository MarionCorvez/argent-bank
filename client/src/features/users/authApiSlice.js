import { apiSlice } from "@api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/user/login",
        method: "POST",
        body: { ...credentials }, // or body: credentials,
      }),
    }),
    getProfile: builder.mutation({
      query: () => ({
        url: "/user/profile",
        method: "POST",
      }),
    }),
    updateProfile: builder.query({
      query: () => ({
        url: "/user/profile",
        method: "PUT",
      }),
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useLoginMutation,
  useGetProfileMutation,
  useUpdateProfileQuery,
} = authApiSlice;
