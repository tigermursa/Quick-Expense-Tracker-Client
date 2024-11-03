// components/TodayExpensesModal.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

type TodayExpensesModalProps = {
  showModal: boolean;
  todayExpenses: any[]; // You can define a more specific type if needed
  closeModal: () => void;
};

const TodayExpensesModal: React.FC<TodayExpensesModalProps> = ({
  showModal,
  todayExpenses,
  closeModal,
}) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Today&apos;s Expenses</h3>
          <button
            className="text-gray-600 hover:text-gray-800"
            onClick={closeModal}
          >
            ✖️
          </button>
        </div>
        <table className="table-auto w-full text-left">
          <thead>
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Item</th>
              <th className="px-4 py-2">Price</th>
            </tr>
          </thead>
          <tbody>
            {todayExpenses?.map((expense, index) => (
              <tr key={index} className="border-t">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{expense.name}</td>
                <td className="px-4 py-2">৳{expense.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TodayExpensesModal;
