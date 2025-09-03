import React, { useState, useMemo } from "react";
import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

// Card component with internal styling
const Card = ({ children, bgColor = "#fff" }) => {
  const style = {
    backgroundColor: bgColor,
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    transition: "transform 0.2s",
  };
  return <div style={style}>{children}</div>;
};

// Generate random weekly data
function genWeek() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return days.map((d) => ({
    day: d,
    avg: Math.round(Math.random() * 500 + 100),
    peak: Math.round(Math.random() * 800 + 300),
    congestion: Math.round(Math.random() * 100),
    incidents: Math.floor(Math.random() * 5),
  }));
}

export default function Analytics() {
  const [week] = useState(genWeek());

  const totalAvg = useMemo(() => week.reduce((a, d) => a + d.avg, 0), [week]);
  const totalPeak = useMemo(() => week.reduce((a, d) => a + d.peak, 0), [week]);
  const totalIncidents = useMemo(
    () => week.reduce((a, d) => a + d.incidents, 0),
    [week]
  );

  // Styles
  const containerStyle = {
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "30px",
    backgroundColor: "#f3f4f6",
    minHeight: "100%",
  };
  const titleStyle = { fontSize: "28px", fontWeight: "bold", color: "#1f2937" };
  const statStyle = { fontSize: "18px", fontWeight: "600", margin: "8px 0" };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Analytics</h1>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        <Card bgColor="#657cc8ff">
          <h2 style={{ fontSize: "20px", fontWeight: "600" }}>Weekly Totals</h2>
          <p style={statStyle}>Total Avg Vehicles: {totalAvg}</p>
          <p style={statStyle}>Total Peak Vehicles: {totalPeak}</p>
          <p style={statStyle}>Total Incidents: {totalIncidents}</p>
        </Card>

        <Card bgColor="#72b88aff">
          <h2 style={{ fontSize: "20px", fontWeight: "600" }}>Daily Average</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={week}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="avg" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card bgColor="#cfbb68ff">
          <h2 style={{ fontSize: "20px", fontWeight: "600" }}>Daily Peak</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={week}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="peak" stroke="#b91c1c" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card bgColor="#cc7a7aff">
          <h2 style={{ fontSize: "20px", fontWeight: "600" }}>Daily Congestion</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={week}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="congestion" fill="#f59e0b" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card bgColor="#4193c9ff">
          <h2 style={{ fontSize: "20px", fontWeight: "600" }}>Incidents Overview</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={week}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="incidents" stroke="#047857" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Table */}
      <Card bgColor="#3bc14dff">
        <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "12px" }}>
          Detailed Table
        </h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#e1ba1fff", fontWeight: "600" }}>
              <th style={{ padding: "10px" }}>Day</th>
              <th style={{ padding: "10px" }}>Avg</th>
              <th style={{ padding: "10px" }}>Peak</th>
              <th style={{ padding: "10px" }}>Congestion (%)</th>
              <th style={{ padding: "10px" }}>Incidents</th>
            </tr>
          </thead>
          <tbody>
            {week.map((d, idx) => (
              <tr key={idx} style={{ borderBottom: "1px solid #83764aff" }}>
                <td style={{ padding: "8px" }}>{d.day}</td>
                <td style={{ padding: "8px" }}>{d.avg}</td>
                <td style={{ padding: "8px" }}>{d.peak}</td>
                <td style={{ padding: "8px" }}>{d.congestion}</td>
                <td style={{ padding: "8px" }}>{d.incidents}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
