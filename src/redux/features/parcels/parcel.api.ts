import { baseApi } from "@/redux/baseApi";

export const parcelApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createParcel: builder.mutation({
        query: (parcelData) => ({
            url: "/parcel/create",
            method: "POST",
            data: parcelData,
        }),
        invalidatesTags: ["PARCEL"],
        }),
        getAllParcels: builder.query({
        query: (params) => ({
            url: "/parcel",
            method: "GET",
            params
        }),
        providesTags: ["PARCEL"],
        //transformResponse: (response) => response.data,
        }),
        getSingleParcel: builder.query({
            query: ({id}) => ({
                url: `/parcel/${id}`,
                method: "GET",
            }),
        providesTags: ["PARCEL"],
        transformResponse: (response) => response.data
        }),
        trackParcel: builder.query({
            query: ({id}) => ({
                url: `/parcel/history/${id}`,
                method: "GET",
            }),
        providesTags: ["PARCEL"],
        transformResponse: (response) => response.data
        }),
        updateParcel: builder.mutation({
        query: ({id, ...data}) => ({
            url: `/parcel/status/${id}`,
            method: "PATCH",
            data,
        }),
        invalidatesTags: ["PARCEL"],
        }),
        updateParcelByAdmin: builder.mutation({
        query: ({id, ...data}) => ({
            url: `/parcel/admin/status/${id}`,
            method: "PATCH",
            data,
        }),
        invalidatesTags: ["PARCEL"],
        }),
        deleteParcel: builder.mutation({
        query: ({id}) => ({
            url: `/parcel/${id}`,
            method: "DELETE",
        }),
        invalidatesTags: ["PARCEL"],
        }),
    }),
});


export const {
    useCreateParcelMutation,
    useGetAllParcelsQuery,
    useGetSingleParcelQuery,
    useUpdateParcelMutation,
    useUpdateParcelByAdminMutation,
    useDeleteParcelMutation,
    useTrackParcelQuery
} = parcelApi;