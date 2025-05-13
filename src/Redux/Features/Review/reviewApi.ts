import { baseApi } from "../../api/baseApi";


export const reviewAPI = baseApi.injectEndpoints({
  endpoints: (build) => ({
    postReview: build.mutation({
      query: (data) => ({
        url: "/reviews",
        method: "POST",
        body: data,
      }),
    }),
    getReview: build.query({
      query: () => ({
        url: "/reviews",
        method: "Get",
      }),
    }),
    getSingleBookReview: build.query({
      query: (bookId) => ({
        url: `/reviews/${bookId}`,
        method: "Get",
      }),
    }),
  }),
});

export const { useGetReviewQuery,useGetSingleBookReviewQuery,usePostReviewMutation } = reviewAPI;