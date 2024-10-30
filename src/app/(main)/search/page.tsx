/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useLazyGetExpensesByDateRangeQuery } from "@/redux/features/data/dataApi";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { useAuth } from "@/hooks/useAuth";
import Loader from "@/components/Loader/Loader";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const ExpensesByDateRange = () => {
  const { user, loading } = useAuth();
  
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const userId = user?.data?._id; // Replace with actual userId, can be dynamic

  // Lazy query to trigger API call only when needed
  const [trigger, { data, error, isLoading }] =
    useLazyGetExpensesByDateRangeQuery();

  // Function to format the date to 'YYYY-MM-DD' format
  const formatDate = (date: Date | null) => {
    if (!date) return null;
    return date.toISOString().split("T")[0];
  };

  const handleSubmit = () => {
    if (!startDate || !endDate) {
      alert("Please select both start and end date.");
      return;
    }

    // Trigger the API call
    trigger({
      userId,
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
    });
  };

  // Prepare data for Bar Chart (Items and Prices)
  const barData = {
    labels: data?.data.map((expense: any) => expense.name) || [],
    datasets: [
      {
        label: "Amount ($)",
        data: data?.data.map((expense: any) => expense.amount) || [],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  };

  // Prepare data for Pie Chart (Categories and Total per Category)
  const categoryTotals = data
    ? data.data.reduce((acc: any, expense: any) => {
        acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
        return acc;
      }, {})
    : {};

  const pieData = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        label: "Category-wise Expenses",
        data: Object.values(categoryTotals),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };
  if (loading) {
    return <Loader />;
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className=" max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          Filter Expenses by Date Range
        </h1>

        {/* Date Pickers */}
        <div className="mb-6 space-y-4  flex flex-col justify-center items-center">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Date:
            </label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="yyyy-MM-dd"
              className="border p-2 rounded w-full text-center"
              placeholderText="Select Start Date"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End Date:
            </label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              dateFormat="yyyy-MM-dd"
              className="border p-2 rounded w-full text-center"
              placeholderText="Select End Date"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
        >
          Fetch Expenses
        </button>

        {/* Display Loading, Error, or Data */}
        <div className="mt-6">
          {isLoading && <p className="text-center text-gray-600">Loading...</p>}
          {error && (
            <p className="text-center text-red-600">Error fetching data</p>
          )}
          {data && (
            <div className="mt-4">
              <h2 className="text-lg font-semibold text-center">
                Total Expenses: ${data.total}
              </h2>

              {/* Expense Table */}
              <table className="table-auto w-full mt-4 border">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {data.data.map((expense: any) => (
                    <tr key={expense._id}>
                      <td className="border px-4 py-2">{expense?.name}</td>
                      <td className="border px-4 py-2 text-right">
                        ${expense?.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Bar Chart - Expenses by Item */}
              <div className="mt-8">
                <Bar data={barData} />
              </div>

              {/* Pie Chart - Expenses by Category */}
              <div className="mt-8">
                <Pie data={pieData} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExpensesByDateRange;
