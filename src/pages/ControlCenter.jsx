import React, { useState, useMemo, useEffect } from 'react';

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

// Generate mock data
function genOperators(n = 6) {
  return Array.from({ length: n }, (_, i) => ({
    id: i + 1,
    name: `Operator ${i + 1}`,
    shift: ['Day', 'Night'][i % 2],
    activeIncidents: Math.floor(Math.random() * 5)
  }));
}

function genIncidents(n = 12) {
  const types = ['Accident', 'Roadblock', 'Breakdown', 'Construction'];
  return Array.from({ length: n }, (_, i) => ({
    id: 100 + i,
    type: types[i % types.length],
    severity: ['Low', 'Medium', 'High'][i % 3],
    assignedTo: `Operator ${i % 6 + 1}`,
    status: ['Open', 'In Progress', 'Resolved'][i % 3]
  }));
}

export default function ControlCenter() {
  const [operators, setOperators] = useState(genOperators());
  const [incidents, setIncidents] = useState(genIncidents());
  const [selectedIncident, setSelectedIncident] = useState(null);

  const unresolved = useMemo(() => incidents.filter(i => i.status !== 'Resolved'), [incidents]);

  const assignOperator = (incidentId, opName) => {
    setIncidents(list =>
      list.map(i =>
        i.id === incidentId ? { ...i, assignedTo: opName, status: 'In Progress' } : i
      )
    );
  };

  // Auto-update active incidents randomly every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setOperators(prev => prev.map(op => ({ ...op, activeIncidents: Math.floor(Math.random() * 5) })));
      setIncidents(prev => prev.map(i => ({
        ...i,
        status: ['Open', 'In Progress', 'Resolved'][Math.floor(Math.random() * 3)]
      })));
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Inline styles
  const tableStyle = { width: '100%', borderCollapse: 'collapse', minWidth: '600px' };
  const thStyle = { textAlign: 'left', padding: '10px', backgroundColor: '#1f2937', color: '#fff', borderRadius: '6px' };
  const tdStyle = { padding: '8px', borderBottom: '1px solid #e5e7eb' };
  const severityColors = { Low: '#10b981', Medium: '#f59e0b', High: '#ef4444' };
  const statusColors = { Open: '#ef4444', 'In Progress': '#3b82f6', Resolved: '#10b981' };
  const cardContainerStyle = { display: 'grid', gap: '24px', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' };
  const tableRowHover = { cursor: 'pointer', transition: 'background 0.2s' };

  return (
    <div style={{ padding: '24px', fontFamily: 'sans-serif', backgroundColor: '#f3f4f6', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '24px', color: '#1f2937' }}>
        Control Center
      </h1>

      <div style={cardContainerStyle}>
        {/* Operator Status */}
        <Card bgColor="#335f99ff">
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '16px' }}>Operator Status</h2>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Shift</th>
                <th style={thStyle}>Active Incidents</th>
              </tr>
            </thead>
            <tbody>
              {operators.map(op => (
                <tr
                  key={op.id}
                  style={tableRowHover}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#dbeafe')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <td style={tdStyle}>{op.id}</td>
                  <td style={tdStyle}>{op.name}</td>
                  <td style={tdStyle}>{op.shift}</td>
                  <td style={tdStyle}>{op.activeIncidents}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        {/* Incident Feed */}
        <Card bgColor="#ab9230ff">
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '16px' }}>Incident Feed</h2>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>Type</th>
                <th style={thStyle}>Severity</th>
                <th style={thStyle}>Assigned To</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Action</th>
              </tr>
            </thead>
            <tbody>
              {incidents.map(i => (
                <tr
                  key={i.id}
                  onClick={() => setSelectedIncident(i)}
                  style={tableRowHover}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#fef9c3')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <td style={tdStyle}>{i.id}</td>
                  <td style={tdStyle}>{i.type}</td>
                  <td style={{ ...tdStyle, color: severityColors[i.severity], fontWeight: '600' }}>{i.severity}</td>
                  <td style={tdStyle}>{i.assignedTo}</td>
                  <td style={{ ...tdStyle, color: statusColors[i.status], fontWeight: '600' }}>{i.status}</td>
                  <td style={tdStyle}>
                    {i.status !== 'Resolved' && (
                      <select
                        onChange={e => assignOperator(i.id, e.target.value)}
                        value={i.assignedTo}
                        style={{ padding: '4px', borderRadius: '6px', border: '1px solid #d1d5db' }}
                      >
                        {operators.map(o => (
                          <option key={o.id}>{o.name}</option>
                        ))}
                      </select>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        {/* Selected Incident Details */}
        <Card bgColor="#249f60ff">
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '16px' }}>Selected Incident Details</h2>
          {selectedIncident ? (
            <div style={{ display: 'grid', gap: '8px', fontSize: '1rem' }}>
              <p><b>ID:</b> {selectedIncident.id}</p>
              <p><b>Type:</b> {selectedIncident.type}</p>
              <p><b>Status:</b> <span style={{ color: statusColors[selectedIncident.status] }}>{selectedIncident.status}</span></p>
              <p><b>Assigned To:</b> {selectedIncident.assignedTo}</p>
            </div>
          ) : (
            <p>Select an incident from the feed to view details.</p>
          )}
        </Card>

        {/* Unresolved Incidents Summary */}
        <Card bgColor="#a75c5cff">
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '16px' }}>Unresolved Incidents Summary</h2>
          <p>Total Unresolved: {unresolved.length}</p>
          <ul>
            {unresolved.map(u => (
              <li key={u.id} style={{ margin: '4px 0' }}>
                {u.type} - {u.status} (Assigned: {u.assignedTo})
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
