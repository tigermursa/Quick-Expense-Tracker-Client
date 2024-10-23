"use client";

import { useFetchData } from "@/hooks/useFetchData";
import { IExpenseData } from "@/types/ExpenseData";

export const TotalExpance = () => {
  const { data, error, isLoading } = useFetchData(
    "http://localhost:4000/api/v1/expenses"
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Failed to load data</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Total Expenses</h2>
      <ul className="space-y-4">
        {data?.data?.map((expense: IExpenseData) => (
          <li key={expense._id} className="p-4 bg-white border">
            <div>
              <span className="font-semibold">Name:</span> {expense.name}
            </div>
            <div>
              <span className="font-semibold">Category:</span>{" "}
              {expense.category}
            </div>
            <div>
              <span className="font-semibold">Amount:</span> $
              {expense.amount.toFixed(2)}
            </div>
            <div>
              <span className="font-semibold">Date:</span>{" "}
              {new Date(expense.createdAt).toLocaleDateString()}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
