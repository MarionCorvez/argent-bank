import { apiSlice } from "@api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // query stands for requests (GET)
    // mutation stands for changes (POST, PUT, DELETE)
    login: builder.mutation({
      query: (credentials) => ({
        url: "/user/login",
        method: "POST",
        body: { ...credentials }, // or body: credentials,
        // or body: { email, password },
        // & query: ({ email, password }) => ({
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    // Test with query failed
    getProfile: builder.mutation({
      query: () => ({
        url: "/user/profile",
        method: "POST",
      }),
      providesTags: ["User"], // Tag is provided through GET request
    }),
    // Check if update is a query or a mutation
    // PATCH is used to modify a part of the record
    // PUT is used to modifiy the full record
    updateProfile: builder.mutation({
      query: (userName) => ({
        url: "/user/profile",
        method: "PUT",
        body: { userName },
      }),
      invalidatesTags: ["User"], // Refetch the data with this action
    }),
  }),
});

// Export hooks for usage in functional components
// use[ActionName]Query/Mutation = custom hook based on action's name
export const {
  useLoginMutation,
  useGetProfileMutation,
  useUpdateProfileMutation,
} = authApiSlice;
