import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile";
import Home from "./components/Home";
import "./App.css";

function App() {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Profile />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App; 