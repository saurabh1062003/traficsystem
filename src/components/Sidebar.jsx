import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const sidebarStyle = {
    width: collapsed ? "80px" : "250px",
    backgroundColor: "#1f2937",
    color: "white",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    minHeight: "100vh",
    transition: "width 0.3s",
  };

  const toggleStyle = {
    cursor: "pointer",
    marginBottom: "16px",
    fontWeight: "700",
  };

  const linkStyle = (isActive) => ({
    color: isActive ? "#3b82f6" : "white",
    textDecoration: "none",
    fontSize: "1rem",
    padding: "8px 12px",
    borderRadius: "6px",
    display: "block",
    backgroundColor: isActive ? "#374151" : "transparent",
    transition: "all 0.2s",
    whiteSpace: "nowrap",
  });

  const menuItems = [
    { to: "/", label: "Dashboard" },
    { to: "/live", label: "Live Traffic" },
    { to: "/incidents", label: "Incidents" },
    { to: "/analytics", label: "Analytics" },
    { to: "/cameras", label: "Cameras" },
    { to: "/routes", label: "Routes" },
    { to: "/control", label: "Control Center" },
    { to: "/alerts", label: "Alerts" },
    { to: "/settings", label: "Settings" },
    { to: "/reports", label: "Reports" },
  ];

  return (
    <div style={sidebarStyle}>
      <div style={toggleStyle} onClick={() => setCollapsed(!collapsed)}>
        {collapsed ? ">" : "< Collapse"}
      </div>

      {menuItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          style={({ isActive }) => linkStyle(isActive)}
        >
          {!collapsed && item.label}
        </NavLink>
      ))}

      <div
        style={{
          marginTop: "auto",
          fontSize: "0.85rem",
          color: "#9ca3af",
        }}
      >
        {collapsed ? "FTS" : "Futops Traffic System"} <br />
        {!collapsed && "v1.0.0"}
      </div>
    </div>
  );
}
