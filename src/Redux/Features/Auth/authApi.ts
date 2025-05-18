import { baseApi } from "../../api/baseApi";


export const userAPI = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (data: { email: string; password: string }) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),
    register: build.mutation({
      query: (data: { name: string; email: string; password: string }) => ({
        url: "/users/create-new-user",
        method: "POST",
        body: data,
      }),
    }),
    // all register users
    getAllUsers: build.query({
      query: () => ({
        url: "/users/get-all-users",
        method: "GET",
      }),
    }),

    updatePassword: build.mutation<void, { email:string, oldPassword: string; newPassword: string }>({
      query: (data) => ({
        url: "/auth/update-password",
        method: "PUT", 
        body:data,
        credentials: "include", 
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation ,useUpdatePasswordMutation, useGetAllUsersQuery } = userAPI;