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
        getParcelOverview: builder.query({
        query: (params) => ({
            url: "/analytics/overview",
            method: "GET",
            params
        }),
        }),
        getReceiverDeliveryPerformance: builder.query({
        query: (params) => ({
            url: "/analytics/receiver/delivery-performance",
            method: "GET",
            params
        }),
        }),
        getReceiverSuccessMetrics: builder.query({
        query: (params) => ({
            url: "/analytics/receiver/success-metrics",
            method: "GET",
            params
        }),
        }),
        
    }),
});


export const {
    useGetStatusDistributionQuery,
    useGetMonthlyShipmentsQuery,
    useGetParcelTrendsQuery,
    useGetParcelOverviewQuery,
    useGetReceiverDeliveryPerformanceQuery,
    useGetReceiverSuccessMetricsQuery
} = analyticApi;