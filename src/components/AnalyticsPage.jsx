import React, { useState, useEffect } from "react";
import axios from "axios";
import { GenerateBarGraph } from "./";

const AnalyticsPage = () => {
  const [view, setView] = useState("yearly");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [expenses, setExpenses] = useState(0);
  const [income, setIncome] = useState(0);
  const [error, setError] = useState("");

  const data = {
    labels: ["income", "expenses"],
    datasets: [
      {
        label: "Income",
        data: [income, expenses],
        backgroundColor: ["rgba(255, 99, 132, 0.5)", "rgba(54, 162, 235, 0.5)"],
      },
    ],
  };

  useEffect(() => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    setSelectedMonth(currentMonth.toString());
    setSelectedYear(currentYear.toString());
  }, []);

  useEffect(() => {
    if (selectedYear) {
      fetchData();
    }
  }, [view, selectedYear, selectedMonth]);

  const fetchData = async () => {
    try {
      let url = `${import.meta.env.VITE_BASE_URL}/api/v1/teachers/analytics`;
      const params = {
        view,
        year: selectedYear,
        ...(view === "monthly" && { month: selectedMonth }),
      };
      const response = await axios.get(url, { params });
      const { expenses, income } = response.data;
      setExpenses(expenses);
      setIncome(income);
      setError("");
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data. Please try again later.");
    }
  };

  const toggleView = () => {
    setView((prevView) => (prevView === "monthly" ? "yearly" : "monthly"));
  };

  const handleMonthChange = (event) => {
    const { value } = event.target;
    setSelectedMonth(value);
  };

  const handleYearChange = (event) => {
    const { value } = event.target;
    setSelectedYear(value);
  };

  const months = Array.from({ length: 12 }, (_, i) => {
    const date = new Date(0, i);
    return date.toLocaleString("default", { month: "long" });
  });
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

  return (
    <section className="flex flex-col md:flex-row sm:justify-between gap-4 mt-8 p-4 sm:p-8 bg-white shadow-lg rounded-md">
      <div className="flex flex-col md:w-full">
        <h2 className="text-2xl font-bold mb-4 text-start">Analytics Page</h2>
        <div className="mb-4 flex justify-start">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={view === "yearly"}
              onChange={toggleView}
              className="mr-2"
            />
            Yearly View
          </label>
        </div>
        <div className="flex flex-col sm:flex-row sm:gap-4 sm:items-center sm:w-4/5 gap-4">
          {view === "monthly" && (
            <div className="mb-4">
              <label className="flex items-center">
                Select Month:
                <select
                  value={selectedMonth}
                  onChange={handleMonthChange}
                  className="ml-2 border rounded-md p-1"
                >
                  {months.map((month, index) => (
                    <option key={month} value={index + 1}>
                      {month}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          )}
          <div className="mb-4">
            <label className="flex items-center">
              Select Year:
              <select
                value={selectedYear}
                onChange={handleYearChange}
                className="ml-2 border rounded-md p-1"
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <div>
          <h3 className="text-xl font-bold">Expenses: {expenses}</h3>
          <h3 className="text-xl font-bold">Income: {income}</h3>
        </div>
      </div>
      <div className="md:w-full">
        {!(expenses === 0 && income === 0) ? (
          <GenerateBarGraph data={data} />
        ) : (
          <p className="text-center mt-4 w-4/6">
            No data available to display. Both expenses and income are currently
            zero.
          </p>
        )}
      </div>
    </section>
  );
};

export default AnalyticsPage;
