"use client";
import React, { useState } from "react";
import Calendar from "react-calendar"; // Using only the larger calendar for display
import "react-calendar/dist/Calendar.css";
import { useGetSpesificDateDataQuery } from "@/redux/features/data/dataApi";
import { IExpense } from "@/types/ExpenseData";

const ExpenseCalendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const userId = "6722690bd9b9d6e6b46aed2a";

  const { data, error, isLoading } = useGetSpesificDateDataQuery(
    { date: selectedDate?.toISOString(), userId },
    { skip: !selectedDate }
  );

  const handleDateClick = (date: Date) => setSelectedDate(date);

  const renderContent = () => {
    if (isLoading)
      return <p className="text-center text-gray-500">Loading...</p>;
    if (error)
      return <p className="text-center text-red-500">Error loading data.</p>;
    if (!data && selectedDate)
      return (
        <p className="text-center mt-6 text-gray-600">
          No data found for this date.
        </p>
      );

    if (data) {
      return (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-center">
            Expenses on{" "}
            {selectedDate?.toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </h3>
          <p className="mt-2 mb-4 text-center text-gray-600">
            Total Cost:{" "}
            <span className="font-semibold text-gray-900">
              ${data.totalAmount}
            </span>
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-2 px-4 border-b font-medium text-gray-600">
                    #
                  </th>
                  <th className="py-2 px-4 border-b font-medium text-gray-600">
                    Date
                  </th>
                  <th className="py-2 px-4 border-b font-medium text-gray-600">
                    Name
                  </th>
                  <th className="py-2 px-4 border-b font-medium text-gray-600">
                    Category
                  </th>
                  <th className="py-2 px-4 border-b font-medium text-gray-600">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.data?.map((expense: IExpense, index: number) => (
                  <tr
                    key={expense._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 px-4 text-center">{index + 1}</td>
                    <td className="py-3 px-4">
                      {new Date(expense.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="py-3 px-4">{expense.name}</td>
                    <td className="py-3 px-4">{expense.category}</td>
                    <td className="py-3 px-4 font-semibold text-gray-800">
                      ${expense.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Expense Calendar</h2>

      <div className="mb-6">
        {/* Display the large calendar, clickable dates */}
        <Calendar
          onClickDay={handleDateClick} // Calls the handler when a date is clicked
          className="mx-auto max-w-3xl text-lg shadow-lg rounded-lg"
        />
      </div>

      {renderContent()}
    </div>
  );
};

export default ExpenseCalendar;
