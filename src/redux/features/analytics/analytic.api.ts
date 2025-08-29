import { baseApi } from "@/redux/baseApi";

export const analyticApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getStatusDistribution: builder.query({
        query: (params) => ({
            url: "/analytics/status-distribution",
            method: "GET",
            params
        }),
        }),
        getMonthlyShipments: builder.query({
        query: (params) => ({
            url: "/analytics/monthly-shipments",
            method: "GET",
            params
        }),
        }),
        getParcelTrends: builder.query({
        query: (params) => ({
            url: "/analytics/trends",
            method: "GET",
            params
        }),
        }),
        
    }),
});


export const {
    useGetStatusDistributionQuery,
    useGetMonthlyShipmentsQuery,
    useGetParcelTrendsQuery
} = analyticApi;