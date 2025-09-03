import React, { useState, useMemo, useEffect } from 'react';

// Simple Card component
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

// Dummy TrafficBar chart
const TrafficBar = ({ data }) => {
  const container = {
    display: "flex",
    alignItems: "flex-end",
    gap: "8px",
    height: "200px",
    marginTop: "16px",
  };
  return (
    <div style={container}>
      {data.map((d, i) => (
        <div key={i} style={{
          height: `${d.value * 20}px`,
          width: "40px",
          backgroundColor: d.label === "Critical" ? "#dc2626" : d.label === "Warning" ? "#ca8a04" : "#3b82f6",
          borderRadius: "6px",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          color: "#fff",
          fontWeight: "600",
          fontSize: "0.75rem",
        }}>
          {d.value}
        </div>
      ))}
    </div>
  );
};

// Generate dummy alerts
function genAlerts(n = 15) {
  const types = ['Speed', 'Congestion', 'Camera', 'Weather', 'Event'];
  return Array.from({ length: n }, (_, i) => ({
    id: i + 1,
    type: types[i % types.length],
    message: `${types[i % types.length]} triggered at Zone ${i % 6 + 1}`,
    level: ['Info', 'Warning', 'Critical'][i % 3],
    timestamp: new Date(Date.now() - Math.random() * 1e7).toLocaleTimeString()
  }));
}

export default function Alerts() {
  const [alerts, setAlerts] = useState(genAlerts());
  const [filter, setFilter] = useState("All");

  // Filtered alerts
  const filteredAlerts = useMemo(() => {
    if (filter === "All") return alerts;
    return alerts.filter(a => a.level === filter);
  }, [alerts, filter]);

  // Summary stats
  const stats = useMemo(() => {
    const s = { Info: 0, Warning: 0, Critical: 0 };
    alerts.forEach(a => s[a.level] += 1);
    return Object.entries(s).map(([k, v]) => ({ label: k, value: v }));
  }, [alerts]);

  // Simulate live alert updates every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setAlerts(prev => [ 
        ...prev, 
        {
          id: prev.length + 1,
          type: ['Speed','Congestion','Camera','Weather','Event'][Math.floor(Math.random()*5)],
          message: 'New alert triggered!',
          level: ['Info','Warning','Critical'][Math.floor(Math.random()*3)],
          timestamp: new Date().toLocaleTimeString()
        }
      ]);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // Inline styles
  const containerStyle = {
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    backgroundColor: "#f3f4f6",
    minHeight: "100vh",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "700px"
  };

  const thStyle = {
    padding: "10px",
    textAlign: "left",
    backgroundColor: "#1f2937",
    color: "#fff",
    borderRadius: "6px",
  };

  const tdStyle = {
    padding: "8px",
    borderBottom: "1px solid #e5e7eb"
  };

  const levelColor = (level) => {
    if(level==="Critical") return { color: "#dc2626", fontWeight:"600" };
    if(level==="Warning") return { color: "#ca8a04", fontWeight:"600" };
    return { color: "#3b82f6", fontWeight:"600" };
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ fontSize: "2rem", fontWeight: "700", color:"#1f2937" }}>Alerts</h1>

      {/* Filter buttons */}
      <Card bgColor="#427699ff">
        <h2 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "12px" }}>Filter Alerts</h2>
        <div style={{ display: "flex", gap: "12px" }}>
          {["All","Info","Warning","Critical"].map(f => (
            <button
              key={f}
              onClick={()=>setFilter(f)}
              style={{
                padding:"6px 12px",
                borderRadius:"6px",
                border: "none",
                cursor:"pointer",
                fontWeight:"600",
                backgroundColor: filter===f ? "#3b82f6" : "#93c5fd",
                color:"#af3838ff",
                transition:"0.2s"
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </Card>

      {/* Alert Feed */}
      <Card bgColor="#cdaa21ff">
        <h2 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "12px" }}>Alert Feed</h2>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Type</th>
              <th style={thStyle}>Message</th>
              <th style={thStyle}>Level</th>
              <th style={thStyle}>Time</th>
            </tr>
          </thead>
          <tbody>
            {filteredAlerts.map(a => (
              <tr key={a.id} style={{transition:"0.2s"}} 
                  onMouseEnter={e=>e.currentTarget.style.backgroundColor="#dfa052ff"}
                  onMouseLeave={e=>e.currentTarget.style.backgroundColor="transparent"}>
                <td style={tdStyle}>{a.id}</td>
                <td style={tdStyle}>{a.type}</td>
                <td style={tdStyle}>{a.message}</td>
                <td style={{...tdStyle, ...levelColor(a.level)}}>{a.level}</td>
                <td style={tdStyle}>{a.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Summary Chart */}
      <Card bgColor="#2fd580ff">
        <h2 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "12px" }}>Alert Summary</h2>
        <TrafficBar data={stats} />
      </Card>

      {/* Additional sections */}
      <Card bgColor="#b83780ff">
        <h2 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "12px" }}>Recent Critical Alerts</h2>
        <ul style={{ listStyleType:"disc", paddingLeft:"20px" }}>
          {alerts.filter(a=>a.level==="Critical").slice(-5).map(a=>(
            <li key={a.id} style={{margin:"4px 0"}}>{a.type} at {a.timestamp}: {a.message}</li>
          ))}
        </ul>
      </Card>

      <Card bgColor="#6b4891ff">
        <h2 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "12px" }}>Statistics</h2>
        <p>Total Alerts: {alerts.length}</p>
        <p>Info: {stats.find(s=>s.label==="Info")?.value}</p>
        <p>Warning: {stats.find(s=>s.label==="Warning")?.value}</p>
        <p>Critical: {stats.find(s=>s.label==="Critical")?.value}</p>
      </Card>
    </div>
  );
}
