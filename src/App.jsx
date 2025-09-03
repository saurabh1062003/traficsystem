import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import LiveTraffic from "./pages/LiveTraffic";
import Incidents from "./pages/Incidents";
import Analytics from "./pages/Analytics";
import Cameras from "./pages/Cameras";
import RoutesPage from "./pages/Routes";
import ControlCenter from "./pages/ControlCenter";
import Alerts from "./pages/Alerts";
import Settings from "./pages/Settings";
import Reports from "./pages/Reports";



export default function App() {
  const appStyle = {
    display: "flex",
    height: "100vh",
    overflow: "hidden",
    fontFamily: "Arial, sans-serif"
  };

  const sidebarStyle = {
    
    width: "290px",   // ✅ fixed width for sidebar
    flexShrink: 0,    // ✅ prevent shrinking when resizing
    backgroundColor: "#1f2937", // (optional) dark background
    color: "#fff"
  };

  const mainContentStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden"
  };

  const pageContentStyle = {
    flex: 1,
    padding: "16px",
    width: '1200px',
    overflowY: "auto",
    backgroundColor: "#f3f4f6"
  };

  return (
    <Router>
      <div style={appStyle}>
        {/* ✅ Sidebar container with fixed width */}
        <div style={sidebarStyle}>
          <Sidebar />
        </div>

        <div style={mainContentStyle}>
          <Navbar />
          <div style={pageContentStyle}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/live" element={<LiveTraffic />} />
              <Route path="/incidents" element={<Incidents />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/cameras" element={<Cameras />} />
              <Route path="/routes" element={<RoutesPage />} />
              <Route path="/control" element={<ControlCenter />} />
              <Route path="/alerts" element={<Alerts />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/reports" element={<Reports />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

















// export default function App() {
//   const appStyle = {
//     display: "flex",
//     height: "100vh",
//     overflow: "hidden",
//     fontFamily: "Arial, sans-serif"
//   };

//   const mainContentStyle = {
//     flex: 1,
//     display: "flex",
//     flexDirection: "column",
//     overflow: "hidden"
//   };

//   const pageContentStyle = {
//     flex: 1,
//     padding: "16px",
//     overflowY: "auto",
//     backgroundColor: "#f3f4f6"
//   };

//   return (
//     <Router>
//       <div style={appStyle}>
//         <Sidebar />
//         <div style={mainContentStyle}>
//           <Navbar />
//           <div style={pageContentStyle}>
//             <Routes>
//               <Route path="/" element={<Dashboard />}/>
//               <Route path="/live" element={<LiveTraffic />}/>
//               <Route path="/incidents" element={<Incidents />}/>
//               <Route path="/analytics" element={<Analytics />}/>
//               <Route path="/cameras" element={<Cameras />}/>
//               <Route path="/routes" element={<RoutesPage />}/>
//               <Route path="/control" element={<ControlCenter/>} />
//               <Route path="/alerts" element={<Alerts />}/>
//               <Route path="/settings" element={<Settings/>} />
//               <Route path="/reports" element={<Reports/>}/>
//             </Routes>
//           </div>
//         </div>
//       </div>
//     </Router>
//   );
// }