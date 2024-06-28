import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const ChartComponent = ({ data, options, type = "Line", width, height }) => {
  return type === "Bar" ? (
    <Bar options={options} data={data} width={width} height={height} />
  ) : (
    <Line options={options} data={data} width={width} height={height} />
  );
};

export default ChartComponent;
