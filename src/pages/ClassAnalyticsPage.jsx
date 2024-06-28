// ClassAnalyticsPage.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDataContext } from "../context/DataContext";
import ChartComponent from "../components/ChartComponent";

const ClassAnalyticsPage = () => {
  const { classId } = useParams();
  const { classes, isLoading, error } = useDataContext();
  const [selectedClass, setSelectedClass] = useState(null);

  useEffect(() => {
    if (classes && classes.length > 0) {
      const foundClass = classes.find((cls) => cls._id === classId);
      setSelectedClass(foundClass || null);
    }
  }, [classId, classes]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!selectedClass) {
    return <div>Class not found</div>;
  }

  const { name, year, teacher, studentFees, studentLimit, students } =
    selectedClass;

  // Calculate number of male and female students
  const maleStudentsCount = students.filter(
    (student) => student.gender === "male"
  ).length;
  const femaleStudentsCount = students.filter(
    (student) => student.gender === "female"
  ).length;

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Gender Distribution",
      },
    },
  };

  const chartData = {
    labels: ["Male", "Female"],
    datasets: [
      {
        label: "Gender Distribution",
        backgroundColor: ["rgba(54, 162, 235, 0.6)", "rgba(255, 99, 132, 0.6)"],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
        hoverBackgroundColor: [
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 99, 132, 0.8)",
        ],
        hoverBorderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
        data: [maleStudentsCount, femaleStudentsCount],
      },
    ],
  };

  return (
    <div className="container mx-auto mt-2">
      <h1 className="text-xl font-bold mb-2 text-gray-800">
        Class Analytics for "{name}"
      </h1>
      <div className="bg-white shadow-md rounded p-3">
        <p className="text-md mb-1">
          <strong className="font-semibold">Estd. Year:</strong> {year}
        </p>
        <p className="text-md mb-1">
          <strong className="font-semibold">Teacher Name:</strong>{" "}
          {teacher.name}
        </p>
        <p className="text-md mb-1">
          <strong className="font-semibold">Class Fee:</strong> ${studentFees}
        </p>
        <p className="text-md mb-1">
          <strong className="font-semibold">Class Limit:</strong> {studentLimit}
        </p>
        <p className="text-md mb-1">
          <strong className="font-semibold">Students Enrolled:</strong>{" "}
          {students.map((student) => student.name).join(", ")}
        </p>
      </div>

      <div className="bg-white shadow-md rounded p-4 mt-1">
        <ChartComponent
          options={options}
          data={chartData}
          type="Bar"
          width={50}
          height={300}
        />
      </div>
    </div>
  );
};

export default ClassAnalyticsPage;
