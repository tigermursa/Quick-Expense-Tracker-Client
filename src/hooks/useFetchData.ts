import useSWR from "swr";
import { IExpenseData } from "@/types/ExpenseData";

// Define the fetcher function
const fetcher = (url: string): Promise<{ data: IExpenseData[] }> =>
  fetch(url).then((res) => res.json());

// Define the custom hook with the correct type
export const useFetchData = (url: string) => {
  const { data, error } = useSWR<{ data: IExpenseData[] }>(url, fetcher);

  return {
    data,
    error,
    isLoading: !error && !data, // Loading state
  };
};
