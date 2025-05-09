import { baseApi } from "../../api/baseApi";


export const reviewAPI = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getReview: build.query({
      query: () => ({
        url: "/reviews",
        method: "Get",
      }),
    }),
  }),
});

export const { useGetReviewQuery } = reviewAPI;