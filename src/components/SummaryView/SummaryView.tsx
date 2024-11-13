/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useGeExpensesDataForHomeQuery } from "@/redux/features/data/dataApi";
import CountUp from "react-countup";
import TodayExpensesModal from "./TodayExpenseModal";

const SummaryView = () => {
  const { user } = useAuth();
  const userId = user?.data?._id;
  const [showModal, setShowModal] = useState(false);

  // Fetch the expense data only if the userId is defined
  const { data, isLoading, isError, isFetching } =
    useGeExpensesDataForHomeQuery(
      { userId },
      {
        skip: !userId, // Skip the query if no userId is available
      }
    );

  if (isLoading)
    return <p className="text-center text-lg text-white">Please wait...</p>;
  if (isError || !data?.data)
    return <p className="text-center text-lg">Error loading summary data.</p>;

  const { allTimeTotal, last7DaysTotal, last30DaysTotal, todayTotal } =
    data?.data;

  const todayExpenses = data?.data?.todayExpenses;

  return (
    <div className={`text-center p-4 md:p-8 0 rounded-lg shadow-md `}>
      <h2 className="text-4xl font-semibold mb-6 text-gray-200">
        Expense Summary for {data?.data?.uniqueDays} day
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-6 ">
        {/* Today */}
        <div className="p-4 bg-white bg-opacity-10 rounded-lg  shadow-md">
          <p className="text-sm font-bold text-gray-100 mb-1">Today</p>
          <CountUp
            className="text-3xl font-extrabold text-gray-100 "
            start={0}
            end={todayTotal}
            duration={2.5}
            separator=","
            prefix="৳"
          />
        </div>

        {/* Last 7 Days */}
        <div className="p-4 bg-white bg-opacity-10 rounded-lg  shadow-md">
          <p className="text-sm font-bold text-gray-100 mb-1">Last 7 Days</p>
          <CountUp
            className="text-3xl font-extrabold text-gray-100"
            start={0}
            end={last7DaysTotal}
            duration={2.5}
            separator=","
            prefix="৳"
          />
        </div>

        {/* Last 30 Days */}
        <div className="p-4 bg-white bg-opacity-10 rounded-lg  shadow-md">
          <p className="text-sm font-bold text-gray-100 mb-1">Last 30 Days</p>
          <CountUp
            className="text-3xl font-extrabold text-gray-100"
            start={0}
            end={last30DaysTotal}
            duration={2.5}
            separator=","
            prefix="৳"
          />
        </div>

        {/* All-Time */}
        <div className="p-4 bg-white bg-opacity-10 rounded-lg  shadow-md">
          <p className="text-sm font-bold text-gray-100 mb-1">All-Time</p>
          <CountUp
            className="text-3xl font-extrabold text-gray-100"
            start={0}
            end={allTimeTotal}
            duration={2.5}
            separator=","
            prefix="৳"
          />
        </div>
      </div>

      {/* Today's List Button */}
      <button
        className="border border-pink-500 bg-gray-950 bg-opacity-10 text-white px-4 py-2 rounded-md shadow-md hover:border-pink-400 mt-5"
        onClick={() => setShowModal(true)}
      >
        {isFetching ? "Loading.." : "Today's List"}
      </button>

      {/* Modal for Today's Expenses */}
      <TodayExpensesModal
        showModal={showModal}
        todayExpenses={todayExpenses}
        total={todayTotal}
        closeModal={() => setShowModal(false)}
      />
    </div>
  );
};

export default SummaryView;
