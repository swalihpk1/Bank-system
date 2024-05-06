import { apiSlice } from "./apiSlice";
const USERS_URL = "/api/users";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //Login
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/auth`,
                method: "POST",
                body: data,
            }),
        }),

        //Register
        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}`,
                method: "POST",
                body: data,
            }),
        }),

        //deposite
        updateUser: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/deposite`,
                method: "POST",
                body: data,
            }),
        }),

        //withdraw
        updateUser: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/withdraw`,
                method: "POST",
                body: data,
            }),
        }),

        //Logout
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: "POST",
            }),
        }),
    }),
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useUpdateUserMutation } =
    userApiSlice;
