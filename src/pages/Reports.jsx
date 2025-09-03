import React, { useState, useEffect } from 'react';

// Internal Card component
const Card = ({ children, bgColor = "#fff" }) => {
  const style = {
    backgroundColor: bgColor,
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    transition: "transform 0.2s",
    overflowX: "auto",
  };
  return <div style={style}>{children}</div>;
};

// Generate mock reports
function genReports(n = 12) {
  const types = ["Daily", "Weekly", "Monthly"];
  return Array.from({ length: n }, (_, i) => ({
    id: 100 + i,
    name: `Report-${i + 1}`,
    type: types[i % types.length],
    generatedOn: new Date(Date.now() - i * 86400000).toLocaleDateString(),
    downloads: Math.floor(Math.random() * 100),
    status: ["Pending", "Generated", "Failed"][i % 3],
  }));
}

export default function Reports() {
  const [reports, setReports] = useState(genReports());
  const [reportType, setReportType] = useState("Daily");

  // Simulate auto-refresh of reports every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => setReports(genReports()), 10000);
    return () => clearInterval(interval);
  }, []);

  const containerStyle = {
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "30px",
    backgroundColor: "#f3f4f6",
    minHeight: "100%",
  };

  const titleStyle = { fontSize: "28px", fontWeight: "bold", color: "#1f2937" };
  const tableStyle = { width: "100%", borderCollapse: "collapse", minWidth: "600px" };
  const tableHeaderStyle = {
    backgroundColor: "#3b82f6",
    color: "#fff",
    fontWeight: "600",
  };
  const rowStyle = (status) => ({
    borderBottom: "1px solid #4a7ee6ff",
    backgroundColor: status === "Failed" ? "#f41d1dff" : status === "Pending" ? "#d4ae15ff" : "#1bda78ff",
  });
  const statusColor = (status) => {
    if (status === "Generated") return "#10b981";
    if (status === "Pending") return "#f59e0b";
    if (status === "Failed") return "#ef4444";
    return "#6b7280";
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Reports</h1>

      {/* Reports Table */}
      <Card bgColor="#3c71b7ff">
        <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "12px" }}>Available Reports</h2>
        <table style={tableStyle}>
          <thead>
            <tr style={tableHeaderStyle}>
              <th style={{ padding: "10px" }}>ID</th>
              <th style={{ padding: "10px" }}>Name</th>
              <th style={{ padding: "10px" }}>Type</th>
              <th style={{ padding: "10px" }}>Generated On</th>
              <th style={{ padding: "10px" }}>Downloads</th>
              <th style={{ padding: "10px" }}>Status</th>
              <th style={{ padding: "10px" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((r) => (
              <tr key={r.id} style={rowStyle(r.status)}>
                <td style={{ padding: "8px" }}>{r.id}</td>
                <td style={{ padding: "8px" }}>{r.name}</td>
                <td style={{ padding: "8px" }}>{r.type}</td>
                <td style={{ padding: "8px" }}>{r.generatedOn}</td>
                <td style={{ padding: "8px" }}>{r.downloads}</td>
                <td style={{ padding: "8px", fontWeight: "600", color: statusColor(r.status) }}>{r.status}</td>
                <td style={{ padding: "8px" }}>
                  <button
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "#3b82f6",
                      color: "#d04040ff",
                      borderRadius: "6px",
                      cursor: "pointer",
                      border: "none",
                    }}
                  >
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Generate New Report */}
      <Card bgColor="#25a552ff">
        <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "12px" }}>Generate New Report</h2>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <select
            style={{ padding: "8px", borderRadius: "6px", border: "1px solid #32558aff" }}
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
          >
            <option>Daily</option>
            <option>Weekly</option>
            <option>Monthly</option>
          </select>
          <button
            style={{
              padding: "8px 16px",
              backgroundColor: "#10de99ff",
              color: "#f62424ff",
              borderRadius: "6px",
              cursor: "pointer",
              border: "none",
            }}
            onClick={() => alert(`Generating ${reportType} report...`)}
          >
            Generate
          </button>
        </div>
      </Card>

      {/* Summary Card */}
      <Card bgColor="#caa821ff">
        <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "12px" }}>Reports Summary</h2>
        <p>Total Reports: {reports.length}</p>
        <p>Daily: {reports.filter(r => r.type === "Daily").length}</p>
        <p>Weekly: {reports.filter(r => r.type === "Weekly").length}</p>
        <p>Monthly: {reports.filter(r => r.type === "Monthly").length}</p>
        <p>Generated: {reports.filter(r => r.status === "Generated").length}</p>
        <p>Pending: {reports.filter(r => r.status === "Pending").length}</p>
        <p>Failed: {reports.filter(r => r.status === "Failed").length}</p>
        <p>Total Downloads: {reports.reduce((acc, r) => acc + r.downloads, 0)}</p>
      </Card>
    </div>
  );
}