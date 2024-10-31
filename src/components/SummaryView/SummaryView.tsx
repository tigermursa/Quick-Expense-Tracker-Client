"use client";
import { useGeExpensesDataForHomeQuery } from "@/redux/features/data/dataApi";
import CountUp from "react-countup";

const SummaryView = () => {
  // Hardcoded user ID for now
  const userId = "6722690bd9b9d6e6b46aed2a";

  // Fetch summary data using the custom hook
  const { data, isLoading, isError } = useGeExpensesDataForHomeQuery({
    userId,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError || !data?.data) return <p>Error loading summary data.</p>;

  const { allTimeTotal, last7DaysTotal, last30DaysTotal } = data.data;

  return (
    <div style={{ textAlign: "center", fontSize: "1.5rem" }}>
      <h2>Expense Summary</h2>
      <div style={{ marginBottom: "1rem" }}>
        <p>All-Time Total</p>
        <CountUp
          start={0}
          end={allTimeTotal}
          duration={2.5}
          separator=","
          prefix="$"
        />
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <p>Last 7 Days Total</p>
        <CountUp
          start={0}
          end={last7DaysTotal}
          duration={2.5}
          separator=","
          prefix="$"
        />
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <p>Last 30 Days Total</p>
        <CountUp
          start={0}
          end={last30DaysTotal}
          duration={2.5}
          separator=","
          prefix="$"
        />
      </div>
    </div>
  );
};

export default SummaryView;
