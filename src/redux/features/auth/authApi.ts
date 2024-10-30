import { baseApi } from "@/redux/api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //create user
    register: builder.mutation({
      query: (data) => ({
        url: `/api/v3/auth/register`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["data"],
    }),

    //login user
    login: builder.mutation({
      query: (data) => ({
        url: `/api/v3/auth/login`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["data"],
    }),

    //logout user
    logout: builder.mutation({
      query: () => ({
        url: `/api/v3/auth/logout`,
        method: "POST",
      }),
      invalidatesTags: ["data"],
    }),

    //refresh token
    refreshtoken: builder.mutation({
      query: () => ({
        url: `/api/v3/auth/refresh-token`,
        method: "POST",
      }),
    }),

    //get users
    getAllUsers: builder.query({
      query: () => ({
        url: `/api/v4/users`,
        method: "GET",
      }),
      providesTags: ["data"],
    }),

    //get user
    getUser: builder.query({
      query: (id) => ({
        url: `/api/v4/users/${id}`,
        method: "GET",
      }),
      providesTags: ["data"],
    }),
  }),
});

// api hooks
export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useRefreshtokenMutation,
  useGetAllUsersQuery,
  useGetUserQuery,
} = authApi;
