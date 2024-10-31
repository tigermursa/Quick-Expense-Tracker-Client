import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://quick-expense-tracker-orpin.vercel.app",
    credentials: "include",
  }),
  tagTypes: ["data"],

  endpoints: () => ({}),
});
