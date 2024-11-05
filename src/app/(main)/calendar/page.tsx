"use client";

import { useGetSpesificDateDataQuery } from "@/redux/features/data/dataApi";
import React, { useState, useMemo } from "react";
import DatePicker from "react-datepicker"; // Use react-datepicker
import "react-datepicker/dist/react-datepicker.css"; // Import styles for react-datepicker
import "../../../app/Calendar.css"; // Import the CSS file where the custom scrollbar is styled
import { useAuth } from "@/hooks/useAuth";

interface ExpenseData {
  _id: string;
  name: string;
  category: string;
  amount: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const ExpenseCalendar: React.FC = () => {
  const { user } = useAuth();

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userId = user?.data?._id;

  const { data, error, isLoading } = useGetSpesificDateDataQuery(
    {
      date: selectedDate ? selectedDate.toLocaleDateString("en-CA") : null,
      userId,
    },
    { skip: !selectedDate }
  );

  const expenses = useMemo(() => data?.data ?? [], [data]);
  const totalAmount = data?.totalAmount ?? 0; // Get the total amount for the day

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleDateChange = (date: Date | null) => {
    if (date) {
      // Set time to midnight in local timezone
      const localDate = new Date(date.setHours(0, 0, 0, 0));
      setSelectedDate(localDate);
      openModal();
    }
  };

  // Format the date to '3 November 2024' format
  const formattedDate = selectedDate
    ? selectedDate.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  return (
    <div className="p-4 flex flex-col justify-center items-center container-style-design h-screen">
      <div className="">
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          inline
          dayClassName={(date) => (date ? "dateStyle" : "")}
        />
      </div>

      {isLoading && <p className="text-center">Loading...</p>}
      {error && (
        <p className="text-center text-red-500">Error fetching data.</p>
      )}
      {!isLoading && !error && selectedDate && expenses.length === 0 && (
        <p className="text-center">No data available for the selected date.</p>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full sm:w-11/12 max-w-4xl max-h-[90vh] sm:max-h-[80vh] overflow-y-auto relative shadow-lg">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-2xl"
            >
              &times;
            </button>

            {/* Total amount section */}
            <div className="p-4 text-center rounded-t-lg">
              <h2 className="text-sm sm:text-xl font-semibold text-gray-800">
                Total:{formattedDate}: ৳ {totalAmount.toFixed(2)}
              </h2>
            </div>

            {/* Expenses table */}
            {expenses.length > 0 ? (
              <table className="min-w-full bg-white border border-gray-300 rounded-lg mt-4">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="text-left px-4 py-2">Index</th>
                    <th className="text-left px-4 py-2">Name</th>
                    <th className="text-left px-4 py-2">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.map((expense: ExpenseData, index: number) => (
                    <tr
                      key={expense._id}
                      className="border-b hover:bg-gray-100"
                    >
                      <td className="px-4 py-2">{index + 1}</td>
                      <td className="px-4 py-2">{expense.name}</td>
                      <td className="px-4 py-2">
                        ৳ {expense.amount.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center h-14 flex justify-center items-center mt-4">
                No data available for the selected date.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseCalendar;
