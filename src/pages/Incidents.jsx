import React, { useState, useEffect } from "react";

// Card component with internal CSS
const Card = ({ children, bgColor = "#fff" }) => {
  const style = {
    backgroundColor: bgColor,
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    transition: "transform 0.2s",
  };
  return <div style={style}>{children}</div>;
};

// Generate random incidents
function randomIncidents(n = 12) {
  const types = ["Accident", "Roadblock", "Breakdown", "Heavy Rain", "Event Crowd"];
  const locs = ["Highway 21", "Downtown", "Bridge A", "Tunnel X", "Sector 9", "Market Rd"];
  const severityColors = { Low: "#086848ff", Medium: "#f59e0b", High: "#ef4444" };

  return Array.from({ length: n }, (_, i) => {
    const sev = ["Low", "Medium", "High"][Math.floor(Math.random() * 3)];
    return {
      id: i + 1,
      type: types[Math.floor(Math.random() * types.length)],
      location: locs[Math.floor(Math.random() * locs.length)],
      severity: sev,
      time: new Date(Date.now() - Math.random() * 1e7).toLocaleString(),
      color: severityColors[sev],
    };
  });
}

export default function Incidents() {
  const [incidents, setIncidents] = useState(randomIncidents(15));
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setIncidents((prev) => [...randomIncidents(1), ...prev].slice(0, 15));
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Styles
  const containerStyle = {
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "30px",
    backgroundColor: "#df90e1ff",
    minHeight: "100%",
  };

  const titleStyle = {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#1b4d94ff",
  };

  const controlsStyle = {
    display: "flex",
    gap: "12px",
    marginBottom: "12px",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
  };

  const thStyle = {
    borderBottom: "2px solid #c98d8dff",
    padding: "12px",
    textAlign: "left",
    backgroundColor: "#0d56e8ff",
    fontWeight: "600",
    color: "#fff",
  };

  const tdStyle = {
    padding: "12px",
    borderBottom: "1px solid #0d46baff",
  };

  // Apply filter & search
  const filteredIncidents = incidents.filter((inc) => {
    return (
      (filter === "All" || inc.severity === filter) &&
      (inc.type.toLowerCase().includes(search.toLowerCase()) ||
        inc.location.toLowerCase().includes(search.toLowerCase()))
    );
  });

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Incidents</h1>

      {/* Filters & Search */}
      <div style={controlsStyle}>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All Severities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <input
          type="text"
          placeholder="Search incidents..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Summary Card */}
      <Card bgColor="#ab8110ff">
        <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "12px" }}>
          Summary
        </h2>
        <p>Total: {incidents.length}</p>
        <p>High Severity: {incidents.filter((i) => i.severity === "High").length}</p>
        <p>Medium Severity: {incidents.filter((i) => i.severity === "Medium").length}</p>
        <p>Low Severity: {incidents.filter((i) => i.severity === "Low").length}</p>
      </Card>

      {/* Incident Table */}
      <Card bgColor="#7ca8c6ff">
        <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "12px" }}>
          Recent Reports
        </h2>
        <div style={{ overflowX: "auto" }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>Type</th>
                <th style={thStyle}>Location</th>
                <th style={thStyle}>Severity</th>
                <th style={thStyle}>Time</th>
              </tr>
            </thead>
            <tbody>
              {filteredIncidents.map((inc) => (
                <tr key={inc.id}>
                  <td style={tdStyle}>{inc.id}</td>
                  <td style={tdStyle}>{inc.type}</td>
                  <td style={tdStyle}>{inc.location}</td>
                  <td style={{ ...tdStyle, color: inc.color, fontWeight: "600" }}>
                    {inc.severity}
                  </td>
                  <td style={tdStyle}>{inc.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
