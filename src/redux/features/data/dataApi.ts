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
    //get ALL expance
    getAllMyExpenses: builder.query({
      query: ({ userId }) => ({
        url: `/api/v1/users/${userId}`,
        method: "GET",
      }),
      providesTags: ["data"],
    }),
    //get expance for 7 30
    geExpensesDataForHome: builder.query({
      query: ({ userId }) => ({
        url: `/api/v1/expenses/home/summary/${userId}`,
        method: "GET",
      }),
      providesTags: ["data"],
    }),
  }),
});

// api hooks
export const {
  useGetExpensesByDateRangeQuery,
  useLazyGetExpensesByDateRangeQuery,
  useGetAllMyExpensesQuery,
  useGeExpensesDataForHomeQuery,
} = authApi;
