/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../../api/baseApi";

const bookManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllbooks: builder.query({
      query: (args?) => {
        // console.log(args);
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: any) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/books/get-all-books",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["Books"],
    }),
    createBook: builder.mutation({
      query: (data) => ({
        url: "/books/create-new-book",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Books"],
    }),

    getSingleBook: builder.query({
      query: (id) => {
        return {
          url: `/books/get-book/${id}`,
          method: "GET",
        };
      },

      providesTags: ["Books"], // ✅ Tells RTK Query this query provides 'Books' data
      keepUnusedDataFor: 300, // ✅ Cache for 5 minutes
    }),
    deleteABook: builder.mutation({
      query: (id) => ({
        url: `/books/delete-book/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Books"],
    }),
    updateProduct: builder.mutation({
      query: ({ data, id }) => ({
        url: `/books/update-book/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Books"],
    }),
  }),
});

export const {
  useGetAllbooksQuery,
  useGetSingleBookQuery,
  useCreateBookMutation,
  useUpdateProductMutation,
  useDeleteABookMutation
} = bookManagementApi;
