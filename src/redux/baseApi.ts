import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";

export const baseApi = createApi({
    reducerPath: 'baseApi',
    //with axiosBaseQuery
    baseQuery: axiosBaseQuery(),
    
    //if we want to fetch with fetchBaseQuery, we can use the following line instead
    //   baseQuery: fetchBaseQuery({
    //     baseUrl: config.baseUrl,
    //     credentials: "include",
    //   }),

    tagTypes: [""],
    
    endpoints: () => ({})
});
