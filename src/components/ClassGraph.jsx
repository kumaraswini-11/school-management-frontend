import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { GenerateBarGraph } from "./";

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Class Gender Distribution",
    },
  },
};
const labels = ["Male", "Female"];

function ClassGraph() {
  const { id: classId } = useParams();
  const [graphData, setGraphData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGraphData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/v1/classes/graph/${classId}`
        );
        setGraphData(response.data);
      } catch (error) {
        setError("Error fetching data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchGraphData();
  }, [classId]);

  const data = {
    labels,
    datasets: [
      {
        label: "Number of Students",
        data: [graphData?.maleCount || 0, graphData?.femaleCount || 0],
        backgroundColor: ["rgba(255, 99, 132, 0.5)", "rgba(54, 162, 235, 0.5)"],
      },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-4">
      <h1 className="text-2xl font-bold mb-4">
        {loading
          ? "Loading..."
          : error
            ? "Error"
            : `Class Graph for ${graphData?.className || ""}`}
      </h1>
      {loading && <p>Loading graph data...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {graphData && (
        <div className="p-2 w-[60%] h-[400px]">
          <GenerateBarGraph options={options} data={data} />
        </div>
      )}
    </div>
  );
}

export default ClassGraph;
