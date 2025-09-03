// src/components/Charts.jsx
import React from "react";
import { Line, Bar } from "react-chartjs-2";

const chartContainerStyle = {
  backgroundColor: "#fff",
  padding: "16px",
  borderRadius: "8px",
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  margin: "8px 0",
};

export const TrafficLine = ({ data, options }) => {
  return (
    <div style={chartContainerStyle}>
      <Line data={data} options={options} />
    </div>
  );
};

export const TrafficBar = ({ data, options }) => {
  return (
    <div style={chartContainerStyle}>
      <Bar data={data} options={options} />
    </div>
  );
};
