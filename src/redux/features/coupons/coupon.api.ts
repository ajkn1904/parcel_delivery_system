import { baseApi } from "@/redux/baseApi";

export const couponApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createCoupon: builder.mutation({
        query: (parcelData) => ({
            url: "/coupon/create",
            method: "POST",
            data: parcelData,
        }),
        invalidatesTags: ["COUPON"],
        }),
        getAllCoupons: builder.query({
        query: (params) => ({
            url: "/coupon",
            method: "GET",
            params
        }),
        providesTags: ["COUPON"],
        //transformResponse: (response) => response.data,
        }),
        getSingleCoupon: builder.query({
            query: ({id}) => ({
                url: `/coupon/${id}`,
                method: "GET",
            }),
        providesTags: ["COUPON"],
        transformResponse: (response) => response.data
        }),
        updateCoupon: builder.mutation({
        query: ({id, ...data}) => ({
            url: `/coupon/${id}`,
            method: "PATCH",
            data,
        }),
        invalidatesTags: ["COUPON"],
        }),
        deleteCoupon: builder.mutation({
        query: ({id}) => ({
            url: `/coupon/${id}`,
            method: "DELETE",
        }),
        invalidatesTags: ["COUPON"],
        }),
    }),
});


export const {
    useCreateCouponMutation,
    useGetAllCouponsQuery,
    useGetSingleCouponQuery,
    useUpdateCouponMutation,
    useDeleteCouponMutation
} = couponApi;