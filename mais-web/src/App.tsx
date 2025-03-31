import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile";
import Home from "./components/Home";
import Publish from "./components/Admin/News/Publish";
import AdminPage from "./components/Admin/AdminPage";
import "./App.css";

function App() {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Navbar />
      <div className="pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<Profile />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/publish" element={<Publish />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
}

export default App; 