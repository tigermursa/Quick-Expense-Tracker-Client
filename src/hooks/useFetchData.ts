import useSWR from "swr";
import { Expense } from "@/types/ExpenseData";

// Define the fetcher function
const fetcher = (url: string): Promise<Expense[]> =>
  fetch(url).then((res) => res.json());

// Define the custom hook with generics for flexibility
export const useFetchData = (url: string) => {
  const { data, error } = useSWR<Expense[]>(url, fetcher);

  return {
    data,
    error,
    isLoading: !error && !data, // Loading state
  };
};
