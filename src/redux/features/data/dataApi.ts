import { baseApi } from "@/redux/api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // getExpensesByDateRange
    getExpensesByDateRange: builder.query({
      query: ({ userId, startDate, endDate }) => ({
        url: `/api/v1/expenses/user/date-range`,
        method: "POST",
        body: { userId, startDate, endDate },
      }),
      providesTags: ["data"],
    }),
  }),
});

// api hooks
export const { useGetExpensesByDateRangeQuery,useLazyGetExpensesByDateRangeQuery } = authApi;
