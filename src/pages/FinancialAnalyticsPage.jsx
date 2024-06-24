import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useDataContext } from "../context/DataContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: { position: "top" },
    title: { display: true, text: "Financial Analytics" },
  },
  maintainAspectRatio: false,
};

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const years = Array.from(
  { length: 10 },
  (_, i) => new Date().getFullYear() - i
);

const FinancialAnalyticsPage = () => {
  const { baseURL } = useDataContext();
  const [data, setData] = useState({ totalSalary: 0, totalIncome: 0 });
  const [view, setView] = useState("monthly");
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(new Date().getFullYear());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${baseURL}/teachers/finance-analytics`,
          {
            params: { view, month: month + 1, year },
          }
        );
        setData({
          totalSalary: response.data.expenses,
          totalIncome: response.data.income,
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [view, month, year, baseURL]);

  const handleViewChange = (e) => setView(e.target.value);
  const handleMonthChange = (e) => setMonth(parseInt(e.target.value));
  const handleYearChange = (e) => setYear(parseInt(e.target.value));

  const renderChart = () => {
    const labels = view === "yearly" ? months : [months[month]];
    const chartData = {
      labels,
      datasets: [
        {
          label: "Total Salary Expenses",
          data:
            view === "yearly"
              ? Array(12).fill(data.totalSalary / 12)
              : [data.totalSalary],
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
        },
        {
          label: "Total Income from Fees",
          data:
            view === "yearly"
              ? Array(12).fill(data.totalIncome / 12)
              : [data.totalIncome],
          borderColor: "rgba(153, 102, 255, 1)",
          backgroundColor: "rgba(153, 102, 255, 0.2)",
        },
      ],
    };
    return (
      <div className="h-96">
        <Line options={options} data={chartData} />
      </div>
    );
  };

  if (isLoading) return <div className="text-center mt-10">Loading...</div>;
  if (error)
    return <div className="text-center mt-10 text-red-500">Error: {error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Financial Analytics</h1>
      <div className="flex flex-col lg:flex-row justify-between items-center mb-4 space-y-4 lg:space-y-0">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center gap-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="monthly"
                checked={view === "monthly"}
                onChange={handleViewChange}
                className="form-radio text-purple-600"
              />
              <span className="ml-2">Monthly</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="yearly"
                checked={view === "yearly"}
                onChange={handleViewChange}
                className="form-radio text-purple-600"
              />
              <span className="ml-2">Yearly</span>
            </label>
          </div>
          <div className="flex flex-wrap gap-4">
            {view === "monthly" && (
              <div>
                <label className="block">
                  Month:
                  <select
                    value={month}
                    onChange={handleMonthChange}
                    className="form-select mt-1 block w-full p-1 rounded"
                  >
                    {months.map((m, index) => (
                      <option key={m} value={index}>
                        {m}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            )}
            <div>
              <label className="block">
                Year:
                <select
                  value={year}
                  onChange={handleYearChange}
                  className="form-select mt-1 block w-full p-1 rounded"
                >
                  {years.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>
        </div>
        <div className="text-left space-y-2">
          <h2 className="text-md font-semibold">
            Total Salary Expenses: ${data.totalSalary}
          </h2>
          <h2 className="text-md font-semibold">
            Total Income from Fees: ${data.totalIncome}
          </h2>
        </div>
      </div>
      {view === "yearly" && renderChart()}
    </div>
  );
};

export default FinancialAnalyticsPage;
