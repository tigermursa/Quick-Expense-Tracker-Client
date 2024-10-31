"use client";
import { useGeExpensesDataForHomeQuery } from "@/redux/features/data/dataApi";
import CountUp from "react-countup";

const SummaryView = () => {
  const userId = "6722690bd9b9d6e6b46aed2a";
  const { data, isLoading, isError } = useGeExpensesDataForHomeQuery({
    userId,
  });

  if (isLoading) return <p className="text-center text-lg">Loading...</p>;
  if (isError || !data?.data)
    return <p className="text-center text-lg">Error loading summary data.</p>;

  const { allTimeTotal, last7DaysTotal, last30DaysTotal } = data.data;

  return (
    <div className="text-center p-4 md:p-8 0 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-200">
        Expense Summary for {data?.data?.daysData} days
      </h2>
      <div className="flex flex-col md:flex-row md:justify-around gap-6">
        {/* All-Time Total */}
        <div className="p-4 bg-white rounded-lg shadow-md w-full ">
          <p className="text-sm font-bold text-gray-700 mb-1">All-Time</p>
          <CountUp
            className="text-xl font-extrabold text-gray-800"
            start={0}
            end={allTimeTotal}
            duration={2.5}
            separator=","
            prefix="৳"
          />
        </div>

        {/* Last 7 Days Total */}
        <div className="p-4 bg-white rounded-lg shadow-md w-full">
          <p className="text-sm font-bold text-gray-700 text-nowrap mb-1">
            Last 7 Days
          </p>
          <CountUp
            className="text-xl font-extrabold text-gray-800"
            start={0}
            end={last7DaysTotal}
            duration={2.5}
            separator=","
            prefix="৳"
          />
        </div>

        {/* Last 30 Days Total */}
        <div className="p-4 bg-white rounded-lg shadow-md w-full">
          <p className="text-sm font-bold text-gray-700 text-nowrap mb-1">
            Last 30 Days
          </p>
          <CountUp
            className="text-xl font-extrabold text-gray-800"
            start={0}
            end={last30DaysTotal}
            duration={2.5}
            separator=","
            prefix="৳"
          />
        </div>
      </div>
    </div>
  );
};

export default SummaryView;
