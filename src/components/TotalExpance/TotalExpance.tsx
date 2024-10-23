"use client";

import { useFetchData } from "@/hooks/useFetchData";
import { IExpenseData } from "@/types/ExpenseData";

export const TotalExpance = () => {
  const { data, error, isLoading } = useFetchData(
    "http://localhost:4000/api/v1/expenses"
  );

  if (isLoading) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-center py-4">Failed to load data</div>;

  return (
    <div className="container p-4 mx-auto">
      <h2 className="text-xl font-bold mb-6 text-center">Total Expenses</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-3 px-4 text-center text-gray-700 border-b border-gray-300">Name</th>
              <th className="py-3 px-4 text-center text-gray-700 border-b border-gray-300">Category</th>
              <th className="py-3 px-4 text-center text-gray-700 border-b border-gray-300">Amount</th>
              <th className="py-3 px-4 text-center text-gray-700 border-b border-gray-300">Date</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((expense: IExpenseData) => (
              <tr key={expense._id} className="hover:bg-gray-100">
                <td className="py-3 px-4 text-center border-b border-gray-300">{expense.name}</td>
                <td className="py-3 px-4 text-center border-b border-gray-300">{expense.category}</td>
                <td className="py-3 px-4 text-center border-b border-gray-300">${expense.amount.toFixed(2)}</td>
                <td className="py-3 px-4 text-center border-b border-gray-300">{new Date(expense.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
