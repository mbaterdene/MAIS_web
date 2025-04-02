import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile";
import Home from "./components/Home";
import Edit from "./components/Admin/News/Edit";
import AdminPage from "./components/Admin/AdminPage";
import CreatePage from "./components/Admin/Management/CreateUser";
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
          <Route path="/admin/create" element={<CreatePage />} />
          <Route path="/admin/publish" element={<Edit />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <Toaster/>
    </div>
  );
}

export default App; 