/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useLazyGetExpensesByDateRangeQuery } from "@/redux/features/data/dataApi";
import { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useAuth } from "@/hooks/useAuth";
import Loader from "@/components/Loader/Loader";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const LastMonthExpenses = () => {
  const { user, loading } = useAuth();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const userId = user?.data?._id;
  const [isClient, setIsClient] = useState(false);
  const [trigger, { data, error, isLoading }] =
    useLazyGetExpensesByDateRangeQuery();

  // Fix for client-side rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Fetch last month's data on mount
  useEffect(() => {
    const today = new Date();
    const lastMonth = new Date();
    lastMonth.setDate(today.getDate() - 30);
    setStartDate(lastMonth);
    setEndDate(today);

    trigger({
      userId,
      startDate: formatDate(lastMonth),
      endDate: formatDate(today),
    });
  }, [trigger, userId]);

  // Format date function
  const formatDate = (date: Date | null) => {
    if (!date) return null;
    return date.toISOString().split("T")[0];
  };

  const formatDisplayDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Data for chart showing total expense per day
  const dateWiseChartData = {
    labels:
      Array.from(
        new Set(
          data?.data.map((expense: any) => formatDisplayDate(expense.createdAt))
        )
      ) || [],
    datasets: [
      {
        label: "Total Expenses by Date",
        data: Array.from(
          new Map(
            data?.data.map((expense: any) => [
              formatDisplayDate(expense.createdAt),
              data?.data
                .filter(
                  (item: any) =>
                    formatDisplayDate(item.createdAt) ===
                    formatDisplayDate(expense.createdAt)
                )
                .reduce((sum: number, item: any) => sum + item.amount, 0),
            ])
          ).values()
        ),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

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

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  if (loading) {
    return <Loader />;
  }
  if (!isClient) {
    return null;
  }

  return (
    <div className="p-3 md:p-5 lg:p-10">
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold text-center mb-6">
          Last Month Expenses
        </h1>

        {/* Date Range Display */}
        <div className="mb-6 flex flex-col sm:flex-row justify-center gap-4 w-full max-w-md text-center">
          <div className="text-gray-700 font-bold">
            <span>
              {startDate ? formatDisplayDate(startDate.toISOString()) : "N/A"}
            </span>
          </div>
          <span className="font-bold">to </span>
          <div className="text-gray-700 font-bold">
            <span>
              {endDate ? formatDisplayDate(endDate.toISOString()) : "N/A"}
            </span>
          </div>
        </div>

        {/* Display Loading, Error, or Data */}
        <div className="w-full flex flex-col items-center mt-6">
          {isLoading && <p className="text-center text-gray-600">Loading...</p>}
          {error && (
            <p className="text-center text-red-600">Error fetching data</p>
          )}
          {data && (
            <div className="mt-4 w-full flex flex-col items-center space-y-8">
              <h2 className="text-lg font-semibold text-center">
                Total Expenses: {data?.total} &#2547;
              </h2>
              <h2 className="text-lg font-semibold text-center">
                Day average:{" "}
                {(
                  data?.total /
                  new Set(
                    data?.data.map((expense: any) =>
                      formatDisplayDate(expense.createdAt)
                    )
                  ).size
                ).toFixed(2)}{" "}
                &#2547;
              </h2>

              {/* Date-Wise Bar Chart */}
              <div className="w-full md:w-3/4 lg:w-full h-80">
                <Bar data={dateWiseChartData} options={chartOptions} />
              </div>

              {/* Item Bar Chart */}
              <div className="w-full md:w-3/4 lg:w-full h-80">
                <Bar data={itemChartData} options={chartOptions} />
              </div>

              {/* Expense Table */}
              <table className="table-auto w-full md:w-3/4 lg:w-1/2 mt-4 border">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="px-4 py-2 text-left">Index</th>
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-left">Date</th>
                    <th className="px-4 py-2 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {data.data.map((expense: any, index: number) => (
                    <tr key={expense._id}>
                      <td className="border px-4 py-2 w-4">{index + 1}</td>
                      <td className="border px-4 py-2">{expense?.name}</td>
                      <td className="border px-4 py-2">
                        {formatDisplayDate(expense?.createdAt)}
                      </td>
                      <td className="border px-4 py-2 text-right">
                        &#2547; {expense?.amount}
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

export default LastMonthExpenses;
