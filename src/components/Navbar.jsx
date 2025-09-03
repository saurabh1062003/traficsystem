import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const style = {
    backgroundColor: "#1f2937",
    color: "white",
    padding: "0.75rem 1.5rem",
    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative"
  };

  const titleStyle = {
    fontSize: "1.5rem",
    fontWeight: "700"
  };

  const navStyle = {
    display: menuOpen ? "flex" : "none",
    flexDirection: "column",
    position: "absolute",
    top: "100%",
    left: 0,
    width: "100%",
    backgroundColor: "#1f2937",
    padding: "10px 0"
  };

  const linkStyle = {
    color: "white",
    textDecoration: "none",
    padding: "10px 20px"
  };

  const links = [
    { path: "/", label: "Dashboard" },
    { path: "/live", label: "Live Traffic" },
    { path: "/incidents", label: "Incidents" },
    { path: "/analytics", label: "Analytics" },
    { path: "/cameras", label: "Cameras" },
    { path: "/routes", label: "Routes" }
  ];

  return (
    <div style={style}>
      <h1 style={titleStyle}>Futops Traffic System</h1>

      {/* Desktop Nav */}
      <div className="desktop-nav" style={{ display: "flex", gap: "20px" }}>
        {links.map((l) => (
          <NavLink
            key={l.path}
            to={l.path}
            style={({ isActive }) => ({
              ...linkStyle,
              backgroundColor: isActive ? "#374151" : "transparent",
              borderRadius: "6px"
            })}
          >
            {l.label}
          </NavLink>
        ))}
      </div>

      {/* Mobile Menu Toggle */}
      <div
        style={{
          display: "none",
          cursor: "pointer",
          padding: "10px",
          fontWeight: "700"
        }}
        onClick={() => setMenuOpen(!menuOpen)}
        className="mobile-toggle"
      >
        ☰
      </div>

      {/* Mobile Nav */}
      <div style={navStyle} className="mobile-nav">
        {links.map((l) => (
          <NavLink
            key={l.path}
            to={l.path}
            onClick={() => setMenuOpen(false)}
            style={({ isActive }) => ({
              ...linkStyle,
              backgroundColor: isActive ? "#374151" : "transparent"
            })}
          >
            {l.label}
          </NavLink>
        ))}
      </div>

      {/* User Profile / Avatar */}
      <div style={{ marginLeft: "20px" }}>
        <img
          src="https://i.pravatar.cc/32"
          alt="user"
          style={{ borderRadius: "50%" }}
        />
      </div>
    </div>
  );
}