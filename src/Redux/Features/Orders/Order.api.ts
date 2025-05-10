import { baseApi } from "../../api/baseApi";

export const orderAPI = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getOrdersByEmail: build.query({
      query: () => `/order/get-customer-orders`,
    }),
    updateOrderStatus: build.mutation({
      query: ({ _id, status }) => ({
        url: `/order/change-order-status/${_id}?status=${status}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Order"],
    }),
    verifyOrder: build.mutation({
      query: (orderId) => ({
        url: `/order/verify-order?order_id=${orderId}`,
        method: "PATCH",
      }),
    }),
    getCustomerOrders: build.query({
      query: () => ({
        url: `/order/get-customer-orders`,
        method: "GET",
      }),
      providesTags: ["Order"],
    }),
    getAllOrders: build.query({
      query: () => ({
        url: `/order/get-orders`,
        method: "GET",
      }),
      providesTags: ["Order"],
    }),
    createOrder: build.mutation({
      query: (data) => ({
        url: "/order/create-order",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const {
  useGetOrdersByEmailQuery,
  useCreateOrderMutation,
  useUpdateOrderStatusMutation,
  useVerifyOrderMutation,
  useGetCustomerOrdersQuery,
  useGetAllOrdersQuery,
} = orderAPI;
