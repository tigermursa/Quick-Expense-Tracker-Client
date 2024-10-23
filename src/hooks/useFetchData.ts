import { IExpenseData } from "@/types/ExpenseData";
import useSWR from "swr";

// Define the fetcher function
const fetcher = (url: string): Promise<IExpenseData[]> =>
  fetch(url).then((res) => res.json());

// Define the custom hook with generics for flexibility
export const useFetchData = (url: string) => {
  const { data, error } = useSWR<IExpenseData[]>(url, fetcher);

  return {
    data,
    error,
    isLoading: !error && !data, // Loading state
  };
};
