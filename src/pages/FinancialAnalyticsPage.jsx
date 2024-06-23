import React from "react";
import { useDataContext } from "../context/DataContext";

const FinancialAnalyticsPage = () => {
  const { teachers, students, isLoading, error } = useDataContext();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const totalSalary = teachers?.reduce(
    (sum, teacher) => sum + teacher.salary,
    0
  );
  const totalIncome = students.reduce(
    (sum, student) => sum + student.feesPaid,
    0
  );

  return (
    <div>
      <h1>Financial Analytics</h1>
      <div>
        <h2>Total Salary Expenses: {totalSalary}</h2>
        <h2>Total Income from Fees: {totalIncome}</h2>
      </div>
    </div>
  );
};

export default FinancialAnalyticsPage;
