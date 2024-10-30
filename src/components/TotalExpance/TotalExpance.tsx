"use client";

import { useGetAllMyExpensesQuery } from "@/redux/features/data/dataApi"; // Make sure this is the correct import path
import { IExpenseData } from "@/types/ExpenseData";
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
import Loader from "../Loader/Loader";
import { useAuth } from "@/hooks/useAuth";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export const TotalExpance = () => {
  const { user, loading } = useAuth();
  const userId = user?.data?._id;

  // Fetch expenses using the RTK Query hook
  const { data, error, isLoading } = useGetAllMyExpensesQuery({ userId });

  if (isLoading)
    return (
      <div>
        <Loader />
      </div>
    );

  if (error)
    return (
      <div className="text-center py-4 text-red-600">Failed to load data</div>
    );

  // Group expenses by category and calculate the total amount for each category
  const categoryTotals: { [category: string]: number } = {};

  data?.data?.forEach((expense: IExpenseData) => {
    if (categoryTotals[expense.category]) {
      categoryTotals[expense.category] += expense.amount;
    } else {
      categoryTotals[expense.category] = expense.amount;
    }
  });

  // Prepare the data for the bar chart (by category)
  const categories = Object.keys(categoryTotals);
  const totalAmounts = Object.values(categoryTotals);

  const categoryChartData = {
    labels: categories,
    datasets: [
      {
        label: "Amount ($)",
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
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(199, 199, 199, 1)",
        ],
        borderWidth: 1,
        barThickness: 30,
        borderRadius: 0,
      },
    ],
  };

  const categoryChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Total Expenses by Category",
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        barPercentage: 0.7,
        categoryPercentage: 0.5,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  // Prepare the data for the pie chart (by category)
  const pieChartData = {
    labels: categories,
    datasets: [
      {
        label: "Amount ($)",
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
      legend: {
        position: "bottom" as const,
      },
      title: {
        display: true,
        text: "Expense Distribution by Category",
      },
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
        label: "Items ($)",
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
        borderColor: [
          "rgba(255, 159, 64, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(199, 199, 199, 1)",
          "rgba(255, 99, 132, 1)",
        ],
        borderWidth: 1,
        barThickness: 30,
        borderRadius: 0,
      },
    ],
  };

  const itemChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Items Graph",
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        barPercentage: 0.7,
        categoryPercentage: 0.5,
      },
      y: {
        beginAtZero: true,
      },
    },
  };
  if (loading) {
    return <Loader />;
  }
  return (
    <div className="container p-4 mx-auto ">
      <h2 className="text-xl font-bold mb-6 text-center">
        Total Expenses by Category
      </h2>
      <div className="mb-8" style={{ height: "300px" }}>
        {/* Render the first Bar chart (by category) */}
        <Bar data={categoryChartData} options={categoryChartOptions} />
      </div>

      {/* Render the Pie chart (by category) */}
      <div className="mb-8 flex justify-center" style={{ height: "300px" }}>
        <Pie data={pieChartData} options={pieOptions} />
      </div>

      {/* Render the second Bar chart (by item name) */}
      <div className="mb-8" style={{ height: "300px" }}>
        <Bar data={itemChartData} options={itemChartOptions} />
      </div>

      {/* Updated Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-3 text-xs text-center text-gray-700 border-b border-gray-300">
                Name
              </th>
              <th className="py-2 px-3 text-xs text-center text-gray-700 border-b border-gray-300">
                Category
              </th>
              <th className="py-2 px-3 text-xs text-center text-gray-700 border-b border-gray-300">
                Amount
              </th>
              <th className="py-2 px-3 text-xs text-center text-gray-700 border-b border-gray-300">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((expense: IExpenseData) => (
              <tr key={expense._id} className="hover:bg-gray-100">
                <td className="py-2 px-3 text-xs text-center border-b border-gray-300">
                  {expense.name}
                </td>
                <td className="py-2 px-3 text-xs text-center border-b border-gray-300">
                  {expense.category}
                </td>
                <td className="py-2 px-3 text-xs text-center border-b border-gray-300">
                  ${expense.amount.toFixed(2)}
                </td>
                <td className="py-2 px-3 text-xs text-center border-b border-gray-300">
                  {new Date(expense.date).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
