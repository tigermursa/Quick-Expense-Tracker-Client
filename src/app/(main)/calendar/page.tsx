"use client";

import { useGetSpesificDateDataQuery } from "@/redux/features/data/dataApi";
import React, { useState } from "react";
import DatePicker from "react-datepicker"; // Use react-datepicker
import "react-datepicker/dist/react-datepicker.css"; // Import styles for react-datepicker
import "../../../app/Calendar.css";
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
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const userId = "6722690bd9b9d6e6b46aed2a";

  const { data, error, isLoading } = useGetSpesificDateDataQuery(
    { date: selectedDate?.toISOString(), userId },
    { skip: !selectedDate }
  );

  const expenses = data?.data ?? []; // Accessing `data.data` safely

  return (
    <div className="p-4 flex flex-col justify-center items-center">
      <div className="">
        <DatePicker
          selected={selectedDate} // Use selected prop
          onChange={(date: Date | null) => {
            setSelectedDate(date);
          }}
          inline // Always show the calendar
          dayClassName={(date) => {
            // Optional: Add any custom styles to the days
            return date ? "dateStyle" : "";
          }}
        />
      </div>
      {isLoading && <p className="text-center">Loading...</p>}
      {error && (
        <p className="text-center text-red-500">Error fetching data.</p>
      )}

      {!isLoading && !error && selectedDate && expenses.length === 0 && (
        <p className="text-center">No data available for the selected date.</p>
      )}

      {expenses.length > 0 && (
        <div className="overflow-x-auto">
          <table className=" bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="text-left px-4 py-2">Index</th>
                <th className="text-left px-4 py-2">Name</th>
                <th className="text-left px-4 py-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense: ExpenseData, index: number) => (
                <tr key={expense._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{expense.name}</td>
                  <td className="px-4 py-2">৳ {expense.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ExpenseCalendar;
