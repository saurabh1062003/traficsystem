import React, { useState, useEffect } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  BarChart, Bar, PieChart, Pie, Cell, Legend, ResponsiveContainer
} from "recharts";

export default function Dashboard() {
  const [vehicles, setVehicles] = useState(1250);
  const [incidents, setIncidents] = useState(12);
  const [cameras, setCameras] = useState(18);
  const [speed, setSpeed] = useState(45);

  // traffic data for line chart
  const [data, setData] = useState([
    { time: "08:00", traffic: 200 },
    { time: "09:00", traffic: 500 },
    { time: "10:00", traffic: 800 },
    { time: "11:00", traffic: 650 },
    { time: "12:00", traffic: 700 },
    { time: "13:00", traffic: 900 },
  ]);

  // simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setVehicles((v) => v + Math.floor(Math.random() * 10));
      setIncidents((i) => (i + Math.floor(Math.random() * 2)) % 20);
      setCameras((c) => 15 + Math.floor(Math.random() * 5));
      setSpeed((s) => Math.max(20, Math.min(80, s + (Math.random() > 0.5 ? 1 : -1))));
      setData((d) => [
        ...d.slice(1),
        { time: `${8 + d.length}:00`, traffic: Math.floor(200 + Math.random() * 800) },
      ]);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const COLORS = ["#4f46e5", "#f59e0b", "#10b981", "#ef4444"];

  const containerStyle = {
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "30px",
    backgroundColor: "#f0f4f8",
    minHeight: "100%",
  };

  const cardStyle = (bgColor = "#fff") => ({
    backgroundColor: bgColor,
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    transition: "transform 0.2s",
  });

  const smallCardStyle = (bgColor, textColor = "#fff") => ({
    ...cardStyle(bgColor),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "120px",
    color: textColor,
    cursor: "pointer",
  });

  return (
    <div style={containerStyle}>
      <h2 style={{ fontSize: "28px", fontWeight: "bold", color: "#1f2937" }}>
        Dashboard
      </h2>

      {/* ✅ Stats Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
        <div style={smallCardStyle("#4f46e5")}>
          <h3>Total Vehicles</h3>
          <p style={{ fontSize: "28px", fontWeight: "700" }}>{vehicles}</p>
        </div>
        <div style={smallCardStyle("#f59e0b")}>
          <h3>Incidents Today</h3>
          <p style={{ fontSize: "28px", fontWeight: "700" }}>{incidents}</p>
        </div>
        <div style={smallCardStyle("#10b981")}>
          <h3>Active Cameras</h3>
          <p style={{ fontSize: "28px", fontWeight: "700" }}>{cameras}</p>
        </div>
        <div style={smallCardStyle("#ef4444")}>
          <h3>Average Speed</h3>
          <p style={{ fontSize: "28px", fontWeight: "700" }}>{speed} km/h</p>
        </div>
      </div>

      {/* ✅ Charts */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "20px" }}>
        <div style={cardStyle("#e0e7ff")}>
          <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "12px" }}>Traffic Flow (Today)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="traffic" stroke="#1e1892" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div style={cardStyle("#fde68a")}>
          <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "12px" }}>Incidents Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={[
                  { name: "Minor", value: Math.floor(incidents * 0.6) },
                  { name: "Major", value: Math.floor(incidents * 0.3) },
                  { name: "Critical", value: Math.floor(incidents * 0.1) },
                ]}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {COLORS.map((c, i) => (
                  <Cell key={i} fill={c} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ✅ System Overview */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "20px" }}>
        <div style={cardStyle("#4d7f65")}>
          <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "12px" }}>Traffic Density</h3>
          <p>
            High congestion in downtown areas during peak hours. Recommended routes are displayed in green.
          </p>
        </div>
        <div style={cardStyle("#a18b8b")}>
          <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "12px" }}>Upcoming Maintenance</h3>
          <p>
            Road maintenance scheduled on 5 major streets next week. Traffic will be rerouted accordingly.
          </p>
        </div>
      </div>
    </div>
  );
}
