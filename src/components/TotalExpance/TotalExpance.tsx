"use client";

import { useGetAllMyExpensesQuery } from "@/redux/features/data/dataApi";
import { IExpenseData } from "@/types/ExpenseData";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";
import Loader from "../Loader/Loader";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

export const TotalExpance = () => {
  const { user } = useAuth();
  const userId = user?.data?._id;
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  // Fetch expenses using the RTK Query hook
  const { data, error, isLoading } = useGetAllMyExpensesQuery(
    { userId },
    { skip: !userId }
  );

  if (isLoading) return <Loader />;
  if (error)
    return (
      <div className="text-center py-4 text-red-600">Failed to load data</div>
    );

  // Group expenses by category and calculate total for each category
  const categoryTotals: { [category: string]: number } = {};
  data?.data?.forEach((expense: IExpenseData) => {
    categoryTotals[expense.category] =
      (categoryTotals[expense.category] || 0) + expense.amount;
  });

  // Prepare the data for the bar chart (by category)
  const categories = Object.keys(categoryTotals);
  const totalAmounts = Object.values(categoryTotals);

  const categoryChartData = {
    labels: categories,
    datasets: [
      {
        label: "Amount (৳)",
        data: totalAmounts,
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(199, 199, 199, 0.6)",
        ],
        borderWidth: 1,
        barThickness: 30,
      },
    ],
  };

  const categoryChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: "Total Expenses by Category" },
    },
    scales: {
      x: { beginAtZero: true, barPercentage: 0.7, categoryPercentage: 0.5 },
      y: { beginAtZero: true },
    },
  };

  // Prepare the data for the pie chart (by category)
  const pieChartData = {
    labels: categories,
    datasets: [
      {
        label: "Amount (৳)",
        data: totalAmounts,
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(199, 199, 199, 0.6)",
        ],
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" as const },
      title: { display: true, text: "Expense Distribution by Category" },
    },
  };

  // Prepare the data for the second bar chart (by item name)
  const itemNames = data?.data?.map((expense: IExpenseData) => expense.name);
  const itemAmounts = data?.data?.map(
    (expense: IExpenseData) => expense.amount
  );

  const itemChartData = {
    labels: itemNames,
    datasets: [
      {
        label: "Items (৳)",
        data: itemAmounts,
        backgroundColor: [
          "rgba(255, 159, 64, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(199, 199, 199, 0.6)",
          "rgba(255, 99, 132, 0.6)",
        ],
        borderWidth: 1,
        barThickness: 30,
      },
    ],
  };

  const itemChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: "Items Graph" },
    },
    scales: {
      x: { beginAtZero: true, barPercentage: 0.7, categoryPercentage: 0.5 },
      y: { beginAtZero: true },
    },
  };

  // Group expenses by date and calculate total for each day
  const dailyTotals: { [date: string]: number } = {};
  data?.data?.forEach((expense: IExpenseData) => {
    const date = new Date(expense.createdAt).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    dailyTotals[date] = (dailyTotals[date] || 0) + expense.amount;
  });

  // Prepare the data for the line chart (daily expenses)
  const dates = Object.keys(dailyTotals);
  const dailyAmounts = Object.values(dailyTotals);

  const dailyExpenseChartData = {
    labels: dates,
    datasets: [
      {
        label: "Daily Total Expenses",
        data: dailyAmounts,
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.3)",
        borderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
        tension: 0.4,
      },
    ],
  };

  const dailyExpenseChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: "Flow of Daily Total Expenses" },
    },
    scales: {
      x: { beginAtZero: true, title: { display: true, text: "Date" } },
      y: { beginAtZero: true, title: { display: true, text: "Amount ($)" } },
    },
  };


  if (!isClient) {
    return null;
  }

  return (
    <div className="p-3 md:p-5 lg:p-10 mx-auto bg-gray-200">
      <h2 className="text-xl font-bold mb-6 text-center">
        Total Expenses &#2547;{data?.totalAmount}
      </h2>

      {/* Bar Chart for Categories */}
      <div className="mb-8" style={{ height: "300px" }}>
        <Bar data={categoryChartData} options={categoryChartOptions} />
      </div>

      {/* Pie Chart for Categories */}
      <div className="mb-8 flex justify-center" style={{ height: "300px" }}>
        <Pie data={pieChartData} options={pieOptions} />
      </div>

      {/* Line Chart for Daily Expenses */}
      <div className="mb-8" style={{ height: "300px" }}>
        <Line data={dailyExpenseChartData} options={dailyExpenseChartOptions} />
      </div>

      {/* Daily Expenses Table */}
      <div className="mt-8 overflow-x-auto">
        <table className="min-w-full bg-gray-200 border border-gray-400 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-3 text-xs text-center text-gray-700 border-b border-gray-400">
                Date
              </th>
              <th className="py-2 px-3 text-xs text-center text-gray-700 border-b border-gray-400">
                Total Expense
              </th>
            </tr>
          </thead>
          <tbody>
            {dates.map((date, index) => (
              <tr key={date} className="hover:bg-gray-100">
                <td className="py-2 px-3 text-xs text-center border-b border-gray-400">
                  {date}
                </td>
                <td className="py-2 px-3 text-xs text-center border-b border-gray-400">
                  ${dailyAmounts[index].toFixed(2)}
                </td>
              </tr>
            ))}
            {/* Total Row */}
            <tr className="bg-gray-200 font-bold">
              <td className="py-2 px-3 text-xs text-center border-t border-gray-400">
                Total
              </td>
              <td className="py-2 px-3 text-xs text-center border-t border-gray-400">
                &#2547;{data?.totalAmount}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Bar Chart for Items */}
      <div className="mb-8" style={{ height: "300px" }}>
        <Bar data={itemChartData} options={itemChartOptions} />
      </div>

      {/* Expense Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-200 border border-gray-400 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-3 text-xs text-center text-gray-700 border-b border-gray-400">
                Name
              </th>
              <th className="py-2 px-3 text-xs text-center text-gray-700 border-b border-gray-400">
                Category
              </th>
              <th className="py-2 px-3 text-xs text-center text-gray-700 border-b border-gray-400">
                Amount
              </th>
              <th className="py-2 px-3 text-xs text-center text-gray-700 border-b border-gray-400">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((expense: IExpenseData) => (
              <tr key={expense._id} className="hover:bg-gray-100">
                <td className="py-2 px-3 text-xs text-center border-b border-gray-400">
                  {expense.name}
                </td>
                <td className="py-2 px-3 text-xs text-center border-b border-gray-400">
                  {expense.category}
                </td>
                <td className="py-2 px-3 text-xs text-center border-b border-gray-400">
                  ${expense.amount.toFixed(2)}
                </td>
                <td className="py-2 px-3 text-xs text-center border-b border-gray-400">
                  {new Date(expense.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TotalExpance;
