import { baseApi } from "@/redux/baseApi";

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllUser: builder.query({
        query: (params) => ({
            url: "/user",
            method: "GET",
            params
        }),
        providesTags: ["USERS"],
        transformResponse: (response) => response.data,
        }),
        getSingleUser: builder.query({
            query: ({id}) => ({
                url: `/user/${id}`,
                method: "GET",
            }),
        providesTags: ["USERS"],
        transformResponse: (response) => response.data,
        }),
        updateUser: builder.mutation({
        query: ({id, ...data}) => ({
            url: `/user/${id}`,
            method: "PATCH",
            data,
            headers: {"Content-Type": "application/json"},
        }),
        invalidatesTags: ["USERS"],
        }),
    }),
});


export const {
    useGetAllUserQuery,
    useGetSingleUserQuery,
    useUpdateUserMutation
} = userApi;