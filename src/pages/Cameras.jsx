import React, { useState, useEffect } from "react";

// ✅ Reusable Card
const Card = ({ children, bgColor = "#fff" }) => {
  const style = {
    backgroundColor: bgColor,
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  };
  return <div style={style}>{children}</div>;
};

// ✅ Generate random camera data
function genCameras(n = 12) {
  const locations = ["North", "East", "West", "South", "Central", "Sector 9", "Downtown"];
  return Array.from({ length: n }, (_, i) => ({
    id: i + 1,
    name: `Camera ${i + 1}`,
    location: locations[i % locations.length],
    status: Math.random() > 0.2 ? "Online" : "Offline",
    uptime: `${Math.floor(Math.random() * 24)}h ${Math.floor(Math.random() * 60)}m`,
    alerts: Math.floor(Math.random() * 10),
  }));
}

export default function Cameras() {
  const [cams, setCams] = useState(genCameras());
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [view, setView] = useState("grid"); // grid or table
  const [sortBy, setSortBy] = useState("");

  // ✅ Live status update every 5s
  useEffect(() => {
    const interval = setInterval(() => {
      setCams(genCameras(12));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // ✅ Filtering & Searching
  const filteredCams = cams
    .filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))
    .filter((c) => (filterStatus === "All" ? true : c.status === filterStatus));

  // ✅ Sorting
  const sortedCams = [...filteredCams].sort((a, b) => {
    if (sortBy === "alerts") return b.alerts - a.alerts;
    if (sortBy === "uptime") return parseInt(b.uptime) - parseInt(a.uptime);
    return 0;
  });

  // ✅ Export CSV
  const exportCSV = () => {
    const headers = Object.keys(cams[0]).join(",");
    const rows = cams.map((c) => Object.values(c).join(","));
    const csv = [headers, ...rows].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "cameras.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const containerStyle = {
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "30px",
    backgroundColor: "#f3f4f6",
    minHeight: "100%",
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ fontSize: "28px", fontWeight: "bold", color: "#1f2937" }}>Cameras</h1>

      {/* ✅ Controls */}
      <Card bgColor="#ddeeff">
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{ padding: "8px", borderRadius: "6px" }}
          >
            <option value="All">All</option>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{ padding: "8px", borderRadius: "6px" }}
          >
            <option value="">Sort By</option>
            <option value="alerts">Alerts</option>
            <option value="uptime">Uptime</option>
          </select>
          <button
            onClick={() => setView(view === "grid" ? "table" : "grid")}
            style={{ padding: "8px 12px", background: "#2563eb", color: "#fff", borderRadius: "6px", border: "none" }}
          >
            Toggle View ({view})
          </button>
          <button
            onClick={exportCSV}
            style={{ padding: "8px 12px", background: "#10b981", color: "#fff", borderRadius: "6px", border: "none" }}
          >
            Export CSV
          </button>
        </div>
      </Card>

      {/* ✅ Camera Overview */}
      <Card bgColor="#26648cff">
        <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "12px" }}>Camera Overview</h2>

        {view === "grid" ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" }}>
            {sortedCams.map((cam) => (
              <div
                key={cam.id}
                style={{
                  padding: "15px",
                  borderRadius: "10px",
                  backgroundColor: "#fff",
                  borderLeft: cam.status === "Online" ? "4px solid #10b981" : "4px solid #ef4444",
                }}
              >
                <h3 style={{ fontWeight: "600", fontSize: "18px" }}>{cam.name}</h3>
                <p>Location: <strong>{cam.location}</strong></p>
                <p>Status: <span style={{ color: cam.status === "Online" ? "#10b981" : "#ef4444" }}>{cam.status}</span></p>
                <p>Uptime: {cam.uptime}</p>
                <p>Alerts: {cam.alerts}</p>
              </div>
            ))}
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#2563eb", color: "#fff" }}>
                <th style={{ padding: "10px" }}>Name</th>
                <th style={{ padding: "10px" }}>Location</th>
                <th style={{ padding: "10px" }}>Status</th>
                <th style={{ padding: "10px" }}>Uptime</th>
                <th style={{ padding: "10px" }}>Alerts</th>
              </tr>
            </thead>
            <tbody>
              {sortedCams.map((cam) => (
                <tr key={cam.id} style={{ borderBottom: "1px solid #ccc" }}>
                  <td style={{ padding: "8px" }}>{cam.name}</td>
                  <td style={{ padding: "8px" }}>{cam.location}</td>
                  <td style={{ padding: "8px", color: cam.status === "Online" ? "#10b981" : "#ef4444" }}>
                    {cam.status}
                  </td>
                  <td style={{ padding: "8px" }}>{cam.uptime}</td>
                  <td style={{ padding: "8px" }}>{cam.alerts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>

      {/* ✅ Summary */}
      <Card bgColor="#dbb729ff">
        <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "12px" }}>Camera Summary</h2>
        <p>Total Cameras: {cams.length}</p>
        <p>Online: {cams.filter((c) => c.status === "Online").length}</p>
        <p>Offline: {cams.filter((c) => c.status === "Offline").length}</p>
        <p>Total Alerts: {cams.reduce((acc, c) => acc + c.alerts, 0)}</p>
      </Card>
    </div>
  );
}
