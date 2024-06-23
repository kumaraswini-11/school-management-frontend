import React from "react";
import { useParams } from "react-router-dom";
import { useDataContext } from "../context/DataContext";

const ClassAnalyticsPage = () => {
  const { classId } = useParams();
  const { classes, isLoading, error } = useDataContext();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const classItem = classes.find((c) => c.id === classId);

  if (!classItem) return <div>Class not found</div>;

  return (
    <div>
      <h1>Class Analytics for {classItem.name}</h1>
      {/* Display class analytics */}
    </div>
  );
};

export default ClassAnalyticsPage;
