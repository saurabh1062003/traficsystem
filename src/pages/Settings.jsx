import React, { useState } from "react";

// Card component with hover animation
const Card = ({ children, bgColor = "#b23030ff" }) => {
  const style = {
    backgroundColor: bgColor,
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    transition: "transform 0.2s, box-shadow 0.2s",
    cursor: "default",
  };
  return (
    <div
      style={style}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
      }}
    >
      {children}
    </div>
  );
};

export default function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [autoEscalate, setAutoEscalate] = useState(true);
  const [theme, setTheme] = useState("Light");
  const [cvEndpoint, setCvEndpoint] = useState("");
  const [messageBus, setMessageBus] = useState("");
  const [backupStatus, setBackupStatus] = useState("");
  const [exportStatus, setExportStatus] = useState("");

  const containerStyle = {
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    fontFamily: "sans-serif",
    backgroundColor: theme === "Dark" ? "#111827" : "#165be6ff",
    minHeight: "100vh",
    transition: "background 0.3s",
  };

  const labelStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "12px",
    fontWeight: "500",
  };

  const inputStyle = {
    padding: "6px 8px",
    borderRadius: "6px",
    border: "1px solid #145ac5ff",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
  };

  const buttonStyle = (bg) => ({
    padding: "8px 16px",
    marginRight: "8px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontWeight: "600",
    backgroundColor: bg,
    color: "#b71717ff",
    transition: "transform 0.2s, box-shadow 0.2s",
  });

  const sectionTitle = {
    fontSize: "1.25rem",
    fontWeight: "600",
    marginBottom: "12px",
  };

  const handleBackup = () => {
    setBackupStatus("Backup in progress...");
    setTimeout(() => setBackupStatus("Backup completed!"), 2000);
  };

  const handleExport = () => {
    setExportStatus("Export in progress...");
    setTimeout(() => setExportStatus("Settings exported!"), 2000);
  };

  return (
    <div style={containerStyle}>
      <h1
        style={{
          fontSize: "2rem",
          fontWeight: "700",
          color: theme === "Dark" ? "#1254d8ff" : "#1f2937",
        }}
      >
        Settings
      </h1>

      {/* General Settings */}
      <Card bgColor={theme === "Dark" ? "#1f2937" : "#152834ff"}>
        <h2 style={sectionTitle}>General</h2>
        <label style={labelStyle}>
          Enable Notifications
          <input
            type="checkbox"
            checked={notifications}
            onChange={(e) => setNotifications(e.target.checked)}
            style={{ accentColor: notifications ? "#3b82f6" : "#112240ff" }}
          />
        </label>
        <label style={labelStyle}>
          Auto-Escalation
          <input
            type="checkbox"
            checked={autoEscalate}
            onChange={(e) => setAutoEscalate(e.target.checked)}
            style={{ accentColor: autoEscalate ? "#10b981" : "#19325eff" }}
          />
        </label>
        <label style={labelStyle}>
          Theme
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            style={inputStyle}
          >
            <option>Light</option>
            <option>Dark</option>
          </select>
        </label>
      </Card>

      {/* Integrations */}
      <Card bgColor={theme === "Dark" ? "#374151" : "#1b6840ff"}>
        <h2 style={sectionTitle}>Integrations</h2>
        <label style={labelStyle}>
          CV Endpoint
          <input
            type="text"
            value={cvEndpoint}
            onChange={(e) => setCvEndpoint(e.target.value)}
            placeholder="http://..."
            style={inputStyle}
          />
        </label>
        <label style={labelStyle}>
          Message Bus
          <input
            type="text"
            value={messageBus}
            onChange={(e) => setMessageBus(e.target.value)}
            placeholder="kafka://..."
            style={inputStyle}
          />
        </label>
      </Card>

      {/* Backup / Export */}
      <Card bgColor={theme === "Dark" ? "#1f2937" : "#c5a731ff"}>
        <h2 style={sectionTitle}>Backup / Export</h2>
        <div>
          <button
            style={buttonStyle("#3b82f6")}
            onClick={handleExport}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Export Settings
          </button>
          <button
            style={buttonStyle("#000000ff")}
            onClick={handleBackup}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Backup Database
          </button>
        </div>
        {exportStatus && <p style={{ marginTop: "12px" }}>{exportStatus}</p>}
        {backupStatus && <p style={{ marginTop: "4px" }}>{backupStatus}</p>}
      </Card>

      {/* Advanced Options */}
      <Card bgColor={theme === "Dark" ? "#374151" : "#c51e7dff"}>
        <h2 style={sectionTitle}>Advanced Options</h2>
        <label style={labelStyle}>
          Enable Debug Mode
          <input type="checkbox" style={{ accentColor: "#f43f5e" }} />
        </label>
        <label style={labelStyle}>
          Auto Refresh Dashboard
          <input type="checkbox" defaultChecked style={{ accentColor: "#3b82f6" }} />
        </label>
        <label style={labelStyle}>
          Notification Sound
          <select style={inputStyle}>
            <option>Default</option>
            <option>Chime</option>
            <option>Alert</option>
          </select>
        </label>
      </Card>

      {/* Theme Preview */}
      <Card bgColor={theme === "Dark" ? "#111827" : "#864c4cff"}>
        <h2
          style={{
            ...sectionTitle,
            color: theme === "Dark" ? "#fff" : "#1f2937",
          }}
        >
          Theme Preview
        </h2>
        <p style={{ color: theme === "Dark" ? "#206adaff" : "#4b5563" }}>
          This is a live preview of the selected theme.
        </p>
      </Card>
    </div>
  );
}
