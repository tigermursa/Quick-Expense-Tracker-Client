/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useLazyGetExpensesByDateRangeQuery } from "@/redux/features/data/dataApi";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Bar } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
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

// Register necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const LastWeekExpenses = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const userId = "672230b90426dbedfc068819"; // Replace with actual userId

  // Lazy query to trigger API call only when needed
  const [trigger, { data, error, isLoading }] =
    useLazyGetExpensesByDateRangeQuery();

  // Set default dates to last 7 days
  useEffect(() => {
    const today = new Date();
    const lastWeek = new Date();
    lastWeek.setDate(today.getDate() - 7);
    setStartDate(lastWeek);
    setEndDate(today);
  }, []);

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

  // Data for charts
  const itemChartData = {
    labels: data?.data.map((expense: any) => expense.name) || [],
    datasets: [
      {
        label: "Expenses by Item",
        data: data?.data.map((expense: any) => expense.amount) || [],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const categoryData = data?.data.reduce((acc: { [key: string]: number }, expense: any) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  const categoryChartData = {
    labels: Object.keys(categoryData || {}),
    datasets: [
      {
        label: "Expenses by Category",
        data: Object.values(categoryData || {}),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
      },
    ],
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          Last Week Expenses
        </h1>

        {/* Date Pickers */}
        <div className="mb-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Date:
            </label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="yyyy-MM-dd"
              className="border p-2 rounded w-full"
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
              className="border p-2 rounded w-full"
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

              {/* Item Bar Chart */}
              <div className="mt-4">
                <Bar data={itemChartData} />
              </div>

              {/* Category Pie Chart */}
              <div className="mt-4">
                <Pie data={categoryChartData} />
              </div>

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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LastWeekExpenses;
