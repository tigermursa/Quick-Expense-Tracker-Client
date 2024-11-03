import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    //baseUrl: "https://quick-expense-tracker-orpin.vercel.app",
    baseUrl: "http://localhost:4000",
    credentials: "include",
  }),
  tagTypes: ["data"],

  endpoints: () => ({}),
});
