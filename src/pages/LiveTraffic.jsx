
import React, { useEffect, useState, useMemo } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

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

// TrafficLine chart component
const TrafficLine = ({ data }) => {
  return (
    <LineChart width={790} height={300} data={data}>
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="time" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="cars" stroke="#4f46e5" strokeWidth={3} name="Cars"/>
      <Line type="monotone" dataKey="bikes" stroke="#f59e0b" strokeWidth={3} name="Bikes"/>
      <Line type="monotone" dataKey="buses" stroke="#10b981" strokeWidth={3} name="Buses"/>
      <Legend />
    </LineChart>
  );
};

// TrafficBar chart component
const TrafficBar = ({ data }) => {
  const barData = [
    { name: 'Cars', value: data.reduce((a,b)=>a+b.cars,0) },
    { name: 'Bikes', value: data.reduce((a,b)=>a+b.bikes,0) },
    { name: 'Buses', value: data.reduce((a,b)=>a+b.buses,0) },
  ];
  return (
    <BarChart width={700} height={300} data={barData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#4f46e5" />
      <Bar dataKey="value" fill="#f59e0b" />
      <Bar dataKey="value" fill="#10b981" />
    </BarChart>
  );
};

// Utility: seeded random generator
function seededRandom(seed){
  let s = seed % 2147483647;
  if(s <= 0) s += 2147483646;
  return function(){
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  }
}

// Generate hourly flow data
function genFlow(seed=100){
  const rnd = seededRandom(seed);
  return Array.from({length: 24}, (_,h)=>({
    time: `${h}:00`,
    cars: Math.round(rnd()*200+50),
    bikes: Math.round(rnd()*100+20),
    buses: Math.round(rnd()*30+5)
  }));
}

export default function LiveTraffic() {
  const [flow, setFlow] = useState(genFlow());
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(()=>{
    const id = setInterval(()=>{
      setFlow(genFlow(Math.floor(Math.random()*1000)));
      setLastUpdate(new Date());
    }, 5000);
    return ()=>clearInterval(id);
  },[]);

  const totals = useMemo(()=>{
    return flow.reduce((acc,f)=>{
      acc.cars+=f.cars;
      acc.bikes+=f.bikes;
      acc.buses+=f.buses;
      return acc;
    },{cars:0,bikes:0,buses:0});
  },[flow]);

  // Container styles
  const containerStyle = {
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "30px",
    backgroundColor: "#f0f4f8",
    minwidth:'120%',
    minHeight: "100%",
  };

  const titleStyle = {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#1f2937",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
  };

  const statStyle = {
    fontSize: "28px",
    fontWeight: "700",
    marginTop: "8px",
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Live Traffic</h1>
      <p style={{ color: "#6b7280" }}>Last update: {lastUpdate.toLocaleTimeString()}</p>

      {/* Top stats cards */}
      <div style={gridStyle}>
        <Card bgColor="#4f46e5">
          <h2 style={{ color: "#fff", fontWeight: "600" }}>Cars</h2>
          <p style={statStyle}>{totals.cars}</p>
        </Card>
        <Card bgColor="#f59e0b">
          <h2 style={{ color: "#fff", fontWeight: "600" }}>Bikes</h2>
          <p style={statStyle}>{totals.bikes}</p>
        </Card>
        <Card bgColor="#10b981">
          <h2 style={{ color: "#fff", fontWeight: "600" }}>Buses</h2>
          <p style={statStyle}>{totals.buses}</p>
        </Card>
      </div>

      {/* Charts */}
      <Card bgColor="#e0e7ff">
        <h2 style={{ fontSize:"20px", fontWeight:"600", marginBottom:"12px" }}>Hourly Traffic Flow</h2>
        <TrafficLine data={flow} />
      </Card>

      <Card bgColor="#e6d69aff">
        <h2 style={{ fontSize:"20px", fontWeight:"600", marginBottom:"12px" }}>Category Distribution</h2>
        <TrafficBar data={flow} />
      </Card>

      {/* Details Table */}
      <Card bgColor="#1fb869ff">
        <h2 style={{ fontSize:"20px", fontWeight:"600", marginBottom:"12px" }}>Detailed Traffic</h2>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #6e4848ff", textAlign: "left" }}>
                <th>Time</th><th>Cars</th><th>Bikes</th><th>Buses</th>
              </tr>
            </thead>
            <tbody>
              {flow.map((f,i)=>(
                <tr key={i} style={{ borderBottom: "1px solid #3e4d6bff" }}>
                  <td>{f.time}</td><td>{f.cars}</td><td>{f.bikes}</td><td>{f.buses}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
