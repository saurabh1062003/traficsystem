import React from "react";
 export default function Card({ children }) { 
       const style = { backgroundColor: "#fff", borderRadius: "8px", padding: "20px", boxShadow: "0 2px 8px rgba(0,0,0,0.15)", margin: "12px 0" };
        return 
        <div style={style}>
              {children}</div>; }